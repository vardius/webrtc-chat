import { WebComponent } from "web-component";

@WebComponent("webrtc-participants", {
  template: require("./participants.html")
})
export class Participants extends HTMLElement {
  constructor() {
    super();

    this.size = 0;
    this.x = -1;
    this.y = -1;

    this.addPeer = this.addPeer.bind(this);
    this.clear = this.clear.bind(this);
  }

  addPeer(name) {
    const container = this.querySelector(".videos");

    let peer = document.createElement("webrtc-peer");
    peer.name = name;
    container.appendChild(peer);

    return peer;
  }

  clear() {
    const container = this.querySelector(".videos");
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }
}
