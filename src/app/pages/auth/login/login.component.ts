import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ILogin } from '../interfaces/ilogin';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @ViewChild('f', { static: true }) form!: NgForm;

  formData: ILogin = {
    email: '',
    password: '',
  };

  staticAlertClosed = false;
  successMessage = 'Messaggio AUTO?!?!';

  constructor(private authSrv: AuthService, private router: Router) {}

  submit(f: NgForm) {
    this.formData = f.form.value;
    this.staticAlertClosed = true;
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 3000),
      console.log('this Form', this.formData, typeof this.formData);
    this.authSrv.login(this.formData).subscribe((res) => {
      console.log('loggato');
    });
  }

  logOut() {
    this.authSrv.logout();
    console.log('Ok log out');
  }
}
