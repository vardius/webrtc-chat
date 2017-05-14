import { WebComponent } from 'web-component';

@WebComponent('webrtc-room', {
  template: require('./room.html')
})
export class Room extends HTMLElement {
  constructor() {
    super();

    this.addPeer = this.addPeer.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  connectedCallback() {
    const roomSearch = this.querySelector('webrtc-peer-search');
    roomSearch.addEventListener('peer-search', this.onSearch);

    const children = this.querySelector('.room').children;
    Array.from(children).forEach((element) => {
      element.addEventListener('click', this.onClick.bind(this))
    });
  }

  onSearch(e) {
    var matcher = new RegExp(e.detail, "gi");
    const children = this.querySelector('.room').children;
    Array.from(children).forEach((element) => {
      if (matcher.test(element.textContent)) {
        element.style.display = "inline-block";
      } else {
        element.style.display = "none";
      }
    });
  }

  onClick(e) {
    const event = new CustomEvent("select", {
      room: this.findPeer(e.target)
    });
    this.dispatchEvent(event);
  }

  findPeer(el) {
    while ((el = el.parentElement) && el.nodeName !== 'WEBRTC-PEER') {}
    return el;
  }

  addPeer(id) {
    let msg = document.createElement('webrtc-peer');
    msg.title = id;

    this.querySelector('.room').appendChild(msg);
  }

  removePeer(id) {
    const children = this.querySelector('.room').children;
    Array.from(children).forEach((element) => {
      if (element.title === id) {
        return element.parentNode.removeChild(element);
      }
    });
  }
}
