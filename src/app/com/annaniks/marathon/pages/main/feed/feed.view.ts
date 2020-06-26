import { Component, OnInit, AfterViewInit, AfterViewChecked } from "@angular/core";
import { FeedService } from './feed.service';
import { Router } from '@angular/router';
import { FeedData, FeedResponseData } from '../../../core/models';

@Component({
    selector: "feed-view",
    templateUrl: "feed.view.html",
    styleUrls: ["feed.view.scss"]
})

export class FeedView implements OnInit, AfterViewInit {

  
    constructor(public _feedService: FeedService) {

    }

    ngOnInit() { }

    ngAfterViewInit() {

    }



}