import './menubar.css';
import logo from "./../../system-photos/sign-in/light.png"
import searcher from './../../system-photos/menu-bar/search-engine.png'
import 'bootstrap/dist/css/bootstrap.min.css';




function menu_bar() {
    return (
        <>
            <div className="controller_bar">
                <img src={logo} alt="Logo" className="logo"/>

                <input className="search-engine" id="floatingInput" type="text" placeholder="Search"/>

                <img src={searcher} alt="Logo" className="search-engine-photo"/>

                <div className="menu-catalogue">Catalogue</div>

                <div className="menu-offices">Offices</div>

                <div className="menu-box">Box</div>

                <div className="menu-history">History</div>
            </div>
        </>
    );
}

export default menu_bar;
