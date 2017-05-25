import { WebComponent } from "web-component";

@WebComponent("webrtc-message-new", {
  template: require("./message-new.html")
})
export class MessageNew extends HTMLElement {
  constructor() {
    super();

    this._onKeyPress = this._onKeyPress.bind(this);
  }

  connectedCallback() {
    const area = this.querySelector("textarea");
    area.addEventListener("keypress", this._onKeyPress);
  }

  _onKeyPress(e) {
    if (e.keyCode === 13 && !event.shiftKey) {
      e.preventDefault();
      const area = this.querySelector("textarea");
      const msg = area.value;
      area.value = "";

      this.dispatchEvent(
        new CustomEvent("send", {
          detail: msg
        })
      );
    }
  }
}
