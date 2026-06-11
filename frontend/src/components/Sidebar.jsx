import {
  LayoutDashboard,
  ClipboardList,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";

import { Link } from "react-router-dom";
import { UserPlus } from "lucide-react";
function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-5">
      <h2 className="text-xl font-bold mb-10">Task Manager</h2>

      <div className="space-y-3">
        <Link
          to="/dashboard"
          className="flex gap-3 items-center p-3 rounded-lg hover:bg-slate-800"
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/tasks"
          className="flex gap-3 items-center p-3 rounded-lg hover:bg-slate-800"
        >
          <ClipboardList size={20} />
          <span>Tasks</span>
        </Link>

        <Link
          to="/members"
          className="flex gap-3 items-center p-3 rounded-lg hover:bg-slate-800"
        >
          <Users size={20} />
          <span>Members</span>
        </Link>

        <Link
          to="/assign-task"
          className="flex gap-3 items-center p-3 rounded-lg hover:bg-slate-800"
        >
          <UserPlus size={20} />
          <span>Assign Tasks</span>
        </Link>

        <Link
          to="/analytics"
          className="flex gap-3 items-center p-3 rounded-lg hover:bg-slate-800"
        >
          <BarChart3 size={20} />
          <span>Analytics</span>
        </Link>

        <Link
          to="/settings"
          className="flex gap-3 items-center p-3 rounded-lg hover:bg-slate-800"
        >
          <Settings size={20} />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
