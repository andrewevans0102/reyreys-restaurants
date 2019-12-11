import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  createAccount() {
    this.router.navigateByUrl('/create-account');
  }

  login() {
    this.router.navigateByUrl('/login');
  }

  content() {
    this.router.navigateByUrl('/content');
  }

  guide() {
    window.open(environment.guide, '_blank');
  }

  project() {
    window.open(environment.project, '_blank');
  }
}
