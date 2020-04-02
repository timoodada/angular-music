import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input()
  public type: 'button' | 'submit' | 'reset' = 'button';
  @Input()
  public loading = false;
  @Input()
  public disabled = false;

  constructor() { }

  ngOnInit(): void {
  }

}
