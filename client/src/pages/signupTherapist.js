// import logo from '../pictures/logo.png'
import { useState } from "react";
import { useTherapistSignup } from "../hooks/useTherapistSignUp";
// import img4 from '../pictures/img8.png'

const SignupTherapist = () => {
    
    const [name, setName]=useState('');
    const [email, setEmail] = useState('');
    const [specialization,setSpecialization] = useState('');
    const [password, setPassword] = useState('');
   

    const{signup, error, isLoading} = useTherapistSignup()

    // function validateForm() {

    //     return email.length > 0 && password.length > 0;   
    //   }
    document.body.style = 'background: #A9A9A9';
    const handleSubmit = async (e) => {

        e.preventDefault();   
        await signup(name,email,specialization, password);
        console.log(password, name ,email );
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
                <label>Name:</label>
                <input type="text" required
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <label>Email: </label>
                <input type="email" required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <label>Specialization: </label>
                <input type="text" required
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
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
                <a href = "/loginTherapist">Already have an account?</a>
            </form>
        </div>
        </div>
     );
}
 
export default SignupTherapist;