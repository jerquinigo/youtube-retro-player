import React, { Component } from "react";
// import Iframe from "react-iframe";
import YouTube from "react-youtube";

class DisplayVideo extends Component {
  constructor() {
    super();
    this.state = {
      videoNext: []
    };
  }

  displayVideo = nextVid => {
    return (
      <YouTube
        className="videoPlayer"
        videoId={"vGUEAdWrqZk"}
        onEnd={this.onEndVideo}
      />
    );
  };

  onEndVideo = event => {
    debugger;
    let videos = this.props.videoId;
    let nextVideoQ = String(videos.shift());

    event.target.loadVideoById(nextVideoQ);
  };
  // <Iframe
  //   className="videoPlayer"
  //   url="http://www.youtube.com/embed/vGUEAdWrqZk"
  //   width="450px"
  //   height="450px"
  //   id="myId"
  //   display="initial"
  //   position="relative"
  // />,

  checkEvent = event => {};

  render() {
    console.log(this.props.videoId, "the video Id ");
    console.log(this.state.videoNext, "next");
    return (
      <div>
        DisplayVideo
        {this.displayVideo()}
        {this.checkEvent()}
        {this.props.videoId ? this.onEndVideo() : null}
      </div>
    );
  }
}

export default DisplayVideo;
