import { Module } from '../module.js';
import { tooltip } from '../../utils/tooltip.js';

export const clipModule = new Module('clip', callback);

function callback(element) {
  if (!window.location.href.includes('clips.twitch.tv') && !window.location.href.includes('/clip/'))
    return;
  element.setAttribute('twitch-enhancer', '');
  createButton(element);
}

function createButton(element) {
  const controls = element.querySelector('.player-controls__left-control-group');
  const link = document.createElement('a');
  link.href = '#';
  link.onclick = downloadClip;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.id = 'te-clip-download';
  link.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px" stroke="currentColor" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
    </svg><span class="te-tooltip te-download-clip te-tooltip-top">Download this clip</span>`;
  controls.appendChild(link);
  tooltip(link, 'te-download-clip');
}

function downloadClip() {
  window.open(document.querySelector('video').src);
}
