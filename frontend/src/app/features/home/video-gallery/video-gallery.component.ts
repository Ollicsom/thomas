import { AfterViewInit, Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';

@Component({
    selector: 'app-video-gallery',
    templateUrl: './video-gallery.component.html',
    styleUrls: ['./video-gallery.component.scss']
})
export class VideoGalleryComponent implements AfterViewInit {

    @ViewChild('container') container: ElementRef;
    @ViewChild('stickyContainer') stickyContainer: ElementRef;
    @ViewChild('galleryContainer') galleryContainer: ElementRef;

    videoList = [
        { title: 'Test', fileName: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg' },
        { title: 'Caca', fileName: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg' },
        { title: 'Nom un peu longuet', fileName: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg' }
    ];

    scrollValue: number;

    constructor(
        private renderer: Renderer2
    ) { }

    ngAfterViewInit(): void {
        this.renderer.setStyle(
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            this.container.nativeElement, 'height', `${this.galleryContainer.nativeElement.offsetWidth}px`);
    }

    @HostListener('window:scroll', ['$event'])
    onScroll() {
        this.stickyContainer.nativeElement.scrollLeft = this.stickyContainer.nativeElement.offsetTop - 3 * window.innerHeight;
    }

}
