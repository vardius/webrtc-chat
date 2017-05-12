import { WebComponent } from './../../../../../../web-component/src'

@WebComponent('webrtc-room-search', {
  template: require('./room-search.html')
})
export class RoomSearch extends HTMLElement {
  constructor() {
    super();
  }
}
