import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../../../core/services/comment.service';
import { takeUntil, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FollowCommentService } from '../../../core/services/follow-comment.service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../../../core/models';

@Component({
    selector: "app-posts-comments",
    templateUrl: "posts-comments.component.html",
    styleUrls: ["posts-comments.component.scss"]
})

export class PostsComments implements OnInit {
    public emojiForm: FormGroup;
    public showemoji: boolean = false;
    public comments = [];
    private unsubscribe$ = new Subject<void>();
    private _feedItemId: number;
    @Input('feedItemId')
    set setfeedItemId($event) {
        // this._feedItemId = $event
    }
    private _comment: Comment;
    @Input('comment')
    set setComment($event) {
        this._comment = $event;
    }
    @Input('comments')
    set setComments($event) {
        this.comments = $event
    }
    @Output('sendMessage') private _sendMessage: EventEmitter<string> = new EventEmitter<string>();

    constructor(private _fb: FormBuilder, private cd: ChangeDetectorRef,
        private _commentService: CommentService,
        private _commentSubjectService: FollowCommentService,
        private _activatedRoute: ActivatedRoute) {
        this._activatedRoute.params.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
            if (params && params.id)
                this._feedItemId = params.id;
        })
    }

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
            const parent = this._comment ? this._comment.url : null
            this._commentService.createFeedComment(this._feedItemId, this.emojiForm.value.inputField, parent).pipe(
                takeUntil(this.unsubscribe$),
                map(() => {
                    this.emojiForm.reset();
                    this._commentSubjectService.onComment(parent, true)
                })
            ).subscribe(() => { })
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