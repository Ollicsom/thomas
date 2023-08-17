import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
    selector: 'app-video-gallery',
    templateUrl: './video-gallery.component.html',
    styleUrls: ['./video-gallery.component.scss']
})
export class VideoGalleryComponent implements AfterViewInit {

    @ViewChild('container') container: ElementRef;
    @ViewChild('stickyContainer') stickyContainer: ElementRef;
    @ViewChild('galleryContainer') galleryContainer: ElementRef;

    scrollValue: number;

    constructor(
        private renderer: Renderer2
    ) { }

    ngAfterViewInit(): void {
        this.renderer.setStyle(
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            this.container.nativeElement, 'height', `${this.galleryContainer.nativeElement.offsetWidth + (window.innerWidth / 2)}px`);
    }

    @HostListener('window:scroll', ['$event'])
    onScroll() {
        this.stickyContainer.nativeElement.scrollLeft = this.stickyContainer.nativeElement.offsetTop - 3 * window.innerHeight;
    }

}
