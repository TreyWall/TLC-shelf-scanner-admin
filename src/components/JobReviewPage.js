import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * JobReviewPage fetches a single job by ID and displays its image
 * and parsed data to the admin. The admin can approve or reject
 * the job, updating its status in Firestore.
 */
export default function JobReviewPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const ref = doc(db, 'jobs', jobId);
        const snapshot = await getDoc(ref);
        if (snapshot.exists()) {
          setJob({ id: snapshot.id, ...snapshot.data() });
        }
      } catch (err) {
        console.error('Failed to load job', err);
      }
    };
    fetch();
  }, [jobId]);

  const updateStatus = async (status) => {
    try {
      await updateDoc(doc(db, 'jobs', jobId), { status });
      navigate('/jobs');
    } catch (err) {
      console.error('Failed to update job status', err);
    }
  };

  if (!job) return <p>Loading…</p>;

  return (
    <div className="job-review">
      <h2>Review Job: {job.title || job.id}</h2>
      {job.imageUrl && (
        <img src={job.imageUrl} alt="Shelf" width="400" />
      )}
      <div className="data">
        <pre>{JSON.stringify(job.parsedData || {}, null, 2)}</pre>
      </div>
      <button onClick={() => updateStatus('approved')}>Approve</button>
      <button onClick={() => updateStatus('rejected')}>Reject</button>
    </div>
  );
}