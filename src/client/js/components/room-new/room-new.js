import { WebComponent } from 'web-component'

@WebComponent('webrtc-room-new', {
  template: require('./room-new.html'),
  styles: require('./room-new.scss')
})
export class RoomNew extends HTMLElement {
  constructor() {
    super();
  }
}
