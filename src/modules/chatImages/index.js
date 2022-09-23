import * as Peeker from '$Peeker';

Peeker.registerListener('messageEvent', callback);

function callback(message, data) {
  if (!data.props.message) return;
  if (!data.props.message?.messageBody.startsWith('https://')) return;
  if (message.querySelectorAll('a').length > 1) return;
  let linkElement = message.querySelector('a');
  let hrefData = url(linkElement.href);
  if (!hrefData) return;
  if (!(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(hrefData.pathname)) return;
  let imageElement = document.createElement('img');
  imageElement.classList = 'te-image';
  imageElement.src = linkElement.href;
  linkElement.innerHTML = '';
  linkElement.appendChild(imageElement);
}

function url(href) {
  try {
    return new URL(href);
  } catch (e) {
    return undefined;
  }
}