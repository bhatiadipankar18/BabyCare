import { Routes, Route } from "react-router-dom"
import Home from "./page/Home"
import Login from "./page/Login"
import Register from "./page/Register"
import Feeding from "./page/Feeding"
import 'antd/dist/antd.min.css'

function App() {
    return (
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/Feeding" element={<Feeding />}></Route>
                </Routes>
    );
}




export default App;