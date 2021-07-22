import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.scss'],
})
export class OrderdetailsComponent implements OnInit {
  responce: any;
  customerinfo: any;
  orderdetails: any;
  restaurentdetails: any;
  constructor(public service: AuthService) {}

  ngOnInit(): void {
    this.getDetails();
  }

  getDetails() {
    this.service.getOrderDetails().subscribe((res) => {
      this.responce = res;
      this.customerinfo = this.responce['data']['customerStatus'];
      this.orderdetails = this.responce['data']['orderDetails'];
      this.restaurentdetails = this.responce['data']['restaurantStatus'];
    });
  }
}
