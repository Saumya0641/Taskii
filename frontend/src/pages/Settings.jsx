import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Settings() {
  return (
    <div className="bg-slate-100 min-h-screen">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8">
          <h1 className="text-4xl font-bold">Settings</h1>
        </div>
      </div>
    </div>
  );
}

export default Settings;
