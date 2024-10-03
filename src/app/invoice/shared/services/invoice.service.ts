import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, setDoc } from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private invoicesSubject = new BehaviorSubject<any[]>([]);
  invoices$ = this.invoicesSubject.asObservable();
  private filteredInvoicesSubject = new BehaviorSubject<any[]>([]);
  filteredInvoices$ = this.filteredInvoicesSubject.asObservable();
  private filters: string[] = [];

  constructor(private firestore: Firestore, private auth: Auth) {}

  getCurrentUser(): Observable<any> {
    return user(this.auth);
  }

  saveInvoice(invoiceData: any): void {
    const description = invoiceData.description.replace(/\s+/g, '-').toLowerCase();
    const invoicesCollection = collection(this.firestore, `users/${invoiceData.userEmail}/invoices`);
    const invoiceDoc = doc(invoicesCollection, description);

    setDoc(invoiceDoc, invoiceData)
      .then(() => {
        console.log('Invoice saved successfully!');
        const currentInvoices = this.invoicesSubject.value;
        this.invoicesSubject.next([...currentInvoices, invoiceData]);
        this.applyFilters(this.filters);
      })
      .catch((error) => {
        console.error('Error saving invoice: ', error);
      });
  }

  invoiceStorage(userEmail: string): void {
    const invoicesCollection = collection(this.firestore, `users/${userEmail}/invoices`);
    collectionData(invoicesCollection, { idField: 'id' }).subscribe((invoices: any[]) => {
      this.invoicesSubject.next(invoices);
      this.applyFilters(this.filters);
    });
  }

  applyFilters(filters: string[]): void {
    this.filters = filters;
    if (filters.length === 0) {
      this.filteredInvoicesSubject.next(this.invoicesSubject.value);
    } else {
      const filteredInvoices = this.invoicesSubject.value.filter(invoice => filters.includes(invoice.status));
      this.filteredInvoicesSubject.next(filteredInvoices);
    }
  }
}