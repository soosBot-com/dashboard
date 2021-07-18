import { Redirect } from 'react-router-dom'

export default function Logout() {
    const token = window.localStorage.getItem("token")

    if (token) {
      window.localStorage.removeItem("token")
      return <Redirect to="/"/>
    } else {
        return <Redirect to="/"/>
    }
  }