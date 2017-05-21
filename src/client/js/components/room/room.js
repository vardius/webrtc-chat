import {
  WebComponent
} from 'web-component';
import {
  AppEventType
} from 'peer-data';

@WebComponent('webrtc-room', {
  template: require('./room.html')
})
export class Room extends HTMLElement {
  constructor() {
    super();

    this._id = null;
    this._username = null;
    this._stream = null;

    this.peerData = null;
    this.participants = null;
    this.conversation = null;

    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);

    this._onSend = this._onSend.bind(this);
    this._onPeer = this._onPeer.bind(this);
    this._onChannel = this._onChannel.bind(this);
    this._toggleAudio = this._toggleAudio.bind(this);
    this._toggleVideo = this._toggleVideo.bind(this);
  }

  static get observedAttributes() {
    return ['id', 'username'];
  }

  connectedCallback() {
    this.participants = this.querySelector('webrtc-participants');
    this.conversation = this.querySelector('webrtc-conversation');

    const callBtn = this.querySelector('.btn-call');
    callBtn.addEventListener('click', this.connect);

    const hangBtn = this.querySelector('.btn-hang');
    hangBtn.addEventListener('click', this.disconnect);

    const muteBtn = this.querySelector('.btn-mute');
    muteBtn.addEventListener('click', this._toggleAudio);

    const camBtn = this.querySelector('.btn-cam');
    camBtn.addEventListener('click', this._toggleVideo);

    const messageNew = this.conversation.querySelector('webrtc-message-new');
    messageNew.addEventListener('send', this._onSend);

    const self = this.querySelector('.video-self');
    if (self.srcObject !== this._stream) {
      self.srcObject = this._stream;
    }

    this.peerData.on(AppEventType.PEER, this._onPeer);
    this.peerData.on(AppEventType.CHANNEL, this._onChannel);

    this.conversation.owner = this._username;
  }

  disconnectedCallback() {
    this.disconnect();
  }

  connect() {
    if (this.peerData && this.id.length > 0) {
      this.peerData.connect(this.id);
      const hangBtn = this.querySelector('.btn-hang');
      hangBtn.style.display = 'block';
      const callBtn = this.querySelector('.btn-call');
      callBtn.style.display = 'none';
    }
  }

  disconnect() {
    if (this.peerData) {
      this.peerData.disconnect(this.id);
    }
    const hangBtn = this.querySelector('.btn-hang');
    hangBtn.style.display = 'none';
    const callBtn = this.querySelector('.btn-call');
    callBtn.style.display = 'block';
    this.participants.clear();
  }

  setStream(stream) {
    this._stream = stream;
  }

  send(data) {
    this.peerData.send(JSON.stringify({
      message: data,
      username: this.username
    }));
  }

  _onSend(e) {
    this.send(e.detail);
  }

  _onChannel(e) {
    if (e.room.id !== this._id) {
      return;
    }

    const channel = e.data;
    channel.onmessage = event => {
      const msg = JSON.parse(event.data)
      this.conversation.addMessage(msg.username, msg.message, 'income');
    };
  }

  _onPeer(e) {
    if (e.room.id !== this._id) {
      return;
    }

    const peerElem = this.participants.addPeer(e.caller.id);

    this._stream.getTracks().forEach(track => e.data.addTrack(track, this._stream));

    const onconnectionstatechange = e.data.onconnectionstatechange;
    e.data.onconnectionstatechange = event => {
      if (onconnectionstatechange) {
        onconnectionstatechange(event);
      }
      if (e.data.connectionState === 'closed') {
        peerElem.parentNode.removeChild(peerElem);
      }
    }

    e.data.oniceconnectionstatechange = function () {
      if (e.data.iceConnectionState == 'disconnected') {
        peerElem.parentNode.removeChild(peerElem);
      }
    };

    e.data.onsignalingstatechange = () => {
      if (e.data.signalingState === "closed") {
        peerElem.parentNode.removeChild(peerElem);
      }
    };

    e.data.ontrack = event => {
      const stream = event.streams[0];
      if (stream !== peerElem.getStream()) {
        peerElem.setStream(stream);
      }
    };
  }

  _toggleAudio() {
    if (this._stream) {
      const audioTracks = this._stream.getAudioTracks();
      if (audioTracks[0]) {
        const enabled = !audioTracks[0].enabled;
        audioTracks[0].enabled = enabled;

        const muteBtn = this.querySelector('.btn-mute');
        if (enabled) {
          muteBtn.classList.add('btn-success');
          muteBtn.classList.remove('btn-danger');
        } else {
          muteBtn.classList.remove('btn-success');
          muteBtn.classList.add('btn-danger');
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

        const camBtn = this.querySelector('.btn-cam');
        if (enabled) {
          camBtn.classList.add('btn-success');
          camBtn.classList.remove('btn-danger');
        } else {
          camBtn.classList.remove('btn-success');
          camBtn.classList.add('btn-danger');
        }
      }
    }
  }
}
