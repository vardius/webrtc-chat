import {
  WebComponent
} from 'web-component';

@WebComponent('webrtc-app', {
  template: require('./app.html')
})
export class Chat extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    window.addEventListener('WebComponentsReady', () => {
      const searchParams = new URLSearchParams(window.location.href);
      const roomname = searchParams.get('room');
      const username = searchParams.get('username');

      if (roomname && username && roomname.length > 0 && username.length > 0) {
        const chat = this.querySelector('webrtc-chat');
        this._stream = null;
        navigator.getUserMedia({
          "audio": true,
          "video": true
        }, stream => {
          const room = chat.createRoom(roomname, username, stream);
          room.connect();
        });
      } else {
        const popup = this.querySelector('webrtc-popup');
        popup.show();
      }
    });
  }
}
