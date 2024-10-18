# Invoice Management System

## Overview

This Invoice Management System is a web application built with Angular and Firebase. It allows users to create, view, edit, and delete invoices, as well as manage client information. The system provides a user-friendly interface for tracking invoices and their statuses.

## Features

- **User Authentication**: Secure login and registration system.
- **Dashboard**: Overview of all invoices with filtering capabilities.
- **Invoice Creation**: Easy-to-use form for creating new invoices.
- **Invoice Viewing**: Detailed view of individual invoices.
- **Invoice Editing**: Ability to update existing invoices.
- **Invoice Deletion**: Option to remove invoices from the system.
- **Client Management**: Store and manage client information.
- **Status Tracking**: Track the status of invoices (Paid, Pending, Draft).
- **Responsive Design**: Works on desktop and mobile devices.

## Technologies Used

- Angular 16+
- Firebase (Firestore for database, Authentication for user management)
- RxJS for reactive programming
- Angular Material (optional, if used for UI components)

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/felixxmulya/invoice-system.git
   ```

2. Navigate to the project directory:
   ```bash
   cd invoice-system
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up Firebase:
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore and Authentication in your Firebase project
   - Copy your Firebase configuration
   - Create a file `src/environments/environment.ts` and add your Firebase config:
     ```typescript
     export const environment = {
       production: false,
       firebaseConfig: {
         apiKey: "YOUR_API_KEY",
         authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
         projectId: "YOUR_PROJECT_ID",
         storageBucket: "YOUR_PROJECT_ID.appspot.com",
         messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
         appId: "YOUR_APP_ID"
       }
     };
     ```

5. Run the development server:
   ```bash
   ng serve
   ```

6. Open your browser and navigate to `http://localhost:4200`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
