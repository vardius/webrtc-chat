import { WebComponent } from '../../webcomponents'

@WebComponent('webrtc-chat', {
  template: require('./chat.html')
})
export class Chat extends HTMLElement {
  constructor() {
    super();
  }
}
