import { WebComponent } from "web-component";

@WebComponent("webrtc-room", {
  template: require("./room.html")
})
export class Room extends HTMLElement {
  constructor() {
    super();

    this._id = null;
    this._username = null;
    this._stream = null;
    this._timeout = null;
    this._isConnected = false;

    this.peerData = null;
    this.peerDataRoom = null;
    this.participants = null;
    this.conversation = null;

    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);

    this._onSend = this._onSend.bind(this);
    this._toggleAudio = this._toggleAudio.bind(this);
    this._toggleVideo = this._toggleVideo.bind(this);
    this._toggleFullScreen = this._toggleFullScreen.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
  }

  static get observedAttributes() {
    return ["id", "username"];
  }

  connectedCallback() {
    this.participants = this.querySelector("webrtc-participants");
    this.conversation = this.querySelector("webrtc-conversation");

    this.addEventListener("mousemove", this._onMouseMove);

    const enterBtn = this.querySelector(".btn-enter");
    enterBtn.addEventListener("click", this.connect);
    enterBtn.addEventListener("click", this.disconnect);

    const muteBtn = this.querySelector(".btn-mute");
    muteBtn.addEventListener("click", this._toggleAudio);

    const camBtn = this.querySelector(".btn-cam");
    camBtn.addEventListener("click", this._toggleVideo);
    const fsBtn = this.querySelector(".btn-fullscreen");
    fsBtn.addEventListener("click", this._toggleFullScreen);

    const messageNew = this.conversation.querySelector("webrtc-message-new");
    messageNew.addEventListener("send", this._onSend);

    const self = this.querySelector(".video-self");
    if (self.srcObject !== this._stream) {
      self.srcObject = this._stream;
    }

    this.conversation.owner = this._username;
  }

  disconnectedCallback() {
    this.disconnect();
  }

  connect() {
    if (
      !this.peerDataRoom && this.peerData && this.id.length > 0 && this._stream
    ) {
      const peerDataRoom = this.peerData.connect(this._id, this._stream);
      peerDataRoom.on("participant", participant => {
        const peerElem = this.participants.addPeer(participant.getId());

        participant.on("message", payload => {
          const msg = JSON.parse(payload);
          this.conversation.addMessage(msg.username, msg.message, "income");
        });

        participant.on("disconnected", () => {
          if (peerElem.parentNode) {
            peerElem.parentNode.removeChild(peerElem);
          }
        });

        participant.on("track", event => {
          const stream = event.streams[0];
          if (stream !== peerElem.getStream()) {
            peerElem.setStream(stream);
          }
        });
      });

      const enterBtn = this.querySelector(".btn-enter");
      enterBtn.classList.remove("btn-success");
      enterBtn.classList.add("btn-danger");
      const enterIcon = this.querySelector(".icon-enter");
      enterIcon.classList.remove("fa-sign-in");
      enterIcon.classList.add("fa-sign-out");

      setTimeout(() => this.peerDataRoom = peerDataRoom, 500);
    }
  }

  disconnect() {
    if (this.peerDataRoom) {
      this.peerDataRoom.disconnect(this.id);
      this.participants.clear();

      const enterBtn = this.querySelector(".btn-enter");
      enterBtn.classList.add("btn-success");
      enterBtn.classList.remove("btn-danger");
      const enterIcon = this.querySelector(".icon-enter");
      enterIcon.classList.add("fa-sign-in");
      enterIcon.classList.remove("fa-sign-out");

      setTimeout(() => this.peerDataRoom = null, 500);
    }
  }

  setStream(stream) {
    this._stream = stream;
  }

  send(data) {
    if (this.peerDataRoom) {
      this.peerDataRoom.send(
        JSON.stringify({
          message: data,
          username: this.username
        })
      );
    }
  }

  _onSend(e) {
    this.send(e.detail);
  }

  _onMouseMove() {
    clearTimeout(this._timeout);
    const giuElements = this.querySelectorAll(".gui");
    Array.from(giuElements).forEach(element => {
      $(element).fadeIn();
    });
    this._timeout = setTimeout(() => {
      if (this.peerDataRoom) {
        Array.from(giuElements).forEach(element => {
          $(element).fadeOut();
        });
      }
    }, 10000);
  }

  _toggleFullScreen() {
    const fullscreenBtn = this.querySelector(".btn-fullscreen");
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
      fullscreenBtn.classList.add("btn-info");
      fullscreenBtn.classList.remove("btn-default");
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      fullscreenBtn.classList.remove("btn-info");
      fullscreenBtn.classList.add("btn-default");
    }
  }

  _toggleAudio() {
    if (this._stream) {
      const audioTracks = this._stream.getAudioTracks();
      if (audioTracks[0]) {
        const enabled = !audioTracks[0].enabled;
        audioTracks[0].enabled = enabled;

        const muteBtn = this.querySelector(".btn-mute");
        if (enabled) {
          muteBtn.classList.remove("btn-danger");
          muteBtn.classList.add("btn-default");
        } else {
          muteBtn.classList.add("btn-danger");
          muteBtn.classList.remove("btn-default");
        }
      }
    }
  }

  _toggleVideo() {
    if (this._stream) {
      const videoTracks = this._stream.getVideoTracks();
      if (videoTracks[0]) {
        const enabled = !videoTracks[0].enabled;
        videoTracks[0].enabled = enabled;

        const camBtn = this.querySelector(".btn-cam");
        if (enabled) {
          camBtn.classList.remove("btn-danger");
          camBtn.classList.add("btn-default");
        } else {
          camBtn.classList.add("btn-danger");
          camBtn.classList.remove("btn-default");
        }
      }
    }
  }
}
