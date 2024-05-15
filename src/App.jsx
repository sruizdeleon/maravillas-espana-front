import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import { SessionContext } from "./contexts/SessionContext";
import { useContext } from "react";
import Header from "./components/header/Header";
import GoodFooter from "./components/footer/Footer";
import Landing from "./pages/landing/Landing";
import AdminUsers from "./pages/admin-users/Admin-users";
import Activity from "./pages/activity/Activity";
import ActivityFormPageCreate from "./pages/activityFormPage/activityFormPageCreate/ActivityFormPageCreate";
import ActivityFormPageEdit from "./pages/activityFormPage/activityFormPageEdit/ActivityFormPageEdit";
import MyProfile from "./pages/my-profile/My-profile";

function App() {
  const { user } = useContext(SessionContext);
  return (
    <>
      <Header></Header>
      <main className="main">
        <div>
          <Routes>
            <Route path="/" element={<Landing></Landing>}></Route>
            <Route path="/home" element={user ? <Home></Home> : ""}></Route>
            <Route
              path="/signup"
              element={user ? "" : <Signup></Signup>}
            ></Route>
            <Route
              path="/login"
              element={
                user ? <Navigate to="/home"></Navigate> : <Login></Login>
              }
            ></Route>
            <Route
              path="/admin-usuarios"
              element={
                user && user.role === "admin" ? <AdminUsers></AdminUsers> : ""
              }
            ></Route>
            <Route path="/activity/:id" element={<Activity></Activity>}></Route>
            <Route path="/mi-perfil" element={user ? <MyProfile></MyProfile> : ""}></Route>
            <Route
              path="/activity-create"
              element={<ActivityFormPageCreate></ActivityFormPageCreate>}
            ></Route>
            <Route
              path="/activity-edit/:id"
              element={<ActivityFormPageEdit></ActivityFormPageEdit>}
            ></Route>
          </Routes>
        </div>
      </main>
      <GoodFooter></GoodFooter>
    </>
  );
}

export default App;
