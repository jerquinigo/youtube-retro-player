import React, { Component } from "react";
import axios from "axios";
import DisplayVideo from "./DisplayVideo.js";
const secret = require("../secret.json");

class UserSearch extends Component {
  constructor() {
    super();
    this.state = {
      userInput: "",
      videoApiData: [],
      videoId: []
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  getUserInput = () => {
    return (
      <div>
        <form onSubmit={this.getVideoUrl}>
          <input
            type="text"
            onChange={this.handleChange}
            name="userInput"
            placeholder="enter text"
          />
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  };

  getVideoUrl = event => {
    event.preventDefault();
    let apikey = secret.secretkey;
    let query = this.state.userInput;
    // https://www.googleapis.com/youtube/v3/search?key=AIzaSyBmkkiBkyBt8LbEPsOuijYCjjJZxAPElQM&part=snippet&q=${
    if (query) {
      let videoIdArr = [];
      axios
        .get(
          `https://www.googleapis.com/youtube/v3/search?key=${apikey}&part=snippet&q=${query}`
        )
        .then(response => {
          this.setState({
            videoApiData: response.data.items
          });
        })
        .then(() => {
          this.state.videoApiData.forEach(vid => {
            videoIdArr.push(vid.id.videoId);
          });
        })
        .then(() => {
          this.setState({
            videoId: videoIdArr
          });
        })
        .then(() => {
          this.resetStateForInput();
        });
    }
  };

  resetStateForInput = () => {
    if (this.state.videoApiData && this.state.userInput) {
      this.setState({
        userInput: ""
      });
    }
  };

  render() {
    console.log(this.state.videoId);
    return (
      <div>
        UserSearch
        {this.getUserInput()}
        {this.state.videoId.length ? (
          <DisplayVideo videoId={this.state.videoId} />
        ) : null}
      </div>
    );
  }
}

export default UserSearch;
