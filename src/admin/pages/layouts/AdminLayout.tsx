import React from 'react'
import { Outlet } from 'react-router'

export const AdminLayout = () => {
    return (
        <div>
            <Outlet />
        </div>
    )
}
