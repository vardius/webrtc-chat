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
      this.peerData.on(AppEventType.PEER, this._onPeer);
      this.peerData.on(AppEventType.CHANNEL, this._onChannel);

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
    channel.onmessage = data => {
      const msg = JSON.parse(data)
      this.conversation.addMessage(msg.username, msg.message, 'income');
    };
  }

  _onPeer(e) {
    if (e.room.id !== this._id) {
      return;
    }

    const peerElem = this.participants.addPeer(e.caller.id);

    this._stream.getTracks().forEach(track => e.data.addTrack(track, this._stream));

    e.data.onconnectionstatechange = event => {
      e.data.onconnectionstatechange(event);
      if (e.data.connectionState === 'closed') {
        const row = peerElem.parentNode;
        row.removeChild(peerElem);
        if (row.children.length < 1) {
          row.parentNode.removeChild(row)
        }
      }
    }

    e.data.ontrack = event => {
      const stream = event.streams[0];
      if (stream !== peerElem.getStream()) {
        peerElem.setStream(stream);
      }
    };
  }
}
