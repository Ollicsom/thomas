import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-landing-title',
    templateUrl: './landing-title.component.html',
    styleUrls: ['./landing-title.component.scss']
})
export class LandingTitleComponent implements OnInit, AfterViewInit {

    windowWidth: number;
    windowHeight: number;
    mouseX = 0;
    mouseY = 0;
    starsArray: Array<any> = [];
    context: CanvasRenderingContext2D;

    @ViewChild('stars') starsCanvas: ElementRef<HTMLCanvasElement>;

    constructor(
    ) { }

    ngAfterViewInit(): void {
        this.context = this.starsCanvas.nativeElement.getContext('2d');
        this.generateParticles(50, 3);
        this.anim();
    }

    ngOnInit(): void {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
    }

    @HostListener('document:mousemove', ['$event'])
    onMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }

    generateParticles(amount, layer) {
        for (let layerIndex = 0; layerIndex < layer; layerIndex++) {
            for (let i = 0; i < amount; i++) {
                this.starsArray.push(new Star(this.context, this.windowWidth, this.windowHeight, layerIndex));
            }
        }
        console.log(this.starsArray);
    }

    anim() {
        requestAnimationFrame(() => this.anim());

        this.context.fillStyle = '#050505';
        this.context.fillRect(0, 0, this.windowWidth, this.windowHeight);
        this.starsArray.forEach((star) => star.mouseMove(this.mouseX, this.mouseY));
    }

}


class Star {

    context: CanvasRenderingContext2D;
    layer: number;
    x: number;
    y: number;
    width: number;
    height: number;
    velocity = 0.3;
    sizeModifier = 2;
    opacity = 1;
    delay: number;
    minDelay = 8000;
    maxDelay = 40000

    constructor(context, windowWidth, windowHeight, layer) {
        this.context = context;
        this.width = windowWidth;
        this.height = windowHeight;
        this.layer = layer;
        this.x = (Math.random() * windowWidth * 2) - windowWidth;
        this.y = (Math.random() * windowHeight * 2) - windowHeight;
        this.delay = this.minDelay + (Math.random() * (this.maxDelay - this.minDelay));
        setTimeout(() => this.fadeOut(), this.delay);
    }

    fadeOut() {
        while (this.opacity > 0) {
            this.opacity -= 0.0005;
        }
        setTimeout(() => this.fadeIn(), this.delay);
    }

    fadeIn() {
        while (this.opacity < 1) {
            this.opacity += 0.0005;
        }
        setTimeout(() => this.fadeOut(), this.delay);
    }

    mouseMove(cursorX, cursorY) {
        this.context.beginPath();
        this.context.fillStyle = `rgba(102, 102, 102 ,0.4)`;
        this.context.shadowColor = "white";
        this.context.shadowBlur = 15 * this.layer;
        this.context.arc(
            this.x - ((cursorX - this.width) * this.velocity / this.layer),
            this.y - ((cursorY - this.height) * this.velocity / this.layer),
            this.layer * this.sizeModifier,
            0, 2 * Math.PI);
        this.context.fill();
    }
}
