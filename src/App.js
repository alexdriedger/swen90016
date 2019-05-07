import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: "Login"
    };
  }

  render() {
    if (this.state.screen === "Login") {
      return <div>{renderLoginScreen()}</div>;
    }
  }
}

function renderLoginScreen() {
  return (
    <div className="LoginScreen">
      <p>Login here!</p>
    </div>
  );
}

export default App;
