import { useEffect, useState } from "react";
import {
  getFiles,
  deleteFile
} from "../services/fileService";

function Gallery() {

  const [files, setFiles] =
    useState([]);

  const [selectedFile,
    setSelectedFile] =
    useState(null);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles =
    async () => {

      try {

        const data =
          await getFiles();

        setFiles(
          data.files || []
        );

      } catch (error) {

        console.log(error);

      }

    };

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this file?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteFile(id);

        setFiles(
          files.filter(
            (file) =>
              file._id !== id
          )
        );

      } catch (error) {

        console.log(error);

        alert(
          "Delete Failed"
        );

      }

    };

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        Gallery ({files.length})
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

        {files.map((file) => (

          <div
            key={file._id}
            className="
            relative
            bg-slate-900
            p-4
            rounded-2xl
            "
          >

            <button
              onClick={() =>
                handleDelete(
                  file._id
                )
              }
              className="
              absolute
              top-2
              right-2
              bg-red-600
              px-3
              py-1
              rounded-lg
              z-10
              "
            >
              🗑
            </button>

            {file.fileType?.startsWith(
              "image"
            ) ? (

              <img
                src={file.url}
                alt={file.name}
                className="
                w-full
                h-48
                object-cover
                rounded-xl
                cursor-pointer
                "
                onClick={() =>
                  setSelectedFile(
                    file
                  )
                }
              />

            ) : file.fileType?.startsWith(
              "video"
            ) ? (

              <video
                className="
                w-full
                h-48
                rounded-xl
                cursor-pointer
                "
                onClick={() =>
                  setSelectedFile(
                    file
                  )
                }
              >
                <source
                  src={file.url}
                  type={
                    file.fileType
                  }
                />
              </video>

            ) : (

              <div
                className="
                h-48
                flex
                items-center
                justify-center
                text-6xl
                cursor-pointer
                "
                onClick={() =>
                  window.open(
                    file.url,
                    "_blank"
                  )
                }
              >
                📄
              </div>

            )}

            <p className="mt-3 truncate text-sm">
              {file.name}
            </p>

          </div>

        ))}

      </div>

      {selectedFile && (

        <div
          className="
          fixed
          inset-0
          bg-black/90
          flex
          items-center
          justify-center
          z-50
          "
          onClick={() =>
            setSelectedFile(
              null
            )
          }
        >

          <div
            className="
            max-w-6xl
            max-h-[90vh]
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="
              mb-4
              bg-red-600
              px-4
              py-2
              rounded-lg
              "
              onClick={() =>
                setSelectedFile(
                  null
                )
              }
            >
              Close
            </button>

            {selectedFile.fileType?.startsWith(
              "image"
            ) ? (

              <img
                src={
                  selectedFile.url
                }
                alt={
                  selectedFile.name
                }
                className="
                max-h-[80vh]
                max-w-[90vw]
                rounded-xl
                "
              />

            ) : selectedFile.fileType?.startsWith(
              "video"
            ) ? (

              <video
                controls
                autoPlay
                className="
                max-h-[80vh]
                max-w-[90vw]
                rounded-xl
                "
              >
                <source
                  src={
                    selectedFile.url
                  }
                  type={
                    selectedFile.fileType
                  }
                />
              </video>

            ) : (

              <iframe
                src={
                  selectedFile.url
                }
                title={
                  selectedFile.name
                }
                className="
                w-[90vw]
                h-[80vh]
                bg-white
                "
              />

            )}

          </div>

        </div>

      )}

    </div>
  );
}

export default Gallery;