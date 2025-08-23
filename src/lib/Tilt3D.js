// src/lib/Tilt3D.js
export default class Tilt3D {
  constructor(el, opts = {}) {
    if (!el) return;
    this.el = el;
    this.opts = {
      max: 12,        // grados máx de inclinación
      scale: 1.02,    // leve zoom en hover
      perspective: 800,
      ease: 0.12,     // suavizado (0-1)
      glare: true,    // brillo suave opcional
      ...opts,
    };
    this.width = 0;
    this.height = 0;
    this.left = 0;
    this.top = 0;
    this.x = 0;
    this.y = 0;
    this.rx = 0;
    this.ry = 0;
    this.anim = null;
    this.hovering = false;

    this._bind();
  }

  _bind() {
    this.onEnter = this._onEnter.bind(this);
    this.onMove  = this._onMove.bind(this);
    this.onLeave = this._onLeave.bind(this);

    this.el.addEventListener('mouseenter', this.onEnter);
    this.el.addEventListener('mousemove',  this.onMove);
    this.el.addEventListener('mouseleave', this.onLeave);

    this._measure();
  }

  _measure() {
    const r = this.el.getBoundingClientRect();
    this.width = r.width;
    this.height = r.height;
    this.left = r.left + window.scrollX;
    this.top = r.top + window.scrollY;
  }

  _onEnter() {
    this.hovering = true;
    this._measure();
    this._animate(); // inicia loop
  }

  _onMove(e) {
    this.x = e.clientX - (this.left + this.width / 2);
    this.y = e.clientY - (this.top + this.height / 2);
    const nx = this.x / (this.width / 2);
    const ny = this.y / (this.height / 2);

    this.ryTarget = (this.opts.max * nx);
    this.rxTarget = (-this.opts.max * ny);

    // coords para “glare”
    const px = ((e.clientX - this.left) / this.width) * 100;
    const py = ((e.clientY - this.top) / this.height) * 100;
    this.el.style.setProperty('--px', `${px}%`);
    this.el.style.setProperty('--py', `${py}%`);
  }

  _onLeave() {
    this.hovering = false;
    // vuelve suave al estado plano
    this.ryTarget = 0;
    this.rxTarget = 0;
  }

  _animate() {
    this.rx = this.rx + (this.rxTarget - this.rx) * this.opts.ease;
    this.ry = this.ry + (this.ryTarget - this.ry) * this.opts.ease;

    const t = `perspective(${this.opts.perspective}px) rotateX(${this.rx}deg) rotateY(${this.ry}deg) scale(${this.hovering ? this.opts.scale : 1})`;
    this.el.style.transform = t;
    this.el.style.transformStyle = 'preserve-3d';
    this.el.style.willChange = 'transform';

    if (this.opts.glare) {
      // controla opacidad del glare según inclinación
      const intensity = Math.min(1, (Math.abs(this.rx) + Math.abs(this.ry)) / (this.opts.max * 2));
      this.el.style.setProperty('--glare-o', this.hovering ? (0.15 + intensity * 0.25) : 0);
    }

    if (this.hovering || Math.abs(this.rx) > 0.01 || Math.abs(this.ry) > 0.01) {
      this.anim = requestAnimationFrame(() => this._animate());
    } else {
      cancelAnimationFrame(this.anim);
    }
  }

  destroy() {
    this.el.removeEventListener('mouseenter', this.onEnter);
    this.el.removeEventListener('mousemove',  this.onMove);
    this.el.removeEventListener('mouseleave', this.onLeave);
    cancelAnimationFrame(this.anim);
  }
}
