import { Component, OnInit, OnDestroy, Input, Inject } from "@angular/core";
import { Results } from '../../../core/models/like';
import { CookieService } from 'ngx-cookie';


@Component({
    selector: "app-like-item",
    templateUrl: "like-item.component.html",
    styleUrls: ["like-item.component.scss"]
})

export class LiketemComponent implements OnInit, OnDestroy {
    public unfollow: boolean = false;
    public localImage:string="assets/images/user-icon-image.png";
    public user_first_name:string;
    @Input() likeItem;
    constructor(@Inject('FILE_URL') private _fileUrl,private _cookieService:CookieService) { 
        
    }

    ngOnInit() { 
        console.log(this.likeItem,"ggggggggg");
        if(this.likeItem.liked_coach===null){
            this.localImage=this._fileUrl+this.likeItem.liked_user.avatar;
            this.user_first_name=this.likeItem.liked_user.user.first_name;
        }
        else{
            this.localImage=this._fileUrl+this.likeItem.liked_coach.avatar;
            this.user_first_name=this.likeItem.liked_coach.user.first_name;
        }
        
    }

    public onClickUnfollow():void{
        this.unfollow =! this.unfollow;
    }

    ngOnDestroy() { }
}