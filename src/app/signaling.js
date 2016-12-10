/**
 * This file is part of the webrtc-chat package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import {PeerDataBridge, SignalingEventType} from 'peer-data';
import {user} from './app';

export class Signaling {
  send(event) {
    event.caller = {id: user.name};

    switch (event.type) {
      case SignalingEventType.OFFER:
        this.onOffer.apply(this, [event]);
        break;
      case SignalingEventType.ANSWER:
        this.onAnswer.apply(this, [event]);
        break;
      case SignalingEventType.CANDIDATE:
        this.onCandidate.apply(this, [event]);
        break;
      case SignalingEventType.CONNECT:
        this.onConnect.apply(this, [event]);
        break;
      case SignalingEventType.DISCONNECT:
        this.onDisconnect.apply(this, [event]);
        break;
    }
  }

  onMessage(event) {
    switch (event.type) {
      case SignalingEventType.OFFER:
        PeerDataBridge.onOffer(event);
        break;
      case SignalingEventType.ANSWER:
        PeerDataBridge.onAnswer(event);
        break;
      case SignalingEventType.CANDIDATE:
        PeerDataBridge.onCandidate(event);
        break;
    }
  }

  onConnect(event) {
    PeerDataBridge.onConnect(event);
  }

  onDisconnect(event) {
    PeerDataBridge.onDisconnect(event);
  }

  onCandidate(event) {
    alert('candidates');
    if (event.data) {
      user.candidates.push(event);
    }
  }

  onOffer(event) {
    alert('offer');
    //get an offer somehow
  }

  onAnswer(event) {
    alert('answer');
    //get an answer somehow
  }
}
