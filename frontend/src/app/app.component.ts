import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(
        private translateService: TranslateService
    ) {
        this.translateService.setDefaultLang(window.navigator.language);
        if ( !localStorage.getItem('language') ){
            localStorage.setItem('language', window.navigator.language);
        }
        this.translateService.use(localStorage.getItem('language'));
    }

    changeLanguage(value: string){
        localStorage.setItem('language', value);
        this.translateService.use(localStorage.getItem('language') || window.navigator.language);
        window.location.reload();
    }
}
