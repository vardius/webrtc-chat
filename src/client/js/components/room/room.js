import {
  WebComponent
} from 'web-component';
import {
  DataEventType,
  PeerEventType
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
    this._onData = this._onData.bind(this);
    this._onNewPeer = this._onNewPeer.bind(this);
  }

  static get observedAttributes() {
    return ['id', 'username'];
  }

  connectedCallback() {
    this.participants = this.querySelector('webrtc-participants');
    this.conversation = this.querySelector('webrtc-conversation');
  }

  disconnectedCallback() {
    this.disconnect();
  }

  connect() {
    if (this.peerData && this.id.length > 0) {
      this.peerData.connect(this.id);
      this.peerData.on(DataEventType.DATA, this._onData);
      this.peerData.on(PeerEventType.CREATED, this._onNewPeer);

      this.conversation.owner = this._username;

      const messageNew = this.conversation.querySelector('webrtc-message-new');
      messageNew.addEventListener('send', this._onSend);

      const self = this.querySelector('.video-self');
      if (self.srcObject !== this._stream) {
        self.srcObject = this._stream;
      }
    }
  }

  disconnect() {
    if (this.peerData) {
      this.peerData.disconnect(this.id);
    }
  }

  send(data) {
    this.peerData.send(JSON.stringify({
      message: data,
      username: this.username
    }));
  }

  toggleMic(stream) {
    const audioTracks = stream.getAudioTracks();
    for (let i = 0, l = audioTracks.length; i < l; i++) {
      audioTracks[i].enabled = !audioTracks[i].enabled;
    }
  }

  setStream(stream) {
    this._stream = stream;
  }

  _onSend(e) {
    this.send(e.detail);
  }

  _onData(e) {
    if (e.room.id !== this._id) {
      return;
    }

    const data = JSON.parse(e.data)
    this.conversation.addMessage(data.username, data.message, 'income');
  }

  _onNewPeer(e) {
    if (e.room.id !== this._id) {
      return;
    }

    const peerElem = this.participants.addPeer(e.caller.id);

    this._stream.getTracks().forEach(track => e.peer.addTrack(track, this._stream));

    e.peer.onconnectionstatechange = () => {
      switch (e.peer.connectionState) {
        case "connected":
          // The connection has become fully connected
          break;
        case "disconnected":
        case "failed":
        case "closed":
          const row = peerElem.parentNode;
          row.removeChild(peerElem);
          if (row.children.length < 1) {
            row.parentNode.removeChild(row)
          }
          break;
      }
    }

    e.peer.ontrack = event => {
      const stream = event.streams[0];
      if (stream !== peerElem.getStream()) {
        peerElem.setStream(stream);
      }
    };
  }
}
