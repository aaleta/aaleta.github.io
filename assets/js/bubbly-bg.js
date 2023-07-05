"use strict";

window.bubbly = function(options) {
  options = options || {};

  const canvas = options.canvas || document.createElement("canvas");
  const context = canvas.getContext("2d");
  const width = canvas.width = window.innerWidth;
  const height = canvas.height = window.innerHeight;

  if (!canvas.parentNode) {
    canvas.setAttribute("style", "position:fixed;z-index:-1;left:0;top:0;min-width:100vw;min-height:100vh;background-color:transparent;");
    document.body.appendChild(canvas);
  }

  const bubbles = options.bubbles || Math.floor(0.02 * (width + height));
  const bubbleFunc = options.bubbleFunc || (() => `rgba(0, 0, 0, ${0.02 + 0.1 * Math.random()})`);
  const radiusFunc = options.radiusFunc || (() => 10 + Math.random() * width / 100);
  const angleFunc = options.angleFunc || (() => Math.random() * Math.PI * 2);
  const velocityFunc = options.velocityFunc || (() => 0.05 + 0.2 * Math.random());

  const links = [];

  for (let i = 0; i < bubbles; i++) {
    const bubble = {
      f: bubbleFunc(),
      x: Math.random() * width,
      y: Math.random() * height,
      r: radiusFunc(),
      a: angleFunc(),
      v: velocityFunc()
    };
    links.push(bubble);
  }

  function getInverseColor(color) {
   return color === "#fff" ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.5)";
  }

  let lastRenderTime = 0;
  const throttleTime = 1000 / 30; // Target 30 frames per second

  function animate(timestamp) {
    if (!canvas.parentNode) return;

    if (timestamp - lastRenderTime < throttleTime) {
      requestAnimationFrame(animate);
      return;
    }
    
    lastRenderTime = timestamp;
    
    const bgColor = getComputedStyle(document.documentElement).getPropertyValue("--global-bg-color");
    const inverseColor = getInverseColor(bgColor);

    context.globalCompositeOperation = "source-over";
    context.clearRect(0, 0, width, height);
    context.fillStyle = bgColor.trim() || options.colorStart || "#ffffff";
    context.fillRect(0, 0, width, height);
    context.globalCompositeOperation = options.compose || "darken";

    for (let i = 0; i < links.length; i++) {
      for (let j = i + 1; j < links.length; j++) {
        const distX = links[j].x - links[i].x;
        const distY = links[j].y - links[i].y;
        const distance = Math.sqrt(distX * distX + distY * distY);

        if (distance < 150) {
          context.beginPath();
          context.moveTo(links[i].x, links[i].y);
          context.lineTo(links[j].x, links[j].y);
          context.strokeStyle = inverseColor;
          context.stroke();
        }
      }
    }

    links.forEach(link => {
      context.beginPath();
      context.arc(link.x, link.y, link.r, 0, 2 * Math.PI);
      context.fillStyle = link.f;
      context.fill();
      link.x += Math.cos(link.a) * link.v;
      link.y += Math.sin(link.a) * link.v;
      link.x - link.r > width && (link.x = -link.r);
      link.x + link.r < 0 && (link.x = width + link.r);
      link.y - link.r > height && (link.y = -link.r);
      link.y + link.r < 0 && (link.y = height + link.r);
    });
    
    requestAnimationFrame(animate);    
  }

  animate();    
};

// Call the function without passing any options
bubbly();

