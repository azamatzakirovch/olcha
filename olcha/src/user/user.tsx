// import MenuBar from "./../mostly-used-tools/menu-bar/menu-bar.tsx"
import user from "./../system-photos/menu-bar/azamatzakirovch.jpg"

function User() {


    return (
        <>
            {/*<MenuBar />*/}
            <div>
                <div className="mini-box-for-username-login-user-photo">
                    <div className="name">Azamat Zakirovch</div>
                    <div className="username">@azamatzakirovch</div>
                    <img src={user} alt="User Photo" className="profile-settings"/>
                </div>
            </div>
            <div>Olim Kola is here</div>
        </>
    );
}

export default User;
