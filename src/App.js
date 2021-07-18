import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './HomePage'
import LoginCallback from './LoginCallback'
import Logout from './Logout'

function App() {
    return (
      <Router>
      <Switch>
        <Route exact path="/">
        <HomePage />
        </Route>
        <Route exact path="/login/callback/">
          <LoginCallback />
        </Route>
        <Route exact path="/logout/">
          <Logout />
        </Route>
      </Switch>
      </Router>
    );
}

export default App;