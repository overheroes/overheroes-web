$(function() {
    function loadHeroes() {
        $.ajax({
            url: '/heroes',
            success: renderHeroes
        });
    }

    function renderHeroes(response) {
        var infoTemplate = $('#t-heroes').html();
        var responseObj = JSON.parse(response);

        $('#heroes').html(_.template(infoTemplate)(
            {
                heroes: responseObj.heroes,
                imagePath: 'https://overwatch-data.herokuapp.com/img/heroes/'
            }
        ));
    }

    loadHeroes();
});