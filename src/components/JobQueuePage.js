import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

/**
 * JobQueuePage displays all jobs stored in Firestore. Each job
 * includes a link to the review page where an admin can approve or
 * reject the submitted scan. Jobs default to `pending` status until
 * manually updated.
 */
export default function JobQueuePage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'jobs'));
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setJobs(data);
      } catch (err) {
        console.error('Failed to fetch jobs', err);
      }
    };
    fetch();
  }, []);

  return (
    <div className="job-queue">
      <h2>Job Queue</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            {job.title || 'Untitled Job'} –{' '}
            <Link to={`/review/${job.id}`}>Review</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}