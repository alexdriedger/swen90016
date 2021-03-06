import React from "react";
import "./App.css";
import AppointmentEvent from "./appointmentEvent";

import WeekCalendar from "react-week-calendar";
import "react-week-calendar/dist/style.css";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import * as emailjs from "emailjs-com";
const { emailjs_userid } = require("./credentials.json");

const startingState = {
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
      name: "Test McTester",
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
      uid: 8,
      start: moment()
        .hour(13)
        .minute(0),
      end: moment()
        .hour(13)
        .minute(30),
      doctor: "Bob",
      comment: "Knee appointment",
      value: "Janine La Croix"
    },
    {
      uid: 9,
      start: moment()
        .hour(15)
        .minute(0),
      end: moment()
        .hour(15)
        .minute(30),
      doctor: "Bob",
      comment: "Strained ankle",
      value: "Kevin Gauss"
    },
    {
      uid: 10,
      start: moment()
        .add(1, "day")
        .hour(10)
        .minute(0),
      end: moment()
        .add(1, "day")
        .hour(10)
        .minute(30),
      doctor: "Alena",
      comment: "Dislocated spine",
      value: "Regina Phelange"
    },
    {
      uid: 11,
      start: moment()
        .hour(11)
        .minute(30)
        .add(1, "week"),
      end: moment()
        .hour(12)
        .minute(0)
        .add(1, "week"),
      doctor: "Alena",
      comment: "I died hard",
      value: "John McClane"
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
  createBookingDocName: "Alena",
  createBookingDate: new Date(),
  createBookingTime: moment()
    .hour(9)
    .minute(0),
  createBookingComments: "",
  calendarDisplayWeek: moment()
    .startOf("week")
    .add(1, "day"),
  createBookingUID: 12
};

class App extends React.Component {
  constructor(props) {
    super(props);
	//window.localStorage.clear();
    var defaultState = JSON.parse(window.localStorage.getItem("state"));
    if (
      defaultState === null ||
      (Object.entries(defaultState).length === 0 &&
        defaultState.constructor === Object)
    ) {
      console.log("State was empty, using default state");

      this.state = startingState;
    } else {
	  defaultState.appointments.map(app => {
		  app.start = moment(app.start);
		  app.end = moment(app.end);
		  return app;
	  })
      this.state = {
        ...startingState,
        users: defaultState.users,
        doctors: defaultState.doctors,
		appointments: defaultState.appointments
      };
      console.log("new state from saved:", this.state);
    }
    //this.setupAppointments();
    // this.sendEmail();
  }

