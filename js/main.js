var $characterlist = document.querySelector('#character-list');
var $favoritelist = document.querySelector('#favorite-list');
var $characterview = document.querySelector('#character-view');
var $detailview = document.querySelector('#detail-view');
var $favoriteview = document.querySelector('#favorite-view');
var $charactersbutton = document.querySelector('#characters-button');
var $favoritesbutton = document.querySelector('#favorites-button');
var $addButton = document.querySelector('#add-button');
var $removeButton = document.querySelector('#remove-button');
var value;

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.genshin.dev/characters');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  for (let i = 0; i < xhr.response.length; i++) {
    if (!(xhr.response[i] === 'traveler-anemo' || xhr.response[i] === 'traveler-electro' || xhr.response[i] === 'traveler-geo')) {
      buildIcon(xhr.response[i], $characterlist);
    }
  }
  buildDetails('.character');
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
  $removeButton.className = 'hidden';
  $favoriteview.className = 'hidden';
});

$favoritesbutton.addEventListener('click', function () {
  $favoriteview.className = '';
  $detailview.className = 'container row hidden';
  $addButton.className = 'hidden';
  $removeButton.className = 'hidden';
  $characterview.className = 'hidden';
});

$addButton.addEventListener('click', function () {
  $favoriteview.className = '';
  $detailview.className = 'container row hidden';
  $addButton.className = 'hidden';
  $removeButton.className = 'hidden';
  var counter = 0;
  if (data.favorites.length === undefined) {
    data.favorites.push(value);
    data.favorites.sort();
    $favoritelist.innerHTML = '';
    for (let i = 0; i < data.favorites.length; i++) {
      buildFavIcon(data.favorites[i], $favoritelist);
    }
    buildDetails('.fav');
  } else {
    for (let i = 0; i < data.favorites.length; i++) {
      if (value === data.favorites[i]) {
        counter++;
      }
    }
    if (counter === 0) {
      data.favorites.push(value);
      data.favorites.sort();
      $favoritelist.innerHTML = '';
      for (let i = 0; i < data.favorites.length; i++) {
        buildFavIcon(data.favorites[i], $favoritelist);
      }
      buildDetails('.fav');
    }
  }
});

$removeButton.addEventListener('click', function () {
  $favoriteview.className = '';
  $detailview.className = 'container row hidden';
  $addButton.className = 'hidden';
  $removeButton.className = 'hidden';
  for (let i = 0; i < data.favorites.length; i++) {
    if (data.favorites[i] === value) {
      data.favorites.splice(i, 1);
    }
  }
  $favoritelist.innerHTML = '';
  if (data.favorites.length > 0) {
    for (let i = 0; i < data.favorites.length; i++) {
      buildFavIcon(data.favorites[i], $favoritelist);
    }
    buildDetails('.fav');
  } else {
    $favoritelist.innerHTML = '<p>No favorites have been added.</p>';
  }
});

function buildIcon(name, list) {
  var $character = document.createElement('div');
  $character.className = 'character';
  var $img = document.createElement('img');
  $img.src = 'https://api.genshin.dev/characters/' + name + '/icon';
  $img.alt = name;
  if ($img.alt === 'yae-miko') {
    $img.src = 'https://api.genshin.dev/characters/yae-miko/icon-big';
    $img.className = 'smole';
  }
  var $p = document.createElement('p');
  $p.textContent = startCase(name);
  $character.appendChild($img);
  $character.appendChild($p);
  list.appendChild($character);
}

function buildFavIcon(name, list) {
  var $character = document.createElement('div');
  $character.className = 'fav';
  var $img = document.createElement('img');
  $img.src = 'https://api.genshin.dev/characters/' + name + '/icon';
  $img.alt = name;
  if ($img.alt === 'yae-miko') {
    $img.src = 'https://api.genshin.dev/characters/yae-miko/icon-big';
    $img.className = 'smole';
  }
  var $p = document.createElement('p');
  $p.textContent = startCase(name);
  $character.appendChild($img);
  $character.appendChild($p);
  list.appendChild($character);
}

window.addEventListener('load', function () {
  if (!(data.favorites.length === undefined)) {
    if (data.favorites.length > 0) {
      $favoritelist.innerHTML = '';
    }
    for (let i = 0; i < data.favorites.length; i++) {
      buildIcon(data.favorites[i], $favoritelist);
    }
  }
});

function buildDetails(char) {
  var $selectCharacter = document.querySelectorAll(char);
  for (let i = 0; i < $selectCharacter.length; i++) {
    $selectCharacter[i].addEventListener('click', function () {
      $characterview.className = 'hidden';
      $detailview.className = 'container row';
      $favoriteview.className = 'hidden';
      $detailview.innerHTML = '';
      value = $selectCharacter[i].firstChild.alt;
      for (let i = 0; i < data.favorites.length; i++) {
        if (value === data.favorites[i]) {
          $removeButton.className = '';
        }
      }
      if ($removeButton.className === '') {
        $addButton.className = 'hidden';
      } else {
        $addButton.className = '';
      }
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
        $name.textContent = 'Name: ';
        var $nameValue = document.createElement('span');
        $nameValue.textContent = detailXHR.response.name;
        $name.appendChild($nameValue);

        var $vision = document.createElement('p');
        $vision.textContent = 'Vision: ';
        var $visionValue = document.createElement('span');
        $visionValue.textContent = detailXHR.response.vision;
        $vision.appendChild($visionValue);

        var $weapon = document.createElement('p');
        $weapon.textContent = 'Weapon: ';
        var $weaponValue = document.createElement('span');
        $weaponValue.textContent = detailXHR.response.weapon;
        $weapon.appendChild($weaponValue);

        var $nation = document.createElement('p');
        $nation.textContent = 'Nation: ';
        var $nationValue = document.createElement('span');
        $nationValue.textContent = detailXHR.response.nation;
        $nation.appendChild($nationValue);

        var $affiliation = document.createElement('p');
        $affiliation.textContent = 'Affiliation: ';
        var $affiliationValue = document.createElement('span');
        $affiliationValue.textContent = detailXHR.response.affiliation;
        $affiliation.appendChild($affiliationValue);

        var $rarity = document.createElement('p');
        $rarity.textContent = 'Rarity: ';
        var $rarityValue = document.createElement('span');
        $rarityValue.textContent = detailXHR.response.rarity;
        $rarity.appendChild($rarityValue);

        var $constellation = document.createElement('p');
        $constellation.textContent = 'Constellation: ';
        var $constellationValue = document.createElement('span');
        $constellationValue.textContent = detailXHR.response.constellation;
        $constellation.appendChild($constellationValue);

        var $birthday = document.createElement('p');
        $birthday.textContent = 'Birthday: ';
        var $birthdayValue = document.createElement('span');
        $birthdayValue.textContent = detailXHR.response.birthday.substr(5);
        $birthday.appendChild($birthdayValue);

        var $description = document.createElement('p');
        $description.textContent = 'Description: ';
        var $descriptionValue = document.createElement('span');
        $descriptionValue.textContent = detailXHR.response.description;
        $description.appendChild($descriptionValue);

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
}
