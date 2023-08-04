import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IRegister } from '../interfaces/iregister';
import { IResponse } from '../interfaces/iresponse';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form!: FormGroup;
  thisUser!: IRegister;
  responseUser!: IResponse;
  isId: boolean = false;
  isLoading: boolean = false;
  staticAlertClosed = true;
  createdMessage = true;

  constructor(
    private fb: FormBuilder,
    private authSrv: AuthService,
    private router: Router,
    private _Activatedroute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      // authData: this.fb.group({
      email: this.fb.control(null, [Validators.required]),
      password: this.fb.control(null, [Validators.required]),
      // }),
      uName: this.fb.control(null),
      surname: this.fb.control(null),
      passwordConf: this.fb.control(null, [Validators.required]),
      id: this.fb.control(null),
    });
  }

  sendUser() {
    if (this.form.status === 'VALID') {
      console.log('VALID', this.form);
      this.form.disable();
      this.thisUser = this.form.value;
      this.authSrv.signUp(this.thisUser).subscribe((res) => {
        // console.log('registrato');
        this.createdMessage = false;
        localStorage.setItem('accessData', JSON.stringify(res));
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 3000);
      });
      this.form.reset();
      // console.log('userthisUser: ', this.thisUser);
    } else {
      console.log('NON VALID');
      // return
    }
  }

  editUser() {
    this.form.disable();
    this.responseUser = this.form.value;
    console.log('this user NEW', this.responseUser);
    this.isLoading = true;
    this.authSrv.updateUser(this.responseUser).subscribe((res) => {
      console.log('Utente aggiornato', res);
      this.staticAlertClosed = false;
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 3000);
    });
  }

  isValid(fieldName: string) {
    return this.form.get(fieldName)?.valid;
  }
  isTouched(fieldName: string) {
    return this.form.get(fieldName)?.touched; //true se il campo cercato ha subito interazioni dall'utente
  }

  getMessage(form: FormGroup) {
    return this.form.errors!['message']; //restituisce il messaggio di errore dei custom validators
  }

  isPassword(fieldName: string, otherName: string) {
    // console.log(
    //   'fieldName === otherName',
    //   this.form.get(fieldName)?.value === this.form.get(otherName)?.value,
    //   this.form.get(fieldName)?.value,
    //   this.form.get(otherName)?.value
    // );

    return this.form.get(fieldName)?.value === this.form.get(otherName)?.value;
  }
  passwordConfirm = (formC: FormControl): ValidationErrors | null => {
    if (formC.value.passwordConf !== formC.value.authData.password) {
      return {
        invalid: true,
        message: 'Le password sono differenti',
      };
    }
    return null;
  };
}
