import { useEffect, useState } from "react";
import LoginPage from './components/Login'
import { Link } from 'react-router-dom'
import { Tooltip } from "@material-ui/core";
import Fade from '@material-ui/core/Fade';
import Loading from './components/Loading'

export default function HomePage() {
        const [loading, setLoading] = useState(true)
        const [loggedIn, setLoggedin] = useState(false);
        const [user, setUser] = useState(undefined);

    function getUsersAvatar() {
        if (!user.avatar) {
            return `https://cdn.discordapp.com/embed/avatars/${parseInt(user.discriminator)%5}.png`
        } else {
            return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`
        }
    }
    function getUsersData(isLoggedIn) {
        if (isLoggedIn) {
           const token = window.localStorage.getItem("token");
           fetch(`https://api.soosbot.com/dashboard/user/?token=${token}`).then((res) => res.json()).then((data) => setUser((data)));
        } else {
           return setLoading(false)
        }
      }
    useEffect(() => {
        setLoading(true)
        if (loggedIn && user) {
            setLoading(false)
            return
        } else {
            const token = window.localStorage.getItem("token");
            if (token) {
                fetch(`https://api.soosbot.com/dashboard/verify/?token=${token}`)
                .then((res) => res.json())
                // if you don't return, you won't get the value in the next `then`
                .then((data) => {
                    setLoggedin(data)
                    return data // assuming a boolean??
                })
                .then(getUsersData, () => setLoading(false))
            } else {
                return setLoading(false)
            }
                
        }}
    , [loggedIn, user]);
    
    if (loading) {
        return (<Loading />)}

    if (user) {
        return (
        <>
        <div className="user">
        <Tooltip title={<h1 className="username">{`${user.username}#${user.discriminator}`}</h1>}placement="right" arrow TransitionComponent={Fade} TransitionProps={{ timeout: 400 }}>
            <img src={getUsersAvatar()} alt="?"></img>
        </Tooltip>
        <h1>Dashboard</h1>
        <p className="text">Nothing to see here...</p>

        <button className="loginButton" onClick={() => {window.location.href = "/logout"}} >
            Logout
        </button>

        
        </div>
        </>
        )
    }
    else {
        return <LoginPage/>
    }
}