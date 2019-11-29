import { Component, OnInit } from '@angular/core';
import {State} from '../../stores/core';
import {RanksService} from '../../stores/actions/ranks.service';
import {List} from 'immutable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @State('ranks')
  public ranks: List<any>;

  constructor(
    private ranksService: RanksService
  ) {}

  listProducer(num: number): any[] {
    return new Array(num).join('.').split('.');
  }

  ngOnInit() {
    this.ranksService.fetchRanks();
  }
}
