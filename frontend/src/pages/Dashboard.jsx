import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import UploadBox from "../components/UploadBox";
import Gallery from "./Gallery";
import { useState, useEffect } from "react";

function Dashboard() {
  const [greeting, setGreeting] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const statsData = [
    { 
      label: 'Total Files', 
      value: '---', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 3v5h5M6 9h12M6 13h12M6 17h8" />
        </svg>
      ),
      trend: '+12.5%', 
      color: '#6366f1' 
    },
    { 
      label: 'Storage Used', 
      value: '--- GB', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        </svg>
      ),
      trend: '+3.2%', 
      color: '#8b5cf6' 
    },
    { 
      label: 'Shared Files', 
      value: '---', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      ),
      trend: '+8.7%', 
      color: '#3b82f6' 
    },
    { 
      label: 'Downloads', 
      value: '---', 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
        </svg>
      ),
      trend: '+24.3%', 
      color: '#06b6d4' 
    },
  ];

  const recentFilesData = [
    { 
      name: 'Project_Report.pdf', 
      type: 'PDF', 
      size: '2.4 MB', 
      time: '2 hours ago',
      color: '#6366f1',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3.5h8l4 4V20a.5.5 0 0 1-.5.5h-11A.5.5 0 0 1 6 20V4a.5.5 0 0 1 0-.5z" />
          <path d="M9 13h6M9 16.5h4" />
        </svg>
      )
    },
    { 
      name: 'Vacation_Photo.png', 
      type: 'Image', 
      size: '5.1 MB', 
      time: '5 hours ago',
      color: '#8b5cf6',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      name: 'Tutorial_Video.mp4', 
      type: 'Video', 
      size: '128 MB', 
      time: '1 day ago',
      color: '#3b82f6',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      name: 'Backup_Files.zip', 
      type: 'Archive', 
      size: '45 MB', 
      time: '2 days ago',
      color: '#06b6d4',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      )
    },
  ];

  return (
    <div className="flex min-h-screen relative overflow-hidden" style={{ background: "#0a0a0f", fontFamily: "'Inter', 'SF Pro Display', sans-serif" }}>
      
      {/* Ambient Light Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] rounded-full blur-[100px] sm:blur-[150px] md:blur-[180px] animate-pulse" style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[250px] sm:w-[350px] md:w-[500px] h-[250px] sm:h-[350px] md:h-[500px] rounded-full blur-[100px] sm:blur-[120px] md:blur-[150px] animate-pulse" style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[500px] md:w-[700px] h-[400px] sm:h-[500px] md:h-[700px] rounded-full blur-[150px] sm:blur-[180px] md:blur-[200px] animate-pulse" style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)', animationDelay: '4s' }} />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background: `rgba(99, 102, 241, ${Math.random() * 0.3 + 0.1})`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }} />
        ))}
      </div>

      {/* Mobile Hamburger Menu Button */}
      <button 
        className="lg:hidden fixed top-3 left-3 z-[60] w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: 'rgba(15, 15, 25, 0.9)', border: '1px solid rgba(99, 102, 241, 0.3)', backdropFilter: 'blur(20px)' }}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round">
          {sidebarOpen ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Hidden on mobile by default, shown when toggled */}
      <div className={`
        fixed lg:relative z-[55] transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:block
      `}>
        <Sidebar onNavigate={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative z-10 min-w-0">
        <Header />

        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-6 lg:space-y-8">
            
            {/* Animated Welcome Section */}
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 group cursor-default"
              style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(59, 130, 246, 0.05) 100%)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                backdropFilter: 'blur(20px)',
              }}>
              
              {/* Animated Grid Background */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)', backgroundSize: '40px 40px', '@media (min-width: 640px)': { backgroundSize: '60px 60px' } }} />

              {/* Glowing Orb */}
              <div className="absolute -top-10 -right-10 sm:-top-20 sm:-right-20 w-20 h-20 sm:w-40 sm:h-40 rounded-full blur-2xl sm:blur-3xl animate-pulse" style={{ background: 'rgba(99, 102, 241, 0.3)' }} />

              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 sm:gap-4">
                <div className="w-full lg:w-auto">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center animate-glow flex-shrink-0" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 30px rgba(99, 102, 241, 0.4)' }}>
                      <svg width="18" height="18" sm-width="20" sm-height="20" md-width="24" md-height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium" style={{ color: '#a5b4fc' }}>{greeting}</p>
                      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-200 bg-clip-text text-transparent truncate" style={{ fontFamily: "'Clash Display', 'SF Pro Display', sans-serif" }}>
                        Welcome back, Priyanshu
                      </h2>
                    </div>
                  </div>
                  <p style={{ color: '#94a3b8' }} className="text-xs sm:text-sm lg:text-base">
                    Your private cloud is secure and synced across all devices
                  </p>
                </div>

                <div className="flex items-center gap-4 sm:gap-6 w-full lg:w-auto justify-between lg:justify-end">
                  <div className="text-right">
                    <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p className="text-[10px] sm:text-xs" style={{ color: '#64748b' }}>
                      {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid with Glassmorphism */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              {statsData.map((stat, index) => (
                <div key={index} className="group relative p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl sm:rounded-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden"
                  style={{ background: 'rgba(15, 15, 25, 0.8)', border: '1px solid rgba(99, 102, 241, 0.15)', backdropFilter: 'blur(20px)' }}>
                  
                  {/* Hover Gradient Border */}
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, ${stat.color}20, transparent 50%, ${stat.color}10)` }} />

                  {/* Animated Corner Glow */}
                  <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 blur-2xl" style={{ background: stat.color }} />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`, border: `1px solid ${stat.color}30`, color: stat.color }}>
                        {stat.icon}
                      </div>
                      <span className="text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full backdrop-blur-md whitespace-nowrap" style={{ color: stat.color, background: `${stat.color}15`, border: `1px solid ${stat.color}30`, fontFamily: "'JetBrains Mono', monospace" }}>
                        {stat.trend}
                      </span>
                    </div>
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-0.5 sm:mb-1 tracking-tight truncate" style={{ color: '#f1f5f9', fontFamily: "'Inter', sans-serif" }}>
                      {stat.value}
                    </p>
                    <p className="text-[10px] sm:text-xs lg:text-sm truncate" style={{ color: '#94a3b8' }}>
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Upload Section with Glowing Border */}
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.4), rgba(139, 92, 246, 0.4), rgba(59, 130, 246, 0.4))' }} />
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden" style={{ background: 'rgba(15, 15, 25, 0.9)', border: '1px solid rgba(99, 102, 241, 0.2)', backdropFilter: 'blur(20px)' }}>
                <UploadBox />
              </div>
            </div>

            {/* Gallery Section */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center animate-glow flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2))', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                  <svg width="16" height="16" sm-width="20" sm-height="20" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold" style={{ color: '#f1f5f9', fontFamily: "'Clash Display', sans-serif" }}>
                    Gallery
                  </h2>
                  <p style={{ color: '#94a3b8', fontSize: '0.75rem' }} className="text-xs sm:text-sm">
                    Your uploaded files appear here
                  </p>
                </div>
              </div>

              <div className="rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6" style={{ background: 'rgba(15, 15, 25, 0.8)', border: '1px solid rgba(99, 102, 241, 0.15)', backdropFilter: 'blur(20px)' }}>
                <Gallery />
              </div>
            </div>

            {/* Recent Files with Timeline Effect */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center animate-glow flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2))', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                    <svg width="16" height="16" sm-width="20" sm-height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold" style={{ color: '#f1f5f9', fontFamily: "'Clash Display', sans-serif" }}>
                      Recent Files
                    </h2>
                    <p style={{ color: '#94a3b8', fontSize: '0.75rem' }} className="text-xs sm:text-sm">
                      Last 7 days activity
                    </p>
                  </div>
                </div>
                <button className="relative text-xs sm:text-sm font-semibold transition-all duration-300 hover:translate-x-2 group flex items-center gap-2" style={{ color: '#6366f1' }}>
                  View All
                  <svg width="14" height="14" sm-width="16" sm-height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="transition-transform group-hover:translate-x-1">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                {recentFilesData.map((file, index) => (
                  <div key={index} className="group relative p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
                    style={{ background: 'rgba(15, 15, 25, 0.8)', border: '1px solid rgba(99, 102, 241, 0.15)', backdropFilter: 'blur(20px)' }}>
                    
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, ${file.color}10, transparent 60%)` }} />

                    <div className="relative z-10">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 flex-shrink-0" style={{ background: `linear-gradient(135deg, ${file.color}20, ${file.color}10)`, border: `1px solid ${file.color}30`, color: file.color }}>
                          {file.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate mb-1 text-sm sm:text-base" style={{ color: '#f1f5f9' }}>
                            {file.name}
                          </h3>
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-md font-medium" style={{ color: file.color, background: `${file.color}15`, border: `1px solid ${file.color}30` }}>
                              {file.type}
                            </span>
                            <span className="text-[10px] sm:text-xs" style={{ color: '#64748b' }}>
                              {file.size}
                            </span>
                          </div>
                          <p className="text-[10px] sm:text-xs flex items-center gap-1" style={{ color: '#64748b' }}>
                            <svg width="10" height="10" sm-width="12" sm-height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                              <circle cx="12" cy="12" r="10" />
                              <polyline points="12 6 12 12 16 14" />
                            </svg>
                            {file.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Floating Action Button with Pulse Animation */}
      <button className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-10 lg:right-10 z-50 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 animate-glow"
        style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #3b82f6)', boxShadow: '0 8px 40px rgba(99, 102, 241, 0.5), 0 0 80px rgba(139, 92, 246, 0.3)' }}>
        <svg width="20" height="20" sm-width="24" sm-height="24" lg-width="28" lg-height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl animate-ping opacity-20" style={{ background: '#6366f1' }} />
      </button>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.5); }
        }
        .animate-float {
          animation: float linear infinite;
        }
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.2);
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.4);
        }
        @media (min-width: 1024px) {
          .scrollbar-thin::-webkit-scrollbar {
            width: 6px;
          }
        }
      `}</style>
    </div>
  );
}

export default Dashboard;