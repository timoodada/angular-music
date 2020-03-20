import { Component, OnInit } from '@angular/core';
import {ModalService} from '../../../services/modal/modal.service';
import {HttpService} from '../../../services/http/http.service';
import {UserInfoService} from '../../../stores/actions/user-info/user-info.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formData = {
    username: '',
    password: ''
  };
  public loading = false;

  constructor(
    private modal: ModalService,
    private userInfo: UserInfoService
  ) {}

  back = () => {
    history.go(-1);
  }
  submit = () => {
    if (this.loading) { return; }
    if (!this.formData.username) {
      this.modal.toast('请输入QQ号');
      return;
    }
    if (!this.formData.password) {
      this.modal.toast('请输入QQ密码');
      return;
    }
    this.loading = true;
    this.userInfo.login(this.formData).subscribe(() => {
      this.loading = false;
      this.back();
    }, err => {
      this.loading = false;
      this.modal.toast(err.message);
    })
  }
  ngOnInit(): void {}

}
