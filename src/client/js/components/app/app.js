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
        this._stream = null;
        const chat = this.querySelector('webrtc-chat');
        const constraints = {
          "audio": true,
          "video": true
        };
        navigator.getUserMedia(constraints,
          stream => chat.createRoom(roomname, username, stream),
          error => {
            if (error.name === 'ConstraintNotSatisfiedError') {
              alert('The resolution ' + constraints.video.width.exact + 'x' + constraints.video.width.exact + ' px is not supported by your device.');
            } else if (error.name === 'PermissionDeniedError') {
              alert('Permissions have not been granted to use your camera and ' +
                'microphone, you need to allow the page access to your devices in ' +
                'order for the demo to work.');
            }
            alert('getUserMedia error: ' + error.name, error);
          });
      } else {
        const popup = this.querySelector('webrtc-popup');
        popup.show();
      }
    });
  }
}
