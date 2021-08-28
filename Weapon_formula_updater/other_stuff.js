// don't copy this crapy code i was way to lazy to make anything even close to decent
window.onload = do_stuff
function do_stuff() {
    let formula_link = document.getElementById('input_url').value

    fetch(`${formula_link}?${Math.random()}`, {
        method: 'GET',
        mode: 'cors'
    })
    .then(resp => resp.json())
    .then(resp => localStorage.setItem('weapon_formulas', JSON.stringify(resp)))
    .then(() => {
        do_other_stuff()
        event_listener_army()
        frame_selection()
    })
}
function do_other_stuff() {
    let selected_weapon = document.getElementById('weapons')
    fun()
    selected_weapon.addEventListener('input', () => {
        fun()
        document.querySelector('.selected_frame').innerHTML = document.querySelector('.select_frame').innerHTML
        reload_formula_stuff()
        frame_selection()
    })
    function fun() {
        let weapon_frames = JSON.parse(localStorage.getItem('weapon_formulas'))[selected_weapon.value]
        document.getElementById('frames').textContent = ''
        Object.entries(weapon_frames).forEach(frame_id => {
            if (frame_id[1].name) document.getElementById('frames').innerHTML += `<div class='select_frame'> <div>${frame_id[1].name}</div>   <div>${frame_id[1].category}</div>    <div>${frame_id[0]}</div> </div>`
        })
    }
}

function event_listener_army() {
    document.querySelectorAll('.weapon_stats > div > input').forEach(e => e.addEventListener('input', () => {
        reload_formula_stuff()
    }))
    document.getElementById('frames').addEventListener('input', () => {
        reload_formula_stuff()
    })
}

function frame_selection() {
    let frame_box = document.querySelector('.selected_frame')
    let frame_list = document.querySelector('#frames')
    frame_box.addEventListener('click', () => {
        if (frame_list.style.display == 'none') {
            frame_list.style.display = ''
        } else {
            frame_list.style.display = 'none'
        }
    })
    document.querySelectorAll('.select_frame > div').forEach(e => e.addEventListener('click', event => {
        document.querySelector('.selected_frame').innerHTML = event.currentTarget.parentElement.innerHTML
    }))


}

function reload_formula_stuff() {
    let selected_weapon = document.getElementById('weapons').value
    let selected_frame  = document.querySelector('.selected_frame :nth-child(3)').textContent * 1
    let reload_stat = document.getElementById('reload_speed_value').value
    let wfi = JSON.parse(localStorage.getItem('weapon_formulas'))[selected_weapon][selected_frame].category
    let formula_numbers = JSON.parse(localStorage.getItem('weapon_formulas'))[selected_weapon].category[wfi].reload
    if (formula_numbers != null) {
        let reload_in_seconds = (formula_numbers.a * reload_stat * reload_stat + formula_numbers.b * reload_stat + formula_numbers.c) * 1

        document.getElementById('reload_formula').querySelector('.formula')
        .innerHTML = `(${formula_numbers.a} * ${reload_stat} * ${reload_stat} + ${formula_numbers.b} * ${reload_stat} + ${formula_numbers.c}) * Perk multiplayer = ${reload_in_seconds}`
    } else {
        document.getElementById('reload_formula').querySelector('.formula')
        .textContent = `Numbers for formula missing`
    }
}
setTimeout(do_canvas_things, 1000)

function do_canvas_things() {
    let canvas = document.querySelector('canvas')
    canvas.width = 320
    canvas.height = 150
    function draw_new(){
        let draw = canvas.getContext('2d')
        draw.strokeStyle = 'rgba(255, 0, 0)';
        draw.beginPath();
        draw.moveTo(0, 30);
        draw.lineTo(30, 30);
        draw.lineTo(280, 120);
        draw.lineTo(320, 120);
        draw.stroke();
    }

    let number = document.querySelector('#number')

    let line = canvas.getContext('2d')

    canvas.addEventListener('mousemove', e => {
        number.textContent = e.layerX
        number.style.left = `${e.pageX-30}px`
        number.style.top = `${e.pageY-20}px`

        line.clearRect(0, 0, canvas.width, canvas.height)
        draw_new()
        line.strokeStyle = 'rgba(0, 255, 0)';
        line.beginPath();
        line.moveTo(e.layerX, 0);
        line.lineTo(e.layerX, 150);
        line.stroke();

        // console.log(e);
    })
}







