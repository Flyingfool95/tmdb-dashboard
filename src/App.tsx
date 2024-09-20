import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import './styling/main.scss'
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
