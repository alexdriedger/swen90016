import React from "react";
import "./App.css";
import AppointmentEvent from "./appointmentEvent";

import WeekCalendar from "react-week-calendar";
import "react-week-calendar/dist/style.css";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

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
        },
        {
          type: "chiropractor",
          name: "Sarah",
          email: "sarah@blackhole.com",
          price: 80
        },
        {
          type: "podiatrist",
          name: "Jeff",
          email: "jeff@blackhole.com",
          price: 100
        },
        {
          type: "podiatrist",
          name: "Bob",
          email: "bob@blackhole.com",
          price: 110
        }
      ],
      appointments: [
        {
          uid: 6,
          start: moment()
            .hour(13)
            .minute(0),
          end: moment()
            .hour(13)
            .minute(30),
          doctor: "Bob",
          comment: "Knee appointment",
          value: "Janine Doink"
        },
        {
          uid: 7,
          start: moment()
            .hour(15)
            .minute(0),
          end: moment()
            .hour(15)
            .minute(30),
          doctor: "Bob",
          comment: "Arms and stuff",
          value: "val2"
        },
        {
          uid: 8,
          start: moment()
            .add(1, "day")
            .hour(10)
            .minute(0),
          end: moment()
            .add(1, "day")
            .hour(10)
            .minute(30),
          doctor: "Alena",
          comment: "Doctory things",
          value: "val3"
        },
        {
          uid: 9,
          start: moment()
            .hour(11)
            .minute(30),
          end: moment()
            .hour(12)
            .minute(0),
          doctor: "Alena",
          comment: "Stuff & things",
          value: "val4"
        }
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
      activeUser: 0,
      createBookingDocType: "chiropractor",
      createBookingDocName: "",
      createBookingDate: new Date(),
      createBookingTime: moment()
        .hour(9)
        .format("X"),
      createBookingComments: ""
    };
    this.setupAppointments();
  }

  setupAppointments() {
    for (var i = 1; i <= 5; i++) {
      this.state.appointments.push({
        uid: i,
        start: moment()
          .startOf("week")
          .add(i, "day")
          .hour(12),
        end: moment()
          .startOf("week")
          .add(i, "day")
          .hour(12)
          .minutes(30),
        value: "Lunch"
      });
    }
  }

  render() {
    if (this.state.screen === "Login") {
      return <div>{this.renderLoginScreen()}</div>;
    } else if (this.state.screen === "createNewUser") {
      return <div>{this.renderCreateNewUserScreen()}</div>;
    } else if (this.state.screen === "adminScreen") {
      return <div>{this.renderAdminScreen()}</div>;
    } else if (this.state.screen === "customerScreen") {
      return <div>{this.renderUserHomeScreen()}</div>;
    } else if (this.state.screen === "registerDoctorsScreen") {
      return <div>{this.renderRegisterDoctorsScreen()}</div>;
    } else if (this.state.screen === "editUser") {
      return <div>{this.editUserScreen()}</div>;
    } else if (this.state.screen === "bookAppointment") {
      return <div>{this.renderBookingAppointmentScreen()}</div>;
    }
  }

  renderLoginScreen = () => {
    return (
      <div className="LoginScreen">
        <form
          onSubmit={event => {
            this.setState({ activeUser: 0 });
            var i = -1;
            this.state.users.forEach(user => {
              i++;
              console.log(i);
              if (
                this.state.currentUsername === user.username &&
                this.state.currentPassword === user.password
              ) {
                this.setState({
                  loggedIn: true,
                  screen:
                    this.state.currentUsername === "Admin"
                      ? "adminScreen"
                      : "customerScreen",
                  activeUser: i
                });
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

  renderAdminScreen = () => {
    return (
      <div>
        Admin Overview
        <div>
          <button
            onClick={() => {
              console.log("Navigate to register health professionals screen");
              this.setState({ screen: "registerDoctorsScreen" });
            }}
          >
            Register Health Professionals
          </button>
        </div>
        <div>
          <WeekCalendar
            firstDay={moment()
              .startOf("week")
              .add(1, "day")}
            startTime={moment({ h: 7, m: 0 })}
            endTime={moment({ h: 18, m: 0 })}
            numberOfDays={5}
            scaleHeaderTitle={"Appointments"}
            scaleUnit={30}
            useModal={false}
            selectedIntervals={this.state.appointments}
            eventComponent={AppointmentEvent}
          />
        </div>
      </div>
    );
  };

  renderCustomerScreen = () => {
    this.state.appointments.map(app => (app.value = "Taken")); // Why does this work and is this not a perm change?
    return (
      <div>
        Hello {this.state.currentUsername}
        <div>
          <button
            onClick={() => {
              this.setState({ screen: "editUser" });
            }}
          >
            Edit User Details
          </button>
        </div>
        <div>
          <WeekCalendar
            firstDay={moment()
              .startOf("week")
              .add(1, "day")}
            startTime={moment({ h: 7, m: 0 })}
            endTime={moment({ h: 18, m: 0 })}
            numberOfDays={5}
            scaleHeaderTitle={"Appointments"}
            scaleUnit={30}
            useModal={false}
            selectedIntervals={this.state.appointments}
            eventComponent={AppointmentEvent}
          />
        </div>
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

  renderUserHomeScreen = () => {
    return (
      <div>
        <div>
          <button
            onClick={() => {
              this.setState({ screen: "editUser" });
            }}
          >
            Edit User Details
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              this.setState({ screen: "bookAppointment" });
            }}
          >
            Book an Apppointment!
          </button>
        </div>
      </div>
    );
  };

  renderBookingAppointmentScreen = () => {
    let availDocTypes = [...new Set(this.state.doctors.map(doc => doc.type))];
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            // console.log(this.state.createBookingTime);
            // let start = moment(this.state.createBookingTime);
            // console.log(start.format("X"));
            // let startunix = moment.unix(this.state.createBookingTime);
            // console.log(startunix.format("X"));
            this.setState(prevState => ({
              appointments: [
                ...prevState.appointments,
                {
                  start: moment(Number(this.state.createBookingTime)),
                  end: moment(Number(this.state.createBookingTime)).add(
                    30,
                    "minute"
                  ),
                  doctor: this.state.createBookingDocName,
                  comment: this.state.createBookingComments,
                  value: this.state.createBookingComments
                }
              ],
              screen: "customerScreen",
              createBookingDocType: "chiropractor",
              createBookingDocName: "",
              createBookingDate: new Date(),
              createBookingTime: moment()
                .hour(9)
                .format("X"),
              createBookingComments: ""
            }));
            /*

          appointments: [
        {
          uid: 6,
          start: moment()
            .hour(13)
            .minute(0),
          end: moment()
            .hour(13)
            .minute(30),
          doctor: "Bob",
          comment: "Knee appointment",
          value: "Janine Doink"
        },

          createBookingDocType: "chiropractor",
          createBookingDocName: "",
          createBookingDate: new Date(),
          createBookingTime: moment()
            .hour(9)
            .format("X"),
          createBookingComments: ""
          */
          }}
        >
          <div>
            <label>
              Doctor Type
              <select
                value={this.state.createBookingDocType}
                onChange={event => {
                  this.setState({ createBookingDocType: event.target.value });
                }}
              >
                {availDocTypes.map(type => {
                  return <option value={type}>{type}</option>;
                })}
              </select>
            </label>
          </div>
          <div>
            <label>
              Doctor Name
              <select
                value={this.state.createBookingDocName}
                onChange={event => {
                  this.setState({ createBookingDocName: event.target.value });
                }}
              >
                {this.state.doctors
                  .filter(doc => doc.type === this.state.createBookingDocType)
                  .map(doc => {
                    return (
                      <option value={doc.name}>
                        {doc.name} : ${doc.price} per hour
                      </option>
                    );
                  })}
              </select>
            </label>
          </div>
          <div>
            <div>
              Time
              <DatePicker
                selected={this.state.createBookingDate}
                onChange={event => {
                  this.setState({ createBookingDate: event });
                }}
                minDate={new Date()}
              />
            </div>
          </div>
          <div>
            <label>
              Time
              <select
                value={this.state.createBookingTime}
                onChange={event => {
                  console.log(event.target.value);
                  this.setState({ createBookingTime: event.target.value });
                }}
              >
                {this.renderBookingTimeOptions()}
              </select>
            </label>
          </div>
          <div>
            <label>
              Comments
              <input
                type="text"
                value={this.state.createBookingComments}
                onChange={event =>
                  this.setState({ createBookingComments: event.target.value })
                }
              />
            </label>
          </div>
          <input type="submit" value="Book Appointment" />
        </form>
      </div>
    );
  };

  renderBookingTimeOptions = () => {
    return this.getAvailableBookingTimes().map(t => {
      // console.log(t);
      return <option value={t}>{t.format("h:mm a")}</option>;
    });
  };

  getAvailableBookingTimes = () => {
    let standardTimes = [];
    for (let i = 9; i < 17; i++) {
      standardTimes.push(
        moment(this.state.createBookingDate)
          .hour(i)
          .minute(0)
      );
      standardTimes.push(
        moment(this.state.createBookingDate)
          .hour(i)
          .minute(30)
      );
    }

    let appointmentTimes = [
      ...new Set(
        this.state.appointments
          .filter(a => a.doctor === this.state.createBookingDocName)
          .map(a => a.start.format("X"))
      )
    ];
    console.log(
      "appointmentTimes pre filter: ",
      appointmentTimes.map(a => moment.unix(Number(a)).format("LLLL"))
    );
    let filteredTimeds = standardTimes.filter(
      t => !appointmentTimes.includes(t.format("X"))
    );
    console.log(
      "appointmentTimes post filter: ",
      filteredTimeds.map(a => a.format("LLLL"))
    );
    return filteredTimeds;
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

            if (this.state.newUserEmail !== "") {
              tempCurUser.username = this.state.newUserEmail;
            }
            if (this.state.newUserPassword !== "") {
              tempCurUser.password = this.state.newUserPassword;
            }
            if (this.state.newUserName !== "") {
              tempCurUser.name = this.state.newUserName;
            }
            if (this.state.newUserAddress !== "") {
              tempCurUser.address = this.state.newUserAddress;
            }
            if (this.state.newUserContactNumber !== "") {
              tempCurUser.contactNumber = this.state.newUserContactNumber;
            }

            // TODO : CHANGE THIS TO SAVE THE STATE THE USER ENTERED
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
}

export default App;
