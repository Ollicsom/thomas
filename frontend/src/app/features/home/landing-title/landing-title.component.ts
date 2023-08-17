import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';

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
    @ViewChild('scroll') scrollIndicator: ElementRef;

    constructor(
        private renderer: Renderer2
    ) { }

    ngAfterViewInit(): void {
        this.context = this.starsCanvas.nativeElement.getContext('2d');
        this.generateParticles([100, 70, 50, 15]);
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
        this.starsArray.forEach((star) => star.mouseMove(this.mouseX, this.mouseY));
    }

    @HostListener('window:scroll', ['$event'])
    onScroll() {
        const y = parseInt(getComputedStyle(this.scrollIndicator.nativeElement).getPropertyValue('bottom').replace('px', ''), 10);
        this.renderer.setStyle(
            this.scrollIndicator.nativeElement, 'bottom', `${window.scrollY > 320 ? 20 : y + ((window.scrollY - y) / 15)}px`);
        this.renderer.setStyle(
            this.scrollIndicator.nativeElement, 'opacity', `${window.scrollY > 320 ? 0 : 0 + ((320 - (window.scrollY)) / 320)}`);
    }

    generateParticles(layerTab) {
        layerTab.forEach((layer, layerIndex) => {
            for (let i = 0; i < layer; i++) {
                this.starsArray.push(new Star(this.context, this.windowWidth, this.windowHeight, layerIndex + 1));
            }
        });
    }

    anim() {
        requestAnimationFrame(() => this.anim());

        this.context.fillStyle = '#050505';
        this.context.fillRect(0, 0, this.windowWidth, this.windowHeight);
        this.starsArray.forEach((star) => star.anim());
    }

}


class Star {

    context: CanvasRenderingContext2D;
    layer: number;
    x: number;
    y: number;
    startX: number;
    startY: number;
    width: number;
    height: number;
    velocity = 0.4;
    opacity = 1;
    delay: number;
    duration: number;
    minDelay = 5000;
    maxDelay = 20000;
    minDuration = 800;
    maxDuration = 10000;
    fading = 'waiting';
    sizeModifier = 5;
    sizeModiferMax = 5;
    step = 30;
    xDestination: number;
    yDestination: number;

    constructor(context, windowWidth, windowHeight, layer) {
        this.context = context;
        this.width = windowWidth;
        this.height = windowHeight;
        this.layer = layer;
        this.startX = (Math.random() * windowWidth * 2) - windowWidth;
        this.startY = (Math.random() * windowHeight * 2) - windowHeight;
        this.x = this.startX;
        this.y = this.startY;
        this.xDestination = this.x;
        this.yDestination = this.y;
        this.delay = this.minDelay + (Math.random() * (this.maxDelay - this.minDelay));
        this.duration = this.minDuration + (Math.random() * (this.maxDuration - this.minDuration));
        setTimeout(() => this.fadeOut(), this.delay);
    }

    fadeIn() {
        this.fading = 'fadein';
        setTimeout(() => this.fadeOut(), this.delay);
    }

    fadeOut() {
        this.fading = 'fadeout';
        setTimeout(() => this.fadeIn(), this.duration);
    }

    mouseMove(cursorX, cursorY) {
        this.xDestination = this.startX - ((cursorX - this.width) * this.velocity * this.layer);
        this.yDestination = this.startY - ((cursorY - this.height) * this.velocity * this.layer);
    }

    anim() {
        if (this.fading === 'fadein' && this.sizeModifier < this.sizeModiferMax) {
            this.sizeModifier += 0.06;
        }
        if (this.fading === 'fadeout' && this.sizeModifier > 0) {
            this.sizeModifier -= 0.06;
            if (this.sizeModifier < 0) {
                this.sizeModifier = 0;
            }
        }
        this.context.beginPath();
        this.context.fillStyle = `rgba(102, 102, 102 ,1)`;
        this.context.shadowColor = 'white';
        this.context.shadowBlur = 15;
        const dX = this.xDestination - this.x;
        const dY = this.yDestination - this.y;
        this.x += (dX / this.step);
        this.y += (dY / this.step);
        this.context.moveTo(this.x - (this.layer * this.sizeModifier), this.y);
        this.context.bezierCurveTo(this.x, this.y, this.x, this.y, this.x, this.y - (this.layer * this.sizeModifier));
        this.context.bezierCurveTo(this.x, this.y, this.x, this.y, this.x + (this.layer * this.sizeModifier), this.y);
        this.context.bezierCurveTo(this.x, this.y, this.x, this.y, this.x, this.y + (this.layer * this.sizeModifier));
        this.context.bezierCurveTo(this.x, this.y, this.x, this.y, this.x - (this.layer * this.sizeModifier), this.y);
        this.context.fill();
    }
}
