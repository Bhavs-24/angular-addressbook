import { Component, ElementRef, ViewChild } from '@angular/core';
import { ContactService } from '../Services/contactService';
import { Contact } from '../Services/model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {

  contact!: Contact;
  errorMessage: string = '';
  validationMessage: string = '';
  // @ViewChild('showDialogButton') showDialogButton!: ElementRef;
  // @ViewChild('dialog') dialog!: ElementRef;
  // @ViewChild('telephoneInput') telephoneInput!: ElementRef;
  // @ViewChild('messageSpan') messageSpan!: ElementRef;
  // @ViewChild('emailInput') emailInput!: ElementRef;
  // @ViewChild('validationMessageSpan') validationMessageSpan!: ElementRef;
  // @ViewChild('selectedDetails') selectedDetails!: ElementRef;

  selectedEmail: string = '';
  selectedNameClass: boolean = false;
  contactList: any[] = [];

  isDialogHidden: boolean = true;
  isAddButtonVisible: boolean = true;
  isOptionsVisible: boolean = false;
  messageSpan:boolean = false;
  validationMessageSpan:boolean = false;

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
  onTelephoneKeyUp(value:string) {
    // const value = this.telephoneInput.nativeElement.value;
    this.phonecheck(value);
  }

  phonecheck(value: string) {
    if (value.length !== 10) {
      this.messageSpan = true;
    } else {
     this. messageSpan = false;
    }
  }
  fieldfocus() {
    const emailpattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailpattern.test(this.contact.email)) {
      this.validationMessageSpan = true;
      //this.validationMessageSpan.nativeElement.innerText = "Please enter a valid email";
    } else {
      this.validationMessageSpan = false;
     // this.validationMessageSpan.nativeElement.innerText = "";
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
      this.isDialogHidden = true;
    }
  }
  
  myFunction() {
   // debugger
    this.contactList = this.contactService.getAllContacts();
    
  }
  
  displayData(item: Contact) { 
    this.isOptionsVisible = true;
    if (item && item.id) {
      this.selectedNameClass = true; 
      this.selectedItem = this.contactService.getContactById(item.id); 
      if (this.selectedItem) {
       // this.selectedDetails.nativeElement.classList.remove('options');
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
  let deleteitem = this.contactService.deleteContactById(this.selectedItem.id);
   if(deleteitem){
    console.log('deleteitem',this.selectedItem);
    this.myFunction();
    this.isOptionsVisible = false;
   }else{
    console.log('not deleted');
   }

  }

}

 

