import { Module } from '../module.js';
import { getFile } from '../../utils/file.js';
import { tooltip } from '../../utils/tooltip.js';

export const chatButtonModule = new Module('chatButton', callback);

function callback(element) {
  element.setAttribute('twitch-enhancer', '');
  const settingsButton = document.createElement('div');
  settingsButton.id = 'te-settings-button';
  settingsButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="white">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M14.25 11.8195C14.25 13.8522 12.6022 15.5 10.5694 15.5C8.53673 15.5 6.88889 13.8522 6.88889 11.8195C6.88889 9.78674 8.53673 8.1389 10.5694 8.1389C12.6022 8.1389 14.25 9.78674 14.25 11.8195ZM10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18Z"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.386 11.4317C12.2943 11.4581 12.1974 11.4722 12.0972 11.4722C11.5219 11.4722 11.0556 11.0059 11.0556 10.4306C11.0556 10.3303 11.0697 10.2334 11.0961 10.1417C10.9501 10.1036 10.7969 10.0833 10.6389 10.0833C9.6417 10.0833 8.83333 10.8917 8.83333 11.8889C8.83333 12.8861 9.6417 13.6944 10.6389 13.6944C11.6361 13.6944 12.4444 12.8861 12.4444 11.8889C12.4444 11.7309 12.4242 11.5777 12.386 11.4317Z"/>
  </svg>
  <span class="te-tooltip te-settings">TwitchEnhancer Settings</span>
    `;
  tooltip(settingsButton, 'te-settings');
  settingsButton.addEventListener('click', showSettings);
  element.insertBefore(settingsButton, element.firstChild);
}

function showSettings() {
  window.open(getFile('html/options/options.html'));
}
