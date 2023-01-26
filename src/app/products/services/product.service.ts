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

  public getProductListPaginate(
    page: number,
    pageSize: number,
    categoryId: number
  ): Observable<GetResponse> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}&page=${page}&size=${pageSize}`;
    return this.http.get<GetResponse>(searchUrl);
  }

  public searchProductsPaginate(
    page: number,
    size: number,
    keyword: string
  ): Observable<GetResponse> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}&page=${page}&size=${size}`;
    return this.http.get<GetResponse>(searchUrl);
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
  page: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}
