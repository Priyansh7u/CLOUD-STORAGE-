import {
 BrowserRouter,
 Routes,
 Route,
 Navigate
}
from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Gallery from "./pages/Gallery";
import Login from "./pages/Login";
import PublicFile from "./pages/PublicFile";
function App() {

 const token =
 localStorage.getItem("token");

 return (

  <BrowserRouter>

   <Routes>

    <Route
     path="/login"
     element={
      token
      ?
      <Navigate to="/" />
      :
      <Login />
     }
    />

    <Route
     path="/"
     element={
      token
      ?
      <Dashboard />
      :
      <Navigate to="/login" />
     }
    />

    <Route
     path="/gallery"
     element={
      token
      ?
      <Gallery />
      :
      <Navigate to="/login" />
     }
    />

    <Route
  path="/share/:shareId"
  element={<PublicFile />}
/>

   </Routes>

  </BrowserRouter>

 );

}

export default App;