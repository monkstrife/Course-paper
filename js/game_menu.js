var current_player = localStorage.getItem("cur_player");

var current_player_score = [
    localStorage.getItem("score_" + current_player + "_1"),
    localStorage.getItem("score_" + current_player + "_2"),
    localStorage.getItem("score_" + current_player + "_3")
]

main_menu();

function main_menu () {
    delete_all();

    var body = document.body;
    var new_item;

    new_item = document.createElement('div');
    new_item.id = 'block_levels';
    body.appendChild(new_item);

    var div_block = new_item;

    new_item = document.createElement('ul');
    new_item.id = 'lvl_list1';
    div_block.appendChild(new_item);

    var list_lvl = new_item;

    for (var i = 1; i < 4; i++)
    {
        new_item = document.createElement('li');
        new_item.innerHTML = 'Уровень' + i;
        new_item.id = 'l' + i;
        list_lvl.appendChild(new_item);
    }

    // добавляем реакцию на нажатие
    for (var i = 1; i < 4; i++)
    {
        let list_elem = document.querySelector('#l' + i);

        list_elem.addEventListener('click', desc_block_create);
    }

    buttun_result_page();
    create_block_back();
}

function create_block_back() {
    var new_item = document.createElement('div');
    new_item.classList.add("block_back");
    new_item.addEventListener("click", to_back);
    new_item.innerHTML = "Назад";

    document.body.appendChild(new_item);
}

function to_back()
{
    window.location.href = 'index.html';
}

function buttun_result_page () {
    var new_item = document.createElement('div');
    new_item.id = "buttun_result_page";
    new_item.innerHTML = "Показать результат";
    new_item.addEventListener("click", to_result);

    document.body.appendChild(new_item);
}

function to_result () {
    window.location.href = 'result.html';
}

// создание блока описания
function desc_block_create() {
    var current_desc = document.querySelector('#desc_block');
    if(current_desc != null)
    {
        document.body.removeChild(current_desc);
    }

    // создаем новый блок и его элементы
    current_desc = document.createElement('div');
    var text_desc = document.createElement('div');
    var play_desc = document.createElement('div');

    // сам блок
    current_desc.id = "desc_block";

    // текст
    text_desc.id ="desc_text";

    // кнопка "играть"
    play_desc.id = "to_play";
    play_desc.innerHTML = "Играть!";

    if(this.innerHTML == "Уровень1")
    {
        text_desc.innerHTML = "Игра 'Исключи неверное!'. В данной игре нужно будет пройти 5 этапов. На каждом этапе ваша задача будет исключить ТОЛЬКО те слова, которые не связаны с картиной по смыслу. Время ограничено 60 секундами. За каждый верно пройденный этап вам будут начислятся балл";
        play_desc.addEventListener("click", start_lvl_1);
    }
    else if (this.innerHTML == "Уровень2")
    {
        text_desc.innerHTML = "Игра 'Раскидай синонимы!'. В данной игре есть три корзины: центральная и две крайние. Ваша задача распределить слова по крайним корзинам так, чтобы в одной корзине не было слов синонимов. Время ограничего 40 секундами. За каждую правильную пару синонимов начисяется балл";
        play_desc.addEventListener("click", start_lvl_2);
    }
    else if (this.innerHTML == "Уровень3")
    {
        text_desc.innerHTML = "Игра 'Поймай меня!'. В поле раз в 2 секунды будут падать слова. Ваша задача поймать ТОЛЬКО те слова, которые связаны с картиной по смыслу. Время ограничено 30 секундами. Чем больше правильных слов вы поймаете, тем выше ваш балл. Не правильные слова отнимают текущий балл";
        play_desc.addEventListener("click", start_lvl_3);
    }


    current_desc.appendChild(text_desc);
    current_desc.appendChild(play_desc);
    document.body.appendChild(current_desc);
}


function delete_all() {
    var body_childs = document.body.querySelectorAll('div');

    console.log(body_childs);

    for(i = 0; i < body_childs.length; i++)
    {
        if(body_childs[i].parentNode == document.body)
        {
            document.body.removeChild(body_childs[i]);
        }
    }
}


// таймер

var time1 = 60;
var time2 = 40;
var time3 = 30;
var cur_time;

var fps = 60;

