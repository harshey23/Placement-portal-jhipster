import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-general-eligibal-list',
  templateUrl: './general-eligibal-list.component.html',
  styleUrls: ['./general-eligibal-list.component.scss']
})
export class GeneralEligibalListComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }
}
