import { Component, ElementRef, ViewChild } from '@angular/core';
import { ContactService } from '../Services/contactService';
import { Contact } from '../Services/model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

  contact!: Contact;
  errorMessage: string = '';
  validationMessage: string = '';
  @ViewChild('showDialogButton') showDialogButton!: ElementRef;
  @ViewChild('dialog') dialog!: ElementRef;
  @ViewChild('telephoneInput') telephoneInput!: ElementRef;
  @ViewChild('messageSpan') messageSpan!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('validationMessageSpan') validationMessageSpan!: ElementRef;
  @ViewChild('selectedDetails') selectedDetails!: ElementRef;

  selectedEmail: string = '';
  selectedNameClass: boolean = false;
  contactList: any[] = [];

  isDialogHidden: boolean = true;
  isAddButtonVisible: boolean = true;
  isOptionsVisible: boolean = true;

 // contactService = new ContactService();
  selectedItem: any = null;
  selectedetails: any = null;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contact = {
      id: 0,
      name: '',
      email: '',
      telephone: '',
      landline: '',
      webaddress: '',
      address: '',
    };
    this.myFunction();
  }

  openDialog() {
    this.isDialogHidden = false;
    this.isAddButtonVisible = true;
   
  }
  closeDialog() {
    this.isDialogHidden = true;
  }
  phonecheck(value: string) {
    const mobilenumber = this.telephoneInput.nativeElement;
    const message = this.messageSpan.nativeElement;

    if (value.length > 10 || value.length < 10) {
      message.innerText = "Must be 10 digits";
    } else {
      message.innerText = "";
    }  
  }

fieldfocus() {
    const emailpattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const validationMessage = this.validationMessageSpan.nativeElement;

    if (!emailpattern.test(this.contact.email)) {
      validationMessage.innerText = "Please enter a valid email";
    } else {
      validationMessage.innerText = "";
      // this.selectedEmail = emailValue;
    }
  }

  onSubmit() {
   // debugger
    if (this.contact.name.trim() === '' || this.contact.email.trim() === '') {
      this.errorMessage = 'Please fill all the details!';
    } else {
      this.errorMessage = '';
      const updatedContact = this.contactService.addContact(this.contact);
      // Clear the form fields
      this.contact = {
        id:0,
        name: '',
        email: '',
        telephone: "",
        landline: "",
        webaddress: '',
        address: '',
      };
      console.log('Retrieved item with ID:', updatedContact);
      this.myFunction(); 
    }
  }
  
  myFunction() {
    this.contactList = this.contactService.getAllContacts();
    
  }
  
  displayData(item: Contact) {
    debugger
    if (item && item.id) {
      this.selectedNameClass = true; 
      this.selectedItem = this.contactService.getContactById(item.id); 
      if (this.selectedItem) {
        this.selectedDetails.nativeElement.classList.remove('options');
      } else {
        console.log('Contact not found');
      }
    }
  }
  
  
  editItem() {
    
  }

  onUpdate() {
  
  }

  deleteItem() {
  
  }

}

 

