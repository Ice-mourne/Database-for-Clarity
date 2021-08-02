// don't copy this crapy code i was way to lazy to make anything even close to decent
window.onload = do_stuff
function do_stuff() {
    let formula_link = document.getElementById('input_url').value
    fetch(`${formula_link}?${Math.random()}`)
    .then(resp => resp.json())
    .then(resp => localStorage.setItem('weapon_formulas', JSON.stringify(resp)))
    .then(do_other_stuff)
}
function do_other_stuff() {
    let selected_weapon = document.getElementById('weapons')
    selected_weapon.addEventListener('input', () => {
        let weapon_frames = JSON.parse(localStorage.getItem('weapon_formulas'))[selected_weapon.value]
        document.getElementById('frames').textContent = ''
        Object.entries(weapon_frames).forEach(frame_id => {
            document.getElementById('frames').innerHTML += `<option value="${frame_id[0]}">${frame_id[1].name}</option>`
        })
        reload_formula_stuff()
    })
}
function reload_formula_stuff() {
    let selected_weapon = document.getElementById('weapons').value
    let selected_frame  = document.getElementById('frames').value
    let reload_stat = document.getElementById('reload_speed_value').value
    let wfi = JSON.parse(localStorage.getItem('weapon_formulas'))[selected_weapon][selected_frame].category
    let formula_numbers = JSON.parse(localStorage.getItem('weapon_formulas')).category[wfi].range

    document.getElementById('reload_formula').querySelector('.formula')
    .innerHTML = `(${formula_numbers.a} * ${reload_stat} * ${reload_stat} + ${formula_numbers.b} * ${reload_stat} + ${formula_numbers.c}) * multiplayer = Reload in seconds`
}