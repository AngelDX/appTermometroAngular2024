import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../service/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-create',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.css'
})
export class CategoryCreateComponent {
  @Input() data: Category | null=null;
  @Output() onCloseModal=new EventEmitter();
  dataForm!: FormGroup;

  constructor(private fb:FormBuilder,private categoryService:CategoryService,private toastr:ToastrService){
    this.dataForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      //slug: new FormControl('', [Validators.required]),
    });
  }

  ngOnChanges(): void {
    if (this.data) {
      this.dataForm.patchValue({
        name: this.data.name,
        //slug: this.data.slug,
      });
    }
  }

  onSubmit() {
    if (this.dataForm.valid) {
      if (this.data) {
        this.categoryService.updateCategory(this.data.id, this.dataForm.value)
          .subscribe({
            next: (response: any) => {
              this.resetdataForm();
              this.toastr.success("Registro actualizado!");
            },
          });

      } else {
        this.categoryService.createCategory(this.dataForm.value).subscribe({
          next: (response: any) => {
            this.resetdataForm();
            this.toastr.success('Registro creado!');
          },
        });
      }
    } else {
      this.dataForm.markAllAsTouched();
    }
  }

  onClose() {
    this.onCloseModal.emit(false);
  }

  resetdataForm() {
    this.dataForm.reset();
    this.onClose();
  }

}
