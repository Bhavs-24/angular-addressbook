import { Component, ElementRef, ViewChild } from '@angular/core';
import { ContactService } from '../Services/contactService';
import { Contact } from '../Services/model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
  contactList: any[] = [];
  contact!: Contact;
  errorMessage: boolean = false;
  validationMessage: string = '';
  selectedEmail: string = '';
  selectedNameClass: boolean = false;
  isDialogHidden: boolean = true;
  isAddButtonVisible: boolean = true;
  isOptionsVisible: boolean = false;
  messageSpan: boolean = false;
  validationMessageSpan: boolean = false;
  selectedItem: any = null;
  selectedetails: any = null;
  activeItem: any;

  constructor(private contactService: ContactService) { }

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
    this.contact = {
      id: 0,
      name: '',
      email: '',
      telephone: "",
      landline: "",
      webaddress: '',
      address: '',
    };
  }

  onTelephoneChange(value: string) {
    console.log('value', value);
    value = value.toString();
    if (value.length != 10) {
      this.messageSpan = true;
    } else {
      this.messageSpan = false;
    }
  }

  fieldfocus() {
    const emailpattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailpattern.test(this.contact.email)) {
      this.validationMessageSpan = true;
    } else {
      this.validationMessageSpan = false;
    }
  }

  onSubmit() {
    if (this.contact.name.trim() === '' || this.contact.email.trim() === '') {
      this.errorMessage = true;
    } else {
      this.errorMessage = false
      const updatedContact = this.contactService.addContact(this.contact);
      // Clear the form fields
      this.contact = {
        id: 0,
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
    this.contactList = this.contactService.getAllContacts();
  }

  displayData(item: Contact) {
    this.isOptionsVisible = true;
    this.activeItem = item;
    if (item && item.id) {
      this.selectedNameClass = true;
      this.selectedItem = this.contactService.getContactById(item.id);
      if (this.selectedItem) {
        console.log('contact displayed')
      } else {
        console.log('Contact not found');
      }
    }
  }

  editItem() {
    if (this.selectedItem) {
      this.contact = { ...this.selectedItem };
      this.isAddButtonVisible = false;
      this.isDialogHidden = false;
    }
  }

  onUpdate() {
    const updatedContact = this.contactService.updateContact(this.contact);
    this.myFunction();
    this.displayData(this.selectedItem);
    this.isDialogHidden = true;
    this.closeDialog();
  }

  deleteItem() {
    let deleteitem = this.contactService.deleteContactById(this.selectedItem.id);
    if (deleteitem) {
      console.log('deleteitem', this.selectedItem);
      this.myFunction();
      this.isOptionsVisible = false;
    } else {
      console.log('not deleted');
    }
  }

}



