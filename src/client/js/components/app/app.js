import {
  WebComponent
} from 'web-component';

@WebComponent('webrtc-app', {
  template: require('./app.html')
})
export class Chat extends HTMLElement {
  constructor() {
    super();

    this.roomId = window.location.hash.substring(1);
  }

  connectedCallback() {
    window.addEventListener('WebComponentsReady', () => {
      if (this.roomId.length > 0) {
        const chat = this.querySelector('webrtc-chat');
        const room = chat.createRoom(this.roomId);
        room.connect();
      } else {
        const popup = this.querySelector('webrtc-popup');
        popup.show();
      }
    });
  }

  //todo: Simple as that
  // peer.addStream(localStream);
  // peer.onaddstream = function gotRemoteStream(e){
  //   vid2.src = URL.createObjectURL(e.stream);
  // };

  // window.addEventListener('WebComponentsReady', () => {
  //   const popup = this.querySelector('webrtc-popup');
  //   popup.show();
  // });
}
