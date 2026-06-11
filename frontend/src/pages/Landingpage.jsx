import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-12 py-6 border-b border-white/10">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Taskii
        </h1>

        <button
          onClick={() => navigate("/login")}
          className="px-6 py-2 rounded-xl border border-white/20 hover:bg-white/10 transition"
        >
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-32 text-center">
        <h1 className="text-6xl md:text-7xl font-bold leading-tight">
          Team Task Management{" "}
          <span className="text-emerald-400">Made Simple</span>
        </h1>

        <p className="text-slate-400 text-xl mt-8 max-w-3xl mx-auto">
          Create tasks, assign members, monitor progress and streamline
          collaboration across your organization.
        </p>

        <div className="mt-12 flex justify-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="
              bg-emerald-500
              hover:bg-emerald-600
              px-8
              py-4
              rounded-2xl
              text-lg
              font-semibold
              transition
              shadow-lg
            "
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-8">
          <div
            className="
            bg-white/5
            backdrop-blur-xl
            border
            border-white/10
            rounded-3xl
            p-8
          "
          >
            <h3 className="text-2xl font-bold mb-4">Create Tasks</h3>

            <p className="text-slate-400">
              Create and organize tasks with priorities, deadlines and
              descriptions.
            </p>
          </div>

          <div
            className="
            bg-white/5
            backdrop-blur-xl
            border
            border-white/10
            rounded-3xl
            p-8
          "
          >
            <h3 className="text-2xl font-bold mb-4">Assign Members</h3>

            <p className="text-slate-400">
              Easily assign work to team members and track ownership.
            </p>
          </div>

          <div
            className="
            bg-white/5
            backdrop-blur-xl
            border
            border-white/10
            rounded-3xl
            p-8
          "
          >
            <h3 className="text-2xl font-bold mb-4">Track Progress</h3>

            <p className="text-slate-400">
              Monitor task completion and project status in real time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
