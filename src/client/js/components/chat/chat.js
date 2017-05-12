import {
  WebComponent
} from './../../../../../../web-component/src'
import PeerData, {
  EventType
} from 'peer-data';
import {
  Signaling
} from './../../signaling';

@WebComponent('webrtc-chat', {
  template: require('./chat.html')
})
export class Chat extends HTMLElement {
  constructor() {
    super();

    const servers = {
      iceServers: [{
        url: "stun:stun.1.google.com:19302"
      }]
    };
    const constraints = {
      ordered: true
    };

    this.peerData = new PeerData(servers, constraints);
    this.peerData.signaling = new Signaling(this.peerData);

    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onData = this.onData.bind(this);
    this.onError = this.onError.bind(this);
    this.onLog = this.onLog.bind(this);
  }

  connectedCallback() {
    this.peerData.on(EventType.OPEN, this.onOpen);
    this.peerData.on(EventType.CLOSE, this.onClose);
    this.peerData.on(EventType.DATA, this.onData);
    this.peerData.on(EventType.ERROR, this.onError);
    this.peerData.on(EventType.LOG, this.onLog);
  }

  disconnectedCallback() {
    this.peerData.disconnect();
  }

  onOpen(e) {
    console.log('New peer connected', e)
  }

  onClose(e) {
    console.log('Peer disconected'), e
  }

  onData(e) {
    console.log(e)
  }

  onError(e) {
    console.log(e)
  }

  onLog(e) {
    console.log(e)
  }
}
