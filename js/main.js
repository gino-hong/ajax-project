var $characterlist = document.querySelector('#character-list');

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.genshin.dev/characters');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  for (var i = 0; i < xhr.response.length; i++) {
    var $character = document.createElement('div');
    var $img = document.createElement('img');
    $img.src = 'https://api.genshin.dev/characters/' + xhr.response[i] + '/icon';
    var $p = document.createElement('p');
    $p.textContent = xhr.response[i];
    $character.appendChild($img);
    $character.appendChild($p);
    $characterlist.appendChild($character);
  }
});
xhr.send();
