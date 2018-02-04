import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  isAdd: Boolean;
  isDetails: Boolean;
  isHome: Boolean;

  message: string;
  
  constructor() { 
    this.isHome = true;
    this.isAdd = false;
    this.isDetails = false;
  }

  ngOnInit() {
    // this.subscription = this.rs.getHome()
    //   .subscribe(item => this.isHome=item);
    // this.route.currentMessage.subscribe(message => this.message = message)
  }

  receiveMessage($event) {
    console.log("receiveMessage Called");
    this.message = $event;
  }

  // homeReceiveMessage($event) {
  //   this.isHome = false;
  //   this.isAdd = $event;
  //   this.isDetails = false;
  // }
}
