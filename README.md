# Shelf Scanner Admin Dashboard

This project contains the administrator dashboard for the Shelf Scanner system. It allows authorised users to log in, review submitted shelf scans, update job status and view aggregate reports of job outcomes.

## Features

- ✅ **Authentication** – Admins authenticate via Firebase Auth
- 📋 **Job Queue** – Displays a list of jobs awaiting review
- 🔍 **Review Interface** – Shows captured images and parsed data; supports approve/reject flows
- 📊 **Reports** – Provides a bar chart summarising job statuses
- 🚀 **CI/CD** – GitHub Action to build and deploy the dashboard to Firebase Hosting

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- A Firebase project with Firestore and Hosting enabled
- The Firebase CLI installed (`npm install -g firebase-tools`)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://example.com/shelf-scanner-admin.git
   cd shelf-scanner-admin
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Firebase**

   Create a `.env.local` file by copying the provided template:

   ```bash
   cp .env.local .env.local
   # Edit the file and populate your Firebase values
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

   This will start Vite on <http://localhost:5173> by default.

### Deployment

The dashboard can be deployed to Firebase Hosting. Ensure you have initialised your Firebase project and set up hosting configuration.

```bash
npm run build
firebase deploy --only hosting
```

For automated deployment via GitHub Actions, create a secret named `FIREBASE_TOKEN` containing a CI token generated from `firebase login:ci`. The workflow defined in `.github/workflows/deploy.yml` will build and deploy on pushes to the `main` branch.

### Testing

Run Jest to execute unit tests:

```bash
npm test
```

## Security & Roles

Firestore rules are defined in `firebase.rules` to enforce that only users with the custom claim `role: admin` can read/write jobs. History documents are owned by the contractor who created them. Ensure that custom claims are assigned appropriately using the Firebase Admin SDK.

## Additional Notes

- The `ReportsDashboard` currently aggregates counts of job statuses. You can extend this to compute additional metrics or integrate with Google Sheets for exports.
- Cloud Functions used by the mobile app (for OCR) live in the `/functions` directory in the root of this monorepo.
<!-- trigger CI -->
