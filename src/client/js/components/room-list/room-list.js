import { WebComponent } from 'web-component'

@WebComponent('webrtc-room-list', {
  template: require('./room-list.html')
})
export class RoomList extends HTMLElement {
  constructor() {
    super();
  }
}
