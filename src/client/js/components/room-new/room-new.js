import {
  WebComponent
} from './../../../../../../web-component/src'

@WebComponent('webrtc-room-new', {
  template: require('./room-new.html')
})
export class RoomNew extends HTMLElement {
  constructor() {
    super();

    this.onAddRoom = this.onAddRoom.bind(this);
  }

  connectedCallback() {
    const btnSend = this.querySelector('.btn-room-new');
    btnSend.addEventListener('click', this.onAddRoom)
  }

  onAddRoom() {
    const event = new CustomEvent("room-add");
    this.dispatchEvent(event);
  }
}
