import { Routes, Route } from "react-router-dom"
import HomePage from "./page/HomePage"
import Login from "./page/Login"
import Register from "./page/Register"
import { ProfilePage } from "./page/Profile";

import PoemPage from "./page/PoemPage"
import FeedingPage from "./page/FeedingPage"

import { ProtectedLayout } from "./components/ProtectedLayout";
import { HomeLayout } from "./components/HomeLayout";
import  BasicSelect  from "./components/SelectChild";
import 'antd/dist/antd.min.css'
import './APP.css'

function App() {

    return (
        <Routes>
            <Route path="/" element={<HomeLayout />}>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
            </Route>
            <Route path="/dashboard" element={<ProtectedLayout />}>
                {/*<Route path="/" element={<Home />}></Route>*/}
                <Route path="profile" element={<ProfilePage />} />
                <Route path="feeding" element={<FeedingPage />}></Route>
                <Route path="poemList" element={<PoemPage />}></Route>
                <Route path="test" element={<BasicSelect />} />
            </Route>
        </Routes>
    );
}




export default App;