import { ThisReceiver } from '@angular/compiler';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../cart.service';
import { IProduct } from '../entities/product.entity';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {

  Products$? : Observable<IProduct[]>;
  constructor(private productService : ProductService, private cartService : CartService) { }

  ngOnInit(): void {
     this.Products$ = this.productService.Products$;

  }
  addToCart(p: IProduct): void{
    console.log(p);
    this.cartService.addToCart(p);
  }

}
