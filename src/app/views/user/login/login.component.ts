import { Component, OnInit } from '@angular/core';
import {ModalService} from '../../../services/modal/modal.service';
import {HttpService} from '../../../services/http/http.service';
import {UserInfoService} from '../../../stores/actions/user-info/user-info.service';
import {ActivatedRoute, Router} from '@angular/router';

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
  public next = '';

  constructor(
    private modal: ModalService,
    private userInfo: UserInfoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(query => {
      this.next = query.next;
    });
  }

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
  ngOnInit(): void {}

}
