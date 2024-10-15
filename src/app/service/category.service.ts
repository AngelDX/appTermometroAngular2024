import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url='http://127.0.0.1:8000/api/categories';
  constructor(private http:HttpClient) { }

  getAll(){
    //return this.http.get<Category[]>(this.url);
    return this.http.get<ApiResponse<Category[]>>(this.url);
  }

  getAllCategories(){
    return this.http.get<ApiResponse<Category[]>>(this.url);
  }

  getCategory(id: number): Observable<ApiResponse<Category>> {
    return this.http.get<ApiResponse<Category>>(this.url+'/'+id);
  }

  createCategory(category: Category): Observable<any> {
    return this.http.post(this.url,category);
  }

  updateCategory(id: number, category: Category): Observable<any> {
    return this.http.put(this.url+'/'+id, category);
  }

  deleteCategory(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(this.url+'/'+id);
  }
}
