import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: ''
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }
  // Sets the username state property based on the attached tag
  // Called onChange on the username input tag
  handleUsernameChange(e) {
    this.setState({
      username: e.target.value
    });
  }
  // Sets the password state property based on the attached tag
  // Called onChange on the password input tag
  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  // Has an input text field for Username and Password, wrapped in a form tag that allows for submission with the enter-key
  render() {
    return (
      <div>
        <h3>Login</h3>
        {this.props.loginError ? (
          <span>Incorrect Username or Password. Please try again</span>
        ) : null}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.setState({
              error:
                'Incorrect username or password. Please signup or try again.'
            });
            this.props.login(this.state.username, this.state.password);
          }}
        >
          <div className="login-container">
            <div
              className="username-container"
              onChange={this.handleUsernameChange}
            >
              <input
                className="input is-primary"
                type="text"
                placeholder="Username"
              />
            </div>
            <div
              className="password-container"
              onChange={this.handlePasswordChange}
            >
              <input
                className="input is-primary"
                type="password"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="button-container">
            <button
              className="button is-primary"
              onClick={() => {
                this.setState({
                  error:
                    'Incorrect username or password. Please signup or try again.'
                });
                this.props.login(this.state.username, this.state.password);
              }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