var Timer = function(obj) {
    this.time = obj.time;
    this.fps = obj.fps;
    this.onEnd = obj.onEnd || null;
    this.onStart = obj.onStart || null;
    this.onTick = obj.onTick || null;
    this.intervalID = null;

    this.start = () => {
        this.interval = setInterval(this.update, 1000 / this.fps);
        this.onStart ? this.onStart() : void 0;
    };

    this.stop = () => {
        this.onTick = null;
        clearInterval(this.interval);
        this.onEnd ? this.onEnd() : void 0;
    };

    this.update = () => {
        this.time > 0 ? this.time -= 1 / this.fps : this.stop();
        this.onTick ? this.onTick() : void 0;
        return this.get();
    }

    this.get = (par) => {
        switch(par) {
            case undefined:
                return this.time;
                break;
            case "dig":
                return Math.ceil(this.time);
                break;
            case "end":
                return this.onEnd();
        }
    }
}

var timer1;

var timer2;

var timer3;

var cur_timer;

var interval3;

function tick() {
    ids("timer").innerHTML = cur_timer.get("dig");
    ids("slider").style.width = cur_timer.get()/cur_time * 100 + "%";

    var falling_blocks = document.querySelectorAll(".blocks_falling");

    for(i = 0; i < falling_blocks.length; i++)
    {
        let cur_pos = Number(String(falling_blocks[i].style.top).replace('%', ''));
        if(cur_pos < 90 && falling_blocks[i].classList.length < 2)
        {
            falling_blocks[i].style.top = 5 + (interval3 - cur_timer.get())/2 * 90 + "%";
        }
        else if (falling_blocks[i].classList.length < 2)
        {
            document.body.removeChild(falling_blocks[i]);
        }
    }

    if(cur_time == time3)
    {
        if(interval3 - cur_timer.get() >= 2)
        {
            interval3 -= 2;
            create_fall_block();
        }
    }
}

function ids(id) {
    return document.getElementById(id);
}

// функции конца таймера
function onEndtimer_1()
{
    delete_all();
    create_block_result(1, 5);

    if(current_player_score[0] > localStorage.getItem("score_" + current_player + "_1"))
    {
        localStorage.setItem("score_" + current_player + "_1", current_player_score[0]);
    }
}

function onEndtimer_2()
{
    var left_list = document.querySelector('#ul2').querySelectorAll('li');
    var right_list = document.querySelector('#ul3').querySelectorAll('li');

    for(i = 0; i < left_list.length; i++)
    {
        for(z = 0; z < right_list.length; z++)
        {
            if(synonym_map.get(left_list[i].innerHTML) == right_list[z].innerHTML)
            {
                current_player_score[1]++;
                break;
            }
        }
    }

    delete_all();
    create_block_result(2, 7);

    if(current_player_score[1] > localStorage.getItem("score_" + current_player + "_2"))
    {
        localStorage.setItem("score_" + current_player + "_2", current_player_score[1]);
    }
}

function onEndtimer_3()
{
    var list_clicked = document.querySelectorAll(".anim_paused");

    for(i = 0; i < list_clicked.length; i++)
    {
        let cond = 0;
        for(z = 0; z < true_array_lvl3.length; z++)
        {
            if(list_clicked[i].innerHTML == true_array_lvl3[z])
            {
                current_player_score[2]++;
                cond = 1;
                break;
            }
        }
        if(current_player_score[2] > 0 && cond == 0)
        {
            current_player_score[2]--;
        }
    }

    delete_all();
    create_block_result(3, 7);

    if(current_player_score[2] > localStorage.getItem("score_" + current_player + "_3"))
    {
        localStorage.setItem("score_" + current_player + "_3", current_player_score[2]);
    }
}

// Для уровня 1
var data = [
    JSON.parse(data_1),
    JSON.parse(data_2),
    JSON.parse(data_3),
    JSON.parse(data_4),
    JSON.parse(data_5),
    JSON.parse(data_6),
    JSON.parse(data_7),
]

var count_answer;

function start_lvl_1() {
    alert('Начинаем уровень 1');
    shuffle(data);
    delete_all();
    current_player_score[0] = 0;
    timer1 = new Timer({
        time: time1,
        onTick: tick,
        fps: fps,
        onEnd: onEndtimer_1
    });
    slider_count = 1;

    //создаем таймер
    var slider = document.createElement("div");
    slider.id = "slider";
    var timer = document.createElement("div");
    timer.id = "timer";
    document.body.appendChild(slider);
    document.body.appendChild(timer);


    // запускаем таймер
    cur_time = time1;
    cur_timer = timer1;
    timer1.start();
    requestAnimationFrame(tick);

    //ставим слайдер и кнопку некст
    create_block_next ()
    create_block_slider();

    count_answer = 0;
    create_new_answer ();
}

