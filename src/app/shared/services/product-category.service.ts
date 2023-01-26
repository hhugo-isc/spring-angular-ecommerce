import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  private baseUrl = 'http://localhost:8080/api/product-category';

  constructor(public http: HttpClient) {}

  getProductCategories(): Observable<ProductCategory[]> {
    return this.http
      .get<GetResponseProductCategories>(this.baseUrl)
      .pipe(map((categories) => categories._embedded.productCategory));
  }
}

interface GetResponseProductCategories {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
