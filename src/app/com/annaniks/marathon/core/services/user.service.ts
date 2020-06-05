import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ProfileUserService {
    public user;
    public isAuthorized: boolean = false;

    constructor() { }

}
