import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import './styling/reset.scss'
import './styling/global.scss'
import Navbar from './components/Navbar'

export default function App() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}
