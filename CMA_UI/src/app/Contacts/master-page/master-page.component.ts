import { AfterViewInit, Component, ViewChild, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from '../contact-list/contact-list.component';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';

@Component({
  selector: 'master-page',
  standalone: true,
  imports: [ContactListComponent, ContactDetailsComponent, CommonModule],
  templateUrl: './master-page.component.html',
  styleUrl: './master-page.component.css'
})

export class MasterPageComponent implements AfterViewInit { 

  selectedItem: any = null;  
  isListActive: boolean = true;
  @ViewChild(ContactListComponent) ListChild: ContactListComponent | undefined;

  ngAfterViewInit(): void {    
  }

  getList(event: any){
    if (this.ListChild){
      this.ListChild.GetContactList();
    }    
  }

  onEdit(item: any) {
    this.isListActive = false;
    this.selectedItem = item;
  }

  onCancel() {
    this.selectedItem = null;
    this.isListActive = true;
  }
}
