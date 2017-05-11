import {WebComponent} from 'web-component'

@WebComponent('webrtc-room-list', {
  template: require('./room-list.html'),
  styles: require('./room-list.scss')
})
export class RoomList extends HTMLElement {
  constructor() {
    super();
    this.addRoom.bind(this);
  }

  connectedCallback() {
    // this.addRoom('nowy room', 2);
    this.addRoomEventListener()
  }

  onClick(e) {
    let a = this.querySelector('.list-group-item.active')
    if (a) {
      a.classList.remove('active');
    }
    e.target.classList.add('active');
  }

  addRoom(title, newCount) {
    let msg = document.createElement('webrtc-room');
    msg.title = title;
    msg.newCount = newCount;

    this.querySelector('div.rooms').appendChild(msg);
  }

  addRoomEventListener() {
    const children = this.querySelector('.rooms').children;
    Array.from(children).forEach((element) => {
      element.addEventListener('click', this.onClick.bind(this))
    });
  }
}
