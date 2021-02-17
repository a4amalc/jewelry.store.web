import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userDetails:any;
  price:number = 0;
  total:number = 0;
  weight:any = 0;
  discount:any;
  constructor( private authService:AuthService,
    ) { }

  ngOnInit() {
    this.userDetails = this.authService.userDetails;
    console.log(this.userDetails)
    this.authService.getAppSettings().subscribe((data:any)=>{
      if(data.length>0){
        this.discount = parseInt(data.find(x=>x.settingKey == 'DISCOUNT').value);
      }
    })
  }

  calculateTotal(){
    let totalPrice = this.price * this.weight
    let discountAmount = totalPrice * (this.discount/100);
    this.total = totalPrice - discountAmount;
  }

  printToScreen(){
    document.getElementById('id01').style.display = 'block'
  }
  
}
