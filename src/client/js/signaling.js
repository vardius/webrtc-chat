import {
  SignalingEventType
} from 'peer-data';

export class Signaling {
  constructor(peerData) {
    this.peerData = peerData;
    this.peer = {
      id: this.randomToken(),
      offer: null,
      answer: null,
      candidates: [],
    }
  }

  get settings() {
    return this.peer;
  }

  randomToken() {
    return Math.floor((1 + Math.random()) * 1e16).toString(16).substring(1);
  }

  send(event) {
    const newEvent = Object.assign(event, {
      caller: {
        id: this.peer.id
      }
    });

    switch (newEvent.type) {
      case SignalingEventType.OFFER:
        this.onOffer(newEvent);
        break;
      case SignalingEventType.ANSWER:
        this.onAnswer(newEvent);
        break;
      case SignalingEventType.CANDIDATE:
        this.onCandidate(newEvent);
        break;
      case SignalingEventType.CONNECT:
        this.onConnect(newEvent);
        break;
      case SignalingEventType.DISCONNECT:
        this.onDisconnect(newEvent);
        break;
      default:
        break;
    }
  }

  onMessage(event) {
    switch (event.type) {
      case SignalingEventType.OFFER:
        this.peerData.bridge.onOffer(event, this);
        break;
      case SignalingEventType.ANSWER:
        this.peerData.bridge.onAnswer(event);
        break;
      case SignalingEventType.CANDIDATE:
        this.peerData.bridge.onCandidate(event);
        break;
      default:
        break;
    }
  }

  onConnect(event) {
    this.peerData.bridge.onConnect(event, this);
  }

  onDisconnect(event) {
    this.peerData.bridge.onDisconnect(event);
  }

  onCandidate(event) {
    if (event.data) {
      this.peer.candidates.push(event);
    }
  }

  onOffer(event) {
    this.peer.offer = event;
  }

  onAnswer(event) {
    this.peer.answer = event;
  }
}
