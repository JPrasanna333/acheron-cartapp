import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { ICart } from '../entities/cart.entity';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {

  Carts? : ICart[] = [];
  isItem = false; 
  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.cartService.Carts$.subscribe(data =>{
      this.Carts = data; 
       if(this.Carts.length == 0){
          this.isItem = false; 
       }
       else {
        this.isItem = true; 
       }
    })
  }

  removeFromCart(c:ICart):void{
    this.cartService.removeFromCart(c);
  }

}
