import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  constructor(private authSrv: AuthService, private router: Router) {}
  public isCollapsed = false;
  logged: any;

  ngOnInit() {
    this.authSrv.isLoggedIn$.subscribe((log: boolean) => {
      this.logged = log;
    });
  }

  isLogged() {
    this.authSrv.isLoggedIn$.subscribe({
      next(loggeddd) {
        console.log('loggedddNav', loggeddd);
        return loggeddd;
      },
    });
  }

  logOut() {
    this.authSrv.logout();
    console.log('Ok log out');
  }
  editUser() {
    const route = this.authSrv.user$.subscribe((res) => {
      this.router.navigate([`/signup/${res?.user.id}`]);
    });
  }
}
