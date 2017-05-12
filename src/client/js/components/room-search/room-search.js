import { WebComponent } from './../../../../../../web-component/src'

@WebComponent('webrtc-room-search', {
  template: require('./room-search.html')
})
export class RoomSearch extends HTMLElement {
  constructor() {
    super();
    
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  connectedCallback() {
    const btnSend = this.querySelector('.btn-search');
    btnSend.addEventListener('click', this.onKeyPress);
    const area = this.querySelector('.search-query');
    area.addEventListener('keyup', this.onKeyPress);
  }

  onKeyPress() {
    const query = this.querySelector('.search-query').value;

    const event = new CustomEvent("room-search", {detail: query});
    this.dispatchEvent(event);
  }
}
