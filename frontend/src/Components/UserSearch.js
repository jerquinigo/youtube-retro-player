import React, { Component } from "react";
import axios from "axios";
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
        <input
          type="text"
          onChange={this.handleChange}
          name="userInput"
          placeholder="enter text"
        />
        <button onClick={this.getVideoUrl}>submit</button>
      </div>
    );
  };

  getVideoUrl = () => {
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
        });
    }
  };

  getVideos = () => {};

  render() {
    console.log(this.state.videoId);
    return (
      <div>
        UserSearch
        {this.getUserInput()}
      </div>
    );
  }
}

export default UserSearch;
