import {
  WebComponent
} from 'web-component';

@WebComponent('webrtc-peer-search', {
  template: require('./peer-search.html')
})
export class PeerSearch extends HTMLElement {
  constructor() {
    super();

    this._onKeyPress = this._onKeyPress.bind(this);
  }

  connectedCallback() {
    const btnSend = this.querySelector('.btn-search');
    btnSend.addEventListener('click', this._onKeyPress);

    const area = this.querySelector('.search-query');
    area.addEventListener('keyup', this._onKeyPress);
  }

  _onKeyPress() {
    const query = this.querySelector('.search-query').value;

    const event = new CustomEvent("peer-search", {
      detail: query
    });
    this.dispatchEvent(event);
  }
}
