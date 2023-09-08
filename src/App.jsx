import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import LoginPage from "./components/Login/LoginPage";
import { AuthProvider } from "./context/useAuth";
import Dashboard from "./components/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import MyTodo from "./components/My-todo/MyTodo";
import Projects from "./components/Projects/Projects";

function App() {
  return (
    <div className="flex ">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-todo" element={<MyTodo />} />
          <Route path="projects/:projectName" element={<Projects />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
