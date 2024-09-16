import { Outlet } from 'react-router-dom'
import './styling/reset.scss'
import './styling/global.scss'

export default function App() {
    return (
        <div className='app'>
            <Outlet />
        </div>
    )
}
