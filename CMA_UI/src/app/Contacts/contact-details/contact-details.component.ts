import { Component, Input, inject, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 
import { ContactService } from '../../api/contact.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'contact-details',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './contact-details.component.html'
})
export class ContactDetailsComponent { 

  @Output("ListChild") ListChild: EventEmitter<any> = new EventEmitter<any>();
  @Input() item: any = {Id: 0, FirstName: '', LastName: '', Email: ''};

  contactForm!: FormGroup;
  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {}
  private contactService = inject(ContactService);  
  isEdit: boolean = false;  
  
  ngOnInit() {
    this.contactForm = this.fb.group({
      Id: [''],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]]      
    });

    if (this.item) {
      this.contactForm.patchValue({
        Id: this.item.id,
        FirstName: this.item.firstName,
        LastName: this.item.lastName,
        Email: this.item.email
      });
    }
    else{
      this.contactForm.patchValue({
        Id: 0,
        FirstName: '',
        LastName: '',
        Email: ''
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['contact'] && this.item) {
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
      this.ListChild.emit(true);
      this.onCancel();
      this.isEdit = false;
    });
    this.activeModal.close({success:true});
    } else {
      this.contactForm.controls['FirstName'].markAsTouched();
      this.contactForm.controls['LastName'].markAsTouched();
      this.contactForm.controls['Email'].markAsTouched();
    }
  }

  onCancel() {
    this.activeModal.close();
    //this.cancel.emit();
  }

}


