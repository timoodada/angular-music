import { Component, OnInit } from '@angular/core';
import {StoresService} from '../../stores/stores.service';

@Component({
  selector: 'app-singers',
  templateUrl: './singers.component.html',
  styleUrls: ['./singers.component.scss'],
  providers: [StoresService]
})
export class SingersComponent implements OnInit {

  constructor(
    public storesService: StoresService
  ) { }

  ngOnInit() {}

}
