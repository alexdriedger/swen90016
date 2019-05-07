import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: "Login",
      users: [
        {
          username: "Admin",
          password: "Secret",
          name: "",
          address: "",
          contactNumber: ""
        },
        {
          username: "test",
          password: "testing",
          name: "Bob",
          address: "123 Street",
          contactNumber: "123-456-7890"
        }
      ],
      doctors: [
        {
          type: "chiropractor",
          name: "Alena",
          email: "alena@blackhole.com",
          price: 150
        }
      ],
      currentUsername: "",
      currentPassword: "",
      loggedIn: false,
      newUserName: "",
      newUserAddress: "",
      newUserContactNumber: "",
      newUserEmail: "",
      newUserPassword: ""
    };
  }

  render() {
    if (this.state.screen === "Login") {
      return <div>{this.renderLoginScreen()}</div>;
    } else if (this.state.screen === "createNewUser") {
      return <div>{this.renderCreateNewUserScreen()}</div>;
    } else if (this.state.screen === "homeScreen") {
      return <div>{this.renderHomeScreen()}</div>;
    } else if (this.state.screen === "registerDoctorsScreen") {
      return <div>{this.renderRegisterDoctorsScreen()}</div>;
    }
  }

  renderLoginScreen = () => {
    return (
      <div className="LoginScreen">
        <form
          onSubmit={event => {
            this.state.users.forEach(user => {
              if (
                this.state.currentUsername === user.username &&
                this.state.currentPassword === user.password
              ) {
                this.setState({ loggedIn: true, screen: "homeScreen" });
                console.log("Loggin in successfully");
              }
            });
            if (!this.state.loggedIn) {
              console.log("Incorrect username/password");
            }
            event.preventDefault();
          }}
        >
          <div>
            <label>
              Username:
              <input
                type="text"
                value={this.state.currentUsername}
                onChange={event =>
                  this.setState({ currentUsername: event.target.value })
                }
              />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input
                type="text"
                value={this.state.currentPassword}
                onChange={event =>
                  this.setState({ currentPassword: event.target.value })
                }
              />
            </label>
          </div>
          <input type="submit" value="Log In" />
        </form>
        <div>
          <button
            style={{ marginTop: 32 }}
            onClick={e => {
              e.preventDefault();
              this.setState({
                screen: "createNewUser",
                currentUsername: "",
                currentPassword: ""
              });
            }}
          >
            Sign Up New User
          </button>
        </div>
      </div>
    );
  };

  renderCreateNewUserScreen = () => {
    return (
      <div>
        <div>Creating a new user</div>
        <form
          onSubmit={event => {
            event.preventDefault();
            this.setState(prevState => ({
              users: [
                ...prevState.users,
                {
                  username: this.state.newUserEmail,
                  password: this.state.newUserPassword,
                  name: this.state.newUserName,
                  address: this.state.newUserAddress,
                  contactNumber: this.state.newUserContactNumber
                }
              ],
              screen: "Login",
              newUserName: "",
              newUserAddress: "",
              newUserContactNumber: "",
              newUserEmail: "",
              newUserPassword: ""
            }));
            console.log("Added new user");
          }}
        >
          <div>
            <label>
              Name
              <input
                type="text"
                value={this.state.newUserName}
                onChange={event =>
                  this.setState({ newUserName: event.target.value })
                }
              />
            </label>
          </div>
          <div>
            <label>
              Home Address
              <input
                type="text"
                value={this.state.newUserAddress}
                onChange={event =>
                  this.setState({ newUserAddress: event.target.value })
                }
              />
            </label>
          </div>
          <div>
            <label>
              Contact Phone Number
              <input
                type="text"
                value={this.state.newUserContactNumber}
                onChange={event =>
                  this.setState({ newUserContactNumber: event.target.value })
                }
              />
            </label>
          </div>
          <div>
            <label>
              Email
              <input
                type="text"
                value={this.state.newUserEmail}
                onChange={event =>
                  this.setState({ newUserEmail: event.target.value })
                }
              />
            </label>
          </div>
          <div>
            <label>
              Password
              <input
                type="text"
                value={this.state.newUserPassword}
                onChange={event =>
                  this.setState({ newUserPassword: event.target.value })
                }
              />
            </label>
          </div>
          <input type="submit" value="Register" />
        </form>
      </div>
    );
  };

  renderHomeScreen = () => {
    return (
      <div>
        Hello
        <div>
          {this.state.currentUsername === "Admin" ? (
            <button
              onClick={() => {
                console.log("Navigate to register health professionals screen");
                this.setState({ screen: "registerDoctorsScreen" });
              }}
            >
              Register Health Professionals
            </button>
          ) : null}
        </div>
      </div>
    );
  };

  render;

  renderRegisterDoctorsScreen = () => {
    return <div>Let's register a doc!</div>;
  };
}

export default App;
