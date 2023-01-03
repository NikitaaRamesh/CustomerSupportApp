import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-common-functionality',
  templateUrl: './common-functionality.component.html',
  styleUrls: ['./common-functionality.component.scss']
})
export class CommonFunctionalityComponent implements OnInit {

  constructor(public router2: Router) { }

  ngOnInit(): void {
  }

  reloadComponent(self: boolean, urlToNavigateTo?: string) {
    //skipLocationChange:true means dont update the url to / when navigating
    console.log("Current route I am on:", this.router2.url);
    const url = self ? this.router2.url : urlToNavigateTo;
    this.router2.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router2.navigate([`/${url}`]).then(() => {
        console.log(`After navigation I am on:${this.router2.url}`)
      })
    })
    //this.router2.navigate([`/${url}`]).then(() => {
      //console.log(`After navigation I am on:${this.router2.url}`)
    //})
  }

}
