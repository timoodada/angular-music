import { Component, OnInit } from '@angular/core';
import logo from './qq_music.png';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public logo = logo;
  constructor() { }

  ngOnInit() {
  }

}
