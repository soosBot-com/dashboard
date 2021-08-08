import Sidebar from './sidebar/Sidebar'

export default function HomePage( {user, servers, connections} ) {
    const connections_list = {
        "twitch": {
            "name": "Twitch",
            "icon": "https://discord.com/assets/edbbf6107b2cd4334d582b26e1ac786d.png"
        },
        "youtube": {
            "name": "YouTube",
            "icon": "https://discord.com/assets/449cca50c1452b4ace3cbe9bc5ae0fd6.png"
        },
        "battlenet": {
            "name": "Battle.net",
            "icon": "https://discord.com/assets/8c289d499232cd8e9582b4a5639d9d1d.png"
        },
        "steam": {
            "name": "Steam",
            "icon": "https://discord.com/assets/f09c1c70a67ceaaeb455d163f3f9cbb8.png"
        },
        "reddit": {
            "name": "Reddit",
            "icon": "https://discord.com/assets/3abe9ce5a00cc24bd8aae04bf5968f4c.png"
        },
        "facebook": {
            "name": "Facebook",
            "icon": "https://discord.com/assets/8d8f815f3d81a33b1e70ec7c22e1b6fe.png"
        },
        "twitter": {
            "name": "Twitter",
            "icon": "https://discord.com/assets/4662875160dc4c56954003ebda995414.png"
        },
        "spotify": {
            "name": "Spotify",
            "icon": "https://discord.com/assets/f0655521c19c08c4ea4e508044ec7d8c.png"
        },
        "xbox": {
            "name": "Xbox",
            "icon": "https://discord.com/assets/0d44ba28e39303de3832db580a252456.png"
        },
        "github": {
            "name": "GitHub",
            "icon": "https://discord.com/assets/5d69e29f0d71aaa04ed9725100199b4e.png"
        }
    }
    connections.map(connection => {return (
            console.log(connections_list[connection.type])
    )})
    return(
        <>
        <div className="main">
        <Sidebar servers={servers} user={user} />
        <div className="homepage">
            <div className="homeh1">
                <h1>Home</h1>
            </div>
            <div className="analytics">
                <h1>Analytics</h1>
                <div className="cmd-analytics">
                </div>
            </div>
            <div className="connections">
                {/* <ul>
                    {connections.map(connection => { 
                        if (true) {return (
                            <>
                            <li>
                                <div className="connection">
                                    <h3>{connection.name}</h3>
                                    <div className="connection-name-and-icon">
                                        <img src={connections_list[connection.type].icon} alt="icon" /> 
                                        <p>{connections_list[connection.type].name}</p>
                                    </div>
                                </div>
                            </li>
                            </>
                        )} else {return (null)}})}
                </ul> */}
            </div>
        </div>
        </div>
        </>
    )
}