import { useState, useRef } from "react";
import { uploadFile } from "../services/fileService";

function UploadBox() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Select a file first");
      return;
    }

    try {
      setLoading(true);
      setStatus(null);
      setUploadProgress(0);

      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 30;
        });
      }, 300);

      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadFile(formData);
      console.log(result);

      clearInterval(progressInterval);
      setUploadProgress(100);
      setStatus("success");
      setFile(null);
      
      setTimeout(() => {
        setUploadProgress(0);
        setStatus(null);
      }, 3000);
    } catch (error) {
      console.log(error);
      setStatus("error");
      setUploadProgress(0);
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      setFile(e.dataTransfer.files[0]);
      setStatus(null);
    }
  };

  return (
    <div className="p-8 rounded-2xl" style={{ background: 'rgba(10, 10, 15, 0.6)', fontFamily: "'Inter', sans-serif" }}>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center animate-glow"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 30px rgba(99, 102, 241, 0.4)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <path d="M7 16a4 4 0 0 1-.88-7.9A5 5 0 0 1 15.9 6 5 5 0 0 1 16.9 16" />
            <path d="M12 11v8M9 14l3-3 3 3" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold" style={{ color: '#f1f5f9', fontFamily: "'Clash Display', sans-serif" }}>
            Upload files
          </h2>
          <p className="text-sm mt-1" style={{ color: '#94a3b8' }}>
            Store images, videos, PDFs and notes
          </p>
        </div>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className="mt-6 p-12 rounded-2xl text-center transition-all duration-300 cursor-pointer relative overflow-hidden group"
        style={{
          border: `2px dashed ${isDragging ? '#8b5cf6' : 'rgba(99, 102, 241, 0.3)'}`,
          background: isDragging ? 'rgba(99, 102, 241, 0.08)' : 'rgba(15, 15, 25, 0.5)',
        }}
        onClick={() => fileInputRef.current?.click()}>
        
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.05) 0%, transparent 70%)' }} />

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {['📄', '🖼️', '🎥', '📁'].map((icon, i) => (
            <span key={i} className="absolute text-2xl opacity-20 animate-float"
              style={{
                left: `${20 + i * 25}%`,
                top: `${20 + (i % 2) * 30}%`,
                animationDuration: `${3 + i}s`,
                animationDelay: `${i * 0.5}s`,
              }}>
              {icon}
            </span>
          ))}
        </div>

        <div className="relative z-10">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${isDragging ? 'scale-110' : 'group-hover:scale-105'}`}
            style={{
              background: isDragging ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(99, 102, 241, 0.1)',
              border: `1px solid ${isDragging ? 'transparent' : 'rgba(99, 102, 241, 0.3)'}`,
            }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
              stroke={isDragging ? 'white' : '#8b5cf6'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 16a4 4 0 0 1-.88-7.9A5 5 0 0 1 15.9 6 5 5 0 0 1 16.9 16" />
              <path d="M12 11v8M9 14l3-3 3 3" />
            </svg>
          </div>

          <p className="text-base font-semibold mb-1" style={{ color: '#f1f5f9' }}>
            {isDragging ? 'Drop your file here' : 'Drag & drop files here'}
          </p>
          <p className="text-xs mb-6" style={{ color: '#94a3b8' }}>
            or choose a file from your device
          </p>

          <button
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: 'white',
              boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
            }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
            </svg>
            Browse file
          </button>

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setStatus(null);
            }}
          />

          {file && (
            <div className="mt-6 inline-flex items-center gap-3 px-4 py-2 rounded-xl"
              style={{
                background: 'rgba(99, 102, 241, 0.1)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
              }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round">
                <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" />
                <polyline points="13 2 13 9 20 9" />
              </svg>
              <span className="text-sm font-medium" style={{ color: '#f1f5f9' }}>{file.name}</span>
              <span className="text-xs" style={{ color: '#8b5cf6', fontFamily: "'JetBrains Mono', monospace" }}>
                · {(file.size / 1024).toFixed(0)} KB
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); setFile(null); }}
                className="ml-2 w-5 h-5 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Upload Progress Bar */}
      {loading && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium" style={{ color: '#f1f5f9' }}>Uploading...</span>
            <span className="text-sm font-bold" style={{ color: '#8b5cf6', fontFamily: "'JetBrains Mono', monospace" }}>
              {Math.round(uploadProgress)}%
            </span>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(15, 15, 25, 0.8)' }}>
            <div className="h-full rounded-full relative overflow-hidden transition-all duration-300"
              style={{ width: `${uploadProgress}%`, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }}>
              <div className="absolute inset-0 animate-shine" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }} />
            </div>
          </div>
        </div>
      )}

      {/* Upload Button */}
      <div className="mt-6">
        <button
          onClick={handleUpload}
          disabled={loading || !file}
          className="w-full py-3 rounded-xl text-sm font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] relative overflow-hidden group"
          style={{
            background: loading ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: 'white',
            boxShadow: '0 8px 30px rgba(99, 102, 241, 0.3)',
          }}>
          <span className="relative z-10 flex items-center justify-center gap-2">
            {loading ? (
              <>
                <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
                Uploading…
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M7 16a4 4 0 0 1-.88-7.9A5 5 0 0 1 15.9 6 5 5 0 0 1 16.9 16M12 11v8M9 14l3-3 3 3" />
                </svg>
                Upload file
              </>
            )}
          </span>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />
        </button>
      </div>

      {/* Status Messages */}
      {status === "success" && (
        <div className="mt-4 flex items-center gap-2 p-3 rounded-xl animate-fadeIn"
          style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <span className="text-sm font-medium" style={{ color: '#10b981' }}>
            Upload complete — added to your vault.
          </span>
        </div>
      )}
      {status === "error" && (
        <div className="mt-4 flex items-center gap-2 p-3 rounded-xl animate-fadeIn"
          style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          <span className="text-sm font-medium" style={{ color: '#ef4444' }}>
            Upload failed — check your connection and try again.
          </span>
        </div>
      )}
    </div>
  );
}

export default UploadBox;