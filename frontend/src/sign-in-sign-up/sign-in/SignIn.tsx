const SignIn = () => {
    return (
        <div className="auth-wrapper">
            <div className="auth-left">

                <p className="quote">
                    Olcha Incorporation.
                </p>
            </div>
            <div className="auth-right">
                <div className="form-container">
                    <h2>Create Account</h2>
                    <button className="google-btn">
                        Continue with <span className="g-icon">🟢</span>
                    </button>
                    <input type="text" placeholder="login" />
                    <input type="password" placeholder="password" />
                    <button className="sign-in">Sign In</button>
                    <a href="/create-account">Sign up</a>

                </div>
            </div>
        </div>
    );
};

export default SignIn;
