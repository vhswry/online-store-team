window.addEventListener("load", function(){

    let anotherAmount = document.getElementById('another-amount');
    let rangeGroup = document.getElementById('range-group');
    let ranges = Array.from(rangeGroup.childNodes).filter((el) => el.value)
    let active = 4;
    ranges[active].classList.add('active')
    ranges.map((el)=>{
            el.addEventListener('click', (e) => {
                ranges[active].classList.remove('active')
                anotherAmount.value = e.target.value.slice(1)
                active = ranges.indexOf(e.target)
            })
        });
})

