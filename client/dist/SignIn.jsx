import React from 'react';
import ReactDOM from 'react-dom';

var SignIn = ({signIn}) => (
  <div>
    <h1>Vampire Crusaders</h1>
    <form onSubmit={signIn}>
      <input type="text" name="username" placeholder="Enter Username" />
      <input type="submit" value="Play!" />
    </form>
  </div>
)

export default SignIn;