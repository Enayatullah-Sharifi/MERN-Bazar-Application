import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import DashboardScreen from "./screens/DashboardScreen";
import Login from "./screens/LoginScreen";
import { ToastContainer } from "react-toastify";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Header from "./components/Header";
import AddItem from "./screens/AddItem";
import EditItem from "./screens/EditItem";
import UsersScreen from "./screens/UsersScreen";
import ItemDetail from "./screens/ItemDetail";
import VerifyUser from "./screens/VerifyUser";
import AdminPanel from "./screens/AdminPanel";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/item-detail/:id" element={<ItemDetail />} />

          <Route path="/user/:userId/verify/:token" element={<VerifyUser />} />

          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/adminpanel" element={<AdminPanel />} />
            <Route path="/profile/:id" element={<ProfileScreen />} />
            <Route path="/dashboard" element={<DashboardScreen />} />
            <Route path="/additem" element={<AddItem />} />
            <Route path="/edititem/:id" element={<EditItem />} />
            <Route path="/users" element={<UsersScreen />} />
          </Route>
        </Routes>
      </Router>

      <ToastContainer />
    </>
  );
};

export default App;
