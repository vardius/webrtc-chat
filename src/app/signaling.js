/**
 * This file is part of the webrtc-chat package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import {PeerDataBridge, SignalingEventType} from "peer-data";

export const SignalingData = {
    events: [],
    candidatesLoaded: false,
    offerLoaded: false,
    answerLoaded: false
};

export class Signaling {
    constructor() {
        this.id = 'singlePeer';
    }

    send(event) {
        event.caller = {id: this.id};

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
        if (event.data) {
            SignalingData.events.push(event);
        } else {
            SignalingData.candidatesLoaded = true;
        }
    }

    onOffer(event) {
        SignalingData.events.push(event);
        SignalingData.offerLoaded = true;
    }

    onAnswer(event) {
        SignalingData.events.push(event);
        SignalingData.answerLoaded = true;
    }
}
