import {
  WebComponent
} from 'web-component';
import PeerData, {
  SocketChannel,
  DataEventType
} from 'peer-data';

@WebComponent('webrtc-chat', {
  template: require('./chat.html')
})
export class Chat extends HTMLElement {
  constructor() {
    super();

    const servers = {
      iceServers: [{
        // url: "stun:stun.1.google.com:19302"
        url: "stun:74.125.142.127:19302"
      }]
    };

    const constraints = {
      ordered: true
    };

    this.peerData = new PeerData(servers, constraints);
    this.signaling = new SocketChannel();

    this.peerData.on(DataEventType.OPEN, this._onOpen.bind(this));
    this.peerData.on(DataEventType.CLOSE, this._onClose.bind(this));
    this.peerData.on(DataEventType.DATA, this._onData.bind(this));
    this.peerData.on(DataEventType.ERROR, this._onError.bind(this));
    this.peerData.on(DataEventType.LOG, this._onLog.bind(this));
  }

  createRoom(id, username, stream) {
    if (id.length > 0 && username.length > 0) {
      let room = document.createElement("webrtc-room");
      room.id = id;
      room.username = username;
      room.peerData = this.peerData;
      room.setStream(stream);

      this.querySelector('.rooms').appendChild(room);

      return room;
    }
  }

  removeRoom(id) {
    const children = this.querySelector('.rooms').children;
    Array.from(children).forEach(room => {
      if (room.id === id) {
        room.disconnect();
        return room.parentNode.removeChild(room);
      }
    });
  }

  _onOpen(e) {
    this.dispatchEvent(new CustomEvent("open", {
      detail: e
    }));
  }

  _onClose(e) {
    this.dispatchEvent(new CustomEvent("colse", {
      detail: e
    }));
  }

  _onData(e) {
    this.dispatchEvent(new CustomEvent("message", {
      detail: e
    }));
  }

  _onError(e) {
    this.dispatchEvent(new CustomEvent("error", {
      detail: e
    }));
  }

  _onLog(e) {
    this.dispatchEvent(new CustomEvent("log", {
      detail: e
    }));
  }
}
