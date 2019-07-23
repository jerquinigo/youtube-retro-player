import React, { Component } from "react";
// import Iframe from "react-iframe";
import YouTube from "react-youtube";
import television from "../Assets/editedTvForProject.png";
import "../CSS/DisplayVideo.css";

class DisplayVideo extends Component {
  constructor() {
    super();
    this.state = {
      videoNext: []
    };
  }

  displayVideo = () => {
    if (this.props.videoId) {
      console.log(this.props.videoId, "the video id length to keep an eye on");
      return (
        <div className="mainDisplayContainer">
          <div className="innerDisplayContainer">
            <div className="imageDiv">
              <img className="televisionImage" src={television} alt="" />
            </div>
            <div className="videoPlayerDiv">
              <YouTube
                className={"videoPlayer"}
                autoplay={true}
                videoId={this.props.videoId[0]}
                onReady={this.onReadyVideo}
                onEnd={this.onEndVideo}
                onError={this.onError}
              />
            </div>
          </div>
        </div>
      );
    }
  };

  onReadyVideo = event => {
    event.target.playVideo();
    let data = event.target.getVideoData();
    console.log(data);
  };
  onError = () => {
    return <p>hello world</p>;
  };

  onEndVideo = event => {
    // cueVideoById;

    let videos = this.props.videoId;
    videos.shift();
    let videoQueue = videos.shift();
    event.target.cueVideoById(`${videoQueue}`);
  };

  //to display again the list of youtube videos using a different player_api
  // };

  render() {
    console.log(this.props.videoId, "the video ID");
    return (
      <div>
        DisplayVideo
        {this.props.videoId ? this.displayVideo() : null}
      </div>
    );
  }
}

export default DisplayVideo;

// videoId={"vGUEAdWrqZk"}
