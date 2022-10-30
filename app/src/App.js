import React from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import LoginAndSignuUp from './LoginAndSignuUp';
import FeedingChart from './FeedingChart';
import FeedingEntryEdit from './FeedingEntryEdit';
import Logout from './Logout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<LoginAndSignuUp/>}/>
        <Route path='/feedingchart' exact={true} element={<FeedingChart/>}/>
        <Route path='/feedingchart/:id' element={<FeedingEntryEdit/>}/>
        <Route path='/logout' element={<Logout/>} />
      </Routes>
    </Router>
  )
}

export default App;
