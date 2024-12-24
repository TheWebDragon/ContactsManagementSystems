import { Component, ViewChild, AfterViewInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from '../contact-list/contact-list.component';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'master-page',
  standalone: true,
  imports: [ContactListComponent, CommonModule, NgbModalModule],
  templateUrl: './master-page.component.html'
})

export class MasterPageComponent implements AfterViewInit { 

  selectedItem: any = null;  
  isListActive: boolean = true;
  @ViewChild(ContactListComponent) ContactList!: ContactListComponent;

  constructor(private modalService: NgbModal){}
  
  ngAfterViewInit(): void {
    if (this.ContactList) {
      console.log(this.ContactList);
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.ContactList) {
      this.getList();
    }
  }

  getList(event?: any){
    if (this.ContactList){
      this.ContactList.GetContactList();
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

   openDetails(item?: any): void{
     const modalRef = this.modalService.open(ContactDetailsComponent);
     modalRef.componentInstance.item = item
     modalRef.result.then((result) => {
          if (result.success == true) {
            this.getList();
          }
        }).catch((error) => {          
          console.log('Modal dismissed:', error);
        });
   }

}
