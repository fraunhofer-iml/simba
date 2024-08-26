export class Order {
    
  constructor(
    orderId: string,
    date: Date,
    status: string,
    price: number,
    products: string,
    robots: string[],
    customerID: string
  ) {
    this.orderId = orderId;
    this.date = date;
    this.status = status;
    this.price = price;
    this.products = products;
    this.robots = robots;
    this.customerID = customerID;
  }

  orderId: string;
  date: Date;
  status: string;
  price: number;
  products: string;
  robots: string[];
  customerID: string;
}