function create_new_answer () {
    //ставим вопросы
    create_question_1(data[count_answer].qustion);

    // ставим фото
    create_img_1(data[count_answer].foto);
}

// создаем фото
function create_img_1(foto) {
    var prev_item = document.querySelector("#block_question_1");

    var new_div_img = document.createElement('div');
    new_div_img.id = "div_img";

    var new_img = document.createElement('img');
    new_img.src = 'lvl_1/' + foto;

    new_div_img.appendChild(new_img);
    document.body.insertBefore(new_div_img, prev_item);
}

function create_question_1(qustions) {
    var new_item;
    var prev_item = document.querySelector("#block_next");

    new_item = document.createElement('div');
    new_item.id = 'block_question_1';
    document.body.insertBefore(new_item, prev_item);

    var div_block = new_item;

    new_item = document.createElement('ul');
    new_item.id = 'lvl_list2';
    div_block.appendChild(new_item);

    var list_lvl = new_item;

    for (var i = 0; i < qustions.length; i++)
    {
        new_item = document.createElement('li');
        new_item.innerHTML = qustions[i];
        new_item.id = 'l1_' + i;
        new_item.addEventListener("click", animation_1);
        list_lvl.appendChild(new_item);
    }
}

function animation_1() {
    this.style.animation = 'run_out 2s forwards';
    this.classList.add('.delete_li');
}

var slider_count;
function animation_slider_1() {
    var item = document.querySelector("#sub_block_slider");

    item.style.animation = 'anim_slider_'+ slider_count +' 4s forwards';
    slider_count++;
    item.addEventListener("click", animation_slider_1);


    if(check_answer() == 1)
    {
        current_player_score[0]++;
    }

    delete_answer();

    count_answer++;
    if(count_answer == 5)
    {
        timer1.stop();
        return;
    }

    create_new_answer();
}

function create_block_result(lvl, max_score) {
    lvl--;
    var item = document.createElement("div");
    item.id = "block_result";
    item.innerHTML = "Ваш результат: " + current_player_score[lvl] + " из " + max_score;
    document.body.appendChild(item);

    var restart = document.createElement("div");
    restart.id = "block_restart";
    restart.innerHTML = "Попробовать еще раз!";
    if(lvl == 0)
    {
        restart.addEventListener("click", start_lvl_1);
    }
    else if (lvl == 1)
    {
        restart.addEventListener("click", start_lvl_2);
    }
    else if (lvl == 2)
    {
        restart.addEventListener("click", start_lvl_3);
    }
    document.body.appendChild(restart);

    var to_menu = document.createElement("div");
    to_menu.id = "to_menu";
    to_menu.innerHTML = "Вернуться в главное меню";
    to_menu.addEventListener("click", main_menu);
    document.body.appendChild(to_menu);
}

function check_answer() { 
    var result = document.querySelectorAll("li");
    var res_array = [];

    for(i = 0; i < 4; i++)
    {
        if(result[i].classList.length == 0)
        {
            res_array.push(result[i].innerHTML);
        }
    }
    
    var true_array = data[count_answer].true;

    if (true_array.length != res_array.length)
    {
        return -1;
    }

    for(i = 0; i < true_array.length; i++)
    {
        if(true_array[i] != res_array[i])
        {
            return -1;
        }
    }

    return 1;
}

function delete_answer () {
    var item_answ = document.querySelector("#block_question_1");
    var item_foto = document.querySelector("#div_img");

    document.body.removeChild(item_answ);
    document.body.removeChild(item_foto);
}

function create_block_slider () {
    var new_item = document.createElement("div");
    new_item.id = "block_slider";
    document.body.appendChild(new_item);

    var new_item2 = document.createElement("div");
    new_item2.id = "sub_block_slider";
    new_item.appendChild(new_item2);
}

function create_block_next () {
    var new_item = document.createElement("div");
    new_item.id = "block_next";
    new_item.innerHTML = "Следующий вопрос";
    new_item.addEventListener("click", animation_slider_1);
    document.body.appendChild(new_item);
}

