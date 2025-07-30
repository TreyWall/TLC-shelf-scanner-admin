import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import JobQueuePage from './components/JobQueuePage';
import JobReviewPage from './components/JobReviewPage';
import ReportsDashboard from './components/ReportsDashboard';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

/**
 * Top‑level component that defines routing for the admin dashboard.
 * Until a user is authenticated, only the login page is accessible.
 * Once logged in, the user can navigate between jobs, review and reports.
 */
export default function App() {
  const [user, setUser] = React.useState(undefined);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return unsub;
  }, []);

  if (user === undefined) {
    // Still determining auth state
    return null;
  }

  return (
    <Router>
      {user ? (
        <Routes>
          <Route path="/jobs" element={<JobQueuePage />} />
          <Route path="/review/:jobId" element={<JobReviewPage />} />
          <Route path="/reports" element={<ReportsDashboard />} />
          <Route path="*" element={<Navigate to="/jobs" replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </Router>
  );
}