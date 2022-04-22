import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
    name: 'media'
})
export class MediaPipe implements PipeTransform {

    constructor() { }
    transform(url: string) {
        return (url.includes('base64')) ? url : environment.media + url;
    }

}