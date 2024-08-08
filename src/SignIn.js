import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import configuration from './configuration';
import { Link, useHistory } from 'react-router-dom';


const {cong, auth} = configuration;

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [signedIn, setSignedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setSignedIn(true);
      history.push('/homePage');
    } catch (error) {
      console.error("Error signing in: ", error.message);
    }
  };

  return (
    <div className='form-container signIn'>
      {/* <h2>Sign In</h2> */}
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Sign In</button>
        <p>New to Bolt Tracker? <Link to="/signUp" className=
        "linkSignUp">Sign Up</Link></p>
        {signedIn && <p>Signed in successfully!</p>}
      </form>
    </div>
  );
};

export default SignIn;
