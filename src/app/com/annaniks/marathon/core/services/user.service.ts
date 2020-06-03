import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public user;
    public isAuthorized: boolean = false;

    constructor() { }

}
