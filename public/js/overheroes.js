$(function() {
    var heroes = [];
    var responseObj = {};
    var heroTemplate;
    var imagePath = 'https://overwatch-data.herokuapp.com/img/heroes/';
    var searchInput = $('#search-input');
    var classFilter = $('#class-filter');

    var compareFunctions = {
        name: function(a, b) {
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
        $('#heroes').html(_.template(heroTemplate)(
            {
                heroes: _heroes,
                imagePath: imagePath
            }
        ));
    }

    function update() {
        var filteredHeroes = filterHeroes(heroes);
        var sortedHeroes = sortHeroes(filteredHeroes);

        renderHeroes(sortedHeroes);
    }

    function filterByQuery(_heroes) {
        var substrRegex = new RegExp(searchInput.val().toLowerCase(), 'i');

        return _heroes.filter(function(_hero) {
            return substrRegex.test(_hero.name.toLowerCase())
        });
    }

    function filterByClass(_heroes) {
        var selectedClass = classFilter.val();

        if (selectedClass == 'all') {
            return _heroes;
        }

        return _heroes.filter(function(hero) {
            return hero.class == selectedClass;
        });
    }

    function filterHeroes(_heroes) {
        _heroes = filterByClass(_heroes);

        return filterByQuery(_heroes);
    }

    function sortHeroes(_heroes) {
        var compareFunction = compareFunctions['name'];

        return _heroes.sort(compareFunction);
    }

    function init(response) {
        heroTemplate = $('#t-heroes').html();
        responseObj = JSON.parse(response);
        heroes = responseObj.heroes;
        searchInput.keyup(update);
        classFilter.change(update);
        update();
    }

    if ('serviceWorker' in navigator) {
        console.log('Service Worker is supported');
        navigator.serviceWorker.register('sw.js').then(function(reg) {
            reg.pushManager.subscribe({userVisibleOnly: true}).then(function(sub) {
                alert(sub.endpoint);
            });
        }).catch(function(err) {
            console.log(':^(', err);
        });
    }

    loadHeroes();
});

