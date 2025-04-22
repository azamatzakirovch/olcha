import React from "react";
import "./CreateAccount.css";

const CreateAccount: React.FC = () => {
    return (
        <div className="auth-wrapper">
            <div className="auth-left">

                <p className="quote">
                    Olcha Incorporation.
                </p>
            </div>

            <div className="auth-right">
                <div className="form-container">
                    <h2 className="title">Create Account</h2>

                    <button className="google-btn">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
                            alt="Google"
                            className="google-icon"
                        />
                        Continue with Google
                    </button>

                    <input type="text" placeholder="username" className="input" />
                    <input type="email" placeholder="email" className="input" />
                    <input type="password" placeholder="password" className="input" />

                    <button className="submit-btn">Sign Up</button>

                    <p className="bottom-text">
                        Already have an account? <a href="/sign-in">Sign In</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;
