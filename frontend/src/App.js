import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/Header"
import Register from "../src/pages/Register"
import Login from "../src/pages/Login"
import Dashboard from "../src/pages/Dashboard"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App