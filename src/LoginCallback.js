import { useLocation, Redirect } from 'react-router-dom'
import queryString from 'query-string';

export default function HomePage() {
    const { search } = useLocation()
    const { token } = queryString.parse(search)

    if (token) {
      window.localStorage.setItem("token", token);
      return <Redirect to="/"/>
    } else {
      return <h1>No token was provided.</h1>
    }
  }