import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {UserService} from '../../shared/services/user.service';
import {User} from '../../shared/models/user.model';
import {Message} from '../../shared/models/message.model';
import {AuthService} from '../../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'hm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    private meta: Meta
  ) {
    title.setTitle('Вход в систему');
    meta.addTags([
      {name: 'keywords', content: 'логин,вход,система'},
      {name: 'description', content: 'Страница для входа в систему'}
    ]);
  }

  ngOnInit() {
    this.message = new Message('danger', '');

    this.route.queryParams
      .subscribe((params: Params) => {
        if (params['nowCanLogin']) {
          this.ShowMessage({
            type: 'success',
            text: 'Now you can login!'
          });
        } else if (params ['accessDenied']) {
          this.ShowMessage({
            type: 'warning',
            text: 'You need to be logged in!'
          });
        }
      });

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  private ShowMessage (message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {
    const formData = this.form.value;

    this.userService.getUserByEmail(formData.email)
      .subscribe((user: User) => {
        if (user) {
          if (user.password === formData.password) {
            this.message.text = '';
            window.localStorage.setItem('user', JSON.stringify(user));
            this.authService.login();
            this.router.navigate(['/system', 'bill']);
          }else {
            this.ShowMessage({
              type: 'danger',
              text: 'Wrong password'}
              );
          }
        }else {
          this.ShowMessage(
            {
              type: 'danger',
              text: 'We can\'t find user with this email'
            });
        }
      } );
  }

}
