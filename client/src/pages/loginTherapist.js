// import logo from '../pictures/logo.png'
// import img4 from '../pictures/img8.png'
import { useState } from "react";
import { useTherapistLogin } from "../hooks/useTherapistLogin";
document.body.style = 'background: #A9A9A9';
const LoginTherapist = () => {

    const [password, setPassword] = useState('');
    const [email, setEmail]=useState('');

    const{login, error, isLoading} = useTherapistLogin()


    // function validateForm() {

    //       return password.length > 0;   
    //   }

    const handleSubmit = async (e) => {

        e.preventDefault();   
        await login( email, password);
        console.log(password, email );
      };

    return ( 
       
        <div className="logindiv">
            <div className="img4">
                {/* <img src={img4} width={500} height={800}/> */}
            </div>
        <div className="login">
            {/* <img src={logo} width={70} height={50}/> */}
            <h2>Shift Happens</h2>
            {/* <span role="img" aria-label="rocket">🚀</span> */}
            <form onSubmit = {handleSubmit}>
                <label>Email </label>
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
                <a href = "/signupTherapist">Don't have an account?</a>
            </form>
        </div>
        </div>
     );
}
 
export default LoginTherapist;