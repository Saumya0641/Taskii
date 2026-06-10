import { useEffect, useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import CreateTaskModal from "../components/CreateTaskModal";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (taskId) => {
  const confirmDelete = window.confirm(
    "Delete this task?"
  );

  if (!confirmDelete) return;

  try {
    await api.delete(`/tasks/${taskId}`);

    fetchTasks();
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

          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-slate-800">
                Task Management
              </h1>

              <p className="text-slate-500 mt-2">
                Manage and track all tasks.
              </p>
            </div>

            <button
              onClick={() => setOpenModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow"
            >
              + Create Task
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-4 text-left">
                    Title
                  </th>

                  <th className="p-4 text-left">
                    Description
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                  <th className="p-4 text-left">
                    Priority
                  </th>
                  <th className="p-4 text-left">
                   Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <tr
                      key={task.id}
                      className="border-b hover:bg-slate-50"
                    >
                      <td className="p-4 font-medium">
                        {task.title}
                      </td>

                      <td className="p-4">
                        {task.description}
                      </td>

                      <td className="p-4">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                          {task.status}
                        </span>
                      </td>

                      <td className="p-4">
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                          {task.priority}
                        </span>
                      </td>
                      <td className="p-4">
  <div className="flex gap-2">

    <button
      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg"
    >
      Edit
    </button>

   <button
  onClick={() => handleDelete(task.id)}
  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
>
  Delete
</button>

  </div>
</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="p-8 text-center text-slate-500"
                    >
                      No Tasks Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <CreateTaskModal
            isOpen={openModal}
            onClose={() =>
              setOpenModal(false)
            }
            onTaskCreated={fetchTasks}
          />
        </div>
      </div>
    </div>
  );
}

export default Tasks;