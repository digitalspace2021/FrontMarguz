import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './satanizer-pipe';
import { MediaPipe } from './media-pipe';

@NgModule({
    declarations: [
        SafePipe,
        MediaPipe,
    ],
    exports: [
        SafePipe,
        MediaPipe,
    ]
})
export class UtilsModule { }
