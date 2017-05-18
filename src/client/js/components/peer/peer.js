import {
  WebComponent
} from 'web-component';

@WebComponent('webrtc-peer', {
  template: require('./peer.html')
})
export class Peer extends HTMLElement {
  constructor() {
    super();

    this._picture = '/images/avatar.png';
    this._status = 'off';
    this._name = '';
    this._info = '';

    this.call = this.call.bind(this);
    this.videoCall = this.videoCall.bind(this);

    this._onCall = this._onCall.bind(this);
  }

  static get observedAttributes() {
    return ['name', 'info', 'status', 'picture'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this._updateRendering();
    }
  }

  connectedCallback() {
    this._updateRendering();

    const mic = this.querySelector('.call-phone');
    mic.addEventListener('click', this._onCall);

    const vid = this.querySelector('.call-video');
    vid.addEventListener('click', this._onCall);

    this.dispatchEvent(new CustomEvent("connected"));
  }

  disconnectedCallback() {
    this.dispatchEvent(new CustomEvent("disconnected"));
  }

  call() {
    const event = new CustomEvent("call", {
      detail: {
        type: 'phone',
        peer: this._name,
      }
    });
    this.dispatchEvent(event);
  }

  videoCall() {
    const event = new CustomEvent("call", {
      detail: {
        type: 'video',
        peer: this._name,
      }
    });
    this.dispatchEvent(event);
  }

  _onCall(e) {
    e.preventDefault();
    switch (e.target.className.substring(6)) {
      case 'phone':
        this.call();
        break;
      case 'video':
        this.videoCall();
        break;
    }
  }

  _updateRendering() {
    const name = this.querySelector('.name');
    if (name) {
      name.textContent = `${this._name}`;
    }
    const info = this.querySelector('.info');
    if (info) {
      info.textContent = `${this._info}`;
    }
    const status = this.querySelector('.status');
    if (status) {
      status.className = `status ${this._status}`;
    }
    const img = this.querySelector('.img');
    if (img) {
      img.src = `${this._picture}`;
    }
  }
}
