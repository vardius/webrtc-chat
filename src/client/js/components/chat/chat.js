import { WebComponent } from 'web-component';
import PeerData, { SocketChannel, DataEventType, ConnectionEventType } from 'peer-data';

@WebComponent('webrtc-chat', {
  template: require('./chat.html')
})
export class Chat extends HTMLElement {
  constructor() {
    super();

    this.roomId = window.location.hash.substring(1);
    this.room = null;
    this.messages = null;

    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onData = this.onData.bind(this);
    this.onError = this.onError.bind(this);
    this.onLog = this.onLog.bind(this);
    this.onSend = this.onSend.bind(this);

    this.setUpPeer();
  }

  connectedCallback() {
    this.room = this.querySelector('webrtc-room');
    this.messages = this.querySelector('webrtc-message-list');

    if (this.roomId.length > 0) {
      this.messages.title = this.roomId;
      this.peerData.connect(this.roomId);
    } else {
      window.addEventListener('WebComponentsReady', () => {
        const popup = this.querySelector('webrtc-popup');
        popup.show();
      });
    }
  }

  disconnectedCallback() {
    this.peerData.disconnect(this.roomId);
  }

  setUpPeer() {
    const servers = {
      iceServers: [{
        url: "stun:stun.1.google.com:19302"
      }]
    };
    const constraints = {
      ordered: true
    };

    if (this.roomId.length > 0) {
      this.peerData = new PeerData(servers, constraints);
      this.signaling = new SocketChannel();

      this.peerData.on(DataEventType.OPEN, this.onOpen);
      this.peerData.on(DataEventType.CLOSE, this.onClose);
      this.peerData.on(DataEventType.DATA, this.onData);
      this.peerData.on(DataEventType.ERROR, this.onError);
      this.peerData.on(DataEventType.LOG, this.onLog);

      window.addEventListener('WebComponentsReady', () => {
        const messageNew = this.messages.querySelector('webrtc-message-new');
        messageNew.addEventListener('send', this.onSend)
      });
    }
  }

  send(data) {
    this.peerData.send(data);
  }

  onSend(e) {
    // eslint-disable-next-line no-console
    console.log('', e);
    this.send(e.detail);
  }

  onOpen(e) {
    // eslint-disable-next-line no-console
    console.log('onOpen', e);
    this.room.addPeer(e.id);
    this.messages.addMessage('', `User ${e.id} connected`, 'system');
  }

  onClose(e) {
    // eslint-disable-next-line no-console
    console.log('onClose', e);
    this.room.removePeer(e.id);
    this.messages.addMessage('', `User ${e.id} disconnected`, 'system');
  }

  onData(e) {
    // eslint-disable-next-line no-console
    console.log('onData', e);
    this.messages.addMessage(e.id, e.event.data, 'income');
  }

  onError(e) {
    // eslint-disable-next-line no-console
    console.log('onError', e);
    this.messages.addMessage('', `User ${e.id} connection error`, 'system error');
  }

  onLog(e) {
    // eslint-disable-next-line no-console
    console.log('onLog', e);
    if (e.length === 2 && e[0] === 'SERVER_LOG') {
      const event = e[1];
      if (event.type === ConnectionEventType.CONNECT) {
        let header = this.querySelector("webrtc-header");
        header.id = event.caller.id;
        this.messages.owner = event.caller.id;
      }
    }
  }
}
