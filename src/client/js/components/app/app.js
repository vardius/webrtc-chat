import { WebComponent } from "web-component";

@WebComponent("webrtc-app", {
  template: require("./app.html")
})
export class App extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    window.addEventListener("WebComponentsReady", () => {
      const searchParams = new URLSearchParams(window.location.href);
      const roomname = searchParams.get("room");
      const username = searchParams.get("username");

      if (roomname && username && roomname.length > 0 && username.length > 0) {
        this._stream = null;
        const chat = this.querySelector("webrtc-chat");
        const constraints = {
          audio: true,
          video: true
        };
        navigator.mediaDevices.getUserMedia(
          constraints,
          stream => chat.createRoom(roomname, username, stream),
          error => {
            if (error.name === "AbortError") {
              alert(
                "Some problem occurred which prevented media device from being used. " +
                  error.message
              );
            } else if (error.name === "NotAllowedError") {
              alert(
                "The access to the media device has been denied. " +
                  error.message
              );
            } else if (error.name === "NotFoundError") {
              alert(
                "No media tracks of the type specified were found. " +
                  error.message
              );
            } else if (error.name === "NotReadableError") {
              alert(
                "Access to the media device was prevented by a hardware error occurred at the operating system. " +
                  error.message
              );
            } else if (error.name === "SecurityError") {
              alert("Media support is disabled. " + error.message);
            } else {
              alert(error.name + ": " + error.message);
            }
          }
        );
      } else {
        const popup = this.querySelector("webrtc-popup");
        popup.show();
      }
    });
  }
}
