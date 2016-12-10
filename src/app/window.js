/**
 * This file is part of the webrtc-chat package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

"use strict";

const chatSelector = 'div.chat';

export function addMessage(message, incoming = false) {
  clearInput();
  let template = require('./../public/message.html');
  template = template.replace(/{{message}}/gi, prop => message);
  template = template.replace(/{{class}}/gi, prop => incoming ? 'income' : 'outcome');
  document.querySelector(chatSelector).innerHTML += template;
  scrollDown();
}

export function addSystemMessage(type, message) {
  let template = require('./../public/system-message.html');
  template = template.replace(/{{message}}/gi, prop => message);
  template = template.replace(/{{class}}/gi, prop => type);
  document.querySelector('div.chat').innerHTML += template;
  scrollDown();
}

export function scrollDown() {
  let elem = document.querySelector(chatSelector);
  elem.scrollTop = elem.scrollHeight;
}

export function clearInput() {
  document.querySelector(this.inputSelector).value = '';
}

export function clearMessages() {
  document.querySelector(chatSelector).innerHTML += template;
}