import { useState } from "react";
import { uploadFile } from "../services/fileService";

function Upload() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Select a file first");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("file", file);

      const result = await uploadFile(formData);

      console.log(result);

      alert("Upload Success");
    } catch (error) {
      console.log(error);

      alert("Upload Failed");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Personal Cloud Storage</h1>

      <input
        type="file"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <br />
      <br />

      <button onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
}

export default Upload;