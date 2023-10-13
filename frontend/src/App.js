import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/Header"
import Register from "../src/pages/Register"
import Login from "../src/pages/Login"
import Dashboard from "../src/pages/Dashboard"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from "react-redux";

const App = () => {
  const { user } = useSelector((state) => state.auth)

  return (
    <>
      <Router>
        {user && <Header />}
        <Routes>
          <Route path="/" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App