// Hero research map — gentle node oscillation, pointer drag, spring-back on release.
// Lines reference endpoints by data-from / data-to (node id or "center"); each
// animation frame the node groups are translated and the line endpoints are
// rewritten so the connections follow.
(function () {
  const svg = document.querySelector('.research-map__svg');
  if (!svg) return;

  const reducedMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
  let prefersReduced = reducedMQ.matches;
  if (reducedMQ.addEventListener) {
    reducedMQ.addEventListener('change', (e) => { prefersReduced = e.matches; });
  }

  const CENTER = { x: 280, y: 240 };

  const nodes = new Map();
  svg.querySelectorAll('.research-map__node').forEach((el) => {
    const id = el.dataset.id;
    nodes.set(id, {
      el,
      anchor: { x: parseFloat(el.dataset.cx), y: parseFloat(el.dataset.cy) },
      sx: 0, sy: 0,
      vx: 0, vy: 0,
      pinX: 0, pinY: 0,
      dragging: false,
      gate: 1,
      ampX: 1.4 + Math.random() * 1.4,
      ampY: 1.4 + Math.random() * 1.4,
      freqX: 0.16 + Math.random() * 0.12,
      freqY: 0.14 + Math.random() * 0.12,
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
    });
  });

  const lines = Array.from(svg.querySelectorAll('line[data-from]'));

  function nodePos(id) {
    if (id === 'center') return CENTER;
    const n = nodes.get(id);
    if (!n) return CENTER;
    return { x: n.anchor.x + n.sx, y: n.anchor.y + n.sy };
  }

  function svgPoint(clientX, clientY) {
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svg.getScreenCTM();
    return ctm ? pt.matrixTransform(ctm.inverse()) : null;
  }

  const drags = new Map(); // pointerId -> { node, grabX, grabY }

  function startDrag(node, e) {
    const p = svgPoint(e.clientX, e.clientY);
    if (!p) return;
    e.preventDefault();
    node.el.classList.add('is-dragging');
    node.dragging = true;
    node.pinX = node.sx;
    node.pinY = node.sy;
    drags.set(e.pointerId, {
      node,
      grabX: p.x - (node.anchor.x + node.sx),
      grabY: p.y - (node.anchor.y + node.sy),
    });
    if (drags.size === 1) {
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
      window.addEventListener('pointercancel', onUp);
    }
  }

  function onMove(e) {
    const d = drags.get(e.pointerId);
    if (!d) return;
    const p = svgPoint(e.clientX, e.clientY);
    if (!p) return;
    d.node.pinX = p.x - d.grabX - d.node.anchor.x;
    d.node.pinY = p.y - d.grabY - d.node.anchor.y;
  }

  function onUp(e) {
    const d = drags.get(e.pointerId);
    if (!d) return;
    d.node.el.classList.remove('is-dragging');
    d.node.dragging = false;
    drags.delete(e.pointerId);
    if (drags.size === 0) {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    }
  }

  nodes.forEach((n) => {
    n.el.addEventListener('pointerdown', (e) => startDrag(n, e));
  });

  // Spring constants: gentle, slightly underdamped, ~1s settle.
  const stiffness = 14;
  const damping = 5.5;
  const gateRiseTau = 0.6;
  const gateFallTau = 0.12;

  let lastT = performance.now();
  function tick(now) {
    let dt = (now - lastT) / 1000;
    lastT = now;
    if (dt > 0.05) dt = 0.05; // clamp after tab switch

    const t = now / 1000;

    nodes.forEach((n) => {
      const targetGate = n.dragging || prefersReduced ? 0 : 1;
      const tau = targetGate > 0.5 ? gateRiseTau : gateFallTau;
      n.gate += (targetGate - n.gate) * (1 - Math.exp(-dt / tau));

      if (n.dragging) {
        n.sx = n.pinX;
        n.sy = n.pinY;
        n.vx = 0;
        n.vy = 0;
      } else {
        const oscX = Math.sin(2 * Math.PI * n.freqX * t + n.phaseX) * n.ampX * n.gate;
        const oscY = Math.cos(2 * Math.PI * n.freqY * t + n.phaseY) * n.ampY * n.gate;
        const ax = -stiffness * (n.sx - oscX) - damping * n.vx;
        const ay = -stiffness * (n.sy - oscY) - damping * n.vy;
        n.vx += ax * dt;
        n.vy += ay * dt;
        n.sx += n.vx * dt;
        n.sy += n.vy * dt;
      }

      n.el.setAttribute('transform', 'translate(' + n.sx.toFixed(3) + ' ' + n.sy.toFixed(3) + ')');
    });

    for (let i = 0; i < lines.length; i++) {
      const ln = lines[i];
      const a = nodePos(ln.dataset.from);
      const b = nodePos(ln.dataset.to);
      ln.setAttribute('x1', a.x.toFixed(2));
      ln.setAttribute('y1', a.y.toFixed(2));
      ln.setAttribute('x2', b.x.toFixed(2));
      ln.setAttribute('y2', b.y.toFixed(2));
    }

    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
