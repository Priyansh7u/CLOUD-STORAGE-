import { useState } from "react";
import { uploadFile } from "../services/fileService";

function UploadBox() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Select a file first");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("file", file);

      const result = await uploadFile(formData);

      console.log(result);

      alert("Upload Success ✅");

      setFile(null);

    } catch (error) {

      console.log(error);

      alert("Upload Failed ❌");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="bg-slate-900 p-10 rounded-3xl border border-slate-800">

      <h2 className="text-3xl font-bold">
        Upload Files
      </h2>

      <p className="text-slate-400 mt-2">
        Store images, videos, PDFs and notes
      </p>

      <div className="mt-6 border-2 border-dashed border-slate-700 p-16 rounded-3xl text-center">

        <p className="text-xl mb-5">
          Drag & Drop Files Here
        </p>

        <input
          type="file"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
        />

        <br />
        <br />

        <button
          onClick={handleUpload}
          className="bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-700"
        >
          {loading
            ? "Uploading..."
            : "Upload File"}
        </button>

      </div>

    </div>
  );
}

export default UploadBox;