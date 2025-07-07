import { Component, OnInit } from '@angular/core';
import { Api } from '../../services/api';

@Component({
  selector: 'app-list-items',
  imports: [],
  templateUrl: './list-items.html',
  styleUrl: './list-items.css'
})
export class ListItems implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'actions'];
  items: any[] = [];

  constructor(private apiService: Api) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.apiService.getItems().subscribe(
      (data) => {
        this.items = data;
      },
      (error) => {
        console.error('Failed to fetch items:', error);
      }
    );
  }

  // deleteItem(id: string): void {
  //   if (confirm('Are you sure you want to delete this item?')) {
  //     this.apiService.deleteItem(id).subscribe(() => {
  //       this.loadItems(); // Refresh the list after deletion
  //     });
  //   }
  // }
}