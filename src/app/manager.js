/**
 * This file is part of the webrtc-chat package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import {user, signaling} from './app';
import {EventsLoader} from './events';

export class Manager {
  constructor() {
    this.init();
  }

  init() {
    let loadBtn = document.getElementById('loadBtn');
    loadBtn.addEventListener('click', this.onLoad.bind(this));

    this.onModalHide('#loadModal', this.clearLoadModal.bind(this));
  }

  getShareToken(offer, asURL = false) {
    let candidates = user.candidates;
    let events = candidates.concat(offer);

    let data = (asURL !== false ? location.href + '#' : '') + encodeURIComponent(JSON.stringify(events));

    let holdtext = document.getElementById('holdtext');
    holdtext.innerText = data;

    let Copied = holdtext.createTextRange();
    Copied.execCommand("Copy");

    alert('Copied to clipboard');
  }

  clearLoadModal(event) {
    document.querySelector('div#load-info').innerHTML = '';
  }

  onModalHide(selector, callback) {
    $(selector).on('hide.bs.modal', callback);
  }

  onLoad() {
    let data = document.querySelector('textarea#loadInput').value;
    EventsLoader.load(data, signaling.onMessage);
    $('#loadModal').modal('hide');
  }
}
