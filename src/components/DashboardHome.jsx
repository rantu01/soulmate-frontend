import React, { useEffect, useState } from "react";

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalBiodata: 0,
    maleCount: 0,
    femaleCount: 0,
    premiumCount: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("https://matrimony-backend-p3ok.onrender.com/api/admin/stats");
        const data = await res.json();

        if (res.ok) {
          setStats(data);
        } else {
          setError(data.message || "Failed to load statistics");
          
        }
      } catch (err) {
        setError(err.message || "Error loading statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-red-600 text-center py-10">Error: {error}</p>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold">📊 Admin Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded shadow">
          <h3 className="text-xl font-semibold">Total Biodata</h3>
          <p className="text-2xl font-bold">{stats.totalBiodata}</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h3 className="text-xl font-semibold">Male Biodata</h3>
          <p className="text-2xl font-bold">{stats.maleCount}</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h3 className="text-xl font-semibold">Female Biodata</h3>
          <p className="text-2xl font-bold">{stats.femaleCount}</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h3 className="text-xl font-semibold">Premium Members</h3>
          <p className="text-2xl font-bold">{stats.premiumCount}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
