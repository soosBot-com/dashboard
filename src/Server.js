import Sidebar from "./sidebar/Sidebar";
import { Redirect } from 'react-router-dom'

export default function Server({ match:{ params : { id }}, servers, user }) {
    let current_server = undefined;
    (servers).map(server => {
        if (id === server.id) {current_server=server}
        return true
    })
    
    if (current_server) {
        return(
            <>
            <Sidebar servers={servers} user={user}/>
            <div className="server-settings">
                <div className="server-setting-sidebar">
                    
                    <div className="ss-category">
                        <ul className="ss-list">
                        </ul>
                    </div>
                </div>
            </div>
            </>
        )
    } else {
        console.log("Invalid server id given in url. Redirecting to /")
        return <Redirect to="/"/>
    }
}