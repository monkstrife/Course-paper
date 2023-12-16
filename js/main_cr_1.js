
// Проверяем, чтобы counts_palyer существовал в хранилище
if(localStorage.getItem("count_players") == null)
{
    localStorage.setItem("count_players", 0);
}

function func() {
    var text = document.getElementById("text1");
    if(text.value == '')
    {
        alert("Ошибка! Чтобы играть, нужно указать имя игрока");
        return;
    }

    var count_players = localStorage.getItem("count_players");

    // Проверяем, есть ли такой игрок уже
    for(var i = 0; i <= count_players; i++) {
        if(localStorage.getItem("player_" + i) == text.value)
        {
            localStorage.setItem("cur_player", "player_" + i);
            window.location.replace("game.html");
            return;
        }
    }

    // изменяем текущее число игроков
    count_players++;
    localStorage.setItem("count_players", count_players);

    // создаем нового игрока
    localStorage.setItem("player_" + count_players, text.value);
    localStorage.setItem("score_player_" + count_players + "_1", 0);
    localStorage.setItem("score_player_" + count_players + "_2", 0);
    localStorage.setItem("score_player_" + count_players + "_3", 0);

    localStorage.setItem("cur_player", "player_" + count_players);

    alert(localStorage.getItem("player_1"));

    window.location.replace("game.html");
}