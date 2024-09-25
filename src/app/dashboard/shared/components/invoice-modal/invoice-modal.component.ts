import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormArray  } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-invoice-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CurrencyPipe
  ],
  templateUrl: './invoice-modal.component.html',
  styleUrl: './invoice-modal.component.scss'
})
export class InvoiceModalComponent implements OnInit{

  invoiceForm: FormGroup | any;
  currentUser$: Observable<any> | undefined;
form: any;

  constructor(private fb: FormBuilder, private firestore: Firestore, private auth: Auth) {}

  ngOnInit(): void {
    this.invoiceForm = this.fb.group({
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      postCode: ['', Validators.required],
      clientName: ['', Validators.required],
      clientEmail: ['', [Validators.required, Validators.email]],
      clientStreetAddress: ['', Validators.required],
      clientCity: ['', Validators.required],
      clientPostCode: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required],
      items: this.fb.array([this.createItem()])
    });

    this.currentUser$ = user(this.auth);
  }

  // Helper function to create a new item FormGroup
  createItem(): FormGroup {
    return this.fb.group({
      itemName: ['', Validators.required],
      itemQuantity: [1, Validators.required],
      itemPrice: [Validators.required],
      itemTotal: [{ value: 0, disabled: true }]
    });
  }

  // Getter to access the items FormArray
  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  // Method to add a new item
  addItem() {
    this.items.push(this.createItem());
  }

  // Method to remove an item
  removeItem(index: number) {
    this.items.removeAt(index);
  }

  // Calculate the total for an item when quantity or price changes
  calculateTotal(index: number) {
    const item = this.items.at(index);
    const quantity = item.get('itemQuantity')?.value;
    const price = item.get('itemPrice')?.value;
    item.get('itemTotal')?.setValue(quantity * price);
  }

  onSubmit() {
    if (this.invoiceForm.valid) {
      this.currentUser$?.subscribe(user => {
        if (user) {
          const invoiceData = {
            ...this.invoiceForm.value,
            userId: user.uid,
            userName: user.displayName || 'Anonymous', // Include user's display name
            userEmail: user.email // Include user's email
          };
          this.saveInvoiceToFirestore(invoiceData);
        } else {
          console.log('User not authenticated');
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

  async saveInvoiceToFirestore(invoiceData: any) {
    try {
      const invoicesCollection = collection(this.firestore, `users/${invoiceData.userEmail}/invoices`);
      await addDoc(invoicesCollection, invoiceData);
      console.log('Invoice saved successfully!');
    } catch (error) {
      console.error('Error saving invoice: ', error);
    }
  }
}
