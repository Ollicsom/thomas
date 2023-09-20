import { AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Video } from 'src/app/shared/models/video.model';
import { VideoService } from 'src/app/shared/services/video.service';

@Component({
    selector: 'app-video-gallery',
    templateUrl: './video-gallery.component.html',
    styleUrls: ['./video-gallery.component.scss']
})
export class VideoGalleryComponent implements AfterViewInit, OnInit {

    @ViewChild('container') container: ElementRef;
    @ViewChild('stickyContainer') stickyContainer: ElementRef;
    @ViewChild('galleryContainer') galleryContainer: ElementRef;

    @ViewChildren('videoContainer') videosRef: QueryList<ElementRef>;

    isOpened = false;
    videosList: Array<Video>;

    scrollValue: number;

    constructor(
        private renderer: Renderer2,
        private videosService: VideoService
    ) { }

    ngOnInit(): void {
        this.videosList = this.videosService.getVideos();
    }

    ngAfterViewInit(): void {
        this.renderer.setStyle(
            this.container.nativeElement, 'height', `${this.galleryContainer.nativeElement.offsetWidth - window.innerHeight}px`
        );
        this.videosRef.changes.subscribe(
            () => {
                this.renderer.setStyle(
                    this.container.nativeElement, 'height', `${this.galleryContainer.nativeElement.offsetWidth - window.innerHeight}px`
                );
            }
        );
    }

    seeMore() {
        this.isOpened = true;
    }

    @HostListener('window:scroll', ['$event'])
    onScroll() {
        this.stickyContainer.nativeElement.scrollLeft = this.stickyContainer.nativeElement.offsetTop - 3.7 * window.innerHeight;
    }

}
