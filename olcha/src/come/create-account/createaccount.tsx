import './createaccount.css'

import LogoDark from "./../../system-photos/sign-in/dark.png"
import LogoLight from "./../../system-photos/sign-in/light.png"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CreateAccount() {

    const navigate = useNavigate();


    const [step, setStep] = useState(0);

    const nextStep = () => {
        if (step < 7) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 0) setStep(step - 1);
    };

    const [nameInput, setNameInput] = useState("");
    const [surnameInput, setSurnameInput] = useState("")

    const [dayInput, setDayInput] = useState("");
    const [monthInput, setMonthInput] = useState("");
    const [yearInput, setYearInput] = useState("");


    const [sexInput, setSexInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [phoneInput, setPhoneInput] = useState("");

    const [loginInput, setLoginInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")

    const GoToSignIn = () => {
        navigate("/signin");
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

                    <div className="step-box">
                        {step === 0 && (
                            <>
                                <input
                                    className="template-top"
                                    type="text"
                                    value={nameInput}
                                    onChange={(e) => setNameInput(e.target.value)}
                                />
                                <div className="mini-rectangle-to-template-top">
                                    <div className="word-part">
                                        name
                                    </div>
                                </div>

                                <input
                                    className="template-down"
                                    type="text"
                                    value={surnameInput}
                                    onChange={(e) => setSurnameInput(e.target.value)}
                                />
                                <div className="mini-rectangle-to-template-down">
                                    <div className="word-part-to-template-down">
                                        surname
                                    </div>
                                </div>

                                <div className="next-template" onClick={nextStep}>
                                    <div className="word-part-next">
                                        Next
                                    </div>
                                </div>

                            </>

                        )}

                        {step === 1 && (
                            <>
                                <input
                                    className="day"
                                    type="text"
                                    value={dayInput}
                                    onChange={(e) => setDayInput(e.target.value)}
                                />
                                <div className="word-show-day">
                                    <div className="word-part-day">
                                        day
                                    </div>
                                </div>

                                <input
                                    className="month"
                                    type="text"
                                    value={monthInput}
                                    onChange={(e) => setMonthInput(e.target.value)}
                                />
                                <div className="word-show-month">
                                    <div className="word-part-year">
                                        month
                                    </div>
                                </div>

                                <input
                                    className="year"
                                    type="text"
                                    value={yearInput}
                                    onChange={(e) => setYearInput(e.target.value)}
                                />
                                <div className="word-show-year">
                                    <div className="word-part-month">
                                        year
                                    </div>
                                </div>

                                <input
                                    className="template-down"
                                    type="text"
                                    value={sexInput}
                                    onChange={(e) => setSexInput(e.target.value)}
                                />
                                <div className="mini-rectangle-to-template-down">
                                    <div className="word-part-to-template-down">
                                        gender
                                    </div>
                                </div>

                                <div className="mini-next" onClick={nextStep}>
                                    <div className="word-part-mini-next-of-mini-back">
                                        Next
                                    </div>
                                </div>

                                <div className="mini-back" onClick={prevStep}>
                                    <div className="word-part-mini-next-of-mini-back">
                                        Back
                                    </div>
                                </div>

                            </>
                        )}

                        {step === 2 && (
                            <>
                                <input
                                    className="template-top"
                                    type="text"
                                    value={emailInput}
                                    onChange={(e) => setEmailInput(e.target.value)}
                                />
                                <div className="mini-rectangle-to-template-top">
                                    <div className="word-part-to-template-top">
                                        email
                                    </div>
                                </div>

                                <input
                                    className="template-down"
                                    type="text"
                                    value={phoneInput}
                                    onChange={(e) => setPhoneInput(e.target.value)}
                                />
                                <div className="mini-rectangle-to-template-down-phone">
                                    <div className="word-part-to-template-down">
                                        phone
                                    </div>
                                </div>

                                <div className="mini-next" onClick={nextStep}>
                                    <div className="word-part-mini-next-of-mini-back">
                                        Next
                                    </div>
                                </div>

                                <div className="mini-back" onClick={prevStep}>
                                    <div className="word-part-mini-next-of-mini-back">
                                        Back
                                    </div>
                                </div>

                            </>
                        )}

                        {step === 3 && (
                            <>
                                <input
                                    className="template-top"
                                    type="text"
                                    value={loginInput}
                                    onChange={(e) => setLoginInput(e.target.value)}
                                />
                                <div className="mini-rectangle-to-template-top">
                                    <div className="word-part-to-template-top">
                                        login
                                    </div>
                                </div>

                                <input
                                    className="template-down"
                                    type="text"
                                    value={passwordInput}
                                    onChange={(e) => setPasswordInput(e.target.value)}
                                />
                                <div className="mini-rectangle-to-template-down">
                                    <div className="word-part-to-template-down">
                                        password
                                    </div>
                                </div>

                                <div className="next-template" onClick={GoToSignIn}>
                                    <div className="word-part-next">
                                        Finish
                                    </div>
                                </div>

                            </>
                        )}

                    </div>

                </div>
            </div>
        </>
    );
}

export default CreateAccount;