import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import './styling/reset.scss'
import './styling/global.scss'

export default function App() {
    return (
        <>
            <Outlet />
            <Footer />
        </>
    )
}
