import {
  WebComponent
} from 'web-component';

@WebComponent('webrtc-peer', {
  template: require('./peer.html')
})
export class Peer extends HTMLElement {
  constructor() {
    super();

    this._name = '';

    this.setStream = this.setStream.bind(this);
  }

  static get observedAttributes() {
    return ['name'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this._updateRendering();
    }
  }

  connectedCallback() {
    this._updateRendering();

    this.dispatchEvent(new CustomEvent("connected"));
  }

  disconnectedCallback() {
    this.dispatchEvent(new CustomEvent("disconnected"));
  }

  getStream() {
    const video = this.querySelector('video');
    return video.srcObject;
  }

  setStream(stream) {
    const video = this.querySelector('video');
    if (video.srcObject !== stream) {
      video.srcObject = stream;
    }
  }

  _updateRendering() {
    const name = this.querySelector('.name');
    if (name) {
      name.textContent = `${this._name}`;
    }
  }
}
