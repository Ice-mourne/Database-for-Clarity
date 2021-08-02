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
    })
}
function do_other_stuff() {
    let selected_weapon = document.getElementById('weapons')
    fun()
    selected_weapon.addEventListener('input', () => {
        fun()
        reload_formula_stuff()
    })
    function fun() {
        let weapon_frames = JSON.parse(localStorage.getItem('weapon_formulas'))[selected_weapon.value]
        document.getElementById('frames').textContent = ''
        Object.entries(weapon_frames).forEach(frame_id => {
            document.getElementById('frames').innerHTML += `<option value="${frame_id[0]}">${frame_id[1].name}</option>`
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








function reload_formula_stuff() {
    let selected_weapon = document.getElementById('weapons').value
    let selected_frame  = document.getElementById('frames').value
    let reload_stat = document.getElementById('reload_speed_value').value
    let wfi = JSON.parse(localStorage.getItem('weapon_formulas'))[selected_weapon][selected_frame].category
    let formula_numbers = JSON.parse(localStorage.getItem('weapon_formulas'))[selected_weapon].category[wfi].reload
    if (formula_numbers != null) {
        let reload_in_seconds = (formula_numbers.a * reload_stat * reload_stat + formula_numbers.b * reload_stat + formula_numbers.c) * 1

        document.getElementById('reload_formula').querySelector('.formula')
        .innerHTML = `(${formula_numbers.a} * ${reload_stat} * ${reload_stat} + ${formula_numbers.b} * ${reload_stat} + ${formula_numbers.c}) * Perk multiplayer = ${reload_in_seconds}`
    } else {
        document.getElementById('reload_formula').querySelector('.formula')
        .textContent = 'Needs testing'
    }


}