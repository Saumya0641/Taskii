function Navbar() {
  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-8">
      <h1 className="text-2xl font-bold text-blue-600">
        Taskii
      </h1>

      <div className="flex items-center gap-4">
        <span className="font-medium">
          Admin
        </span>

        <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
          A
        </div>
      </div>
    </div>
  );
}

export default Navbar;