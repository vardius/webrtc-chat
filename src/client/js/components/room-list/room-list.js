import {
  WebComponent
} from './../../../../../../web-component/src'

@WebComponent('webrtc-room-list', {
  template: require('./room-list.html')
})
export class RoomList extends HTMLElement {
  constructor() {
    super();

    this.addRoom = this.addRoom.bind(this);
    this.onAddRoom = this.onAddRoom.bind(this);
  }

  connectedCallback() {
    this.addRoomEventListener();
    const roomNew = this.querySelector('webrtc-room-new');
    roomNew.addEventListener('room-add', this.onAddRoom);
  }

  onAddRoom() {
    this.addRoom('test room', '');
  }

  onClick(e) {
    const event = new CustomEvent("select", {
      room: this.findRoom(e.target)
    });
    this.dispatchEvent(event);
  }

  findRoom(el) {
    while ((el = el.parentElement) && el.nodeName !== 'WEBRTC-ROOM') {}
    return el;
  }

  addRoom(title, newCount) {
    let msg = document.createElement('webrtc-room');
    msg.title = title;
    msg.newCount = newCount;

    this.querySelector('div.room-list').appendChild(msg);
  }

  addRoomEventListener() {
    const children = this.querySelector('.room-list').children;
    Array.from(children).forEach((element) => {
      element.addEventListener('click', this.onClick.bind(this))
    });
  }
}
