import { useEffect, useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";

function AdminDashboard() {
  const [stats, setStats] = useState({
    total_tasks: 0,
    pending_tasks: 0,
    completed_tasks: 0,
    total_users: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/dashboard/admin");

      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-800">
              Welcome Back 👋
            </h1>

            <p className="text-slate-500 mt-2">
              Here's what's happening in your workspace today.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-6">
            <DashboardCard
              title="Total Tasks"
              value={stats.total_tasks}
            />

            <DashboardCard
              title="Pending Tasks"
              value={stats.pending_tasks}
            />

            <DashboardCard
              title="Completed Tasks"
              value={stats.completed_tasks}
            />

            <DashboardCard
              title="Team Members"
              value={stats.total_users}
            />
          </div>

          <div className="bg-white rounded-2xl shadow mt-8 p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Recent Tasks
            </h2>

            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">
                    Task
                  </th>

                  <th className="text-left py-3">
                    Status
                  </th>

                  <th className="text-left py-3">
                    Priority
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="py-4">
                    Build Login Page
                  </td>

                  <td>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      Completed
                    </span>
                  </td>

                  <td>
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                      High
                    </span>
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="py-4">
                    Implement JWT
                  </td>

                  <td>
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                      In Progress
                    </span>
                  </td>

                  <td>
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                      Medium
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="py-4">
                    Create Dashboard
                  </td>

                  <td>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      Todo
                    </span>
                  </td>

                  <td>
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                      High
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;