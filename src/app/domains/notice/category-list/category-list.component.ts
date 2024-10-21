import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { CategoryCreateComponent } from '../category-create/category-create.component';
import { CategoryService } from '../../../service/category.service';
import { Category } from '../../../models/category';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterLinkWithHref,CommonModule,ModalComponent,CategoryCreateComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit{
  private categoryService=inject(CategoryService);
  categories=signal<Category[]>([]);

  isModalOpen=false;
  category!:Category;

  constructor(private toastr: ToastrService) {}

  ngOnInit(){
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getAll().subscribe({
      next:(data)=>{
        this.categories.set(data.data);
        console.log(data.data);
      },
      error:()=>{},
    });
  }

  loadCategory(category: Category) {
    this.category = category;
    this.openModal();
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe({
      next: (response) => {
        this.toastr.success('Registro eliminado');
        this.getCategories();
      },
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.getCategories();
  }

}
