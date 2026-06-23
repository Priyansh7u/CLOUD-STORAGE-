import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PublicFile() {

  const { shareId } = useParams();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  const API =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000";

  useEffect(() => {

    fetchFile();

  }, [shareId]);

  const fetchFile = async () => {

    try {

      const response =
        await axios.get(
          `${API}/api/files/public/${shareId}`
        );

      setFile(
        response.data.file
      );

    } catch (error) {

      console.log(error);

      setFile(null);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (
      <div className="
      h-screen
      flex
      items-center
      justify-center
      bg-slate-950
      text-white
      ">
        Loading...
      </div>
    );

  }

  if (!file) {

    return (
      <div className="
      h-screen
      flex
      items-center
      justify-center
      bg-slate-950
      text-white
      ">
        File Not Found
      </div>
    );

  }

  return (

    <div className="
    min-h-screen
    bg-slate-950
    text-white
    p-10
    ">

      <div className="
      max-w-5xl
      mx-auto
      bg-slate-900
      rounded-3xl
      p-8
      ">

        <h1 className="
        text-3xl
        font-bold
        mb-6
        ">
          Shared File
        </h1>

        <p className="
        text-xl
        mb-6
        break-all
        ">
          {file.name}
        </p>

        {file.fileType?.startsWith("image") && (

          <img
            src={file.url}
            alt={file.name}
            className="
            w-full
            rounded-2xl
            "
          />

        )}

        {file.fileType?.startsWith("video") && (

          <video
            controls
            className="
            w-full
            rounded-2xl
            "
          >
            <source
              src={file.url}
              type={file.fileType}
            />
          </video>

        )}

        {file.fileType?.includes("pdf") && (

          <iframe
            src={file.url}
            title={file.name}
            className="
            w-full
            h-[800px]
            rounded-2xl
            "
          />

        )}

        {!file.fileType?.startsWith("image") &&
         !file.fileType?.startsWith("video") &&
         !file.fileType?.includes("pdf") && (

          <div className="
          text-center
          text-8xl
          py-10
          ">
            📄
          </div>

        )}

        <div className="mt-8">

          <a
            href={file.url}
            target="_blank"
            rel="noreferrer"
            className="
            bg-blue-600
            px-6
            py-3
            rounded-xl
            inline-block
            "
          >
            Download File
          </a>

        </div>

      </div>

    </div>

  );

}
export default PublicFile;