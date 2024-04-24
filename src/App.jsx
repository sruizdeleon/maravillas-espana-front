import { Routes, Route, Navigate } from "react-router-dom";
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


function App() {
  const { user } = useContext(SessionContext);

  return (
    <>
      <Header></Header>
      <main>
        <Container>
          <Routes>
            <Route path="/home" element={<Home></Home>}>
              Home
            </Route>
          </Routes>
          <Routes>
            <Route path="/" element={<Landing></Landing>}>
              Landing
            </Route>
          </Routes>
          <Routes>
            <Route path="/signup" element={<Signup></Signup>}>
              Registro
            </Route>
          </Routes>
          <Routes>
            <Route
              path="/login"
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
