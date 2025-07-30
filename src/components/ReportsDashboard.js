import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Bar } from 'react-chartjs-2';

/**
 * ReportsDashboard fetches job data and computes basic statistics
 * which are visualised using a bar chart. The counts for approved,
 * rejected and pending jobs are displayed. Additional reporting
 * features such as exporting to Google Sheets can be implemented
 * here in the future.
 */
export default function ReportsDashboard() {
  const [statusCounts, setStatusCounts] = useState({
    approved: 0,
    rejected: 0,
    pending: 0,
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'jobs'));
        const counts = { approved: 0, rejected: 0, pending: 0 };
        snapshot.docs.forEach((doc) => {
          const status = doc.data().status || 'pending';
          counts[status] = (counts[status] || 0) + 1;
        });
        setStatusCounts(counts);
      } catch (err) {
        console.error('Failed to fetch report data', err);
      }
    };
    fetch();
  }, []);

  const chartData = {
    labels: ['Approved', 'Rejected', 'Pending'],
    datasets: [
      {
        label: '# of Jobs',
        data: [
          statusCounts.approved,
          statusCounts.rejected,
          statusCounts.pending,
        ],
        backgroundColor: ['#2ecc71', '#e74c3c', '#f1c40f'],
      },
    ],
  };

  return (
    <div className="reports-dashboard">
      <h2>Reports</h2>
      <Bar data={chartData} />
    </div>
  );
}