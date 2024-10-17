import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, query, orderBy, doc, docData, setDoc, deleteDoc } from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private invoicesSubject = new BehaviorSubject<any[]>([]);
  invoices = this.invoicesSubject.asObservable();
  private filteredInvoicesSubject = new BehaviorSubject<any[]>([]);
  filteredInvoices = this.filteredInvoicesSubject.asObservable();
  private filters: string[] = [];

  constructor(private firestore: Firestore, private auth: Auth) {}

  getCurrentUser(): Observable<any> {
    return user(this.auth);
  }

  saveInvoice(invoiceData: any): Observable<void> {
    const description = invoiceData.description
      .replace(/\s+/g, '-')
      .toLowerCase();
    const invoicesCollection = collection(
      this.firestore,
      `users/${invoiceData.userEmail}/invoices`
    );
    const invoiceDoc = doc(invoicesCollection, description);

    return from(setDoc(invoiceDoc, invoiceData)).pipe(
      map(() => {
        console.log('Invoice saved successfully');
      }),
      catchError((error) => {
        console.error('Failed to save invoice:', error);
        throw error;
      })
    );
  }

  deleteInvoice(userEmail: string, description: string): Observable<void> {
    const invoiceId = description.replace(/\s+/g, '-').toLowerCase();
    const invoiceDoc = doc(
      this.firestore,
      `users/${userEmail}/invoices/${invoiceId}`
    );

    return from(deleteDoc(invoiceDoc)).pipe(
      map(() => {
        console.log('Invoice deleted successfully!');
        const currentInvoices = this.invoicesSubject.value;
        const updatedInvoices = currentInvoices.filter(
          (invoice) => invoice.description !== description
        );
        this.invoicesSubject.next(updatedInvoices);
      }),
      catchError((error) => {
        console.error('Error deleting invoice: ', error);
        throw error;
      })
    );
  }

  invoiceStorage(userEmail: string): void {
    const invoicesCollection = collection(
      this.firestore,
      `users/${userEmail}/invoices`
    );
    const invoicesQuery = query(
      invoicesCollection,
      orderBy('timestamp', 'desc')
    );
    collectionData(invoicesQuery, { idField: 'id' }).subscribe(
      (invoices: any[]) => {
        this.invoicesSubject.next(invoices);
        this.applyFilters(this.filters);
      }
    );
  }

  applyFilters(filters: string[]): void {
    this.filters = filters;
    if (filters.length === 0) {
      this.filteredInvoicesSubject.next(this.invoicesSubject.value);
    } else {
      const filteredInvoices = this.invoicesSubject.value.filter((invoice) =>
        filters.includes(invoice.status)
      );
      this.filteredInvoicesSubject.next(filteredInvoices);
    }
  }

  getInvoiceById(userEmail: string, invoiceId: string): Observable<any> {
    const invoiceDoc = doc(
      this.firestore,
      `users/${userEmail}/invoices/${invoiceId}`
    );
    return docData(invoiceDoc);
  }
}
