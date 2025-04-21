import "./User.css"
import demo_user_photo from "./../../public/user-account.png"
import speaker from './../../public/products/airpods-speaker.jpg'
import charging_area from './../../public/products/airpods-charger.jpg'

const User = () => {
    return (
        <>
            <div className="navigation-bar">

                <div className="border-to-user-account">
                    <img src={demo_user_photo} alt="demo_user_photo" className="user-photo" />
                </div>

                <div className="border-for-menu-functions">
                    <div className="catalogue">
                        Catalogue
                    </div>

                    <div className="offices">
                        Offices
                    </div>

                    <div className="box">
                        Box
                    </div>

                    <div className="history">
                        History
                    </div>

                </div>

            </div>

            <div className="top-good-of-week-border">
                <div className="border-for-photo-of-top-good-left-side">
                    <img src={speaker} alt="speaker" className="photo-settings" />
                </div>
                <div className="border-for-photo-of-top-good-right-side">
                    <img src={charging_area} alt="charging_area" className="photo-settings" />
                </div>

                <div>
                    <div className="mini-circle" style={{
                        bottom: "130px",
                        left: "50%",
                        transform: "translateX(-50%)",
                    }}></div>

                    <div className="mini-rectangle" style={{
                        bottom: "50px",
                        left: "50%",
                        transform: "translateX(-50%)",
                    }}></div>

                    <div
                        style={{
                            position: "absolute",
                            bottom: "70px",
                            left: "620px",
                            fontFamily: "sans-serif",
                            color: "black",
                            fontSize: "40px",
                        }}
                    >
                        Air Pods 2.0
                    </div>

                    <div className="border-of-information-giver" >
                        <div className="mini-rectangle-hor" style={{
                            top: "50%",
                            right: "30px",
                            width: "290px",
                            transform: "translateY(-50%)",
                        }}></div>
                        <div className="mini-circle" style={{
                            top: "50%",
                            right: "20px",
                            transform: "translateY(-50%)",
                        }}></div>
                        <div className="mini-rectangle" style={{
                            top: "-10px",
                            left: "58px",
                            height: "50px",
                            rotate: "-45deg",
                        }}></div>
                    </div>

                    <div className="hover-text-left-side-top-side-top-good">
                        {"Sync with iPhone,\niPad and\nMacBook"}
                    </div>

                    <div className="hover-text-left-side-bottom-side-top-good">
                        {"Up To,\n24 hours\nBattery Life"}
                    </div>

                    <div className="hover-text-right-side-bottom-side-top-good">
                        {"Best Seller Product,\n⭐️⭐️⭐️⭐️⭐️"}
                    </div>

                    <div className="hover-text-right-side-top-side-top-good">
                        {"Sound Up To,\n100 DB"}
                    </div>



                    <div className="border-of-information-giver" style={{
                        left: "30px",
                        // rotate: "-180deg",
                        transform: "scaleX(-1)"
                    }}>
                        <div className="mini-rectangle-hor" style={{
                            top: "50%",
                            right: "30px",
                            width: "290px",
                            transform: "translateY(-50%)",
                        }}></div>
                        <div className="mini-circle" style={{
                            top: "50%",
                            right: "20px",
                            transform: "translateY(-50%)",
                        }}></div>
                        <div className="mini-rectangle" style={{
                            top: "-10px",
                            left: "58px",
                            height: "50px",
                            rotate: "-45deg",
                        }}></div>
                    </div>

                    <div className="border-of-information-giver" style={{
                        left: "30px",
                        top: "30px",
                        // rotate: "-180deg",
                        // rotate: "-180deg",
                        transform: "scale(-1,-1)",
                        // transform: "scaleY(-1)"
                    }}>
                        <div className="mini-rectangle-hor" style={{
                            top: "50%",
                            right: "30px",
                            width: "290px",
                            transform: "translateY(-50%)",
                        }}></div>
                        <div className="mini-circle" style={{
                            top: "50%",
                            right: "20px",
                            transform: "translateY(-50%)",
                        }}></div>
                        <div className="mini-rectangle" style={{
                            top: "-10px",
                            left: "58px",
                            height: "50px",
                            rotate: "-45deg",
                        }}></div>
                    </div>

                    <div className="border-of-information-giver" style={{
                        top: "17px",
                        transform: "scaleY(-1)",
                        }}>
                        <div className="mini-rectangle-hor" style={{
                            top: "50%",
                            right: "30px",
                            width: "290px",
                            transform: "translateY(-50%)",
                        }}></div>
                        <div className="mini-circle" style={{
                            top: "50%",
                            right: "20px",
                            transform: "translateY(-50%)",
                        }}></div>
                        <div className="mini-rectangle" style={{
                            top: "-10px",
                            left: "58px",
                            height: "50px",
                            rotate: "-45deg",
                        }}></div>
                    </div>




                </div>



            </div>

        </>
    )
}

export default User

