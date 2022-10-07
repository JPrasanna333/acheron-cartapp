import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICart } from './entities/cart.entity';
import { IProduct } from './entities/product.entity';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  Carts : ICart[] = []; 
  Carts$ : BehaviorSubject<ICart[]>; 
  constructor(private productService : ProductService) {
    this.Carts$ = new BehaviorSubject<ICart[]>(this.Carts);
   }

   addToCart(p:IProduct): void{
    
      let cIndex = this.Carts.findIndex(c => c.Id == p.Id);
      if(cIndex == -1){
        let cartObj : ICart = {
          Id : p.Id,
          Title : p.Title,
          Quantity : 1, 
          Price : p.Price
        } 
        this.Carts.push(cartObj);
      }
      else {
        this.Carts[cIndex].Quantity = this.Carts[cIndex].Quantity + 1; 
        this.Carts[cIndex].Price =  this.Carts[cIndex].Quantity * p.Price;
      }
  
      this.productService.updateProduct(p.Id,-1);
      this.Carts$.next(this.Carts);
   }

   removeFromCart(ca:ICart):void{
    let cIndex = this.Carts.findIndex(c => c.Id == ca.Id);
    
    if(cIndex != -1){
      let unitprice = this.Carts[cIndex].Price / this.Carts[cIndex].Quantity;
       this.Carts[cIndex].Quantity = this.Carts[cIndex].Quantity - 1; 
       this.Carts[cIndex].Price = this.Carts[cIndex].Quantity * unitprice;
       if(this.Carts[cIndex].Quantity == 0){
          this.Carts.splice(cIndex,1);
         }
       this.productService.updateProduct(ca.Id,1);
       this.Carts$.next(this.Carts);
    }

   }
}
