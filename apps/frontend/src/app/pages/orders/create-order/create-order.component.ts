import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateOrderDto } from 'libs/api/src/dtos/order';
import { ProductDto } from 'libs/api/src/dtos/product/product.dto';
import { ProductMocks } from 'libs/api/src/dtos/product/mocks/product.mock';
import { OrdersService } from '../../../services/orders/orders.service';


@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.scss',
})
export class CreateOrderComponent {

  orderForm: FormGroup;

  products: ProductDto[] = ProductMocks;
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

  constructor(private orderService: OrdersService, private builder:FormBuilder) {
    this.orderForm = builder.group({
      product:['',[Validators.required]],
      amount: [0,[Validators.required]],
      calendarWeek: ['',[Validators.required]]
    })
  }
  createHardware(){
    this.orderService.createOrder(this.orderForm.getRawValue() as CreateOrderDto)
  }


}
