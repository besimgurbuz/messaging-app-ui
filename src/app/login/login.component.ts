import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from '../service/authenticate.service';
import { LoginService } from '../service/login.service';
import { MyErrorStateMatcher } from '../shared/error-matcher';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  resultMessage = {
    success: null,
    text: null
  };

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router, private auth: AuthenticateService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  submitLoginForm(): void {
    const values = Object.entries(this.loginForm.controls)
      .reduce((acc, contArr) => {
        const [name, control] = contArr;
        acc[name] = control.value;
        return acc;
      }, {});

    this.loginService.login(values).subscribe({
      next: res => {
        // logged in
        const { token, user } = res;
        this.auth.saveUser(token, user);
        this.auth.setToken = token;
        this.resultMessage.success = true;
        this.resultMessage.text = 'Successfully signed in.';
        this.router.navigate(['/chat']);
      },
      error: err => {
        this.resultMessage.success = false;
        this.resultMessage.text = err?.error?.message;
      }
    });
  }
}
