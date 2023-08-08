import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ToastComponent implements OnInit {

    @Input() type: string;
    @Input() message: string;
    @Input() title: string;
    @Output() disposeEvent = new EventEmitter<string>();
    maxTimer = 3000;
    timer = this.maxTimer;
    hover = false;

    @ViewChild('toast')
        toastElement: any;

    @ViewChild('progress')
        progressElement: any;

    constructor(
        private renderer: Renderer2
    ) {}

    ngOnInit() {
        const interval = setInterval(() => {
            if (!this.hover){
                this.timer = this.timer - 10;
                this.renderer.setStyle(this.progressElement.nativeElement, 'width', `${(this.timer / this.maxTimer) * 100}%`);
                if (this.timer <= 0) {
                    this.dismiss();
                    clearInterval(interval);
                }
            }
        }, 10);
    }

    mouseEnter() {
        this.hover = true;
    }

    mouseLeave() {
        this.hover = false;
    }

    dismiss() {
        this.renderer.setStyle(this.toastElement.nativeElement, 'animation', `.8s fade-out`);
        setTimeout(() => {
            this.disposeEvent.emit();
        }, 800);
    }
}
