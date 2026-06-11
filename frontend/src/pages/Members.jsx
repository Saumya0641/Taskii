import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import AddMemberModal from "../components/AddMemberModal";
import DeleteMemberModal from "../components/DeleteMemberModal";
function Members() {
  const [users, setUsers] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [showAddMemberModal, setShowAddMemberModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");

      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const viewTasks = async (userId) => {
    try {
      const response = await api.get(`/users/${userId}/tasks`);

      setSelectedTasks(response.data);
      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const openDeleteModal = (user) => {
    setSelectedMember(user);
    setShowDeleteModal(true);
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
                Team Members
              </h1>

              <p className="text-slate-500 mt-2">
                Manage and monitor team members.
              </p>
            </div>

            <button
              onClick={() => setShowAddMemberModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow"
            >
              + Add Member
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left p-4">Name</th>

                  <th className="text-left p-4">Email</th>

                  <th className="text-left p-4">Role</th>

                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-slate-50">
                    <td className="p-4 font-medium">{user.name}</td>

                    <td className="p-4">{user.email}</td>

                    <td className="p-4">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {user.role}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => viewTasks(user.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                        >
                          View Tasks
                        </button>

                        {user.role !== "ADMIN" && (
                          <button
                            onClick={() => openDeleteModal(user)}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
              <div className="bg-white rounded-2xl shadow-lg w-[700px] p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Assigned Tasks</h2>

                  <button
                    onClick={() => setShowModal(false)}
                    className="text-2xl"
                  >
                    ×
                  </button>
                </div>

                {selectedTasks.length > 0 ? (
                  <table className="w-full">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="text-left p-3">Title</th>

                        <th className="text-left p-3">Status</th>

                        <th className="text-left p-3">Priority</th>
                      </tr>
                    </thead>

                    <tbody>
                      {selectedTasks.map((task) => (
                        <tr key={task.id} className="border-b">
                          <td className="p-3">{task.title}</td>

                          <td className="p-3">{task.status}</td>

                          <td className="p-3">{task.priority}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    No tasks assigned.
                  </div>
                )}
              </div>
            </div>
          )}
          <AddMemberModal
            isOpen={showAddMemberModal}
            onClose={() => setShowAddMemberModal(false)}
            onMemberCreated={fetchUsers}
          />

          <DeleteMemberModal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            member={selectedMember}
            onDeleted={fetchUsers}
          />
        </div>
      </div>
    </div>
  );
}

export default Members;
