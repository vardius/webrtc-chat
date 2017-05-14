import { WebComponent } from 'web-component'
import PeerData, { SocketChannel, DataEventType } from 'peer-data';

@WebComponent('webrtc-chat', {
  template: require('./chat.html')
})
export class Chat extends HTMLElement {
  constructor() {
    super();

    this.roomId = window.location.pathname;
    this.room = null;
    this.messages = null;

    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onData = this.onData.bind(this);
    this.onError = this.onError.bind(this);
    this.onLog = this.onLog.bind(this);

    this.setUpPeer();
  }

  connectedCallback() {
    this.room = this.querySelector('webrtc-room');
    this.messages = this.querySelector('webrtc-message-list');

    if (this.roomId.length > 1) {
      this.messages.title = this.roomId.substring(1);
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

    if (this.roomId.length > 1) {
      this.peerData = new PeerData(servers, constraints);
      this.signaling = new SocketChannel('http://localhost:8080');

      this.peerData.on(DataEventType.OPEN, this.onOpen);
      this.peerData.on(DataEventType.CLOSE, this.onClose);
      this.peerData.on(DataEventType.DATA, this.onData);
      this.peerData.on(DataEventType.ERROR, this.onError);
      this.peerData.on(DataEventType.LOG, this.onLog);
    }
  }

  send(data) {
    this.peerData.send(data);
  }

  onOpen(e) {
    this.room.addPeer(e.caller.id);
    this.messages.addMessage(`Peer ${e.caller.id} connected`, 'system');
  }

  onClose(e) {
    this.room.removePeer(e.caller.id);
    this.messages.addMessage(`Peer ${e.caller.id} disconnected`, 'system');
  }

  onData(e) {
    this.messages.addMessage(e.data, 'income');
  }

  onError(e) {
    this.messages.addMessage(e.data, 'system error');
  }

  onLog(e) {
    e = e[0];
    if (e.type === 'connect') {
      let header = this.querySelector("webrtc-header");
      header.id = e.caller.id;
    }
    this.messages.addMessage(e.data, 'system info');
  }
}
