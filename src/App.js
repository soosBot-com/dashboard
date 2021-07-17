import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './HomePage'
import LoginCallback from './LoginCallback'
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
      </Switch>
      </Router>
    );
}

export default App;