// сортировка
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}


// для уровня 2

var data2 = [
    JSON.parse(data_list_1),
    JSON.parse(data_list_2),
    JSON.parse(data_list_3),
    JSON.parse(data_list_4),
    JSON.parse(data_list_5)
]

var synonym_map = new Map();
var list_array = [];

function start_lvl_2() {
    if(Number(localStorage.getItem("score_" + current_player + "_1")) < 1)
    {
        alert("Для начала нужно успешно пройти предыдущий уровень!");
        return;
    }

    alert('Начинаем уровень 2');
    synonym_map.clear();
    list_array = [];
    delete_all();
    current_player_score[1] = 0;

    shuffle(data2);
    fill_map();
    fill_list_array();

    timer2 = new Timer({
        time: time2,
        onTick: tick,
        fps: fps,
        onEnd: onEndtimer_2
    });

    //создаем таймер
    var slider = document.createElement("div");
    slider.id = "slider";
    var timer = document.createElement("div");
    timer.id = "timer";
    document.body.appendChild(slider);
    document.body.appendChild(timer);


    // запускаем таймер
    cur_time = time2;
    cur_timer = timer2;
    timer2.start();
    requestAnimationFrame(tick);

    // создаем кнопку результата
    create_buttun_result_2()

    // создаем корзины
    create_block_buskets();

    // создаем листы и прикрепляем их к корзинам
    create_word_list();

    // заполяем главный лист
    add_word_list();


    allow_dragging_in_place();
    allow_dragging();
    allow_reaction();

    // логига перетаскивания
    move_word ();

}

function fill_map() {
    for(i = 1; i < 8; i++)
    {
        synonym_map.set(data2[0]["coupe" + i][0], data2[0]["coupe" + i][1]);
        synonym_map.set(data2[0]["coupe" + i][1], data2[0]["coupe" + i][0]);
    }
}

function fill_list_array() {
    for(i = 1; i < 8; i++)
    {
        list_array.push(data2[0]["coupe" + i][0]);
        list_array.push(data2[0]["coupe" + i][1]);
    }

    shuffle(list_array);
}

function create_buttun_result_2() {
    var new_item;

    new_item = document.createElement("div");
    new_item.id = "block_buttun_result_2";
    new_item.innerHTML = "Проверить!";
    new_item.addEventListener("click", check_result_lvl_2);
    document.body.appendChild(new_item); 
}

function create_block_buskets () {
    var new_item;

    for(i = 1; i < 4; i++)
    {
        new_item = document.createElement("div");
        new_item.id = "block_basket" + i;
        document.body.appendChild(new_item); 
    }
}

function create_word_list () {
    var new_item;
    var div_block;

    for(i = 1; i < 4; i++)
    {
        div_block = document.querySelector('#block_basket' + i);
        new_item = document.createElement('ul');
        new_item.id = 'ul' + i;
        new_item.classList.add('word_list');
        div_block.appendChild(new_item);
    }
}

function add_word_list () {
    var word_list = document.querySelector('#ul1');
    var new_item;

    for(i = 0; i < 14; i++)
    {
        new_item = document.createElement('li');
        new_item.innerHTML = list_array[i];
        new_item.className = 'word_item';

        word_list.appendChild(new_item);
    }
}

function check_result_lvl_2() {
    timer2.stop();
}

// разрешаем сброс элементов в области (по умолчанию браузеры это заперщают)
function allow_dragging_in_place () {
    var word_list = document.querySelector('#ul1');

    for(i = 1; i < 4; i++)
    {
        word_list = document.querySelector('#ul' + i);
        word_list.addEventListener('dragover', (evnt) => {
            evnt.preventDefault();
        })
    }
}

// разрешаем перетаскивание элементов
function allow_dragging () {
    var word_list;
    var cont;

    for(i = 1; i < 4; i++)
    {
        word_list = document.querySelector('#ul' + i);
        cont = word_list.querySelectorAll('li');

        for (const item of cont) {
            item.draggable = true;
        }
    }
}

// добавляем реакцию на перетаскивание
function allow_reaction () {
    var word_list;

    for(i = 1; i < 4; i++)
    {
        word_list = document.querySelector('#ul' + i);

        // добавляем "особый" style на момент начала перетаскивания
        word_list.addEventListener('dragstart', (evnt) => {
            evnt.target.classList.add('dragging');
        })

        // убираем этот style
        word_list.addEventListener('dragend', (evnt) => {
            evnt.target.classList.remove('dragging');
            // здесь можно добавить результирующию динамически меняющуюся функцию
        })
    }
}

