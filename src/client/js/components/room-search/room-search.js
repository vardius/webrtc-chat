import { WebComponent } from 'web-component'

@WebComponent('webrtc-room-search', {
  template: require('./room-search.html'),
  styles: require('./room-search.scss'),
  shadowDOM: true
})
export class RoomSearch extends HTMLElement {
  constructor() {
    super();
  }
}
