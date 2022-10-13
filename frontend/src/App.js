import { Routes, Route } from "react-router-dom"
import Home from "./page/Home"
import Home2 from "./page/Home2"
import Login from "./page/Login"
import Register from "./page/Register"

function App() {
    return (
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/home2" element={<Home2 />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                </Routes>
    );
}




export default App;