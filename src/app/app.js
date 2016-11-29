/**
 * This file is part of the webrtc-chat package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import {PeerData, PeerDataConfig, LogLevel} from "peer-data";
import {Signaling} from "./signaling";
import {GuiManager} from "./gui-manager";
import {Chat} from "./chat";

const logLevel = LogLevel.ERROR;
const servers = {
    iceServers: [
        {url: "stun:stun.1.google.com:19302"}
    ]
};
const constraints = {ordered: true};

export default class App {
    constructor() {
        this.signaling = new Signaling();
        this.config = new PeerDataConfig(servers, constraints, logLevel, this.signaling);
        this.peerData = new PeerData(this.config);
        this.gui = new GuiManager(this.peerData, this.signaling);
        this.chat = new Chat(this.peerData);
    }
};
