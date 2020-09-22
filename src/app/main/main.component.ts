import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../service/authenticate.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private router: Router, private auth: AuthenticateService) { }

  ngOnInit(): void {
    if (this.auth.isAuthenticated || this.auth.isTokenInMemory) {
      this.router.navigate(['/chat']);
    }
  }

}
