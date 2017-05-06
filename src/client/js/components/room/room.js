import { WebComponent } from '../../webcomponents'

@WebComponent('webrtc-room', {
  template: require('./room.html')
})
export class Room extends HTMLElement {
  constructor() {
    super();
  }
}
