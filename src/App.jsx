import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import { Container } from "react-bootstrap";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import { SessionContext } from "./components/contexts/SessionContext";
import { useContext } from "react";
import Header from "./components/header/Header";
import GoodFooter from "./components/footer/Footer";
import Landing from "./pages/landing/Landing";
import AdminUsers from "./pages/admin-users/Admin-users";


function App() {
  const { user } = useContext(SessionContext);
  
  return (
    <>
      <Header></Header>
      <main>
        <Container>
          <Routes>
            <Route path="/" element={user ? "" : <Landing></Landing>}></Route>
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
              element={user ? <Navigate to="/home"></Navigate> : <Login></Login>}>
              {/* element={<Login></Login>}> */}
              Registro
            </Route>
          </Routes>
        </Container>
      </main>
      <GoodFooter></GoodFooter>
    </>
  );
}

export default App;
