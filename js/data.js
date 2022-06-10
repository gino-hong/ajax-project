/* exported data */

var data = {
  favorites: []
};

var previousDataJSON = localStorage.getItem('data-local-storage');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', function (e) {
  var dataJSON = JSON.stringify(data);
  this.localStorage.setItem('data-local-storage', dataJSON);
});
