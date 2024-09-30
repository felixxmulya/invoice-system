import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-invoice-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, CurrencyPipe],
  templateUrl: './invoice-modal.component.html',
  styleUrl: './invoice-modal.component.scss',
})
export class InvoiceModalComponent implements OnInit {
  invoiceForm: FormGroup | any;
  currentUser$: Observable<any> | undefined;
  form: any;

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService
  ) {} // Inject the service

  ngOnInit(): void {
    this.invoiceForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      postCode: ['', Validators.required],
      clientName: ['', Validators.required],
      clientEmail: ['', [Validators.required, Validators.email]],
      clientStreetAddress: ['', Validators.required],
      clientCity: ['', Validators.required],
      clientPostCode: ['', Validators.required],
      date: ['', Validators.required],
      invoiceNumber: ['', Validators.required],
      description: ['', Validators.required],
      status: ['Pending', Validators.required],
      items: this.fb.array([this.createItem()]),
    });

    this.currentUser$ = this.invoiceService.getCurrentUser();
  }

  // Helper function to create a new item FormGroup
  createItem(): FormGroup {
    return this.fb.group({
      itemName: ['', Validators.required],
      itemQuantity: [1, Validators.required],
      itemPrice: [Validators.required],
      itemTotal: [{ value: 0, disabled: true }],
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

  // Calculate the total amount for all items
  getTotalAmount(): number {
    return this.items.controls.reduce((total, item) => {
      const itemTotal = item.get('itemTotal')?.value || 0;
      return total + itemTotal;
    }, 0);
  }

  onSubmit() {
    if (this.invoiceForm.valid) {
      this.currentUser$?.subscribe((user) => {
        if (user) {
          const invoiceData = {
            ...this.invoiceForm.value,
            timestamp: new Date().toISOString(),
            userId: user.uid,
            userName: user.displayName || 'Anonymous',
            userEmail: user.email,
            totalAmount: this.getTotalAmount()
          };
          this.invoiceService.saveInvoice(invoiceData);
        } else {
          console.log('User not authenticated');
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
