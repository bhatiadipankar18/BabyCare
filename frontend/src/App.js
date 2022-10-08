import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Register from './page/Register'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
