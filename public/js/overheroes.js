'use strict';

$(function () {
  var heroes = [];
  var heroTemplate = $('#t-heroes').html();
  var imagePath = 'https://overwatch-data.herokuapp.com/img/heroes/';
  var searchInput = $('#search-input');
  var classFilter = $('#class-filter');

  var compareFunctions = {
    name: function name(a, b) {
      return a.name.localeCompare(b.name);
    }
  };

  function loadHeroes() {
    $.ajax({
      url: '/heroes',
      success: init
    });
  }

  function renderHeroes(_heroes) {
    $('#heroes').html(_.template(heroTemplate)({
      heroes: _heroes,
      imagePath: imagePath
    }));
  }

  function update() {
    var filteredHeroes = filterHeroes(heroes);
    var sortedHeroes = sortHeroes(filteredHeroes);

    renderHeroes(sortedHeroes);
  }

  function filterByQuery(_heroes) {
    var substrRegex = new RegExp(searchInput.val().toLowerCase(), 'i');

    return _heroes.filter(function (_hero) {
      return substrRegex.test(_hero.name.toLowerCase());
    });
  }

  function filterByClass(_heroes) {
    var selectedClass = classFilter.val();

    if (selectedClass === 'all') {
      return _heroes;
    }

    return _heroes.filter(function (hero) {
      return hero.class === selectedClass;
    });
  }

  function filterHeroes(_heroes) {
    _heroes = filterByClass(_heroes);

    return filterByQuery(_heroes);
  }

  function sortHeroes(_heroes) {
    return _heroes.sort(compareFunctions['name']);
  }

  function init(response) {
    heroes = JSON.parse(response).heroes;
    searchInput.keyup(update);
    classFilter.change(update);
    update();
  }

  // Check for browser support.
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
  }

  loadHeroes();
});
