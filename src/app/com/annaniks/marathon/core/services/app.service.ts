import { Inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    private _defaultImage: string = '/assets/images/user-icon-image.png';
    constructor(@Inject('FILE_URL') private _fileURL) { }
    public setLocalImage(image: string): string {
        if (!image) {
            return this._defaultImage
        } else {
            if (image.startsWith('https://uat.marathon.me')) {
                return image
            } else {
                return this._fileURL + image
            }
        }
    }
}