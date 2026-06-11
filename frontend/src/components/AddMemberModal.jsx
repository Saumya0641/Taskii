import { useState } from "react";
import api from "../services/api";

function AddMemberModal({ isOpen, onClose, onMemberCreated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  if (!isOpen) return null;

  const createMember = async () => {
    try {
      setError("");

      await api.post("/users", {
        name,
        email,
        password,
      });

      alert("Member Created");

      setName("");
      setEmail("");
      setPassword("");

      onMemberCreated();
      onClose();
    } catch (error) {
      const detail = error.response?.data?.detail;

      if (Array.isArray(detail)) {
        setError(detail[0].msg);
      } else if (typeof detail === "string") {
        setError(detail);
      } else {
        setError("Failed to create member");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white w-[500px] rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-6">Add Member</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-300 rounded-lg hover:bg-slate-400"
          >
            Cancel
          </button>

          <button
            onClick={createMember}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Member
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddMemberModal;
