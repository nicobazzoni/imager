import { useState } from 'react';
import { auth } from '../firebase';
import { useNavigate} from 'react-router-dom';


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

 const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      // Create user account with email and password
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      // Update user's display name (i.e. username)
      await user.updateProfile({
        displayName: username
      });

      // Redirect to home page
     navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignUp}>
        <input type="text" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <input type="text" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
