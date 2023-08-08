import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToastComponent } from './components/toast/toast.component';
import { ToasterComponent } from './components/toaster/toaster.component';
import { ToastService } from './services/toast.service';

const components = [
    ToastComponent,
    ToasterComponent
];

@NgModule({
    declarations: [
        components
    ],
    imports: [
        CommonModule
    ],
    exports: [
        components
    ],
    providers: [ToastService]
})
export class ToasterModule { }
