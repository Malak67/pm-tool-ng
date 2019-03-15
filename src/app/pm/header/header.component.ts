import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  admin: boolean;
  user: string;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.admin = (localStorage.getItem('isAdmin') === 'true');
    this.user = localStorage.getItem('userID');
  }

  logout() {
    this.authService.logout();
  }
}
