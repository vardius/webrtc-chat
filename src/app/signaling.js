/**
 * This file is part of the webrtc-chat package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import {SignalingEventType} from 'peer-data';
import {user, peerData} from './app';

export class Signaling {
  send(event) {
    const newEvent = Object.assign(event, {caller: {id: user.name}});

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
        peerData.bridge.onOffer(event, this);
        break;
      case SignalingEventType.ANSWER:
        peerData.bridge.onAnswer(event);
        break;
      case SignalingEventType.CANDIDATE:
        peerData.bridge.onCandidate(event);
        break;
      default:
        break;
    }
  }

  onConnect(event) {
    peerData.bridge.onConnect(event, this);
  }

  onDisconnect(event) {
    peerData.bridge.onDisconnect(event);
  }

  onCandidate(event) {
    if (event.data) {
      user.candidates.push(event);
    }
  }

  onOffer(event) {
    user.offer = event;
  }

  onAnswer(event) {
    user.answer = event;
  }
}
