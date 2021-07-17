import { useEffect, useState } from "react";
import LoginPage from './components/login'

export default function HomePage() {
        const [loading, setLoading] = useState(true)
        const [loggedIn, setLoggedin] = useState(false);
        const [user, setUser] = useState(undefined);

    function getUsersAvatar() {
        if (!user.avatar) {
            return `https://cdn.discordapp.com/embed/avatars/${parseInt(user.discriminator)%5}}.png`
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
                    setLoading(false)
                    return data // assuming a boolean??
                })
                .then(getUsersData)
            } else {
                return setLoading(false)
            }
                
        }}
    , [loggedIn, user]);
    
    if (loading) {
        return (
        <>
        <div class="loading">
        <img src="https://media.discordapp.net/attachments/762482391599022100/829461107752042566/loading.gif" alt="Loading"></img>
        </div>
        </>
        )}

    if (user) {
        return (
        <>
        <div class="user">
        <img src={getUsersAvatar()} alt="?"></img>
        <h1>Welcome {user.username}#{user.discriminator}!</h1>
        </div>
        </>
        )
    }
    else {
        return <LoginPage/>
    }
}