function Header() {
  return (
    <div className="border-b border-slate-800 p-5 flex justify-between">

      <input
        placeholder="Search files..."
        className="bg-slate-900 px-5 py-3 rounded-xl w-[400px] outline-none"
      />

      <div className="bg-slate-900 px-5 py-3 rounded-xl">
        Priyanshu
      </div>

    </div>
  );
}

export default Header;