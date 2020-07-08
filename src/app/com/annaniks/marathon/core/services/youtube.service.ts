import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class YoutubeService {
    // private _youtubeFrameReadyEvent$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

    // constructor() { }

    // public getYoutubeFrameReadyEvent(): Observable<boolean> {
    //     return this._youtubeFrameReadyEvent$.asObservable()
    //         .pipe(filter(v => v != null));
    // }

    // public setYoutubeFrameReadyEvent(isReady: boolean): void {
    //     this._youtubeFrameReadyEvent$.next(isReady);
    // }
}