  setupAppointments() {
    for (var i = 1; i <= 7; i++) {
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
        doctor: "",
        value: "Lunch"
      });
    }
  }

  render() {
    var stateString = JSON.stringify(this.state);
    window.localStorage.setItem("state", stateString);

    var homeButton = (
      <div className="homeButton">
        <button
          class="topCorner"
          onClick={() => {
            this.setState({
              screen: "Login",
              currentUsername: "",
              currentPassword: ""
            });
          }}
        >
          Home
        </button>
      </div>
    );

    var logOutButton = (
      <div className="logOutButton">
        <button
          class="topCorner"
          onClick={() => {
            this.setState({
              screen:
                this.state.currentUsername === "Admin"
                  ? "adminScreen"
                  : "customerScreen"
            });
          }}
        >
          Log Out
        </button>
      </div>
    );

    if (this.state.screen === "Login") {
      return <div>{this.renderLoginScreen()}</div>;
    } else if (this.state.screen === "createNewUser") {
      return (
        <div>
          {homeButton}
          {this.renderCreateNewUserScreen()}
        </div>
      );
    } else if (this.state.screen === "adminScreen") {
      return (
        <div>
          {homeButton}
          {this.renderAdminScreen()}
        </div>
      );
    } else if (this.state.screen === "customerScreen") {
      return (
        <div>
          {homeButton}
          {this.renderUserHomeScreen()}
        </div>
      );
    } else if (this.state.screen === "registerDoctorsScreen") {
      return (
        <div>
          {homeButton}
          {this.renderRegisterDoctorsScreen()}
        </div>
      );
    } else if (this.state.screen === "editUser") {
      return (
        <div>
          {homeButton}
          {this.editUserScreen()}
        </div>
      );
    } else if (this.state.screen === "bookAppointment") {
      return (
        <div>
          {homeButton}
          {this.renderBookingAppointmentScreen()}
        </div>
      );
    } else if (this.state.screen === "editAppointment") {
      return (
        <div>
          {homeButton}
          {this.editBookingAppointmentScreen()}
        </div>
      );
    }
  }

  renderLoginScreen = () => {
    return (
      <div className="LoginScreen">
        <h1>Geelong Health Care Centre</h1>
        <div className="formWrap">
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
      </div>
    );
  };

  renderCreateNewUserScreen = () => {
    return (
      <div>
        <h1>Create a new user</h1>
        <div className="formWrap">
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
      </div>
    );
  };

  renderAdminScreen = () => {
    return (
      <div>
        <h1>Admin Overview</h1>
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
          <button
            onClick={() => {
              this.setState(prevState => ({
                calendarDisplayWeek: prevState.calendarDisplayWeek.add(
                  -1,
                  "week"
                )
              }));
            }}
          >
            Prev
          </button>
          <button
            onClick={() => {
              this.setState(prevState => ({
                calendarDisplayWeek: prevState.calendarDisplayWeek.add(
                  1,
                  "week"
                )
              }));
            }}
          >
            Next
          </button>
        </div>
        {this.renderAllCalendars()}
      </div>
    );
  };

  renderAllCalendars = () => {
    return this.state.doctors.map(doc => {
      return (
        <div>
          <WeekCalendar
            firstDay={this.state.calendarDisplayWeek}
            startTime={moment({ h: 9, m: 0 })}
            endTime={moment({ h: 17, m: 0 })}
            numberOfDays={7}
            scaleHeaderTitle={doc.name}
            scaleUnit={30}
            useModal={true}
            selectedIntervals={this.state.appointments.filter(
              app => app.doctor === doc.name || app.value === "Lunch"
            )}
            eventComponent={AppointmentEvent}
          />
        </div>
      );
    });
  };

  renderRegisterDoctorsScreen = () => {
    return (
      <div>
        <h1>Add a new Health Care Professional</h1>
        <div className="formWrap">
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
                screen: "adminScreen",
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
                  <option value="podiatrist" />
                  <option value="chiropractor" />
                  <option value="naturopath" />
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
      </div>
    );
  };

  renderUserHomeScreen = () => {
    var editApp = "";
    var curName = this.state.users[this.state.activeUser].name;
    this.state.appointments.forEach(app => {
      if (app.value === this.state.currentUsername) {
        editApp = (
          <div>
            <button
              onClick={() => {
                this.setState({ screen: "editAppointment" });
              }}
            >
              Edit / Cancel Your Apppointment
            </button>
          </div>
        );
      }
    });
    return (
      <div>
        <h1>Welcome, {curName}</h1>
        <div className="formWrap">
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
              Book An Apppointment
            </button>
          </div>
          {editApp}
        </div>
      </div>
    );
  };

  renderBookingAppointmentScreen = () => {
    let availDocTypes = [...new Set(this.state.doctors.map(doc => doc.type))];
	var curName = this.state.users[this.state.activeUser].name;
    return (
      <div>
        <h1>Book Appointment</h1>
        <div className="formWrap">
          <form
            onSubmit={e => {
              e.preventDefault();
              this.setState(prevState => ({
                appointments: [
                  ...prevState.appointments,
                  {
                    uid: this.state.createBookingUID,
                    start: moment(this.state.createBookingDate)
                      .hour(this.state.createBookingTime.hour())
                      .minute(this.state.createBookingTime.minute()),
                    end: moment(this.state.createBookingDate)
                      .hour(this.state.createBookingTime.hour())
                      .minute(this.state.createBookingTime.minute())
                      .add(30, "minute"),
                    doctor: this.state.createBookingDocName,
                    comment: this.state.createBookingComments,
                    value: curName
                  }
                ],
                screen: "customerScreen",
                //createBookingDocType: "podiatrist",
                //createBookingDocName: "Alena",
                //createBookingDate: new Date(),
                //createBookingTime: moment()
                //.hour(8).minute(0),
                createBookingComments: "",
                createBookingUID: prevState.createBookingUID + 1
              }));
              let isCancelling = false;
              let docs = this.state.doctors.filter(
                d => d.name === this.state.createBookingDocName
              );
              let docEmail = docs[0].email;
              let docName = docs[0].name;
              let customers = this.state.users.filter(
                u => u.username === this.state.currentUsername
              );
              let cus_name = customers[0].name;
              let start_time = moment(this.state.createBookingDate)
                .hour(this.state.createBookingTime.hour())
                .minute(this.state.createBookingTime.minute());
              let end_time = moment(this.state.createBookingDate)
                .hour(this.state.createBookingTime.hour())
                .minute(this.state.createBookingTime.minute())
                .add(30, "minute");
              let time = start_time
                .format("MMMM Do LT")
                .concat(" - ")
                .concat(end_time.format("LT"));
              let phone_number = customers[0].contactNumber;
              let cus_email = customers[0].username;
              let comments = this.state.createBookingComments;

              // isCancelling, doc_email, doc_name, cus_name, time, phone_number, cus_email, comments
              this.sendEmail(
                isCancelling,
                docEmail,
                docName,
                cus_name,
                time,
                phone_number,
                cus_email,
                comments
              );
            }}
          >
            <div>
              <label>
                Doctor Type
                <select
                  value={this.state.createBookingDocType}
                  onChange={event => {
                    let firstDoc = this.state.doctors
                      .filter(doc => doc.type === event.target.value)
                      .map(doc => doc.name)[0];
                    this.setState({
                      createBookingDocType: event.target.value,
                      createBookingDocName: firstDoc
                    });
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
                Date
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
                Time <b>{this.state.createBookingTime.format("LT")}</b>
              </label>
            </div>
            <div>
              <label>
                Comments
                <input
                  type="text"
                  value={this.state.createBookingComments}
                  onChange={event => {
                    this.setState({
                      createBookingComments: event.target.value
                    });
                  }}
                />
              </label>
            </div>
            <input type="submit" value="Book Appointment" />
          </form>
        </div>
        <WeekCalendar
          firstDay={this.state.calendarDisplayWeek}
          startTime={moment({ h: 9, m: 0 })}
          endTime={moment({ h: 17, m: 0 })}
          numberOfDays={7}
          scaleHeaderTitle={this.state.createBookingDocName}
          scaleUnit={30}
          useModal={false}
          selectedIntervals={this.state.appointments
            .filter(
              app =>
                app.doctor === this.state.createBookingDocName ||
                app.value === "Lunch"
            )
            .map(app => {
              return {
                uid: app.uid,
                start: app.start,
                end: app.end,
                time: app.start,
                doctor: app.doctor,
                comment:
                  app.value === this.state.currentUsername ? app.comment : "",
                value:
                  app.value === this.state.currentUsername ? "You" : "Occupied"
              };
            })}
          eventComponent={AppointmentEvent}
          onEventClick={event => {
            if (
              event.value === "You" &&
              window.confirm("Delete this appointment?")
            ) {
              this.setState({
                appointments: this.state.appointments.filter(
                  app =>
                    app.value !== this.state.currentUsername ||
                    app.start !== event.time
                )
              });
            }
          }}
          onIntervalSelect={event => {
            let d = event[0].start;
            this.setState({
              createBookingDate: new Date(d.year(), d.month(), d.date()),
              createBookingTime: moment()
                .hour(d.hour())
                .minute(d.minute())
            });
          }}
        />
        <button
          onClick={() => {
            this.setState(prevState => ({
              calendarDisplayWeek: prevState.calendarDisplayWeek.add(-1, "week")
            }));
          }}
        >
          Prev
        </button>
        <button
          onClick={() => {
            this.setState(prevState => ({
              calendarDisplayWeek: prevState.calendarDisplayWeek.add(1, "week")
            }));
          }}
        >
          Next
        </button>
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
    //console.log(
    //  "appointmentTimes pre filter: ",
    //  appointmentTimes.map(a => moment.unix(Number(a)).format("LLLL"))
    //);
    let filteredTimeds = standardTimes.filter(
      t => !appointmentTimes.includes(t.format("X"))
    );
    //console.log(
    //  "appointmentTimes post filter: ",
    //  filteredTimeds.map(a => a.format("LLLL"))
    //);
    return filteredTimeds;
  };

  editUserScreen = () => {
    var tempUsers = this.state.users;
    var tempCurUser = tempUsers[this.state.activeUser];
    return (
      <div>
        <h1>Edit User Details</h1>
        <div className="formWrap">
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
                screen: "customerScreen",
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
      </div>
    );
  };

  editBookingAppointmentScreen = () => {
    var tempApps = this.state.appointments;
    var tempCurApp = null;
    tempApps.forEach(app => {
      if (app.value === this.state.currentUsername) {
        tempCurApp = app;
      }
    });
    if (tempCurApp === null) {
      this.setState(prevState => ({
        screen: "bookAppointment"
      }));
    }

    let availDocTypes = [...new Set(this.state.doctors.map(doc => doc.type))];
    return (
      <div>
        <h1>Edit Appointment</h1>
        <div className="formWrap">
          <form
            onSubmit={e => {
              e.preventDefault();
              tempCurApp.uid = this.state.createBookingUID;
              tempCurApp.start = moment(this.state.createBookingDate)
                .hour(this.state.createBookingTime.hour())
                .minute(this.state.createBookingTime.minute());
              tempCurApp.end = moment(this.state.createBookingDate)
                .hour(this.state.createBookingTime.hour())
                .minute(this.state.createBookingTime.minute())
                .add(30, "minute");
              tempCurApp.doctor = this.state.createBookingDocName;
              tempCurApp.comment = this.state.createBookingComments;
              tempCurApp.value = this.state.currentUsername;
              this.setState(prevState => ({
                appointments: tempApps,
                screen: "customerScreen"
              }));
            }}
          >
            <div>
              <label>
                Doctor Type
                <select
                  value={this.state.createBookingDocType}
                  onChange={event => {
                    let firstDoc = this.state.doctors
                      .filter(doc => doc.type === event.target.value)
                      .map(doc => doc.name)[0];
                    this.setState({
                      createBookingDocType: event.target.value,
                      createBookingDocName: firstDoc
                    });
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
                  value={tempCurApp.doctor}
                  onChange={event => {
                    tempCurApp.doctor = event.target.value;
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
                Time <b>{this.state.createBookingTime.format("LT")}</b>
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
            <button
              onClick={() => {
                if (window.confirm("Cancel this appointment?")) {
                  this.setState({
                    appointments: this.state.appointments.filter(
                      app => app.value !== this.state.currentUsername
                    ),
                    screen: "customerScreen"
                  });
                }
              }}
            >
              Cancel Appointment
            </button>
            <input type="submit" value="Save Appointment" />
          </form>
        </div>
        <WeekCalendar
          firstDay={this.state.calendarDisplayWeek}
          startTime={moment({ h: 9, m: 0 })}
          endTime={moment({ h: 17, m: 0 })}
          numberOfDays={7}
          scaleHeaderTitle={this.state.createBookingDocName}
          scaleUnit={30}
          useModal={false}
          selectedIntervals={this.state.appointments
            .filter(
              app =>
                app.doctor === this.state.createBookingDocName ||
                app.value === "Lunch"
            )
            .map(app => {
              return {
                uid: app.uid,
                start: app.start,
                end: app.end,
                time: app.start,
                doctor: app.doctor,
                comment:
                  app.value === this.state.currentUsername ? app.comment : "",
                value:
                  app.value === this.state.currentUsername ? "You" : "Occupied"
              };
            })}
          eventComponent={AppointmentEvent}
          onEventClick={event => {
            if (
              event.value === "You" &&
              window.confirm("Cancel this appointment?")
            ) {
              this.setState({
                appointments: this.state.appointments.filter(
                  app =>
                    app.value !== this.state.currentUsername ||
                    app.start !== event.time
                ),
                screen: "customerScreen"
              });
              let isCancelling = true;
              let docName = this.state.createBookingDocName;
              let comments = this.state.createBookingComments;

              let docs = this.state.doctors.filter(
                d => d.name === this.state.createBookingDocName
              );
              let docEmail = docs[0].email;
              let customers = this.state.users.filter(
                u => u.username === this.state.currentUsername
              );
              let cus_name = customers[0].name;
              let start_time = moment(this.state.createBookingDate)
                .hour(this.state.createBookingTime.hour())
                .minute(this.state.createBookingTime.minute());
              let end_time = moment(this.state.createBookingDate)
                .hour(this.state.createBookingTime.hour())
                .minute(this.state.createBookingTime.minute())
                .add(30, "minute");
              let time = start_time
                .format("MMMM Do LT")
                .concat(" - ")
                .concat(end_time.format("LT"));
              let phone_number = customers[0].contactNumber;
              let cus_email = customers[0].username;

              // isCancelling, doc_email, doc_name, cus_name, time, phone_number, cus_email, comments
              this.sendEmail(
                isCancelling,
                docEmail,
                docName,
                cus_name,
                time,
                phone_number,
                cus_email,
                comments
              );
            }
          }}
          onIntervalSelect={event => {
            let d = event[0].start;
            this.setState({
              createBookingDate: new Date(d.year(), d.month(), d.date()),
              createBookingTime: moment()
                .hour(d.hour())
                .minute(d.minute())
            });
          }}
        />
        <button
          onClick={() => {
            this.setState(prevState => ({
              calendarDisplayWeek: prevState.calendarDisplayWeek.add(-1, "week")
            }));
          }}
        >
          Prev
        </button>
        <button
          onClick={() => {
            this.setState(prevState => ({
              calendarDisplayWeek: prevState.calendarDisplayWeek.add(1, "week")
            }));
          }}
        >
          Next
        </button>
      </div>
    );
  };

  sendEmail = (
    isCancelling,
    doc_email,
    doc_name,
    cus_name,
    time,
    phone_number,
    cus_email,
    comments
  ) => {
    let template = isCancelling ? "cancel_booking" : "create_booking";
    console.log("Sending email");
    console.log(
      isCancelling,
      doc_email,
      doc_name,
      cus_name,
      time,
      phone_number,
      cus_email,
      comments
    );
    emailjs.send(
      "gmail",
      template,
      {
        doc_email: doc_email,
        doc_name: doc_name,
        cus_name: cus_name,
        time: time,
        phone_number: phone_number,
        cus_email: cus_email,
        comments: comments
      },
      emailjs_userid
    );
    // emailjs.send(
    //   "gmail",
    //   "create_booking",
    //   {
    //     doc_email: "aldriedger@gmail.com",
    //     doc_name: "alex",
    //     cus_name: "joe schmuck",
    //     time: "May 26 4:00pm - 4:30pm",
    //     phone_number: "123-456-7890",
    //     cus_email: "test@blackhole.com",
    //     comments: "This is a from react"
    //   },
    //   emailjs_userid
    // );
  };
}

export default App;
