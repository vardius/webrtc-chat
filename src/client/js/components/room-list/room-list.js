import { WebComponent } from 'web-component'

@WebComponent('webrtc-room-list', {
  template: require('./room-list.html'),
  styles: require('./room-list.scss'),
  shadowDOM: true
})
export class RoomList extends HTMLElement {
  constructor() {
    super();
  }
}
