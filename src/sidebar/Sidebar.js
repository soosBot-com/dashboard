import React from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import  getUsersAvatar  from '../components/Avatar';
import Servers from "./Servers";
import { Link } from 'react-router-dom';

export default function Sidebar({ user, servers }) {
        return (
            <>
            <div className="sidebar">
                <div className="profile">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Tooltip title="Home" placement="right" arrow TransitionComponent={Fade} TransitionProps={{ timeout: 400 }}>
                            <img src={getUsersAvatar(user)} alt="?"></img>
                        </Tooltip>
                    </Link>
                </div>
                <hr className="server-profile-separator"/>
                <div className="server-search">
                    <img src="https://cdn3.iconfinder.com/data/icons/unicons-vector-icons-pack/32/search-512.png" alt="?"/>
                </div>
                <div className="servers">
                <ul>
                <Servers servers={servers}/>
                </ul>
                </div>
            </div>
            </>
        )
}