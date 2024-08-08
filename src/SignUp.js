import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import configuration from './configuration';
import { getDatabase, ref, set } from 'firebase/database';
import { Link, useHistory } from 'react-router-dom';


const {cong, auth} = configuration;

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [userInventory, setUserInventory] = useState({});
  const history = useHistory();
  const [signedUp, setSignedUp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = (await createUserWithEmailAndPassword(auth, email, password));
      const user = userCredential.user;
      setUser(user); // Set user state directly
      console.log(`Here's the user`, user)
      setSignedUp(true);
      history.push('/homePage');

      // Clear form fields after successful sign up
      setEmail('');
      setPassword('');
      setUsername('');

      // Add user to the database with username
      const database = getDatabase();
      await set(ref(database, 'users/' + user.uid), {
          email: user.email,
          username: username, // Store username
          uid: user.uid,
          inventory: {
            mfi00: {
              name: "My First Item",
              quantity: 0,
              price: 0,
              id: "mfi00"
            }
          },
      });

    } catch (error) {
      console.error("Error signing up: ", error.message);
    }
  };

  return (
    <div>
      <h1 className='welcome'>Welcome</h1>
      <div className='form-container signUp'>
        
        {/* <h2>Sign Up</h2> */}
        <form onSubmit={handleSubmit} className='signUpForm'>
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
          <input 
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
          <button type="submit">Sign Up</button>
          <p><Link to="/signIn" className=
        "linkSignUp">Sign In</Link></p>

        </form>
        {signedUp && <p>Signed up successfully!</p>}
      </div>
    </div>
  );
};

export default SignUp;