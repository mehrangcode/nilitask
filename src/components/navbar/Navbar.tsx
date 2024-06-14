import './navbar.css'
import LOGO from '../../assets/logo.png'
function Navbar() {
    return (
        <header className="appHeader">
            <div className="appName">
                <img src={LOGO} alt="NiliTask" className="logo" />
                <h1>NILI TASK</h1>
            </div>
        </header>
    )
}

export default Navbar