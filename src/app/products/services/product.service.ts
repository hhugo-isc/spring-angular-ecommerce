import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl: string = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  public getProductList(categoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    return this.http
      .get<GetResponse>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }

  public searchProducts(keyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;
    return this.http
      .get<GetResponse>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }

  public getProduct(productId: number): Observable<Product> {
    const productUrl: string = `${this.baseUrl}/${productId}`;
    return this.http.get<Product>(productUrl);
  }
}

interface GetResponse {
  _embedded: {
    products: Product[];
  };
}
