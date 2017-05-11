import { WebComponent } from 'web-component'

@WebComponent('webrtc-room-search', {
  template: require('./room-search.html'),
  styles: require('./room-search.scss')
})
export class RoomSearch extends HTMLElement {
  constructor() {
    super();
  }
}
