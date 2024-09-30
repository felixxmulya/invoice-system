import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private invoicesSubject = new BehaviorSubject<any[]>([]);
  invoices$ = this.invoicesSubject.asObservable();

  constructor(private firestore: Firestore, private auth: Auth) {}

  getCurrentUser(): Observable<any> {
    return user(this.auth);
  }

  saveInvoice(invoiceData: any): void {
    const invoicesCollection = collection(this.firestore, `users/${invoiceData.userEmail}/invoices`);
    addDoc(invoicesCollection, invoiceData)
      .then(() => {
        console.log('Invoice saved successfully!');
        const currentInvoices = this.invoicesSubject.value;
        this.invoicesSubject.next([...currentInvoices, invoiceData]);
      })
      .catch((error) => {
        console.error('Error saving invoice: ', error);
      });
  }

  invoiceStorage(userEmail: string): void {
    const invoicesCollection = collection(this.firestore, `users/${userEmail}/invoices`);
    collectionData(invoicesCollection, { idField: 'id' }).subscribe((invoices: any[]) => {
      this.invoicesSubject.next(invoices);
    });
  }
}
