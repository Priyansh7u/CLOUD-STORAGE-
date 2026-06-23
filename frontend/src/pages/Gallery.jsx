import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket";
import {
  getFiles,
  deleteFile,
} from "../services/fileService";

function Gallery() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    loadFiles();

    socket.on("fileUploaded", () => {
      loadFiles();
    });

    socket.on("fileDeleted", () => {
      loadFiles();
    });

    return () => {
      socket.off("fileUploaded");
      socket.off("fileDeleted");
    };
  }, []);

  const loadFiles = async () => {
    try {
      const data = await getFiles();
      setFiles(data.files || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShare = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const API = import.meta.env.VITE_API_URL;
      const response = await axios.post(
        `${API}/api/files/share/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigator.clipboard.writeText(response.data.shareLink);
      alert("Share link copied!");
    } catch (error) {
      console.log(error);
      alert("Share failed");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this file?");
    if (!confirmDelete) return;

    try {
      await deleteFile(id);
      setFiles(files.filter((file) => file._id !== id));
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  return (
    <div>
      {files.length === 0 ? (
        /* Empty State - Modern & Beautiful */
        <div className="text-center py-20">
          <div className="relative inline-block mb-8">
            <div className="w-28 h-28 rounded-3xl flex items-center justify-center relative z-10 animate-glow"
              style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.1))',
                border: '1px solid rgba(99, 102, 241, 0.2)',
              }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center animate-bounce"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 8px 25px rgba(99, 102, 241, 0.5)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-3" style={{ color: '#f1f5f9', fontFamily: "'Clash Display', sans-serif" }}>
            Your Gallery Awaits
          </h3>
          <p className="text-base max-w-md mx-auto" style={{ color: '#94a3b8' }}>
            Upload your first file to see it beautifully displayed here
          </p>
        </div>
      ) : (
        /* Gallery Grid - Stunning Layout */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {files.map((file, index) => (
            <div
              key={file._id}
              className="group relative rounded-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden"
              style={{
                background: 'rgba(10, 10, 15, 0.9)',
                border: '1px solid rgba(99, 102, 241, 0.15)',
                animation: `fadeInUp 0.5s ease-out ${index * 0.08}s both`,
              }}>
              
              {/* Hover Glow Border */}
              <div className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3))' }} />

              {/* File Preview Area */}
              <div className="relative overflow-hidden rounded-t-2xl" style={{ height: '240px', background: '#0a0a0f' }}>
                
                {file.fileType?.startsWith("image") ? (
                  <>
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onClick={() => setSelectedFile(file)}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                      style={{ background: 'linear-gradient(to top, rgba(10, 10, 15, 0.95) 0%, rgba(10, 10, 15, 0.2) 50%, transparent 100%)' }} />
                    
                    {/* File Type Badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-md flex items-center gap-1.5"
                      style={{ background: 'rgba(10, 10, 15, 0.8)', border: '1px solid rgba(99, 102, 241, 0.4)', color: '#a5b4fc' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      IMAGE
                    </div>
                  </>
                ) : file.fileType?.startsWith("video") ? (
                  <>
                    <video
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onClick={() => setSelectedFile(file)}>
                      <source src={file.url} type={file.fileType} />
                    </video>
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 backdrop-blur-md"
                        style={{ background: 'rgba(10, 10, 15, 0.7)', border: '2px solid #8b5cf6' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#8b5cf6" stroke="#8b5cf6" strokeWidth="1">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </div>
                    </div>

                    {/* Video Badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-md flex items-center gap-1.5"
                      style={{ background: 'rgba(10, 10, 15, 0.8)', border: '1px solid rgba(139, 92, 246, 0.4)', color: '#c4b5fd' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      VIDEO
                    </div>
                  </>
                ) : (
                  <>
                    {/* Document Preview */}
                    <div className="w-full h-full flex flex-col items-center justify-center cursor-pointer transition-all duration-500 group-hover:scale-105"
                      style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)' }}
                      onClick={() => setSelectedFile(file)}>
                      <div className="relative mb-4">
                        <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
                          style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                          </svg>
                        </div>
                      </div>
                      <span className="text-xs uppercase tracking-wider px-3 py-1.5 rounded-full font-semibold"
                        style={{ color: '#a5b4fc', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                        {file.fileType?.split('/')[1]?.toUpperCase() || 'FILE'}
                      </span>
                    </div>

                    {/* Document Badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-md flex items-center gap-1.5"
                      style={{ background: 'rgba(10, 10, 15, 0.8)', border: '1px solid rgba(59, 130, 246, 0.4)', color: '#93c5fd' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      DOCUMENT
                    </div>
                  </>
                )}

                {/* Action Buttons - Slide In on Hover */}
                <div className="absolute top-3 right-3 flex gap-2 transform transition-all duration-500 translate-x-20 group-hover:translate-x-0 opacity-0 group-hover:opacity-100">
                  {/* Share Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(file._id);
                    }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110"
                    style={{ background: 'rgba(10, 10, 15, 0.8)', border: '1px solid rgba(99, 102, 241, 0.5)', color: '#a5b4fc' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
                      <polyline points="16 6 12 2 8 6" />
                      <line x1="12" y1="2" x2="12" y2="15" />
                    </svg>
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(file._id);
                    }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110"
                    style={{ background: 'rgba(10, 10, 15, 0.8)', border: '1px solid rgba(239, 68, 68, 0.5)', color: '#fca5a5' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                    </svg>
                  </button>
                </div>

                {/* View Preview Button - Appears on Hover */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                  <button
                    onClick={() => setSelectedFile(file)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold backdrop-blur-md flex items-center gap-2 transition-all duration-300 hover:scale-105"
                    style={{ background: 'rgba(99, 102, 241, 0.3)', border: '1px solid rgba(99, 102, 241, 0.5)', color: '#f1f5f9' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    Preview
                  </button>
                </div>
              </div>

              {/* File Info */}
              <div className="p-4">
                <h3 className="font-semibold truncate mb-2" style={{ color: '#f1f5f9', fontSize: '0.9rem' }}>
                  {file.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2.5 py-1 rounded-lg font-medium"
                    style={{ color: '#94a3b8', background: 'rgba(148, 163, 184, 0.1)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
                    {file.fileType?.split('/')[0]?.toUpperCase() || 'FILE'}
                  </span>
                </div>
              </div>

              {/* Bottom Accent Line */}
              <div className="h-0.5 w-full transition-all duration-500 scale-x-0 group-hover:scale-x-100 origin-left"
                style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6, transparent)' }} />
            </div>
          ))}
        </div>
      )}

      {/* Preview Modal - Premium Design */}
      {selectedFile && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          style={{ background: 'rgba(5, 5, 10, 0.98)', backdropFilter: 'blur(30px)' }}
          onClick={() => setSelectedFile(null)}>
          
          <div
            className="w-full max-w-6xl max-h-[95vh] rounded-3xl overflow-hidden animate-modalIn"
            style={{
              background: 'rgba(15, 15, 25, 0.95)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.6), 0 0 120px rgba(99, 102, 241, 0.15)',
            }}
            onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 sm:p-6" style={{ borderBottom: '1px solid rgba(99, 102, 241, 0.2)' }}>
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 animate-glow"
                  style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2))', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                  {selectedFile.fileType?.startsWith("image") ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  ) : selectedFile.fileType?.startsWith("video") ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold truncate text-lg" style={{ color: '#f1f5f9', fontFamily: "'Clash Display', sans-serif" }}>
                    {selectedFile.name}
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                    {selectedFile.fileType}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Share Button in Modal */}
                <button
                  onClick={() => handleShare(selectedFile._id)}
                  className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
                  style={{ background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.4)', color: '#a5b4fc' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
                    <polyline points="16 6 12 2 8 6" />
                    <line x1="12" y1="2" x2="12" y2="15" />
                  </svg>
                  Share
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedFile(null)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90"
                  style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#fca5a5' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6">
              {selectedFile.fileType?.startsWith("image") ? (
                <div className="flex items-center justify-center rounded-2xl overflow-hidden" style={{ background: '#0a0a0f', minHeight: '400px' }}>
                  <img
                    src={selectedFile.url}
                    alt={selectedFile.name}
                    className="max-h-[70vh] max-w-full object-contain rounded-xl"
                  />
                </div>
              ) : selectedFile.fileType?.startsWith("video") ? (
                <div className="rounded-2xl overflow-hidden" style={{ background: '#0a0a0f' }}>
                  <video controls autoPlay className="max-h-[70vh] w-full rounded-xl" style={{ outline: 'none' }}>
                    <source src={selectedFile.url} type={selectedFile.fileType} />
                  </video>
                </div>
              ) : (
                <iframe
                  src={selectedFile.url}
                  title={selectedFile.name}
                  className="w-full rounded-xl"
                  style={{ height: '70vh', background: '#0a0a0f', border: '1px solid rgba(99, 102, 241, 0.2)' }}
                />
              )}
            </div>

            {/* Modal Footer for Mobile */}
            <div className="p-4 sm:hidden flex gap-3" style={{ borderTop: '1px solid rgba(99, 102, 241, 0.2)' }}>
              <button
                onClick={() => handleShare(selectedFile._id)}
                className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                style={{ background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.4)', color: '#a5b4fc' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
                Share Link
              </button>
              <button
                onClick={() => {
                  handleDelete(selectedFile._id);
                  setSelectedFile(null);
                }}
                className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#fca5a5' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                </svg>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.5); }
        }
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        .animate-modalIn {
          animation: modalIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Gallery;