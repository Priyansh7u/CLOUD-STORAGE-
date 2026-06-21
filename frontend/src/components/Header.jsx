function Header() {

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    window.location.href =
      "/login";

  };

  return (

    <div className="
    border-b
    border-slate-800
    p-5
    flex
    justify-between
    items-center
    ">

      <input
        placeholder="Search files..."
        className="
        bg-slate-900
        px-5
        py-3
        rounded-xl
        w-[400px]
        outline-none
        "
      />

      <div className="flex gap-4">

        <div
          className="
          bg-slate-900
          px-5
          py-3
          rounded-xl
          "
        >
          Priyanshu
        </div>

        <button
          onClick={logout}
          className="
          bg-red-600
          hover:bg-red-700
          px-5
          py-3
          rounded-xl
          "
        >
          Logout
        </button>

      </div>

    </div>

  );

}

export default Header;