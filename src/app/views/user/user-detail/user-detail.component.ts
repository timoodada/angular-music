import { Component, OnInit } from '@angular/core';
import {StoresService} from '../../../stores/stores.service';
import {UserInfoService} from '../../../stores/actions/user-info/user-info.service';
import {ModalService} from '../../../services/modal/modal.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  constructor(
    private userInfo: UserInfoService,
    private modal: ModalService,
    public stores: StoresService
  ) {}

  ngOnInit(): void {
  }

  back = () => {
    history.go(-1);
  }
  logout = () => {
    this.modal.confirm({content: '确定注销账号？'}).then(() => {
      return this.userInfo.logout();
    }).then(() => {
      this.back();
    }).catch(() => {
      // cancel
    });
  }

}
