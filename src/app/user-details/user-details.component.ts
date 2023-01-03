import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  message!: string;

  constructor(private router: Router, private data: DataService) { }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.message = message)

  }
  goBack = () => {
    this.router.navigate(["/main-grid-page"]).then(() => {
      window.location.href = window.location.href;
    });
  };

}
