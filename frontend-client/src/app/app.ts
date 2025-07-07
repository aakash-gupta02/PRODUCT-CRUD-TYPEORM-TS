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
export class App implements OnInit {
  products: any[] = [];
  productForm: FormGroup;
  isEditing = false;
  currentSku?: number;
  selectedImages: File[] = [];
  existingImages: string[] = []; // For handling already uploaded images
  showFormModal = false;
  showDeleteModal = false;
  isLoading = false;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: [''],
      price: [0],
      description: [''],
      // existingImages: [] = [],

    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  // Load all products
  loadProducts() {
    this.isLoading = true;
    this.http.get('http://localhost:3000/product/get').subscribe({
      next: (data: any) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load products:', err);
        this.isLoading = false;
      }
    });
  }

  // Select new images
onImageSelect(event: any) {
  const files = Array.from(event.target.files) as File[];
  const total = this.selectedImages.length + this.existingImages.length + files.length;

  if (total > 5) {
    alert('Maximum 5 images allowed.');
    return;
  }

  this.selectedImages = [...this.selectedImages, ...files];
}


  // Get preview of uploaded File
  getImagePreview(file: File): string {
    return URL.createObjectURL(file);
  }

  // Remove newly selected image
  removeImage(file: File) {
    this.selectedImages = this.selectedImages.filter((img) => img !== file);
  }

  // Remove existing image
  removeExistingImage(url: string) {
    this.existingImages = this.existingImages.filter((img) => img !== url);
  }

  // Open add modal
  openAddModal() {
    this.isEditing = false;
    this.productForm.reset();
    this.selectedImages = [];
    this.existingImages = [];
    this.showFormModal = true;
  }

  // Open edit modal
  openEditModal(sku: number) {
    this.isLoading = true;
    this.http.get(`http://localhost:3000/product/getproduct/${sku}`).subscribe({
      next: (product: any) => {
        this.productForm.patchValue(product);
        this.existingImages = product.images || [];
        this.selectedImages = [];
        this.isEditing = true;
        this.currentSku = sku;
        this.showFormModal = true;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load product:', err);
        this.isLoading = false;
      }
    });
  }

  // Open delete modal
  openDeleteModal(sku: number) {
    this.currentSku = sku;
    this.showDeleteModal = true;
  }

  // Close form and delete modal
  closeModal() {
    this.showFormModal = false;
    this.showDeleteModal = false;
  }

  // Calculate current image count
  totalImageCount(): number {
    return this.selectedImages.length + this.existingImages.length;
  }

  // Create or Update product
  onSubmit() {
    if (this.productForm.invalid || this.totalImageCount() > 5) return;

    this.isLoading = true;
    const formData = new FormData();
    formData.append('name', this.productForm.value.name);
    formData.append('price', this.productForm.value.price);
    formData.append('description', this.productForm.value.description);

    // Append existing image URLs
    formData.append('existingImages', JSON.stringify(this.existingImages));

    // Append new selected files
    this.selectedImages.forEach((img) => {
      formData.append('image', img);
    });

    const request$ = this.isEditing && this.currentSku
      ? this.http.put(`http://localhost:3000/product/update/${this.currentSku}`, formData)
      : this.http.post('http://localhost:3000/product/add', formData);

    request$.subscribe({
      next: () => this.resetForm(),
      error: (err) => {
        console.error(this.isEditing ? 'Update failed:' : 'Add failed:', err);
        this.isLoading = false;
      }
    });
  }

  // Confirm and delete product
  deleteProduct(sku: number) {
    this.isLoading = true;
    this.http.delete(`http://localhost:3000/product/delete/${sku}`).subscribe({
      next: () => {
        this.loadProducts();
        this.closeModal();
      },
      error: (err) => {
        console.error('Delete failed:', err);
        this.isLoading = false;
      }
    });
  }

  // Reset form and state
  resetForm() {
    this.productForm.reset();
    this.selectedImages = [];
    this.existingImages = [];
    this.isEditing = false;
    this.currentSku = undefined;
    this.showFormModal = false;
    this.isLoading = false;
    this.loadProducts();
  }
}
