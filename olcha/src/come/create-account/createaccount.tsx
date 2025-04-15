import './createaccount.css';

import LogoDark from "./../../system-photos/sign-in/dark.png";
import LogoLight from "./../../system-photos/sign-in/light.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CreateAccount() {

    const [error, setError] = useState("");

    const handleErrorClose = () => {
        setError("");
    };

    const navigate = useNavigate();
    const [step, setStep] = useState(0);

    const nextStep = () => {
        if (step === 0 && !Check_name_and_surname()) return;
        if (step === 1 && !checkBirthday()) return;
        if (step === 2) {
            if (!check_email()) return;
            if (!check_phone()) return;
        }


        setError("");
        if (step < 7) setStep(step + 1);
    };


    const prevStep = () => {
        if (step > 0) setStep(step - 1);
    };

    const [nameInput, setNameInput] = useState("");
    const [surnameInput, setSurnameInput] = useState("");

    const [dayInput, setDayInput] = useState("");
    const [monthInput, setMonthInput] = useState("");
    const [yearInput, setYearInput] = useState("");

    const [sexInput, setSexInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [phoneInput, setPhoneInput] = useState("");

    const [loginInput, setLoginInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const GoToSignIn = () => {
        navigate("/signin");
    };

    const Check_name_and_surname = () => {
        if (nameInput ==="" || surnameInput === "" || (nameInput ==="" && surnameInput === "") ) {
            setError("Please Fill Name & Surname");
            return false;
        }
        setError("");
        return true;
    };

    const checkBirthday = () => {
        const day = parseInt(dayInput);
        const month = parseInt(monthInput);
        const year = parseInt(yearInput);

        if (isNaN(day) || isNaN(month) || isNaN(year)) {
            setError("Please enter valid numbers for day, month, and year.");
            setDayInput("")
            setMonthInput("")
            setYearInput("")
            return false;
        }

        if (day < 1 || day > 31) {
            setError("Day must be between 1 and 31.");
            setDayInput("")
            return false;
        }

        if (month < 1 || month > 12) {
            setError("Month must be between 1 and 12.");
            setMonthInput("")

            return false;
        }

        const currentYear = new Date().getFullYear();
        if (year < 1900 || year > currentYear) {
            setError("Year must be between 1900 and " + currentYear + ".");
            setYearInput("")
            return false;
        }

        setError("");
        return true;
    };

    const check_phone = (): boolean => {
        const uzbekPhoneRegex = /^(?:\+998|998)([0-9]{9})$/;

        if (!uzbekPhoneRegex.test(phoneInput)) {
            setError("Please enter a valid Uzbekistan phone number (e.g. +998901234567).");
            return false;
        }

        setError("");
        return true;
    };

    const check_email = (): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(emailInput)) {
            setError("Please enter a valid email address.");
            return false;
        }

        setError("");
        return true;
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
                                {error && (
                                    <div className="mini-notification_">
                                        {error}
                                        <button className="dismiss-btn_" onClick={handleErrorClose}>×</button>
                                    </div>
                                )}

                                <input
                                    className="template-top"
                                    type="text"
                                    value={nameInput}
                                    onChange={(e) => setNameInput(e.target.value)}
                                />
                                <div className="mini-rectangle-to-template-top">
                                    <div className="word-part">name</div>
                                </div>

                                {error && (
                                    <div className="field-error">{error}</div>
                                )}

                                <input
                                    className="template-down"
                                    type="text"
                                    value={surnameInput}
                                    onChange={(e) => setSurnameInput(e.target.value)}
                                />
                                <div className="mini-rectangle-to-template-down">
                                    <div className="word-part-to-template-down">surname</div>
                                </div>

                                <div className="next-template" onClick={nextStep}>
                                    <div className="word-part-next">Next</div>
                                </div>
                            </>
                        )}

                        {/* Other steps (leave unchanged for now) */}
                        {step === 1 && (
                            <>

                                {error && (
                                    <div className="mini-notification_">
                                        {error}
                                        <button className="dismiss-btn_" onClick={handleErrorClose}>×</button>
                                    </div>
                                )}
                                <input
                                    className="day"
                                    type="text"
                                    value={dayInput}
                                    onChange={(e) => setDayInput(e.target.value)}
                                />
                                <div className="word-show-day">
                                    <div className="word-part-day">day</div>
                                </div>

                                <input
                                    className="month"
                                    type="text"
                                    value={monthInput}
                                    onChange={(e) => setMonthInput(e.target.value)}
                                />
                                <div className="word-show-month">
                                    <div className="word-part-year">month</div>
                                </div>

                                <input
                                    className="year"
                                    type="text"
                                    value={yearInput}
                                    onChange={(e) => setYearInput(e.target.value)}
                                />
                                <div className="word-show-year">
                                    <div className="word-part-month">year</div>
                                </div>

                                <input
                                    className="template-down"
                                    type="text"
                                    value={sexInput}
                                    onChange={(e) => setSexInput(e.target.value)}
                                />
                                <div className="word-show-gender">
                                    <div className="word-part-to-template-down">gender</div>
                                </div>

                                <div className="mini-next" onClick={nextStep}>
                                    <div className="word-part-mini-next-of-mini-back">Next</div>
                                </div>

                                <div className="mini-back" onClick={prevStep}>
                                    <div className="word-part-mini-next-of-mini-back">Back</div>
                                </div>

                                {!dayInput && error && (
                                    <div className="field-error">{error}</div>
                                )}

                            </>
                        )}

                        {step === 2 && (
                            <>
                                {error && (
                                    <div className="mini-notification_">
                                        {error}
                                        <button className="dismiss-btn_" onClick={handleErrorClose}>×</button>
                                    </div>
                                )}

                                <input
                                    className="template-top"
                                    type="text"
                                    value={emailInput}
                                    onChange={(e) => setEmailInput(e.target.value)}
                                />
                                <div className="mini-rectangle-to-template-top">
                                    <div className="word-part-to-template-top">email</div>
                                </div>

                                <input
                                    className="template-down"
                                    type="text"
                                    value={phoneInput}
                                    onChange={(e) => setPhoneInput(e.target.value)}
                                />
                                <div className="mini-rectangle-to-template-down-phone">
                                    <div className="word-part-to-template-down">phone</div>
                                </div>

                                <div className="mini-next" onClick={nextStep}>
                                    <div className="word-part-mini-next-of-mini-back">Next</div>
                                </div>

                                <div className="mini-back" onClick={prevStep}>
                                    <div className="word-part-mini-next-of-mini-back">Back</div>
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
                                <div className="word-show-new-login">
                                    <div className="word-part-to-template-top">new login</div>
                                </div>

                                <div className="mini-next" onClick={nextStep}>
                                    <div className="word-part-mini-next-of-mini-back">Next</div>
                                </div>

                                <div className="mini-back" onClick={prevStep}>
                                    <div className="word-part-mini-next-of-mini-back">Back</div>
                                </div>
                            </>
                        )}

                        {step === 4 && (
                            <>
                                <input
                                    className="template-top"
                                    type="text"
                                    value={passwordInput}
                                    onChange={(e) => setPasswordInput(e.target.value)}
                                />
                                <div className="word-show-password">
                                    <div className="word-part-to-template-down">new password</div>
                                </div>

                                <div className="mini-next" onClick={nextStep}>
                                    <div className="word-part-mini-next-of-mini-back">Next</div>
                                </div>

                                <div className="mini-back" onClick={prevStep}>
                                    <div className="word-part-mini-next-of-mini-back">Back</div>
                                </div>
                            </>
                        )}

                        {step === 5 && (
                            <>
                                <div className="finisher" onClick={GoToSignIn}>
                                    <div className="word-part-next">Go To Sign-in</div>
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