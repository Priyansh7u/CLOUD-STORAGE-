import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import UploadBox from "../components/UploadBox";
import Gallery from "./Gallery";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <div className="p-8">
          <UploadBox />

          {/* Uploaded Files */}
          <div className="mt-10">
            <Gallery />
          </div>

          {/* Demo Cards */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">
              Recent Files
            </h2>

            <div className="grid grid-cols-4 gap-5">
              <div className="bg-slate-900 p-5 rounded-2xl">
                📄 Notes.pdf
              </div>

              <div className="bg-slate-900 p-5 rounded-2xl">
                🖼️ Photo.png
              </div>

              <div className="bg-slate-900 p-5 rounded-2xl">
                🎥 Video.mp4
              </div>

              <div className="bg-slate-900 p-5 rounded-2xl">
                📁 Folder
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;