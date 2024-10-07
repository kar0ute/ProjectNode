const Login = () => {


   const handlelogin = () => {
        // Get values from input fields
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Log the username and password to the console
        console.log('Username:', username);
        console.log('Password:', password);
    }



    return (
        <div>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required/>
            </div>
            <div className="form-group">
                <button type="button" onClick={handlelogin}>Login</button>
            </div>

        </div>
    )

}


export default Login;





