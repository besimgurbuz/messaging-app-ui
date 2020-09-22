import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../service/register.service';
import { MyErrorStateMatcher } from '../shared/error-matcher';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  resultMessage = {
    success: null,
    text: null
  };

  constructor(private fb: FormBuilder, private registerService: RegisterService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]]
    });
  }

  async submitRegisterForm() {
    const values = Object.entries(this.registerForm.controls)
      .reduce((acc, contArr) => {
        const [name, control] = contArr;
        acc[name] = control.value;
        return acc;
      }, {});

    this.registerService.register(values).subscribe({
      next: res => {
        this.resultMessage.success = true;
        this.resultMessage.text = 'You registered successfully! You can now log in.';
      },
      error: err => {
        this.resultMessage.success = false;
        this.resultMessage.text = err?.error?.message;
      }
    });
  }

}
