$(function() {
    var heroes = [];
    var responseObj = {};
    var heroTemplate;
    var imagePath = 'https://overwatch-data.herokuapp.com/img/heroes/';
    var searchInput = $('#search-input');

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

    function filterByQuery(_heroes) {
        var substrRegex = new RegExp(searchInput.val().toLowerCase(), 'i');

        return _heroes.filter(function(_hero) {
            return substrRegex.test(_hero.name.toLowerCase())
        });
    }

    function update() {
        var filteredHeroes = filterHeroes(heroes);
        var sortedHeroes = sortHeroes(filteredHeroes);

        renderHeroes(sortedHeroes);
    }

    function filterHeroes(_heroes) {
        return filterByQuery(_heroes);
    }

    function sortHeroes(_heroes) {
        var compareFunction = compareFunctions['name'];

        return _heroes.sort(compareFunction);
    }

    function init(response) {
        console.log('test');
        heroTemplate = $('#t-heroes').html();
        responseObj = JSON.parse(response);
        heroes = responseObj.heroes;
        searchInput.keyup(update);
        update();
    }

    loadHeroes();
});