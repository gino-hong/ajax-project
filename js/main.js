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
      $detailview.className = 'container row';
      $detailview.innerHTML = '';
      var detailXHR = new XMLHttpRequest();
      detailXHR.open('GET', 'https://api.genshin.dev/characters/' + $selectCharacter[i].firstChild.alt);
      detailXHR.responseType = 'json';
      detailXHR.addEventListener('load', function () {
        var gachaImage = document.createElement('img');
        gachaImage.src = 'https://api.genshin.dev/characters/' + $selectCharacter[i].firstChild.alt + '/gacha-splash';
        gachaImage.className = 'column-half';
        var info = document.createElement('div');
        info.className = 'column-half';
        var $name = document.createElement('p');
        $name.textContent = 'Name: ' + detailXHR.response.name;
        var $vision = document.createElement('p');
        $vision.textContent = 'Vision: ' + detailXHR.response.vision;
        var $weapon = document.createElement('p');
        $weapon.textContent = 'Weapon: ' + detailXHR.response.weapon;
        var $nation = document.createElement('p');
        $nation.textContent = 'Nation: ' + detailXHR.response.nation;
        var $affiliation = document.createElement('p');
        $affiliation.textContent = 'Affiliation: ' + detailXHR.response.affiliation;
        var $rarity = document.createElement('p');
        $rarity.textContent = 'Rarity: ' + detailXHR.response.rarity;
        var $constellation = document.createElement('p');
        $constellation.textContent = 'Constellation: ' + detailXHR.response.constellation;
        var $birthday = document.createElement('p');
        $birthday.textContent = 'Birthday: ' + detailXHR.response.birthday.substr(5);
        var $description = document.createElement('p');
        $description.textContent = 'Description: ' + detailXHR.response.description;
        $detailview.appendChild(gachaImage);
        $detailview.appendChild(info);
        info.appendChild($name);
        info.appendChild($vision);
        info.appendChild($weapon);
        info.appendChild($nation);
        info.appendChild($affiliation);
        info.appendChild($rarity);
        info.appendChild($constellation);
        info.appendChild($birthday);
        info.appendChild($description);
      });
      detailXHR.send();
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
  $detailview.className = 'container row hidden';
});
