/**
 * This file is part of the webrtc-chat package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PeerData, {EventType, LogLevel} from 'peer-data';
import {onOpen, onClose, onData, onError} from './events';
import {Signaling} from './signaling';
import {Logger} from './logger';
import {Chat} from './chat';

export const logger = new Logger(LogLevel.ERROR);
export const signaling = new Signaling();
export const user = {
  name: 'User: ' + randomToken(),
  inRoom: null,
  candidates: []
};

export default class App {
  constructor() {
    let servers = {
      iceServers: [
        {url: "stun:stun.1.google.com:19302"}
      ]
    };
    let constraints = {ordered: true};

    PeerData.servers = servers;
    PeerData.dataConstraints = constraints;
    PeerData.logger = logger;
    PeerData.signaling = signaling;

    this.chat = new Chat();
    this.subscribeEvents();
  }

  subscribeEvents() {
    this.peerData.on(EventType.OPEN, onOpen);
    this.peerData.on(EventType.CLOSE, onClose);
    this.peerData.on(EventType.DATA, onData);
    this.peerData.on(EventType.ERROR, onError);
  }
};

function randomToken() {
  return Math.floor((1 + Math.random()) * 1e16).toString(16).substring(1);
}