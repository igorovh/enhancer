import * as Peeker from '$Peeker';

Peeker.registerListener('messageEvent', callback);

let allowedLinks = [
  'giphy.com',
  'imgur.com',
  'tenor.com'
]

function callback(message) {
  let links = message.querySelectorAll('a');
  let linksCount = links.length;

  if (linksCount == 0) return;

  if (linksCount > 1) {
    links.forEach(link => {
      if (allowedLinks.some(value => link.href.includes(value + '/'))) {
        const gifElement = document.createElement("img");
        
        gifElement.classList = 'te-gif-small';
        gifElement.src = link.href;

        link.innerHTML = '';

        link.appendChild(gifElement);
      }
    });
  } else {
    let link = message.querySelector('a');

    if (allowedLinks.some(value => link.href.includes(value + '/'))) {
      const gifElement = document.createElement("img");
      
      gifElement.classList = 'te-gif-large';
      gifElement.src = link.href;

      link.innerHTML = '';

      link.appendChild(gifElement);
    }
  }
}