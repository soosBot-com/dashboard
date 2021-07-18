import React from 'react'
import Tooltip from '@material-ui/core/Tooltip';

export default function Server({ server }) {
    return (
        <>
        <Tooltip title="HI"  arrow>
            <p>{server.name}</p>
        </Tooltip>
        </>
        )
}