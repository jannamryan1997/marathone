
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class YoutubeService {

    public apiKey: string = 'AIzaSyABBnV-JFyhMl_SY6kVEyn_lC1Z3Kmddj8';

    constructor(public http: HttpClient, @Inject('BASE_URL') private _baseUrl) { }

    public getVideosForChanel(channel): Observable<Object> {
        let params = new HttpParams();
        params = params.set('authorization', 'false');
        let newChannel = channel
        let index = channel.indexOf('=');
        let lastIndex = channel.indexOf(' ');
        if (index > -1) {
            newChannel = lastIndex > -1 ? channel.slice(index + 1, lastIndex) : channel.slice(index + 1);
        }
        let url = 'https://www.googleapis.com/youtube/v3/videos?id=' + newChannel + '&key=' + this.apiKey +
            '&part=snippet,statistics'
        return this.http.get(url, { params })

    }
    public getAllTags() {
        return this.http.get(this._baseUrl + '/feed/tag/')
    }
    public getAllTagsCategories() {
        return this.http.get(this._baseUrl + '/feed/tag-category/')
    }
    public filterTags(searchValue: string) {
        // ?youtube=${youtubeTagsArray}        
        return this.http.get(this._baseUrl + `/feed/tag/?name=${searchValue}`,)
    }
    public setOtherTags(tagName:string){
        return this.http.post(this._baseUrl+'/feed/tag/',{
            "name": tagName,
            "category": `${this._baseUrl}/feed/tag-category/5/`
        })
    }
}

// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { filter } from 'rxjs/operators';

// @Injectable({
//     providedIn: 'root'
// })
// export class YoutubeService {
//     // private _youtubeFrameReadyEvent$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

//     // constructor() { }

//     // public getYoutubeFrameReadyEvent(): Observable<boolean> {
//     //     return this._youtubeFrameReadyEvent$.asObservable()
//     //         .pipe(filter(v => v != null));
//     // }

//     // public setYoutubeFrameReadyEvent(isReady: boolean): void {
//     //     this._youtubeFrameReadyEvent$.next(isReady);
//     // }

// }
