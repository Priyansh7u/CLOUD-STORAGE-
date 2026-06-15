import {
 BrowserRouter,
 Routes,
 Route
}
from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Gallery from "./pages/Gallery";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/gallery"
          element={<Gallery />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;