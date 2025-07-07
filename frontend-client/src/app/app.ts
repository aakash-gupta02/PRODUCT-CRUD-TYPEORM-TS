import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
})



export class App  implements OnInit {
  products: any[] = [];
  productForm: FormGroup;
  isEditing = false;
  currentSku?: number;
  selectedImages: File[] = [];

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: [''],
      price: [0],
      description: [''],
    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  // Fetch all products
  loadProducts() {
    this.http.get('http://localhost:3000/product/get').subscribe({
      next: (data: any) => this.products = data,
      error: (err) => console.error('Failed to load products:', err)
    });
  }

  // Handle image selection
  onImageSelect(event: any) {
    this.selectedImages = Array.from(event.target.files);
  }

  // Create or Update product
  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.productForm.value.name);
    formData.append('price', this.productForm.value.price);
    formData.append('description', this.productForm.value.description);
    
    // Append all selected images
    this.selectedImages.forEach((img) => {
      formData.append('image', img);
    });

    if (this.isEditing && this.currentSku) {
      this.http.put(`http://localhost:3000/product/update/${this.currentSku}`, formData)
        .subscribe({
          next: () => this.resetForm(),
          error: (err) => console.error('Update failed:', err)
        });
    } else {
      this.http.post('http://localhost:3000/product/add', formData)
        .subscribe({
          next: () => this.resetForm(),
          error: (err) => console.error('Add failed:', err)
        });
    }
  }

  // Edit product
  editProduct(sku: number) {
    this.http.get(`http://localhost:3000/product/getproduct/${sku}`).subscribe({
      next: (product: any) => {
        this.productForm.patchValue(product);
        this.isEditing = true;
        this.currentSku = sku;
      },
      error: (err) => console.error('Failed to load product:', err)
    });
  }

  // Delete product
  deleteProduct(sku: number) {
    if (confirm('Delete this product?')) {
      this.http.delete(`http://localhost:3000/product/delete/${sku}`).subscribe({
        next: () => this.loadProducts(),
        error: (err) => console.error('Delete failed:', err)
      });
    }
  }

  // Reset form
  resetForm() {
    this.productForm.reset();
    this.selectedImages = [];
    this.isEditing = false;
    this.currentSku = undefined;
    this.loadProducts();
  }
}