import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);

  const role = localStorage.getItem("role");

  const userName = localStorage.getItem("userName");

  const displayName = role === "ADMIN" ? "Admin" : userName;

  const firstLetter = displayName?.charAt(0).toUpperCase();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-8">
      <h1 className="text-2xl font-bold text-blue-600">Taskii</h1>

      <div className="relative">
        <div
          onClick={() => setOpenMenu(!openMenu)}
          className="flex items-center gap-3 cursor-pointer"
        >
          <span className="font-medium">{displayName}</span>

          <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
            {firstLetter}
          </div>
        </div>

        {/* {openMenu && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border">

            <button
              onClick={logout}
              className="w-full text-left px-4 py-3 hover:bg-slate-100"
            >
              Logout
            </button>

          </div>
        )} */}
        {openMenu && (
          <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] animate-in fade-in zoom-in-95 duration-200">
            <div className="px-4 py-3 border-b border-slate-200/60">
              <p className="font-semibold text-slate-800">{displayName}</p>

              <p className="text-xs text-slate-500">
                {role === "ADMIN" ? "Administrator" : "Team Member"}
              </p>
            </div>

            <button
              onClick={logout}
              className="
        w-full
        px-4
        py-3
        text-left
        text-red-500
        font-medium
        transition-all
        duration-200
        hover:bg-red-50
        hover:text-red-600
      "
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
