import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import "antd/dist/antd.css";

import Register from './page/Register'
import Login from './page/Login'
import Home from './page/Home'
import Feeding from './page/Feeding'
import NotFound from './page/NotFound'

function App() {
  return (
    <Router>
      <Switch>
      <Route  exact path="/"  component={Home}/>

        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/feeding" component={Feeding} />
        <Route path="/*" component={NotFound} />


      </Switch>
    </Router>
  );
}

export default App;
