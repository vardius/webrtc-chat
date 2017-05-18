import {
  WebComponent
} from 'web-component';
import {
  DataEventType
} from 'peer-data';

@WebComponent('webrtc-room', {
  template: require('./room.html')
})
export class Room extends HTMLElement {
  constructor() {
    super();

    this._id = null;
    this._username = null;

    this.peerData = null;
    this.participants = null;
    this.conversation = null;

    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);

    this._onSend = this._onSend.bind(this);
    this._onOpen = this._onOpen.bind(this);
    this._onClose = this._onClose.bind(this);
    this._onData = this._onData.bind(this);
    this._onError = this._onError.bind(this);
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
      this.peerData.on(DataEventType.OPEN, this._onOpen);
      this.peerData.on(DataEventType.CLOSE, this._onClose);
      this.peerData.on(DataEventType.DATA, this._onData);
      this.peerData.on(DataEventType.ERROR, this._onError);

      this.conversation.owner = this._username;

      const messageNew = this.conversation.querySelector('webrtc-message-new');
      messageNew.addEventListener('send', this._onSend)
    }
  }

  disconnect() {
    if (this.peerData) {
      this.peerData.disconnect(this.id);
    }
  }

  send(data) {
    this.peerData.send(data);
  }

  _onSend(e) {
    this.send(e.detail);
  }

  _onOpen(e) {
    if (e.room.id !== this._id) {
      return;
    }

    this.participants.addPeer(e.caller.id);
    this.conversation.addMessage('', `User ${e.caller.name} connected`, 'system');
  }

  _onClose(e) {
    if (e.room.id !== this._id) {
      return;
    }

    this.participants.removePeer(e.caller.id);
    this.conversation.addMessage('', `User ${e.caller.name} disconnected`, 'system');
  }

  _onData(e) {
    if (e.room.id !== this._id) {
      return;
    }

    this.conversation.addMessage(e.caller.name, e.event.data, 'income');
  }

  _onError(e) {
    if (e.room.id !== this._id) {
      return;
    }

    this.conversation.addMessage('', `User ${e.caller.name} connection error`, 'system error');
  }
}
