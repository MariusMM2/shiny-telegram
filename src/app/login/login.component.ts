import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {User} from '../entities/user';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // used for validation of the values from the login form
  loginForm: FormGroup;
  loggedTries: 0;

  // form builder is used to create instances of the form group
  // router is used for navigation after the form is successfully submitted
  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private router: Router, private userApi: UserService, private authService: AuthService ) {
  }

  ngOnInit() {
    // login form validators
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      // tslint:disable-next-line:max-line-length
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*-])/)]],
    });
  }

  clearErrorMessage() {
    document.getElementById('emailErrMsg').innerHTML = '';
    document.getElementById('passwordErrMsg').innerHTML = '';
  }

  onSubmit() {
    console.log(this.loginForm);
    const user = this.loginForm.value as User;
    console.log('user: ', user);
    if (this.loginForm.valid) {
      this.userApi.loginUser(user).subscribe(async backendRes => { // arrow function
        console.log('backend response:', backendRes);
        console.log('backendRes.user.id', backendRes.user.id);
        // localStorage.setItem('currentUserId', JSON.stringify({ id: backendRes.user.id}));
        localStorage.setItem('currentUserId', backendRes.user.id);

        if (backendRes.status === 200) {
          this.authService.isLoggedIn = true;
          this.authService.login();
          window.localStorage.setItem('token', backendRes.token);
          // document.cookie = `token=${backendRes.token}`;
          this.router.navigate(['../dashboard/contract-list'])
            .then(() => {

              console.log('Successfully logged in!');
            })
            .catch(e => {
              console.log('An error occurred: ', e);
            });
        } else if (backendRes.status === 401) {

          // document.getElementById('emailErrMsg').innerHTML = backendRes.message + '<br><br>';
          alert(backendRes.message);

        } else if (backendRes.status === 400) {

          // document.getElementById('passwordErrMsg').innerHTML = backendRes.message + '<br><br>';
          alert(backendRes.message);

          // loggedTries: 1
          this.loggedTries = backendRes.loggedTries;

          console.log('this.loggedTries', this.loggedTries);
          console.log('backendRes', backendRes);


        } else if (backendRes.status === 402) {

          alert(backendRes.message);

        } else if (backendRes.status === 403) {

          alert(backendRes.message);

        } else if (backendRes.status === 404) {

          alert(backendRes.message);

          setTimeout(() => {
            (document.getElementById('loginButton') as HTMLInputElement).disabled = false;
            }, 300000);
          (document.getElementById('loginButton') as HTMLInputElement).disabled = true;

          document.getElementById('loginFailedMsg').style.display = 'block';

          // tslint:disable-next-line:no-shadowed-variable
          function startTimer(duration, display) {
            let start = Date.now();
            let diff;
            let minutes;
            let seconds;
            function timer() {
              // get the number of seconds that have elapsed since
              // startTimer() was called
              // tslint:disable-next-line:no-bitwise
              diff = duration - (((Date.now() - start) / 1000) | 0);

              // does the same job as parseInt truncates the float
              // tslint:disable-next-line:no-bitwise
              minutes = (diff / 60) | 0;
              // tslint:disable-next-line:no-bitwise
              seconds = (diff % 60) | 0;

              minutes = minutes < 10 ? '0' + minutes : minutes;
              seconds = seconds < 10 ? '0' + seconds : seconds;

              display.textContent = minutes + ':' + seconds;

              if (diff <= 0) {
                // add one second so that the count down starts at the full duration
                // example 05:00 not 04:59
                start = Date.now() + 1000;
              }
            }
            // we don't want to wait a full second before the timer starts
            timer();
            setInterval(timer, 1000);
          }

          const fiveMinutes = 60 * 5;
          const display = document.querySelector('#time');
          startTimer(fiveMinutes, display);

          setTimeout(() => {
            document.getElementById('loginFailedMsg').style.display = 'none';
          }, 300000);


        }

      }, error => {
        console.log('Error: ', error);
      });
    } else {
      console.log('Invalid form!');
    }
  }

}
