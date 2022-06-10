var $characterlist = document.querySelector('#character-list');
var $characterview = document.querySelector('#character-view');
var $detailview = document.querySelector('#detail-view');
var $charactersbutton = document.querySelector('#characters-button');
var $addButton = document.querySelector('#add-button');
var value;

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.genshin.dev/characters');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  for (let i = 0; i < xhr.response.length; i++) {
    if (!(xhr.response[i] === 'traveler-anemo' || xhr.response[i] === 'traveler-electro' || xhr.response[i] === 'traveler-geo')) {
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
  }
  var $selectCharacter = document.querySelectorAll('.character');
  for (let i = 0; i < $selectCharacter.length; i++) {
    $selectCharacter[i].addEventListener('click', function () {
      $characterview.className = 'hidden';
      $detailview.className = 'container row';
      $detailview.innerHTML = '';
      value = $selectCharacter[i].firstChild.alt;
      $addButton.className = '';
      var detailXHR = new XMLHttpRequest();
      detailXHR.open('GET', 'https://api.genshin.dev/characters/' + value);
      detailXHR.responseType = 'json';
      detailXHR.addEventListener('load', function () {
        var gachaImage = document.createElement('img');
        gachaImage.src = 'https://api.genshin.dev/characters/' + value + '/gacha-splash';
        if (value === 'thoma') {
          gachaImage.src = 'https://api.genshin.dev/characters/thoma/portrait';
        }
        gachaImage.className = 'column-half';
        var info = document.createElement('div');
        info.className = 'column-half';
        var $name = document.createElement('p');
        $name.innerHTML = 'Name: <span>' + detailXHR.response.name + '</span>';
        var $vision = document.createElement('p');
        $vision.innerHTML = 'Vision: <span>' + detailXHR.response.vision + '</span>';
        var $weapon = document.createElement('p');
        $weapon.innerHTML = 'Weapon: <span>' + detailXHR.response.weapon + '</span>';
        var $nation = document.createElement('p');
        $nation.innerHTML = 'Nation: <span>' + detailXHR.response.nation + '</span>';
        var $affiliation = document.createElement('p');
        $affiliation.innerHTML = 'Affiliation: <span>' + detailXHR.response.affiliation + '</span>';
        var $rarity = document.createElement('p');
        $rarity.innerHTML = 'Rarity: <span>' + detailXHR.response.rarity + '</span>';
        var $constellation = document.createElement('p');
        $constellation.innerHTML = 'Constellation: <span>' + detailXHR.response.constellation + '</span>';
        var $birthday = document.createElement('p');
        $birthday.innerHTML = 'Birthday: <span>' + detailXHR.response.birthday.substr(5) + '</span>';
        var $description = document.createElement('p');
        $description.innerHTML = 'Description: <span>' + detailXHR.response.description + '</span>';
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
  $addButton.className = 'hidden';
});

$addButton.addEventListener('click', function () {
  var counter = 0;
  for (let i = 0; i < data.favorites.length; i++) {
    if (value === data.favorites[i]) {
      counter++;
    }
  }
  if (counter === 0) {
    data.favorites.push(value);
    data.favorites.sort();
  }
});
