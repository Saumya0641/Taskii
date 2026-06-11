import api from "../services/api";

function DeleteMemberModal({ isOpen, onClose, member, onDeleted }) {
  if (!isOpen || !member) return null;

  const deleteMember = async () => {
    try {
      await api.delete(`/users/${member.id}`);

      onDeleted();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to delete member");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-[450px] p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-3">
          Delete Member
        </h2>

        <p className="text-slate-600 mb-6">
          Are you sure you want to delete
          <span className="font-semibold"> {member.name}</span>?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 transition"
          >
            Cancel
          </button>

          <button
            onClick={deleteMember}
            className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteMemberModal;
