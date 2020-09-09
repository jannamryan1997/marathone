
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class YoutubeService {

    apiKey: string = 'AIzaSyCKe7deaif6jIcKOC8lRKBvZqyO4C3Onr0';

    constructor(public http: HttpClient) { }

    getVideosForChanel(channel): Observable<Object> {
        let params = new HttpParams();
        params = params.set('authorization', 'false');
        let newChannel = channel
        let index = channel.indexOf('=');
        if (index > -1) {
            newChannel = channel.slice(index+1);
        }
        // let url = 'https://www.googleapis.com/youtube/v3/search?key=' + this.apiKey + '&channelId=' + channel + '&order=date&part=snippet&type=video,id&maxResults=' + maxResults
        // let url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&video=' + channel + '&type=video&key=' + this.apiKey + '&maxResults=50'
        let url = 'https://www.googleapis.com/youtube/v3/videos?id=' + newChannel + '&key=' + this.apiKey +
            '&part=snippet,statistics'
        return this.http.get(url, { params })

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
