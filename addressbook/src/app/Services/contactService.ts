import { Contact } from "./model";

 export class ContactService {
    localStorageKey = "Contacts";
    contacts: Contact[] = [
      {
        id: 1,
        name: "Chandermani Arora",
        email: "chandermani@technovert.com",
        telephone: "9876543211",
        landline: "678888",
        webaddress: "www.technovert.com",
        address: "Ongole",
      },
      {
        id: 2,
        name: "Sashi Pagadala",
        email: "vijay@technovert.com",
        telephone: "6543234412",
        landline: "986568",
        webaddress: "www.technovert.com",
        address: "Kerala",
      },
    ];
  
    constructor() {
    }
  
    addContact(contact: Contact): Contact {
      const newContact = new Contact({ ...contact, id: this.getRandomNumber() });
      this.contacts.push(newContact);
      this.saveContactsToLocalStorage(this.contacts);
      return newContact;
    }
  
    getAllContacts(): Contact[] {   
      var storedData = localStorage.getItem(this.localStorageKey);
      if (storedData) {
        this.contacts = JSON.parse(storedData);
      } else {
        this.saveContactsToLocalStorage(this.contacts);
      }
      return this.contacts;
    }
  
    getContactById(id:number): Contact | undefined {
      return this.contacts.find((contact) => contact.id === id);
    }
  
    updateContact(contact: Contact): Contact {
      this.contacts = this.contacts.map((c) =>
        c.id == contact.id ? { ...contact } : c
      );
      this.saveContactsToLocalStorage(this.contacts);
      return contact;
    }
  
    deleteContactById(id:number):boolean {
      try {
        this.contacts = [...this.contacts.filter((contact) => contact.id !== id)];
        this.saveContactsToLocalStorage(this.contacts);
        return true;
      } catch (ex) {
        return false;
      }
      
    }
  
    private saveContactsToLocalStorage(contacts: Contact[]):void {
      localStorage.setItem(this.localStorageKey, JSON.stringify(contacts));
    }
  
    private getRandomNumber():number {
      var id = Math.floor(Math.random() * 1000);
      return id;
    }
  }
  