import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function MemberDashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/users/my-tasks");

      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (taskId, status) => {
    try {
      await api.patch(`/tasks/${taskId}/status`, {
        status,
      });

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <Navbar />

      <div className="p-8">
        <h1 className="text-4xl font-bold text-slate-800">My Tasks</h1>

        <p className="text-slate-500 mt-2 mb-8">Track and update your work.</p>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-slate-500">Total Tasks</h3>

            <p className="text-4xl font-bold mt-2">{tasks.length}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-slate-500">Completed</h3>

            <p className="text-4xl font-bold mt-2 text-green-600">
              {tasks.filter((t) => t.status === "DONE").length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-slate-500">Pending</h3>

            <p className="text-4xl font-bold mt-2 text-red-600">
              {tasks.filter((t) => t.status !== "DONE").length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-4 text-left">Title</th>

                <th className="p-4 text-left">Description</th>

                <th className="p-4 text-left">Priority</th>

                <th className="p-4 text-left">Status</th>

                <th className="p-4 text-left">Update</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-b hover:bg-slate-50">
                  <td className="p-4">{task.title}</td>

                  <td className="p-4">{task.description}</td>

                  <td className="p-4">{task.priority}</td>

                  <td className="p-4">{task.status}</td>

                  <td className="p-4">
                    <select
                      value={task.status}
                      onChange={(e) => updateStatus(task.id, e.target.value)}
                      className="border rounded-lg px-3 py-2"
                    >
                      <option value="TODO">TODO</option>

                      <option value="IN_PROGRESS">IN PROGRESS</option>

                      <option value="DONE">DONE</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MemberDashboard;
