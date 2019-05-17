import React from "react";
import "./App.css";
import AppointmentEvent from './appointmentEvent'

import WeekCalendar from 'react-week-calendar';
import 'react-week-calendar/dist/style.css';
import moment from 'moment';

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
	  appointments: [
		{
          uid: 6,
          start: moment({h: 10, m: 0}),
          end: moment({h: 10, m: 30}),
          value: "Janine Doink"
        },
      ],
      currentUsername: "",
      currentPassword: "",
      loggedIn: false,
      newUserName: "",
      newUserAddress: "",
      newUserContactNumber: "",
      newUserEmail: "",
      newUserPassword: "",
      newDocType: "",
      newDocPrice: "",
      activeUser: 0
    };
	this.setupAppointments();
  }
  
  setupAppointments() {
	for (var i = 1; i <= 5; i++) {
		this.state.appointments.push(
			{
			  uid: i,
			  start: moment().startOf('week').add(i,'day').hour(12) ,
			  end: moment().startOf('week').add(i,'day').hour(12).minutes(30),
			  value: "Lunch"
			}
		);
	}
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
  } else if (this.state.screen === "editUser") {
    return <div>{this.editUserScreen()}</div>;
    }

  }

  renderLoginScreen = () => {
    return (
      <div className="LoginScreen">
        <form
          onSubmit={event => {
            this.setState({activeUser: 0});
            var i = -1;
            this.state.users.forEach(user => {
              i++;
              console.log(i);
              if (
                this.state.currentUsername === user.username &&
                this.state.currentPassword === user.password
              ) {
                this.setState({ loggedIn: true, screen: "homeScreen", activeUser: i });
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
		{this.renderCalendar()}
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
          )
          : <button
            onClick={() => {
              this.setState({ screen: "editUser" });
            }}
          >
            Edit User Details
          </button>
          }
        </div>
		{this.renderCalendar()}
      </div>
    );
  };

  renderRegisterDoctorsScreen = () => {
      return (
        <div>
          <div>Add a new Health Care Professional</div>
          <form
            onSubmit={event => {
              event.preventDefault();
              this.setState(prevState => ({
                doctors: [
                  ...prevState.doctors,
                  {
                    type: this.state.newDocType,
                    name: this.state.newUserName,
                    email: this.state.newUserEmail,
                    price: this.state.newDocPrice
                  }
                ],
                screen: "homeScreen",
                newUserName: "",
                newDocType: "",
                newUserEmail: "",
                newDocPrice: ""
              }));
              console.log("Added new doctor");
            }}
          >
            <div>
                <label>
                  Type
                  <input
                    type="text"
                    value={this.state.newDocType}
                    list="data"
                    onChange={event =>
                      this.setState({ newDocType: event.target.value })
                    }
                  />
                  <datalist id="data">
                      <option value="Podiatrist" />
                      <option value="Chiropractor" />
                      <option value="Naturopath" />
                  </datalist>
                </label>
            </div>
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
                Cost Per Hour
                <input
                  type="text"
                  value={this.state.newDocPrice}
                  onChange={event =>
                    this.setState({ newDocPrice: event.target.value })
                  }
                />
              </label>
            </div>
            <input type="submit" value="Register" />
          </form>
        </div>
      );
  };

  editUserScreen = () => {
      var tempUsers = this.state.users;
      var tempCurUser = tempUsers[this.state.activeUser];
      return (
        <div>
          <div>Edit User Details</div>
          <form
            onSubmit={event => {
              event.preventDefault();

                if(this.state.newUserEmail !== "") {
                    tempCurUser.username = this.state.newUserEmail;
                }
                if(this.state.newUserPassword !== "") {
                    tempCurUser.password = this.state.newUserPassword;
                }
                if(this.state.newUserName !== "") {
                    tempCurUser.name = this.state.newUserName;
                }
                if(this.state.newUserAddress !== "") {
                    tempCurUser.address = this.state.newUserAddress;
                }
                if(this.state.newUserContactNumber !== "") {
                    tempCurUser.contactNumber = this.state.newUserContactNumber;
                }

              this.setState(prevState => ({
                users: tempUsers,
                screen: "homeScreen",
                newUserName: "",
                newUserAddress: "",
                newUserContactNumber: "",
                newUserEmail: "",
                newUserPassword: ""
              }));
            }}
          >
            <div>
              <label>
                Name
                <input
                  type="text"
                  placeholder={tempCurUser.name}
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
                  placeholder={tempCurUser.address}
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
                  placeholder={tempCurUser.contactNumber}
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
                  placeholder={tempCurUser.username}
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
                  placeholder={tempCurUser.password}
                  value={this.state.newUserPassword}
                  onChange={event =>
                    this.setState({ newUserPassword: event.target.value })
                  }
                />
              </label>
            </div>
            <input type="submit" value="Save" />
          </form>
        </div>
      );
  };
  
  renderCalendar() {
	console.log(moment().startOf('week'));
	return 	<div>
				<WeekCalendar
					firstDay = {moment().startOf('week').add(1,'day')}
					startTime = {moment({h:7,m:0})}
					endTime = {moment({h:18,m:0})}
					numberOfDays = {5}
					scaleHeaderTitle = {'Appointments'}
					scaleUnit = {30}
					useModel = {false}
					selectedIntervals = {this.state.appointments}
					eventComponent = {AppointmentEvent}
				/>
			</div>
  }
}

export default App;
