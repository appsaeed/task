import { Outlet } from 'react-router-dom'
import Header from './Header'

export default function Layout() {

    return (
        <>
            <Header />
            <div className="h-16 w-full"></div>
            <Outlet />
        </>
    )
}
