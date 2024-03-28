// import logo from '../pictures/logo.png'
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
// import img4 from '../pictures/img8.png'

const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setName]=useState('');

    const{signup, error, isLoading} = useSignup()

    // function validateForm() {

    //     return email.length > 0 && password.length > 0;   
    //   }
    document.body.style = 'background: #A9A9A9';
    const handleSubmit = async (e) => {

        e.preventDefault();   
        await signup(email, username, password);
        console.log(password, username ,email );
      };

    return ( 
        <div className="signupdiv">
            <div className="img4">
                {/* <img src={img4} width={500} height={800}/> */}
            </div>
        <div className="signup">
            {/* <img src={logo} width={70} height={50}/> */}
            <h2>Shift Happens</h2>
            {/* <span role="img" aria-label="rocket">🚀</span> */}
            <form onSubmit = {handleSubmit}>
                <label>Username:</label>
                <input type="text" required
                value={username}
                onChange={(e) => setName(e.target.value)}
                />
                <label>Email: </label>
                <input type="email" required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <pre>
                    <label>Password:</label>
                    <input type="password" required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </pre>

                {/* <button disabled={!validateForm()}>Submit</button> */}
                <button disabled={isLoading}>Submit</button>
                {error && <div className="error">{error}</div>}
                <pre></pre>
                <a href = "/login">Already have an account?</a>
            </form>
        </div>
        </div>
     );
}
 
export default Signup;