declare var google:any;

import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm:any;
  private router = inject(Router)

  constructor(private fb: FormBuilder, private authService: AuthService) {
  this.loginForm = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',Validators.required]
  })
}

  private decodeToken(token:string){
    return JSON.parse(atob(token.split('.')[1]))
  }
  handleLogin(response:any){
    if(response){
      // decode the response ascii base64 to binary utf-8 with atob 
      const payload = this.decodeToken(response.credential)
      sessionStorage.setItem("loggedInUser",JSON.stringify(payload))
      this.router.navigate(['home'])
    }
  }

  loginUser() {
    const { email, password } = this.loginForm.value;
    this.authService.getUserByEmail(email as string).subscribe(
      response => {
        if (response.length > 0 && response[0].password === password) {

          const user = {
            name:response[0].fullName,
            email:response[0].email
          }
          sessionStorage.setItem('loggedInUser', JSON.stringify(user));
          this.router.navigate(['home']);
        }
      }
    );
  }
 ngOnInit(): void {
     google.accounts.id.initialize({
      client_id:'66784730459-tqnmstv2p8glm485vaonp46m61hhb73c.apps.googleusercontent.com',
      callback:(response:any) => this.handleLogin(response)
     })
     google.accounts.id.renderButton(document.getElementById('google-btn'),{
      theme:"filled_blue",
      size:"large",
      shape:"circular",
      width:100
     })
 }
}
