---
layout: page
permalink: /publications/
title: Publications
description:
nav: true
nav_order: 1
---
<!-- _pages/publications.md -->
<div class="publications">

{% bibliography -f {{ site.scholar.bibliography }} --template bib_no_thumbnails %}

</div>

<h2>Technical reports</h2>

<div class="publications">

{% bibliography -f {{ site.scholar.bibliography_reports }} --template bib_no_thumbnails %}

</div>
