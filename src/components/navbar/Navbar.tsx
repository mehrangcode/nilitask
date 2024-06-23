import './navbar.css'
import LOGO from '../../assets/logo.png'
import { Link } from 'react-router-dom'
function Navbar() {
    return (
        <header className="appHeader">
            <div className="appName">
                <Link to="/"><img src={LOGO} alt="NiliTask" className="logo" /></Link>
                <h1>مدیریت تسک</h1>
            </div>
        </header>
    )
}

export default Navbar