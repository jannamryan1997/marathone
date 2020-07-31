import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../../../core/services/comment.service';
import { takeUntil, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: "app-posts-comments",
    templateUrl: "posts-comments.component.html",
    styleUrls: ["posts-comments.component.scss"]
})

export class PostsComments implements OnInit {
    public emojiForm: FormGroup;
    public showemoji: boolean = false;
    public comments = [];
    public feed;
    private unsubscribe$ = new Subject<void>()

    @Input('comments')
    set setComments($event) {
        this.comments = $event
    }
    @Input('feed')
    set setFeed($event) {
        this.feed = $event
    }
    private _parent: string;
    @Input('parent')
    set setParent($event) {
        this._parent = $event
    }
    @Output('sendMessage') private _sendMessage: EventEmitter<any> = new EventEmitter<any>();

    constructor(private _fb: FormBuilder, private cd: ChangeDetectorRef,
        private _commentService: CommentService) { }

    ngOnInit() {

        this._formBuilder();
    }

    private _formBuilder(): void {
        this.emojiForm = this._fb.group({
            inputField: ['', Validators.required],
        })
    }

    addEmoji($event) {
        let data = this.emojiForm.get('inputField');
        data.patchValue(data.value + $event.emoji.native)
    }

    public showEmoji(): void {
        this.showemoji = !this.showemoji;
    }


    public addInput(event) {
        if (this.emojiForm.valid) {
            // this._sendMessage.emit(this.emojiForm.value.inputField);
            this._commentService.createFeedComment(this.feed.id, this.emojiForm.value.inputField, this._parent).pipe(
                takeUntil(this.unsubscribe$),
                map(() => {
                    this.emojiForm.reset();
                    this._sendMessage.emit({ parentUrl: this._parent })
                },
                )).subscribe()


        }
    }

    public onClickedOutside(event): void {
        this.showemoji = false;
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}