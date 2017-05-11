import { WebComponent } from 'web-component'

@WebComponent('webrtc-room-new', {
  template: require('./room-new.html')
})
export class RoomNew extends HTMLElement {
  constructor() {
    super();
  }
}
