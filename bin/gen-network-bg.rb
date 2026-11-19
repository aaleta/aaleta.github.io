#!/usr/bin/env ruby
# frozen_string_literal: true
#
# Regenerate the baked network-background SVGs — one per page header, each with a
# different seed so the wireframes differ. Run from the repo root:
#
#     ruby bin/gen-network-bg.rb
#
# Output: _includes/net/{publications,projects,teaching,resources}.svg
# These are inlined by _includes/network_bg.liquid; they use `currentColor`
# (the wrapper sets the colour) with a baked-in low opacity.
#
# Uses a `mulberry32` PRNG (ported from the original JS design prototype):
# nodes scattered at random, each connected to its two nearest neighbours.

require "fileutils"

OUT_DIR = File.expand_path("../_includes/net", __dir__)
WIDTH   = 1280
HEIGHT  = 400
M32     = 0xffffffff

# JS `Math.imul` — low 32 bits of the (32-bit) product. We only use the bit
# pattern, so an unsigned multiply-and-mask matches.
def imul(a, b)
  ((a & M32) * (b & M32)) & M32
end

# Deterministic PRNG, returns a closure yielding floats in [0, 1).
def mulberry32(seed)
  s = seed & M32
  lambda do
    s = (s + 0x6d2b79f5) & M32
    t = s
    t = imul(t ^ (t >> 15), t | 1)
    t = (t ^ ((t + imul(t ^ (t >> 7), t | 61)) & M32)) & M32
    ((t ^ (t >> 14)) & M32) / 4_294_967_296.0
  end
end

def r2(x) = format("%.2f", x).sub(/\.?0+\z/, "")

def build(seed:, count:, edge_opacity:)
  rng = mulberry32(seed)
  nodes = Array.new(count) do
    { x: rng.call * WIDTH, y: rng.call * HEIGHT, r: 1.2 + rng.call * 1.8 }
  end

  edges = []
  nodes.each_with_index do |n, i|
    two = nodes.each_with_index
               .reject { |_, j| j == i }
               .map { |m, j| [(m[:x] - n[:x])**2 + (m[:y] - n[:y])**2, j] }
               .sort_by(&:first)
               .first(2)
    two.each { |_, j| edges << [i, j] }
  end

  node_opacity = (edge_opacity * 1.6).round(4)

  lines = edges.map do |a, b|
    %(<line x1="#{r2(nodes[a][:x])}" y1="#{r2(nodes[a][:y])}" x2="#{r2(nodes[b][:x])}" y2="#{r2(nodes[b][:y])}"/>)
  end.join
  circles = nodes.map do |n|
    %(<circle cx="#{r2(n[:x])}" cy="#{r2(n[:y])}" r="#{r2(n[:r])}"/>)
  end.join

  <<~SVG
    <svg viewBox="0 0 #{WIDTH} #{HEIGHT}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <g stroke="currentColor" stroke-width="0.6" stroke-linecap="round" opacity="#{edge_opacity}">#{lines}</g>
    <g fill="currentColor" stroke="none" opacity="#{node_opacity}">#{circles}</g>
    </svg>
  SVG
end

PAGES = {
  "publications" => { seed: 11, count: 22, edge_opacity: 0.05 },
  "projects"     => { seed: 17, count: 24, edge_opacity: 0.05 },
  "teaching"     => { seed:  5, count: 26, edge_opacity: 0.04 },
  "resources"    => { seed: 23, count: 24, edge_opacity: 0.05 }
}.freeze

FileUtils.mkdir_p(OUT_DIR)
PAGES.each do |name, opts|
  File.write(File.join(OUT_DIR, "#{name}.svg"), build(**opts))
  puts "wrote _includes/net/#{name}.svg  (seed #{opts[:seed]}, #{opts[:count]} nodes)"
end
