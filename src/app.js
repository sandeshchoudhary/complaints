import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Home';
import Detail from './Detail';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      complaints: [],
      message: ''
    }

    this.handleMessageInput = this.handleMessageInput.bind(this);
  }

  getComplaints() {
    return axios.get('/complaints')
    .then(result => {
      this.setState({
        complaints: result.data.data
      });
    })
  }

  setComplaint() {
    return axios.post('/complaints', {
      message: this.state.message
    })
    .then(result => {

    })
  }

  handleMessageInput(event) {
    this.setState({
      message: event.target.value
    });
  }

  render() {
    return (

      <Router>
      <div style={{display: 'flex'}}>
        <ul style={styles.nav}>
          <li>
            <Link to="/">Register</Link>
          </li>
          <li>
            <Link to="/details">Details</Link>
          </li>
        </ul>
        <Route exact path="/" component={Home} />
        <Route exact path="/details" component={Detail} />
      </div>
    </Router>
      
    );
  }
}

const styles = {
  speechPanel: {
    padding: '16px'
  },
  nav: {
    listStyleType: 'none',
    padding: '16px',
    borderRight: '1px solid gray',
    height: '100vh'
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}
