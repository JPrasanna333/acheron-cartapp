import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from './entities/product.entity';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  Products : IProduct[]= [
    {
      Id:"1",
      Title:"Bat",
      Price: 200,
      Color:"Red",
      Stock : 50
    },
    {
      Id:"2",
      Title:"Book",
      Price: 1200,
      Color:"Blue",
      Stock : 40
    },
    {
      Id:"3",
      Title:"Ball",
      Price: 560,
      Color:"Red",
      Stock : 250
    },
    {
      Id:"4",
      Title:"Pencil",
      Price: 200,
      Color:"Blue",
      Stock : 45
    },
    {
      Id:"5",
      Title:"Notepad",
      Price: 300,
      Color:"Red",
      Stock : 50
    }
  ]
  Products$ : BehaviorSubject<IProduct[]>;
  constructor() { 
    this.Products$ = new BehaviorSubject<IProduct[]>(this.Products);
  }

  updateProduct(id:string,mode:number): void{
    let pIndex = this.Products.findIndex( p => p.Id == id);
    if(pIndex != -1){
         if(mode == -1){
           this.Products[pIndex].Stock =   this.Products[pIndex].Stock  - 1; 
         }
         else if (mode == 1)
         {
          this.Products[pIndex].Stock =   this.Products[pIndex].Stock  + 1; 
         }
    }
    this.Products$.next(this.Products);
  }
}
