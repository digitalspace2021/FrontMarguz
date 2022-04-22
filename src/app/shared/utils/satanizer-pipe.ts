import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'safe'
})
export class SafePipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) { }
    transform(url: string) {
        if (!url) return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/RjGvw0aftCE')
        if (url.includes('watch')) return this.sanitizer.bypassSecurityTrustResourceUrl(url.replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/'));
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

}