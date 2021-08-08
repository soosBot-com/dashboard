import React from 'react'
import Server from './Server'

export default function Servers({ servers }) {
    servers = Array.from(servers);
    if (!servers || servers.length === 0) {
        return <h1>You are being ratelimited.</h1>
    }
    return (
        (servers).map(server => {
            return <Server server={server} key={server.id}/>
        })

    )
}