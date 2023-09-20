import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Video } from 'src/app/shared/models/video.model';
import { VideoService } from 'src/app/shared/services/video.service';

@Component({
    selector: 'app-video-details',
    templateUrl: './video-details.component.html',
    styleUrls: ['./video-details.component.scss']
})
export class VideoDetailsComponent implements OnInit, AfterViewInit {

    videosList: Array<Video>;
    carouselIndex: number;
    @ViewChildren('carouselitems') carouselItems: QueryList<ElementRef>;

    constructor(
        private videosService: VideoService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.videosList = this.videosService.getVideos();
    }

    ngAfterViewInit(): void {
        this.route.params.subscribe(params => {
            this.setIndex(this.videosList.findIndex(x => x.id.toString() === params.id.toString()));
        });
    }

    setIndex(index: number) {
        if (index < 0 || index >= this.carouselItems.toArray().length) {
        } else {
            this.carouselIndex = index;
        }
        this.carouselItems.toArray()[this.carouselIndex].nativeElement.scrollIntoView({block: 'center', behavior: 'smooth'});
    }

    get carouselLength() {
        return this.carouselItems?.toArray().length;
    }

    backToHome() {
        this.router.navigate(['..']);
    }

}
