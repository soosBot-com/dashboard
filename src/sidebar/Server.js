import React from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import { Link, NavLink } from 'react-router-dom';

export default function Server({ server }) {
    if (server.icon) {
        return (
            <>
            <li>
                <Link to={`/server/${server.id}`} style={{ textDecoration: 'none' }}>
                <Tooltip title={server.name} placement="right" arrow TransitionComponent={Fade} TransitionProps={{ timeout: 400 }}>
                <img src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}`} alt="?"/>
                </Tooltip>
                </Link>
            </li>
            </>
            )
    } else {
        return (
            <li>
                <Link to={`/server/${server.id}`} style={{ textDecoration: 'none' }}>
                <Tooltip title={server.name} placement="right" arrow TransitionComponent={Fade} TransitionProps={{ timeout: 400 }}>
                <div className="no-icon">
                        <p>{server.name.split(' ').map(x => x[0]).join('')}</p>
                </div>
                </Tooltip>
                </Link>
            </li>
        )
    }
}