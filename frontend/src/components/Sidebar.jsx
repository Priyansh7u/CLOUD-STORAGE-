import { Link, useLocation } from "react-router-dom";

function Icon({ name, active }) {
  const common = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: active ? '#8b5cf6' : '#64748b', strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "home": return <svg {...common}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>;
    case "gallery": return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>;
    case "notes": return <svg {...common}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>;
    case "star": return <svg {...common}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>;
    case "video": return <svg {...common}><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>;
    case "pdf": return <svg {...common}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>;
    default: return null;
  }
}

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/", icon: "home", badge: null },
    { name: "Gallery", path: "/gallery", icon: "gallery", badge: "New" },
    
    { name: "Favorites", path: "/favorites", icon: "star", badge: null },
    
  ];

  return (
    <div
      className="w-72 min-h-screen p-5 flex flex-col relative"
      style={{
        background: 'rgba(10, 10, 15, 0.95)',
        borderRight: '1px solid rgba(99, 102, 241, 0.15)',
        backdropFilter: 'blur(20px)',
        fontFamily: "'Inter', sans-serif",
      }}>
      
      {/* Sidebar Glow Effect */}
      <div className="absolute -right-10 top-1/4 w-20 h-40 blur-3xl opacity-20"
        style={{ background: 'linear-gradient(180deg, #6366f1, #8b5cf6)' }} />

      {/* Logo Section */}
      <div className="mb-10 relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center relative animate-glow"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              boxShadow: '0 0 30px rgba(99, 102, 241, 0.5)',
            }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
              <path d="M7 18a4.5 4.5 0 0 1-1-8.9A5.5 5.5 0 0 1 16.7 7 4.5 4.5 0 0 1 17 18H7z" />
            </svg>
            <div className="absolute inset-0 rounded-xl animate-ping opacity-20"
              style={{ background: '#6366f1' }} />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-200 bg-clip-text text-transparent"
              style={{ fontFamily: "'Clash Display', sans-serif" }}>
              CloudWX
            </h1>
          </div>
        </div>
        <p className="text-xs tracking-widest uppercase" style={{ color: '#64748b', fontFamily: "'JetBrains Mono', monospace" }}>
          Private Storage
        </p>
      </div>

      {/* Navigation */}
      <div className="space-y-1.5 flex-1">
        {menuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden"
              style={{
                background: active ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.1))' : 'transparent',
                border: active ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
              }}
              onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.background = 'rgba(99, 102, 241, 0.08)';
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.background = 'transparent';
              }}>
              
              {/* Active Indicator */}
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full animate-glow"
                  style={{ background: 'linear-gradient(180deg, #6366f1, #8b5cf6)' }} />
              )}

              <span className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <Icon name={item.icon} active={active} />
              </span>
              <span className="text-sm font-medium flex-1" style={{ color: active ? '#f1f5f9' : '#94a3b8' }}>
                {item.name}
              </span>
              
              {item.badge && (
                <span className="text-xs px-2 py-0.5 rounded-full font-bold"
                  style={{
                    background: active ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(99, 102, 241, 0.15)',
                    color: active ? 'white' : '#8b5cf6',
                    border: `1px solid ${active ? 'transparent' : 'rgba(99, 102, 241, 0.3)'}`,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Storage Section with Progress Animation */}
      <div className="rounded-2xl p-5 relative overflow-hidden group cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.05))',
          border: '1px solid rgba(99, 102, 241, 0.2)',
        }}>
        
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), transparent)' }} />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs uppercase tracking-widest font-bold" style={{ color: '#94a3b8', fontFamily: "'JetBrains Mono', monospace" }}>
              Storage
            </h3>
            <span className="text-xs font-bold" style={{ color: '#8b5cf6' }}>35%</span>
          </div>
          
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(15, 15, 25, 0.8)' }}>
            <div className="h-full rounded-full relative overflow-hidden animate-pulse" style={{ width: "35%" }}>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #3b82f6)' }} />
              <div className="absolute inset-0 animate-shine" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }} />
            </div>
          </div>
          
          <p className="text-xs mt-3" style={{ color: '#64748b', fontFamily: "'JetBrains Mono', monospace" }}>
            3.5 GB of 10 GB used
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;