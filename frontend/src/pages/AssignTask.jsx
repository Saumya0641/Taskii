import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function AssignTask() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const [selectedTask, setSelectedTask] = useState("");

  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const assignTask = async () => {
    try {
      await api.post(`/tasks/${selectedTask}/assign`, {
        user_ids: [Number(selectedUser)],
      });

      alert("Task Assigned Successfully");

      setSelectedTask("");
      setSelectedUser("");
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");

      console.log("USERS:", response.data);

      setUsers(response.data);
    } catch (error) {
      console.error("USER ERROR:", error);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8">
          <h1 className="text-4xl font-bold mb-8">Assign Tasks</h1>

          <div className="bg-white p-8 rounded-2xl shadow max-w-xl">
            <div className="mb-5">
              <label className="block mb-2 font-semibold">Select Task</label>

              <select
                value={selectedTask}
                onChange={(e) => setSelectedTask(e.target.value)}
                className="w-full border p-3 rounded-lg"
              >
                <option value="">Select Task</option>

                {tasks.map((task) => (
                  <option key={task.id} value={task.id}>
                    {task.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-5">
              <label className="block mb-2 font-semibold">Select Member</label>

              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full border p-3 rounded-lg"
              >
                <option value="">Select Member</option>

                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={assignTask}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Assign Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignTask;
