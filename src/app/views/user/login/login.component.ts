import { Component, OnInit } from '@angular/core';
import {ModalService} from '../../../services/modal/modal.service';
import {HttpService} from '../../../services/http/http.service';
import {UserInfoService} from '../../../stores/actions/user-info/user-info.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {of, timer} from 'rxjs';
import {map} from 'rxjs/operators';
import {FormValidatorService} from '../../../services/form-validator/form-validator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loading = false;
  public next = '';
  public loginForm: FormGroup;

  constructor(
    private modal: ModalService,
    private userInfo: UserInfoService,
    private route: ActivatedRoute,
    private router: Router,
    private formValidator: FormValidatorService
  ) {
    this.route.queryParams.subscribe(query => {
      this.next = query.next;
    });
  }

  back = () => {
    history.go(-1);
  }
  submit = () => {
    this.formValidator.validate(this.loginForm).then(control => {
      console.log(control);
      if (control.valid) {
        this.login(control.value);
      } else {
        if (control.controls.username.errors) {
          if (control.controls.username.errors.required) {
            this.modal.toast('请输入QQ号');
          } else if (control.controls.username.errors.notPass) {
            this.modal.toast('QQ号格式不正确');
          }
        } else if (control.controls.password.errors) {
          if (control.controls.password.errors.required) {
            this.modal.toast('请输入QQ密码');
          }
        }
      }
    });
  }
  login = (formData) => {
    this.loading = true;
    this.userInfo.login(formData).subscribe(() => {
      this.loading = false;
      if (this.next) {
        this.router.navigate([this.next], { replaceUrl: true } );
      } else {
        this.back();
      }
    }, err => {
      this.loading = false;
      this.modal.toast(err.message);
    })
  }
  usernameAsyncValidate = () => {
    return (control: FormControl) => {
      return /^[1-9]\d{0,14}$/.test(control.value) ? timer(1000).pipe(
        map(() => null)
      ) : of({ notPass: true });
    };
  }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', {
        updateOn: 'blur', validators: [Validators.required], asyncValidators: [this.usernameAsyncValidate()]
      }),
      password: new FormControl('', [Validators.required])
    });
  }

}
