import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { pairwise } from 'rxjs/operators';

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

  constructor(private _router: Router) { }

  // ngOnInit() {
  //   this._subscriptions.push(
  //     // save or restore scroll position on route change
  //     this.router.events.pipe(
  //       pairwise()

  //     ).subscribe(([prevRouteEvent, currRouteEvent]) => {

  //       if (prevRouteEvent instanceof NavigationEnd) {
  //         console.log('scrolll', window.pageYOffset);
  //         this._routeScrollPositions[prevRouteEvent.url] = window.pageYOffset;
  //       }
  //       if (currRouteEvent instanceof NavigationEnd) {
          
  //         console.log(currRouteEvent, ' ', this._routeScrollPositions[currRouteEvent.url]);
  //         if (currRouteEvent.url == '/feed') {
            
	
  //           window.scrollTo(0, this._routeScrollPositions[currRouteEvent.url]);
  //         } else {
  //           window.scroll(0, 0)
  //         }
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
    // this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
