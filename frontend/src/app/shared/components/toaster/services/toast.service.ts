import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    toastEventObservable: Observable<any>;
    private toastEvents = new Subject<any>();

    constructor() {
        this.toastEventObservable = this.toastEvents.asObservable();
    }

    showToast(title: string, message: string, type: string) {
        this.toastEvents.next({
            message,
            title,
            type,
        });
    }
}
