import { Component, OnInit } from '@angular/core';
import {AuthService} from '../api/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.authService.authorize()
      .subscribe(data => {
        this.router.navigate(['/']);
      });
  }

}
