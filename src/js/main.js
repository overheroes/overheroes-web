$(function() {
    function loadHeroes() {
        $.ajax({
            url: '/heroes',
            success: renderHeroes
        });
    }

    function renderHeroes(heroes) {
        var infoTemplate = $('#t-heroes').html();

        $('#heroes').html(_.template(infoTemplate)(
            {
                heroes: JSON.parse(heroes),
                imagePath: 'https://overwatch-data.herokuapp.com/img/heroes/'
            }
        ));
    }

    loadHeroes();
});