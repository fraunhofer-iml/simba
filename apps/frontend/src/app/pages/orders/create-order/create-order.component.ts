import { Component } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.scss',
})
export class CreateOrderComponent {

  products: string[] = ['Quadrokopter'];
  months: string[] = ["January", "February", 'March',
    'April', 'May', 'June', 'July', 'August', 'September',
     'October', 'November', 'December'
    ]
  offers: any[] = [
    {
      id: '12345',
      name: 'Quadrocopter',
      amount: 2,
      price: 100,
      month: "January",
    },
    {
      id: '12345',
      name: 'Quadrocopter',
      amount: 2,
      price: 100,
      month: "January",
    },
    {
      id: '12345',
      name: 'Quadrocopter',
      amount: 2,
      price: 100,
      month: "January",
    },
    {
      id: '12345',
      name: 'Quadrocopter',
      amount: 2,
      price: 100,
      month: "January",
    },
  ];

  constructor() {}
}
