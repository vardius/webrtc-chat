import {
  WebComponent
} from 'web-component';

@WebComponent('webrtc-participants', {
  template: require('./participants.html')
})
export class Participants extends HTMLElement {
  constructor() {
    super();

    this.size = 0;
    this.x = -1;
    this.y = -1;

    this.addPeer = this.addPeer.bind(this);
  }

  addPeer(name) {
    if (this.x + 1 === this.size && this.y + 1 === this.size) {
      this.size++;
      this.x++;
      this.y++;
    } else if (this.x + 1 < this.size) {
      this.x++;
    } else {
      this.y++;
    }

    let row = null;
    const container = this.querySelector('.videos');
    const rows = container.children;
    if (rows && rows.children) {
      row = Array.from(rows.children)[this.y];
    }

    if (!row) {
      row = document.createElement('div');
      row.className = 'video-row';
    }

    let peer = document.createElement('webrtc-peer');
    peer.name = name;
    row.appendChild(peer);

    return peer;
  }

  removePeer(id) {
    const container = this.querySelector('.videos');
    const rows = container.children;
    Array.from(rows).forEach(row => {
      const peers = row.children;
      Array.from(peers).forEach(peer => {
        if (peer.name === id) {
          const lastPeer = container.lastChild.lastChild;
          peer.parentNode.appendChild(lastPeer);
          peer.parentNode.removeChild(peer);
        }
      });
    });
  }
}
