import * as Peeker from '$Peeker';

Peeker.registerListener('messageEvent', callback);

let allowedHosts = ['media.giphy.com', 'i.imgur.com', 'c.tenor.com', 'media.discordapp.net', 'cdn.discordapp.com', 'images-ext-1.discordapp.net', 'imagizer.imageshack.com'];

function callback(message, data) {
  const content = data.props?.message?.message || data.props?.message?.messageBody;
  if (!content) return;
  if (!content.startsWith('https://')) return;
  const contentElement =
      message.querySelector('.message') ||
      message.querySelector('.seventv-message-context') ||
      message.querySelector('span[data-test-selector="chat-line-message-body"]');
  if (!contentElement) return;
  if (contentElement.querySelectorAll('a').length > 1) return;
  const linkElement = contentElement.querySelector('a');
  const hrefData = tryURL(linkElement.href);
  if (!hrefData) return;
  if (!allowedHosts.includes(hrefData.host)) return;
  if (!(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(hrefData.pathname)) return;
  const imageElement = new Image();
  imageElement.classList = 'te-image-img';
  imageElement.src = linkElement.href;
  imageElement.onload = () => {
    linkElement.classList.add('te-image-a');
    linkElement.innerHTML = '';
    linkElement.appendChild(imageElement);
  };
}

function tryURL(href) {
  try {
    return new URL(href);
  } catch (error) {
    return false;
  }
}