import {WebComponent} from 'web-component'

@WebComponent('webrtc-message', {
  template: require('./message.html'),
  styles: require('./message.scss'),
  shadowDOM:true
})
export class Message extends HTMLElement {
  constructor() {
    super();
    this._type = null;
  }

  static get observedAttributes() {
    return ['type'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'type':
        this._type = newValue;
        break;
    }
    this._updateRendering();
  }

  connectedCallback() {
    if (this.hasAttribute('type')) {
      this._type = this.getAttribute('type');
      this._updateRendering();
    }
  }

  get type() {
    return this._type;
  }

  set type(v) {
    this.setAttribute("type", v);
  }

  _updateRendering() {
    this.shadowRoot.querySelector('.bubble').className = `bubble ${this._type}`;
  }
}
