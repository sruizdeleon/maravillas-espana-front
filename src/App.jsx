import { Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css'
import Home from './pages/home/Home';

function App() {

  return (
    <>
      <main>
        <Routes>
          <Route path='/home' element={<Home></Home>}></Route>
        </Routes>
      </main>
    </>
  )
}

export default App
