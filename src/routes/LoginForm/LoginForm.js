// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const LoginForm = ({ setLoggedInUser }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
  
//     // Make a POST request to the login endpoint on the server
//     try {
//       const response = await fetch('http://localhost:5002/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });
  
//       if (response.ok) {
//         // Handle successful login
//         const data = await response.json();
//         console.log('User logged in successfully!');
//         // Save the JWT to the local storage
//         localStorage.setItem('token', data.token);
//         setLoggedInUser(username);
//         navigate('/'); // Redirect to the home page
//       } else {
//         // Handle login error
//         const errorData = await response.json();
//         console.error('Login failed:', errorData.error);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className='homeimage'>
//       <form className='form' onSubmit={handleLogin}>
//         <div className='inputs-signup'>
//         <input
//         id='username'
//         className='text'
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//         id='password'
//         className='text'
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Log In</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setLoggedInUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Make a POST request to the login endpoint on the server
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        // Handle successful login
        const data = await response.json();
        console.log('User logged in successfully!');
        // Save the JWT to the local storage
        localStorage.setItem('token', data.token);
        setLoggedInUser(username);
        navigate('/'); // Redirect to the home page
      } else {
        // Handle login error
        const errorData = await response.json();
        console.error('Login failed:', errorData.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='homeimage'>
      <form className='form' onSubmit={handleLogin}>
        <div className='inputs-signup'>
        <input
        id='username'
        className='text'
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
        id='password'
        className='text'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
