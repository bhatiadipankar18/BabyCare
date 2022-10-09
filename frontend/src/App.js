import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Register from './page/Register'
import Login from './page/Login'
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
