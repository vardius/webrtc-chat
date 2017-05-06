import { WebComponent } from '../../webcomponents'

@WebComponent('webrtc-message-new', {
  template: require('./message-new.html')
})
export class MessageNew extends HTMLElement {
  constructor() {
    super();
  }
}
