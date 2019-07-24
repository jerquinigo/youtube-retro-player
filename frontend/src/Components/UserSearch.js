import React, { Component } from "react";
import axios from "axios";
import DisplayVideo from "./DisplayVideo.js";
import "../CSS/UserSearch.css";
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
        <div className="card">
          <form onSubmit={this.getVideoUrl}>
            <div className="centerInputBox">
              <div className="row">
                <input
                  className="input-field col s4"
                  type="text"
                  onChange={this.handleChange}
                  name="userInput"
                  placeholder="Enter A song please"
                />
              </div>
            </div>
            <input
              className="btn waves-effect waves-light"
              type="submit"
              value="submit"
            />
          </form>
        </div>
      </div>
    );
  };

  getVideoUrl = event => {
    event.preventDefault();
    let apikey = secret.secretkey;
    let query = this.state.userInput;

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
        {this.getUserInput()}
        {this.state.videoId.length ? (
          <DisplayVideo videoId={this.state.videoId} />
        ) : null}
      </div>
    );
  }
}

export default UserSearch;
