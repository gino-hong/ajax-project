var $characterlist = document.querySelector('#character-list');
var $characterview = document.querySelector('#character-view');
var $detailview = document.querySelector('#detail-view');
var $charactersbutton = document.querySelector('#characters-button');

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.genshin.dev/characters');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  for (let i = 0; i < xhr.response.length; i++) {
    var $character = document.createElement('div');
    $character.className = 'character';
    var $img = document.createElement('img');
    $img.src = 'https://api.genshin.dev/characters/' + xhr.response[i] + '/icon';
    $img.alt = xhr.response[i];
    if ($img.alt === 'yae-miko') {
      $img.src = 'https://api.genshin.dev/characters/yae-miko/icon-big';
      $img.className = 'smole';
    }
    var $p = document.createElement('p');
    $p.textContent = startCase(xhr.response[i]);
    $character.appendChild($img);
    $character.appendChild($p);
    $characterlist.appendChild($character);
  }
  var $selectCharacter = document.querySelectorAll('.character');
  for (let i = 0; i < $selectCharacter.length; i++) {
    $selectCharacter[i].addEventListener('click', function () {
      $characterview.className = 'hidden';
      $detailview.className = '';
    });
  }

});
xhr.send();

function startCase(str) {
  str = str.split('-');

  for (var i = 0, x = str.length; i < x; i++) {
    str[i] = str[i][0].toUpperCase() + str[i].substr(1);
  }

  return str.join(' ');
}

$charactersbutton.addEventListener('click', function () {
  $characterview.className = '';
  $detailview.className = 'hidden';
});