// логика перетаскивания
function move_word () {
    var word_list;
    var next_item;

    var body = document.body;

    body.addEventListener('dragover', (evnt) => {
        var draggable_item = body.querySelector('.dragging');

        var under_cursor_item = evnt.target;

        if(draggable_item == under_cursor_item)
        {
            return;
        }

        for(i = 1; i < 4; i++)
        {
            word_list = document.querySelector('#ul' + i);

            if(under_cursor_item.parentElement == word_list)
            {
                if(draggable_item.parentElement == word_list) {
                    next_item = (under_cursor_item == draggable_item.nextElementSibling) ? under_cursor_item.nextElementSibling : under_cursor_item;
                }
                else {
                    next_item = under_cursor_item;
                    // тут можно поменять классы, если переходит в другую корзину
                }
                word_list.insertBefore(draggable_item, next_item);
            }

            //здесь, когда наводимся на блок, а не элементы списка
            if(under_cursor_item.id == 'block_basket' + i)
            {
                word_list.insertBefore(draggable_item, null);
            }
        }
    })
}




// для уровня 3

var data3 = [
    JSON.parse(data_set_1),
    JSON.parse(data_set_2),
    JSON.parse(data_set_3),
    JSON.parse(data_set_6)
]

var list_array_lvl3 = [];
var true_array_lvl3 = [];
var count_fall_blocks;


function start_lvl_3() {
    if(Number(localStorage.getItem("score_" + current_player + "_2")) < 1)
    {
        alert("Для начала нужно успешно пройти предыдущий уровень!");
        return;
    }

    alert('Начинаем уровень 3');
    delete_all();
    shuffle(data3);
    list_array_lvl3 = [];
    true_array_lvl3 = [];
    current_player_score[2] = 0;
    count_fall_blocks = 0;
    interval3 = time3;
    
    timer3 = new Timer({
        time: time3,
        onTick: tick,
        fps: fps,
        onEnd: onEndtimer_3
    });

    // заполняем массивы
    fill_list_array_lvl3();

    //создаем таймер
    var slider = document.createElement("div");
    slider.id = "slider";
    var timer = document.createElement("div");
    timer.id = "timer";
    document.body.appendChild(slider);
    document.body.appendChild(timer);

    // запускаем таймер
    cur_time = time3;
    cur_timer = timer3;
    timer3.start();
    requestAnimationFrame(tick);


    create_block_place ();
    // создаем кнопку результата
    create_buttun_result_3();

    create_img_3(data3[0]["foto"]);
}

function create_fall_block () {
    count_fall_blocks++;

    var new_item = document.createElement('div');
    new_item.classList.add('blocks_falling');
    new_item.id = 'fb' + count_fall_blocks;
    // new_item.style.left = getRandom(40, 55) + '%';
    new_item.style.left = getRandom(37, 58) + '%';
    new_item.style.top = '5%';
    new_item.innerHTML = list_array_lvl3[count_fall_blocks - 1];
    new_item.addEventListener("click", click_fall);


    document.body.appendChild(new_item);
}

function click_fall (evnt) {
    evnt.target.classList.add('anim_paused');
}

function create_block_place () {
    var new_item;

    new_item = document.createElement("div");
    new_item.id = "block_place";

    document.body.appendChild(new_item);
}

function create_buttun_result_3() {
    var new_item;

    new_item = document.createElement("div");
    new_item.id = "block_buttun_result_3";
    new_item.innerHTML = "Закончить!";
    new_item.addEventListener("click", check_result_lvl_3);
    document.body.appendChild(new_item); 
}

function check_result_lvl_3() {
    timer3.stop();
}

// создаем фото
function create_img_3(foto) {
    var new_div_img = document.createElement('div');
    new_div_img.id = "div_img3";

    var new_img = document.createElement('img');
    new_img.src = 'lvl_3/' + foto;
    new_img.draggable = false;

    new_div_img.appendChild(new_img);
    document.body.appendChild(new_div_img);
}

function fill_list_array_lvl3 () {
    list_array_lvl3 = data3[0]["qustion"];
    true_array_lvl3 = data3[0]["true"];

    shuffle(list_array_lvl3);
}










