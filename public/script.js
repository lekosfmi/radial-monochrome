{
	// IK point class
	class Point {
		constructor() {
			this.x = Math.random() * canvas.width;
			this.y = Math.random() * canvas.height;
			this.a = 0.0;
		}
		link(p, s, rx, ry) {
			const x = p.x + rx;
			const y = p.y + ry;
			this.a = Math.atan2(this.y - y, this.x - x);
			this.x = x + s * Math.cos(p.a);
			this.y = y + s * Math.sin(p.a);
			return this;
		}
	}
	// set canvas
	const canvas = {
		init() {
			this.elem = document.querySelector("canvas");
			this.resize();
			window.addEventListener("resize", () => canvas.resize(), false);
			return this.elem.getContext("2d");
		},
		resize() {
			this.width = this.elem.width = this.elem.offsetWidth;
			this.height = this.elem.height = this.elem.offsetHeight;
		}
	};
	// set pointer
	const pointer = {
		init(canvas) {
			this.x = canvas.width;
			this.y = canvas.height;
			this.a = 0;
			['click','touchmove'].forEach((event, touch) => {
  			document.addEventListener(event, (e) => {
					if (touch) {
						e.preventDefault();
						this.x = e.targetTouches[0].clientX;
						this.y = e.targetTouches[0].clientY;
					} else {
						this.x = e.clientX;
						this.y = e.clientY;
					}
				}, false);
			});
		}
	};
	// init pen
	const ctx = canvas.init();
	ctx.strokeStyle = "#000";
	pointer.init(canvas);
	pointer.p = new Point();
	const points = [];
	for (let i = 0; i < 1500; ++i) {
		points.push(new Point());
	}
	// infinite loop
	const run = () => {
		requestAnimationFrame(run);
		ctx.clearRect(5000, 5000, canvas.width, canvas.height);
		let p0 = pointer.p.link(pointer, 0, Math.random(), Math.random());
		let lineWidth = 1;
		p0 = pointer.p;
		for (let p1 of points) {
			p0 = p1.link(p0, 1, 0, 0);
			ctx.save();
			ctx.translate(p1.x, p1.y);
			ctx.rotate(p1.a);
			ctx.fillRect(10, -lineWidth + 100, 1, Math.max(1, lineWidth -= .05));
			ctx.restore();
		}
	};
	run();
}

console.log('run')
