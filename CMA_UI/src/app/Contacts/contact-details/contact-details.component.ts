import { Component, OnInit, Input, Output, EventEmitter, inject, output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 
import { ContactService } from '../../api/contact.service';

@Component({
  selector: 'contact-details',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.css'
})
export class ContactDetailsComponent{

  contactForm!: FormGroup;
  constructor(private fb: FormBuilder) {}
  private contactService = inject(ContactService); 
  isEdit: boolean = false;
  
  @Output("getList") getList: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>(); 
  @Input() item: any;  

  ngOnInit() {
    this.contactForm = this.fb.group({
      Id: [''],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]]      
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['item'] && this.item) {
      this.contactForm.patchValue({
        Id: this.item.id,
        FirstName: this.item.firstName,
        LastName: this.item.lastName,
        Email: this.item.email
      });

      if(this.item.firstName != undefined){
        this.isEdit = true;
      }
      else{
        this.isEdit = false;
      }
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const contactData = this.contactForm.value;
      this.contactService.CreateContactDetails(contactData).subscribe((response) => {
      alert(response.message); 
      this.getList.emit(true);
      this.onCancel();
      this.isEdit = false;
    });
    } else {
      this.contactForm.controls['FirstName'].markAsTouched();
      this.contactForm.controls['LastName'].markAsTouched();
      this.contactForm.controls['Email'].markAsTouched();
    }
  }

  onCancel() {
    // Emit cancel event to notify the parent component to show the list again
    this.cancel.emit();
  }

}


