import { CommonModule, NgForOf } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/service/auth.service';
import { CapitalfirstandsecondPipe } from '../../../shared/pipe/capitalfirstandsecond.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgForOf, CommonModule,CapitalfirstandsecondPipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  auth = inject(AuthService)
  @Input() userImg: string = '';
  navList = ['Home', 'Movies', 'TV Shows', 'New & Popular', 'My List'];
  isModalOpen: boolean = false;
  name = JSON.parse(sessionStorage.getItem('loggedInUser')!).name;
  email = JSON.parse(sessionStorage.getItem('loggedInUser')!).email;
  profileImg = JSON.parse(sessionStorage.getItem('loggedInUser')!).picture;

  ngOnInit() {
    if (!this.userImg) {
      console.error('userImg is required but not provided.');
    }
  }

  signOut(){
    this.auth.signOut()
    sessionStorage.removeItem("loggedInUser")
  }
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}