import {
  WebComponent
} from 'web-component';

@WebComponent('webrtc-participants', {
  template: require('./participants.html')
})
export class Participants extends HTMLElement {
  constructor() {
    super();

    this.addPeer = this.addPeer.bind(this);

    this._onCall = this._onCall.bind(this);
    this._onClick = this._onClick.bind(this);
    this._onSearch = this._onSearch.bind(this);
  }

  connectedCallback() {
    const roomSearch = this.querySelector('webrtc-peer-search');
    roomSearch.addEventListener('peer-search', this._onSearch);

    const children = this.querySelector('.participants').children;
    Array.from(children).forEach((element) => {
      element.addEventListener('click', this._onClick);
      element.addEventListener('call', this._onCall);
    });
  }

  addPeer(name, info) {
    let peer = document.createElement('webrtc-peer');
    peer.name = name;
    peer.info = info;

    this.querySelector('.participants').appendChild(peer);
  }

  removePeer(id) {
    const children = this.querySelector('.participants').children;
    Array.from(children).forEach((element) => {
      if (element.name === id) {
        return element.parentNode.removeChild(element);
      }
    });
  }

  _findPeer(el) {
    while ((el = el.parentElement) && el.nodeName !== 'WEBRTC-PEER') {}
    return el;
  }

  _onSearch(e) {
    var matcher = new RegExp(e.detail, "gi");
    const children = this.querySelector('.participants').children;
    Array.from(children).forEach((element) => {
      if (matcher.test(element.textContent)) {
        element.style.display = "inline-block";
      } else {
        element.style.display = "none";
      }
    });
  }

  _onCall(e) {
    this.dispatchEvent(e);
  }

  _onClick(e) {
    const event = new CustomEvent("select", {
      detail: this._findPeer(e.target)
    });
    this.dispatchEvent(event);
  }
}
