to_math();


function to_math() {
    var count_players = localStorage.getItem("count_players");
    var player = [];

    for(i = 0; i < count_players; i++)
    {
        let y = i + 1;
        player.push([y, 0]);
        player[i][1] += Number(localStorage.getItem("score_player_" + y + "_1")) + Number(localStorage.getItem("score_player_" + y + "_2")) + Number(localStorage.getItem("score_player_" + y + "_3"));
    }

    player.sort(compare, );
    create_li(count_players, player);
}

// сортировка
function compare (a, b) {
    if(a[1] < b[1])
    {
        return 1;
    }
    else
    {
        return -1;
    }
}

function del_li () {
    var li_list = document.querySelectorAll("li");
    var ul = document.querySelector("ul");

    for(i = 0; i < li_list.length; i++)
    {
        ul.removeChild(li_list[i]);
    }
}

function create_li (count_players, player) {
    var ul= document.querySelector("ul");
    var li;

    for(i = 0; i < count_players; i++)
    {
        var y = i + 1;
        li = document.createElement("li");
        li.id="l" + i;
        li.innerHTML = String(localStorage.getItem("player_" + player[i][0])) + " занял " + y + " место и набрал " + player[i][1] + " очков";
        ul.appendChild(li);
    }
}