import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

function Analytics() {
  const taskData = [
    { name: "Completed", value: 25 },
    { name: "Pending", value: 15 },
    { name: "In Progress", value: 10 },
  ];

  const monthlyData = [
    { month: "Jan", tasks: 10 },
    { month: "Feb", tasks: 20 },
    { month: "Mar", tasks: 30 },
    { month: "Apr", tasks: 25 },
    { month: "May", tasks: 40 },
  ];

  const COLORS = ["#22c55e", "#f59e0b", "#3b82f6"];

  return (
    <div className="bg-slate-100 min-h-screen">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8">
          <h1 className="text-4xl font-bold mb-8">Analytics Dashboard</h1>

          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-xl font-semibold mb-4">
                Task Status Distribution
              </h2>

              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={taskData} dataKey="value" outerRadius={100} label>
                    {taskData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-xl font-semibold mb-4">Monthly Tasks</h2>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <XAxis dataKey="month" />

                  <YAxis />

                  <Tooltip />

                  <Bar dataKey="tasks" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
