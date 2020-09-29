import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'marathon';
  filteredCountriesMultiple: any[];

  private _routeScrollPositions: { [url: string]: number }[] = [];
  private _subscriptions: Subscription[] = [];
  private _scrollPosition;
  constructor(private _router: Router) { }

  // ngOnInit() {
  //   this._subscriptions.push(
  //     // save or restore scroll position on route change
  //     this._router.events.pipe(
  //       pairwise(),
  //       filter(event => event instanceof NavigationEnd)

  //     ).subscribe(([prevRouteEvent, currRouteEvent]) => {

  //       // if (prevRouteEvent instanceof NavigationEnd && currRouteEvent instanceof NavigationStart) {
  //       //   this._routeScrollPositions[prevRouteEvent.url] = window.pageYOffset;
  //       // }
  //       // if (currRouteEvent instanceof NavigationEnd) {
  //       //   window.scrollTo(0, this._routeScrollPositions[currRouteEvent.url] || 0);
  //       // }
  //       // if (prevRouteEvent instanceof NavigationEnd) {
  //       //   // console.log(prevRouteEvent);
  //       //   // if (prevRouteEvent.url == '/feed') {
  //       //   //   this._scrollPosition = window.pageYOffset
  //       //   //   // this._routeScrollPositions[prevRouteEvent.url] = window.pageYOffset;
  //       //   // }
  //       // }

  //       ////////
  //       if (prevRouteEvent instanceof NavigationEnd) {}
  //         if (currRouteEvent instanceof NavigationEnd) {
  //           console.log(currRouteEvent);

  //           console.log(window.pageYOffset);

  //           console.log(prevRouteEvent);

  //           // this._scrollPosition = window.pageYOffset


  //           if (currRouteEvent.url == '/feed') {
  //             // console.log( this._routeScrollPositions[currRouteEvent.url],'current');
  //             this._scrollPosition = window.pageYOffset;
  //             console.log(this._scrollPosition);

  //             window.scrollTo(0, this._scrollPosition);
  //             // this._routeScrollPositions[currRouteEvent.url] = window.pageYOffset;

  //           } else {
  //             window.scroll(0, 0)
  //           }
  //         }

  //     })

  //   );
  // }
  // ngOnInit() {
  //   this._subscriptions.push(
  //     // save or restore scroll position on route change
  //     this._router.events.pipe(pairwise()).subscribe(([prevRouteEvent, currRouteEvent]) => {
        
  //         if( currRouteEvent instanceof NavigationStart && prevRouteEvent instanceof NavigationEnd){
  //          console.log('yes');
           
            
  //           this._routeScrollPositions[prevRouteEvent.url] = window.pageYOffset;
  //                  // if(currRouteEvent.url ==)
       
  //       }
  //       if (currRouteEvent instanceof NavigationEnd) {
  //         console.log( this._routeScrollPositions[currRouteEvent.url]);
  //         console.log(currRouteEvent.url);
  //           window.scrollTo(0, this._routeScrollPositions[currRouteEvent.url] || 0);
  //       }
  //     })
  //   );
  // }

  ngOnInit() {
    this._router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
       window.scrollTo(0, 0)
    });
  }
  onActivate(event) {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 1);
  }

  ngOnDestroy() {
    // if (this._subscriptions && this._subscriptions.length)
    //   this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
