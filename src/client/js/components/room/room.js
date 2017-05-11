import { WebComponent } from 'web-component'

@WebComponent('webrtc-room', {
  template: require('./room.html'),
  styles: require('./room.scss'),
  shadowDOM: true
})
export class Room extends HTMLElement {
  constructor() {
    super();
  }
}
