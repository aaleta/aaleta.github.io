//Adapted from https://github.com/tipsy/bubbly-bg

"use strict";
window.bubbly=function(t){
	//Canvas size, expand to full size
	var n=t||{},
		o=function(){return Math.random()},
		r=n.canvas||document.createElement("canvas"),
		e=r.width,
		a=r.height;

	null===r.parentNode&&(
			r.setAttribute("style","position:fixed;z-index:-1;left:0;top:0;min-width:100vw;min-height:100vh;"),
			e=r.width=window.innerWidth,
			a=r.height=window.innerHeight,document.body.appendChild(r)
		);

	//2d render
	var i=r.getContext("2d");

	//i.shadowColor=n.shadowColor||"#fff",
	//	i.shadowBlur=n.blur||4;

	//Background gradient, first and last color of gradient
	var l=i.createLinearGradient(0,0,e,a);

	l.addColorStop(0,n.colorStart||"#ffffff"),
		l.addColorStop(1,n.colorStop||"#ffffff");

	//Loop over bubbles
	for(var c=n.bubbles||Math.floor(.02*(e+a)),
		u=[],
		d=0;d<c;d++)
			u.push({
				f:(n.bubbleFunc||function(){return"hsla(0, 0%, 50%, "+(.05+.1*o())+")"}).call(),
				x:o()*e,
				y:o()*a,
				r:(n.radiusFunc||function(){return 10+o()*e/60}).call(),
				a:(n.angleFunc||function(){return o()*Math.PI*2}).call(),
				v:(n.velocityFunc||function(){return.05+.2*o()}).call()
			});

	!function t(){
		if(null===r.parentNode)return cancelAnimationFrame(t);
		for(var link=[],b1=0;b1<u.length;b1++){
			var min_dist = 100000000;
			var index = 0;
			for(var b2=b1+1;b2<u.length;b2++){
				var dist = (u[b1].x-u[b2].x)*(u[b1].x-u[b2].x)+(u[b1].y-u[b2].y)*(u[b1].y-u[b2].y);
				if(dist<min_dist){
					min_dist = dist;
					index = b2;
				}
			}
			link.push({
				x1:u[b1].x,
				y1:u[b1].y,
				x2:u[index].x,
				y2:u[index].y
			});
		};
		!1!==n.animate&&requestAnimationFrame(t),
			i.globalCompositeOperation="source-over",
			i.fillStyle=l,
			i.fillRect(0,0,e,a),
			i.globalCompositeOperation=n.compose||"darken",		
			link.forEach(function(t){
					i.beginPath();
					i.moveTo(t.x1, t.y1);
					i.lineTo(t.x2, t.y2);
					i.strokeStyle = 'rgba(217,217,217,.5)';
					i.stroke()
					}
				)	
			u.forEach(function(t){
					i.beginPath(),
					i.arc(t.x,t.y,t.r,0,2*Math.PI),
					i.fillStyle=t.f,
					i.fill(),
					t.x+=Math.cos(t.a)*t.v,
					t.y+=Math.sin(t.a)*t.v,
					t.x-t.r>e&&(t.x=-t.r),
					t.x+t.r<0&&(t.x=e+t.r),
					t.y-t.r>a&&(t.y=-t.r),
					t.y+t.r<0&&(t.y=a+t.r)
					}
				)
	}()
};
