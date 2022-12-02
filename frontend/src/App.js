import { Routes, Route } from "react-router-dom"
import HomePage from "./page/HomePage"
import LoginPage from "./page/LoginPage"
import RegisterPage from "./page/RegisterPage"
import UploadFilePage from "./page/UploadFiles"
import MusicPage from "./page/MusicPage"

import MedicinePage from "./page/MedicinePage"
import PoemPage from "./page/PoemPage"
import FeedingPage from "./page/FeedingPage"
import ManageChildPage from "./page/ManageChildPage";

import VaccinePage from "./page/VaccinePage";

import AllergyPage from "./page/AllergyPage"
import HistoryPage from "./page/HistoryPage"


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
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/register" element={<RegisterPage />}></Route>
            </Route>
            <Route path="/dashboard" element={<ProtectedLayout />}>
                <Route path="manageChild" element={<ManageChildPage />} />
                <Route path="feeding" element={<FeedingPage />}></Route>
                <Route path="poemList" element={<PoemPage />}></Route>
                <Route path="test" element={<BasicSelect />} />
                <Route path="upload" element={<UploadFilePage />}></Route>
                <Route path="music" element={<MusicPage />}></Route>

                <Route path="vaccine" element={<VaccinePage />}></Route>
                <Route path="medicineList" element={<MedicinePage />}></Route>
                <Route path="allergyList" element={<AllergyPage />}></Route>
                <Route path="HistoryList" element={<HistoryPage />}></Route>

            </Route>
        </Routes>
    );
}




export default App;