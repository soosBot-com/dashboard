import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useEffect, useState } from "react";
import HomePage from './HomePage';
import Loading from './components/Loading'
import Login from "./components/Login"
import Server from './Server';
import offline from './offline.png';

export default function App() {
    const api_endpoint = "http://192.168.1.224"
    const login_endpoint = "http://192.168.1.224:3575"

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(undefined);
    const [servers, setServers] = useState(undefined);
    const [connections, setConnections] = useState(undefined);
    const [api, setApi] = useState(true);

    async function script() {
        function sleep(delay) {
            const start = new Date().getTime();
            while (new Date().getTime() < start + delay);
        }
        const session = document.cookie.replace(/(?:(?:^|.*;\s*)login\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        console.log(session)
        try {
            await fetch(api_endpoint)
            if (session) {
                let response = await fetch(`${login_endpoint}/verify?session=${session}`)
                let valid_user = await response.json()
                console.log(valid_user)
                if (valid_user) {
                    setUser(await (await fetch(`${api_endpoint}/user?session=${session}`)).json())
                    let servers_ = (await (await fetch(`${api_endpoint}/user/servers?session=${session}`)).json())
                    if (servers_.message==="You are being rate limited.") {
                        sleep(servers_.retry_after+20)
                        setServers(await (await fetch(`${api_endpoint}/user/servers?session=${session}`)).json())
                    } else {
                        setServers(servers_)
                    
                    }
                    setConnections(await (await fetch(`${api_endpoint}/user/connections?session=${session}`)).json())
                    setLoading(false)
                    return
                } else {
                    return setLoading(false)
                }
            } else {
                return setLoading(false)
        }} catch (error) {
            console.log(error)
            if (error instanceof TypeError) {
                setApi(false)
                setLoading(false)
                return
                
            }
        }
    }

    useEffect(() => {
        script().then(() => {console.log("%cWarning: This is the developer console, and you should not paste anything here, as it could lead to someone editing your soosBot configuration, or manipulating your servers.",
        "color: red; font-family: Quicksand, sans-serif; font-size: 15px");})
    }
    , []);

    if (loading) {
        return (<Loading />)
    } else if (!api) {
        return (
            <div className="api">
                <img src={offline} alt="?"/>
                <h1>Offline API</h1>
                <h3>The soosBot's API is currently offline.</h3>
                <p>Check back later for an update.</p>
            </div>
        )
    } else if (!user && !servers) {
        return <Login />
    } else return (
    <>
        <Router>
            <Switch>
                <Route exact path="/">
                <HomePage servers={servers} user={user} connections={connections}/>
                </Route>
                <Route path="/server/:id" render={props => {
                                return (
                                    <>
                                    <Server {...props} servers={servers} user={user}/>
                                    </>
                                )}}>
                            </Route>
                <Route path="/server/:id/:setting/" render={props => {
                    return (
                        <>
                        <Server {...props} servers={servers} user={user}/>
                        </>
                    )}}>
                </Route>
            </Switch>
        </Router>
      </>
    );
}

