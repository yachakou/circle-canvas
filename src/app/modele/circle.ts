import { Mouse } from './mouse';

export class Circle {

    constructor(public x: number, public y: number, public dx:number, public dy:number,public radius:number, public color:string) {
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.fillStyle = this.color;
        ctx.stroke();
    }

    update(ctx: CanvasRenderingContext2D, mouse:Mouse){
        if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < 40) {
                this.radius += 1;
            }
        } else if (this.radius > 4) {
            this.radius -= 1;
        }

        this.draw(ctx);
    }
}
