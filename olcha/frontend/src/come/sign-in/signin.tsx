import "./signin.css"

import LogoDark from "./../../system-photos/sign-in/dark.png"
import LogoLight from "./../../system-photos/sign-in/light.png"
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function SignIn() {

    const navigate = useNavigate();
    const [error, setError] = useState("")
    const [loginInput, setLoginInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")

    const user_mini_data_set = [
        {
            name: "Azamat Zakirovch",
            position: "Admin",
            birthday: "21-10-2005",
            joined_date: "12-04-2025",
            email: "a.eshqoziyev@newuu.uz",
            phone: "+998981232105",
            login: "azamatzakirovch",
            password: "AD1066495",
        },
        {
            name: "Olim Kola",
            position: "User",
            birthday: "04-05-1982",
            joined_date: "21-04-2025",
            email: "olim.kola@gmail.com",
            phone: "+998981232105",
            login: "olimkola",
            password: "olimkola",
        }
    ];

    const check_position = (login: string): string | undefined => {
        for (const user of user_mini_data_set) {
            if (user.login === login) {
                return user.position;
            }
        }
    };

    const check_exists = (login: string, password: string): boolean | undefined => {
        for (const user of user_mini_data_set) {
            if (user.login === login) {
                if (user.password === password) {
                    return true;
                }
            }
        }
        return false
    };

    const GoTo = () => {
        const come_in_main_page = check_exists(loginInput, passwordInput);

        if(loginInput === "" || passwordInput === "" ){
            setError("Please do not forget to fill all places.");
            return;
        }

        if(come_in_main_page){
            const position = check_position(loginInput);
            setError("");

            if(position === "Admin"){
                navigate("/admin", { state: { login: loginInput } });

            }else if(position === "User"){
                navigate("/user", { state: { login: loginInput } });
            }
        }else{
            setError("Wrong password or login not found");
        }
    };

    const GoToCreateAccount = () => {
        navigate("/createaccount");
    };

    const handleErrorClose = () => {
        setError("");
        setLoginInput("");
        setPasswordInput("");
    };

    return (
        <>
            <div className="left-rectangle">
                <div className="mini-rectangle-inside-of-left-rectangle">
                    <img src={LogoLight} className="logo-to-left-white-rectangle" alt="logo" />
                </div>
            </div>

            <div className="right-side">
                <div className="big-border">
                    <img src={LogoDark} alt="logo" className="logo-to-sign-in" />

                    {error && (
                        <div className="mini-notification">
                            {error}
                            <button className="dismiss-btn" onClick={handleErrorClose}>×</button>
                        </div>
                    )}

                    <input
                        className="login-form"
                        type="text"
                        value={loginInput}
                        onChange={(e) => setLoginInput(e.target.value)}
                    />
                    <div className="mini-rectangle-to-login">
                        <div className="word-part">
                            login
                        </div>
                    </div>

                    <input
                        className="password-form"
                        type="password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                    />
                    <div className="mini-rectangle-to-password">
                        <div className="word-part">
                            password
                        </div>
                    </div>

                    <div className="next" onClick={GoTo}>
                        <div className="word-part-next">
                            Log In
                        </div>
                    </div>

                    <div className="create-account-white">
                        Do Not Have an Account?
                    </div>

                    <div className="create-account-blue" onClick={GoToCreateAccount}>
                        Create Account
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignIn;