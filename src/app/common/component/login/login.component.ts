import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { UserToken } from '../../model/user-token';
import { ResponseObject } from '../../model/response-object';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[ i ].markAsDirty();
      this.loginForm.controls[ i ].updateValueAndValidity();
    }
    console.log(this.loginForm.get('userName')?.value);

    this.loginService
      .doLogin(this.loginForm.get('userName')?.value, this.loginForm.get('password')?.value)

      .subscribe((model: UserToken) => {
        console.log(model);
        sessionStorage.setItem('token', model.token);
        sessionStorage.setItem('imageUrl', model.imageUrl);
        sessionStorage.setItem('menuGroupList', JSON.stringify(model.menuGroupList));
        sessionStorage.setItem('authorityList', JSON.stringify(model.authorities));

        this.router.navigate(['/home']);
      });

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      remember: [ true ]
    });

    const token = this.route.snapshot.params['id'];

    console.log(token);

    if (token == null) {
      console.log('1');
    } else {
      sessionStorage.setItem('token', token);

      this.loginService.getAuthToken()
          .subscribe(
            (model: UserToken) => {
              console.log(model);
              sessionStorage.setItem('token', model.token);
              sessionStorage.setItem('imageUrl', model.imageUrl);
              sessionStorage.setItem('menuGroupList', JSON.stringify(model.menuGroupList));
              sessionStorage.setItem('authorityList', JSON.stringify(model.authorities));

              this.router.navigate(['/home']);
            },
            (err) => {
              console.log(err);
            },
            () => { }
          );
    }
  }

  socialLogin(): void {
    // tslint:disable-next-line:forin
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[ i ].markAsDirty();
      this.loginForm.controls[ i ].updateValueAndValidity();
    }
    console.log(this.loginForm.get('userName')?.value);


    window.location.href = 'http://localhost:8090/oauth2/authorization/google';

    /*
    window.location.href =
      'http://localhost:8090/oauth2/authorization/google?response_type=code&' +
      'scope=profile%20email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar&'+
      'client_id=' + '497322312042-mstkseqfmr5t8r7nch5bp17r9lh5eoen.apps.googleusercontent.com'+
      '&redirect_uri='+ 'http%3A%2F%2Flocalhost%3A8090%2Flogin%2Foauth2%2Fcode%2Fgoogle';
    */
    /*
    this.loginService
      .getSocialLogin()
      .subscribe(
        (model: any) => {
          this.router.navigate(['/home']);
        },
        (err) => {
          console.log(err);
        },
        () => {
          console.log('완료');
          this.router.navigate(['/home']);
        }
      );
    */
  }

  socialLogin2(): void {
    this.loginService.getAuthToken()
          .subscribe(
            (model: UserToken) => {
              console.log(model);

              sessionStorage.setItem('token', model.token);
              sessionStorage.setItem('imageUrl', model.imageUrl);
              sessionStorage.setItem('menuGroupList', JSON.stringify(model.menuGroupList));
              sessionStorage.setItem('authorityList', JSON.stringify(model.authorities));


              this.router.navigate(['/home']);
            },
            (err) => {
              console.log(err);
            },
            () => { }
          );
  }

  test() {
    window.open('/home','_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,status=no,top=500,left=500,width=400,height=400');
  }
}
