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
      container.appendChild(row);
    }

    let peer = document.createElement('webrtc-peer');
    peer.name = name;
    row.appendChild(peer);

    return peer;
  }
}
