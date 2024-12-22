import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactDetails } from '../../../classfiles/ContactDetails';
import { ContactService } from '../../api/contact.service';

@Component({
  selector: 'contact-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit {
  @Output() edit = new EventEmitter<any>();
  
  constructor() {}

  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  sortedColumn: string = '';
  sortAscending: boolean = true;

  sortDirection = 'asc';
  
  contactList: ContactDetails[] = [];
  private contactService = inject(ContactService); 

  ngOnInit(){
    this.GetContactList();
  }

  GetContactList(){
    this.contactService.GetAllContactDetails().subscribe((response) => {
      this.contactList = response;
      this.searchText = '';
      this.currentPage = 1;
      this.itemsPerPage = 5;
      this.sortedColumn = '';
      this.sortAscending = true;
    });
  }

  editItem(item: any) {
    this.edit.emit(item);
  }

  deleteItem(event: any){
    this.contactService.DeleteContactDetails(event).subscribe((response) => {
      alert(response.message); 
      this.GetContactList();     
    })    
  };

  get filteredContacts() {
    let filtered = this.contactList.filter(contact => {
      return (
        contact.id == Number(this.searchText) ||
        contact.firstName?.toLowerCase().includes(this.searchText.toLowerCase()) ||
        contact.lastName?.toLowerCase().includes(this.searchText.toLowerCase()) ||
        contact.email?.toLowerCase().includes(this.searchText.toLowerCase())
      );
    });

    // Sort the filtered contacts
    if (this.sortedColumn) {
      filtered = filtered.sort((a, b) => {
        const valueA = (a[this.sortedColumn as keyof ContactDetails] as string).toLowerCase();
        const valueB = (b[this.sortedColumn as keyof ContactDetails] as string).toLowerCase();
        
        if (valueA < valueB) {
          return this.sortAscending ? -1 : 1;
        }
        if (valueA > valueB) {
          return this.sortAscending ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }

  sortData(column: string) {
    if (this.sortedColumn === column) {
      this.sortAscending = !this.sortAscending;
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = column;
      this.sortAscending = true;
      this.sortDirection = 'asc';

    }
  }

  // Pagination Logic
  get totalPages() {
    return Math.ceil(this.filteredContacts.length / this.itemsPerPage);
  }

  get pagedContactList() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredContacts.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
  }

}
