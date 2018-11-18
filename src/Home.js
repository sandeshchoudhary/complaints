import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Home extends React.Component {
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
    return axios.post(`/complaints?message=${this.state.message}`)
    .then(result => {

    })
  }

  handleMessageInput(event) {
    this.setState({
      message: event.target.value
    });
  }

  render() {
    const list = this.state.complaints.map(item => {
      return (
        <tr key={item.id}>
          <td>{item.category}</td>
          <td>{item.rank}</td>
          <td>{item.speech}</td>
        </tr>
      );
    })
    return (
      <div style={styles.speechPanel}>
        <textarea placeholder={'Enter Message'} onChange={(ev) => this.handleMessageInput(ev)} style={{height: '200px'}}>
        </textarea>
        <button onClick={() => this.setComplaint()} style={{backgroundColor: 'green'}} className={!this.state.message ? 'disabled' : ''}>
          Submit
        </button>
      </div>
    );
  }
}

const styles = {
  speechPanel: {
    padding: '16px',
    width: '100%'
  }
}

