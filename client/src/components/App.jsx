import React from 'react';
import $ from 'jquery';
import SignIn from './SignIn.jsx';
import GameWindow from './GameWindow.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
    }
  }

  signIn(e) {
    e.preventDefault();
    let name = e.target.childNodes[0].value;
    $.post('/signIn', {username:name})
    .done(data => {
      data = JSON.parse(data);
      if (data.approved) {
        this.setState({
          username:name,
        })
      }
    })
  }

  render() {
    return(
      <div>
        <GameWindow />
      </div>
    )
  }
}

export default App;