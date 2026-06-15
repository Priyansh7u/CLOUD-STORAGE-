import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: "🏠",
    },
    {
      name: "Gallery",
      path: "/gallery",
      icon: "🖼️",
    },
    {
      name: "Notes",
      path: "/notes",
      icon: "📝",
    },
    {
      name: "Favorites",
      path: "/favorites",
      icon: "⭐",
    },
    {
      name: "Videos",
      path: "/videos",
      icon: "🎥",
    },
    {
      name: "PDF Files",
      path: "/pdfs",
      icon: "📄",
    },
  ];

  return (
    <div className="w-72 bg-slate-900 border-r border-slate-800 min-h-screen p-6">

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white">
          ☁ Personal Cloud
        </h1>

        <p className="text-slate-400 mt-2">
          Your Private Storage
        </p>
      </div>

      <div className="space-y-3">

        {menuItems.map((item) => (

          <Link
            key={item.path}
            to={item.path}
            className={`
              flex items-center gap-3
              p-4 rounded-xl
              transition-all duration-200
              ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }
            `}
          >

            <span className="text-xl">
              {item.icon}
            </span>

            <span>
              {item.name}
            </span>

          </Link>

        ))}

      </div>

      <div className="mt-12 bg-slate-800 p-4 rounded-2xl">

        <h3 className="font-semibold text-white">
          Storage
        </h3>

        <div className="w-full bg-slate-700 rounded-full h-3 mt-3">

          <div
            className="bg-blue-500 h-3 rounded-full"
            style={{ width: "35%" }}
          />

        </div>

        <p className="text-sm text-slate-400 mt-2">
          35% Used
        </p>

      </div>

    </div>
  );
}

export default Sidebar;