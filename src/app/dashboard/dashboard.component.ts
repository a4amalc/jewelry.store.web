import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userDetails:any;
  price:any;
  total:any;
  weight:any;
  discount:any = 2;
  constructor( private authService:AuthService) { }

  ngOnInit() {
    this.userDetails = this.authService.userDetails;
    console.log(this.userDetails)
  }

  calculateTotal(){
    let totalPrice = this.price * this.weight
    let discountAmount = totalPrice * (this.discount/100);
    this.total = totalPrice - discountAmount;
  }
}
