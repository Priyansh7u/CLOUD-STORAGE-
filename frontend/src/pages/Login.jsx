import { useState } from "react";
import { login } from "../services/authService";

function Login() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async () => {

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

    }

  };

  return (

    <div className="
    h-screen
    flex
    justify-center
    items-center
    bg-slate-950
    text-white
    ">

      <div className="
      bg-slate-900
      p-10
      rounded-3xl
      w-[400px]
      ">

        <h1 className="
        text-3xl
        font-bold
        mb-6
        ">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
          w-full
          p-3
          mb-4
          rounded-xl
          text-black
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="
          w-full
          p-3
          mb-4
          rounded-xl
          text-black
          "
        />

        <button
          onClick={handleLogin}
          className="
          w-full
          bg-blue-600
          py-3
          rounded-xl
          "
        >
          Login
        </button>

      </div>

    </div>

  );

}

export default Login;