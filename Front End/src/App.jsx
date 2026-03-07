import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx"; 
import Students from "./pages/Admin/Student.jsx"; 
import Teachers from "./pages/Admin/Teacher.jsx"; 
import Courses from "./pages/Admin/Course.jsx"; 
import Rooms from "./pages/Admin/Room.jsx";
import Admins from "./pages/Admin/Admins.jsx";
import S_Dashboard from "./pages/Student/S_Dashboard.jsx";
import T_Dashboard from "./pages/Teacher/T_Dashboard.jsx";

function AdminLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, overflowX: 'hidden', backgroundColor: '#f5f7f5' }}>
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} /> 
          <Route path="students" element={<Students />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="courses" element={<Courses />} />
          <Route path="admins" element={<Admins />} />
          <Route path="rooms" element={<Rooms />} />
        </Route>
        <Route path="/student" element={<S_Dashboard />} />
        <Route path="/teacher" element={<T_Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;