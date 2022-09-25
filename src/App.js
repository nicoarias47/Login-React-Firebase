import { Routes, Route } from "react-router-dom";
import { Home } from "./views/Home";
import { Register } from "./views/Register";
import { Login } from "./views/Login";

import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <div className="bg-slate-300 h-screen text-black flex">
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
