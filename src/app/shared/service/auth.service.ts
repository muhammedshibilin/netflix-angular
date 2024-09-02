declare var google:any;
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Users} from '../model/users'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class AuthService {
    private baseUrl = 'http://localhost:3000'
router = inject(Router)
constructor(private http:HttpClient) { }

registerUser(userDetails:Users){
    return this.http.post(`${this.baseUrl}/users`,userDetails)
}

getUserByEmail(email:string):Observable<Users[]>{
    return this.http.get<Users[]>(`${this.baseUrl}/users?email=${email}`)
}
signOut(){
    google.accounts.id.disableAutoSelect();
    this.router.navigate(['/'])
}
}
