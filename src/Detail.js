import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Home';

export default class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      complaints: [],
      message: ''
    }

    this.handleMessageInput = this.handleMessageInput.bind(this);
  }

  componentWillMount() {
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
      <div style={styles.listPanel}>
      <table>
        <thead>
          <tr>
          <th>Category</th>
          <th>Rank</th>
          <th>Speech</th>
          </tr>
        </thead>
        <tbody>
          {list}
        </tbody>
      </table>
      </div>
      
    );
  }
}

const styles = {
  listPanel: {
    padding: '16px',
    height: '90vh',
    overflowX: 'auto'
  }
}

