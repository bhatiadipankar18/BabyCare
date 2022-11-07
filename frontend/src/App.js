import { Routes, Route } from "react-router-dom"
import Home from "./page/Home"
import Login from "./page/Login"
import Register from "./page/Register"
import Feeding from "./page/Feeding"
import { ProfilePage } from "./page/Profile";

import PoemList from "./page/PoemList"
import PoemDetail from "./page/PoemDetail"
import { ProtectedLayout } from "./components/ProtectedLayout";
import { HomeLayout } from "./components/HomeLayout";
import 'antd/dist/antd.min.css'

function App() {

    return (
        <Routes>
            <Route path="/" element={<HomeLayout />}>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
            </Route>
            <Route path="/dashboard" element={<ProtectedLayout />}>
                {/*<Route path="/" element={<Home />}></Route>*/}
                <Route path="profile" element={<ProfilePage />} />
                <Route path="feeding" element={<Feeding />}></Route>
                <Route path="poemList" element={<PoemList />}></Route>
                <Route path="poemList/:id" element={<PoemDetail />}></Route>
            </Route>
        </Routes>
    );
}




export default App;