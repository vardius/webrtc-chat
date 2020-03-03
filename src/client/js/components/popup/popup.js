import { WebComponent } from "web-component";

@WebComponent("webrtc-popup", {
  template: require("./popup.html")
})
export class Popup extends HTMLElement {
  constructor() {
    super();

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);

    this._onEnter = this._onEnter.bind(this);
    this._onKeyPress = this._onKeyPress.bind(this);
  }

  connectedCallback() {
    const btnSend = this.querySelector(".btn-login");
    btnSend.addEventListener("click", this._onEnter);

    const room = this.querySelector(".room-query");
    room.addEventListener("keypress", this._onKeyPress);

    const name = this.querySelector(".username-query");
    name.addEventListener("keypress", this._onKeyPress);

    $("#enter-modal").on("shown.bs.modal", () => {
      $(room).focus();
    });
  }

  show() {
    $("#enter-modal").modal("show");
  }

  hide() {
    $("#enter-modal").modal("hide");
  }

  _onKeyPress(e) {
    if (e.keyCode === 13 && !event.shiftKey) {
      e.preventDefault();
      this._onEnter();
    }
  }

  _onEnter() {
    const roomName = this.querySelector(".room-query").value;
    const userName = this.querySelector(".username-query").value;
    if (roomName.length > 0 && userName.length > 0) {
      window.location.href = `${window.location.origin}${window.location.pathname}?room=${roomName}&username=${userName}`;
    }
  }
}
