import { Component, ViewChild, ElementRef, OnInit, HostListener } from '@angular/core';
import { Circle } from './modele/circle';
import { Mouse } from './modele/mouse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;

  private circleArray: Circle[] = [];
  private nbCircle = 800;
  private mouse: Mouse;

  private colorArray: string[] = [
    '#2CE350',
    '#E74C3C',
    '#ECF0F1',
    '#3498DB',
    '#2980B9'
  ]

  constructor() {
  }

  ngOnInit() {
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
    this.ctx = this.canvas.nativeElement.getContext('2d');

    for (let index = 0; index < this.nbCircle; index++) {
      const radius = Math.random() * 3 + 1;
      const x = Math.random() * (window.innerWidth - radius * 2) + radius;
      const y = Math.random() * (window.innerHeight - radius * 2) + radius;
      const dx = (Math.random() - 0.5) * 2;
      const dy = (Math.random() - 0.5) * 2;
      const color = this.colorArray[Math.floor(Math.random() * this.colorArray.length)];
      this.circleArray.push(new Circle(x, y, dx, dy, radius, color));
    }

    this.circleArray.forEach(c => c.draw(this.ctx));
    this.animate();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.circleArray.forEach(c => c.update(this.ctx, this.mouse));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event) {
    this.mouse = new Mouse(event.x, event.y);
  }



}
