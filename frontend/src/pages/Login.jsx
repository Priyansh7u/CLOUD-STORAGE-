import { useState } from "react";
import { login } from "../services/authService";

function Login() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(false);

  const handleLogin = async () => {

    setIsLoading(true);

    try {

      const data = await login({
        email,
        password
      });

      console.log("LOGIN RESPONSE:", data);

      localStorage.setItem(
        "token",
        data.token
      );

      console.log(
        "TOKEN SAVED:",
        localStorage.getItem("token")
      );

      window.location.replace("/");

    } catch (error) {

      console.log(error);

      alert("Login Failed");

      setIsLoading(false);

    }

  };

  return (

    <div className="
    min-h-screen
    relative
    overflow-hidden
    bg-gradient-to-br
    from-slate-950
    via-indigo-950
    to-slate-950
    flex
    justify-center
    items-center
    p-4
    sm:p-6
    ">

      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="
        absolute
        -top-40
        -right-40
        w-80
        h-80
        bg-purple-600
        rounded-full
        mix-blend-multiply
        filter
        blur-[100px]
        opacity-20
        animate-pulse
        "></div>
        <div className="
        absolute
        -bottom-40
        -left-40
        w-80
        h-80
        bg-blue-600
        rounded-full
        mix-blend-multiply
        filter
        blur-[100px]
        opacity-20
        animate-pulse
        " style={{animationDelay: '2s'}}></div>
        <div className="
        absolute
        top-1/2
        left-1/2
        -translate-x-1/2
        -translate-y-1/2
        w-80
        h-80
        bg-indigo-600
        rounded-full
        mix-blend-multiply
        filter
        blur-[100px]
        opacity-20
        animate-pulse
        " style={{animationDelay: '4s'}}></div>
      </div>

      {/* Grid Background */}
      <div className="
      absolute
      inset-0
      opacity-20
      " style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), 
                         linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
        backgroundSize: '4rem 4rem'
      }}></div>

      {/* Main Login Card */}
      <div className="
      relative
      w-full
      max-w-md
      backdrop-blur-xl
      bg-white/10
      border
      border-white/20
      rounded-3xl
      shadow-2xl
      p-8
      sm:p-10
      transform
      transition-all
      duration-300
      hover:scale-[1.02]
      ">

        {/* Top Decorative Line */}
        <div className="
        absolute
        top-0
        left-1/2
        -translate-x-1/2
        w-32
        h-1
        bg-gradient-to-r
        from-purple-500
        via-blue-500
        to-indigo-500
        rounded-full
        "></div>

        {/* Header */}
        <div className="text-center mb-8">
          
          {/* Icon */}
          <div className="
          inline-flex
          items-center
          justify-center
          w-16
          h-16
          sm:w-20
          sm:h-20
          bg-gradient-to-br
          from-purple-500
          to-blue-600
          rounded-2xl
          mb-6
          shadow-lg
          shadow-purple-500/30
          ">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>

          {/* Title */}
          <h1 className="
          text-3xl
          sm:text-4xl
          font-bold
          bg-gradient-to-r
          from-white
          via-purple-200
          to-blue-200
          bg-clip-text
          text-transparent
          mb-2
          ">
            Login
          </h1>

          {/* Subtitle */}
          <p className="text-slate-400 text-sm sm:text-base">
            Welcome back! Please login to your account
          </p>

        </div>

        {/* Form */}
        <div className="space-y-5">

          {/* Email Input */}
          <div className="relative group">
            <div className="
            absolute
            inset-y-0
            left-0
            pl-4
            flex
            items-center
            pointer-events-none
            ">
              <svg className="w-5 h-5 text-slate-400 group-focus-within:text-purple-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
              w-full
              pl-12
              pr-4
              py-4
              bg-white/5
              border
              border-white/10
              rounded-2xl
              text-white
              text-base
              placeholder-slate-500
              focus:outline-none
              focus:border-purple-500
              focus:ring-2
              focus:ring-purple-500/20
              focus:bg-white/10
              transition-all
              duration-300
              "
            />
          </div>

          {/* Password Input */}
          <div className="relative group">
            <div className="
            absolute
            inset-y-0
            left-0
            pl-4
            flex
            items-center
            pointer-events-none
            ">
              <svg className="w-5 h-5 text-slate-400 group-focus-within:text-purple-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="
              w-full
              pl-12
              pr-4
              py-4
              bg-white/5
              border
              border-white/10
              rounded-2xl
              text-white
              text-base
              placeholder-slate-500
              focus:outline-none
              focus:border-purple-500
              focus:ring-2
              focus:ring-purple-500/20
              focus:bg-white/10
              transition-all
              duration-300
              "
            />
          </div>

          {/* Login Button with Loading Animation */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="
            w-full
            relative
            overflow-hidden
            bg-gradient-to-r
            from-purple-600
            to-blue-600
            text-white
            py-4
            rounded-2xl
            font-semibold
            text-base
            shadow-lg
            shadow-purple-500/25
            hover:shadow-purple-500/50
            hover:scale-[1.02]
            active:scale-[0.98]
            transition-all
            duration-300
            group
            mt-2
            disabled:opacity-70
            disabled:cursor-not-allowed
            disabled:hover:scale-100
            "
          >
            {isLoading ? (
              /* Loading Animation */
              <span className="
              relative
              z-10
              flex
              items-center
              justify-center
              gap-3
              ">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Logging in...</span>
              </span>
            ) : (
              /* Normal Button Content */
              <span className="
              relative
              z-10
              flex
              items-center
              justify-center
              gap-2
              ">
                <span>Login</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            )}
            
            {/* Shine Effect */}
            <div className="
            absolute
            inset-0
            bg-gradient-to-r
            from-transparent
            via-white/20
            to-transparent
            -translate-x-full
            group-hover:translate-x-full
            transition-transform
            duration-1000
            "></div>
          </button>

        </div>

        {/* Bottom Decorative Dots */}
        <div className="flex justify-center gap-2 mt-8">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
        </div>

      </div>

    </div>

  );

}

export default Login;