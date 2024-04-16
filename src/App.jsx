import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import { Container } from "react-bootstrap";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import { SessionContext } from "./components/contexts/SessionContext";
import { useContext } from "react";

function App() {
  const { user } = useContext(SessionContext);

  return (
    <>
      <main>
        <Container>
          <Routes>
            <Route path="/home" element={<Home></Home>}>
              Home
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
              Registro
            </Route>
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
