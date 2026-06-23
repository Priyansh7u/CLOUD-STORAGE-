import { useState, useEffect } from "react";

function Header() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div
      className="p-3 sm:p-4 lg:p-5 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-between sticky top-0 z-40 transition-all duration-300"
      style={{
        borderBottom: '1px solid rgba(99, 102, 241, 0.15)',
        background: scrolled ? 'rgba(10, 10, 15, 0.95)' : 'rgba(10, 10, 15, 0.8)',
        backdropFilter: 'blur(20px)',
        fontFamily: "'Inter', sans-serif",
      }}>
      
      {/* Search Bar with Animation */}
      <div className="relative w-full sm:w-[320px] md:w-[360px] lg:w-[400px] group">
        <div className={`absolute -inset-1 rounded-lg sm:rounded-xl opacity-0 transition-all duration-500 blur-xl ${searchFocused ? 'opacity-100' : 'group-hover:opacity-50'}`}
          style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3))' }} />
        
        <div className="relative">
          <svg
            width="16" height="16" className="sm:w-[18px] sm:h-[18px]"
            viewBox="0 0 24 24" fill="none"
            stroke={searchFocused ? '#8b5cf6' : '#64748b'}
            strokeWidth="2" strokeLinecap="round"
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 transition-all duration-300">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            placeholder="Search files, notes, videos..."
            className="w-full pl-9 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 rounded-lg sm:rounded-xl outline-none text-xs sm:text-sm transition-all duration-300"
            style={{
              background: 'rgba(15, 15, 25, 0.8)',
              color: '#f1f5f9',
              border: `1px solid ${searchFocused ? 'rgba(139, 92, 246, 0.5)' : 'rgba(99, 102, 241, 0.15)'}`,
              boxShadow: searchFocused ? '0 0 20px rgba(139, 92, 246, 0.15)' : 'none',
            }}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 hidden sm:block">
            <kbd className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md font-mono"
              style={{
                background: 'rgba(99, 102, 241, 0.1)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                color: '#64748b',
              }}>
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* User Section */}
      <div className="flex gap-2 sm:gap-3 items-center w-full sm:w-auto justify-end">
        <div className="relative group cursor-pointer">
          <div className="absolute inset-0 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-md"
            style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2))' }} />
          <div className="relative flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm transition-all duration-300 hover:scale-105"
            style={{
              background: 'rgba(15, 15, 25, 0.8)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              color: '#f1f5f9',
            }}>
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center text-xs sm:text-sm font-bold relative flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: 'white',
                fontFamily: "'JetBrains Mono', monospace",
                boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)',
              }}>
              P
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border-2 border-black"
                style={{ background: '#10b981' }} />
            </div>
            <span className="hidden sm:inline font-medium">Priyanshu</span>
            <svg width="12" height="12" className="sm:w-[14px] sm:h-[14px] hidden sm:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>

        <button
          onClick={logout}
          className="relative group px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105"
          style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#ef4444',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
            e.currentTarget.style.boxShadow = '0 0 30px rgba(239, 68, 68, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
          <span className="flex items-center gap-1.5 sm:gap-2">
            <svg width="14" height="14" className="sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
            <span className="hidden xs:inline">Logout</span>
          </span>
        </button>
      </div>
    </div>
  );
}

export default Header;