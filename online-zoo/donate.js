window.addEventListener("load", function () {

    let anotherAmount = document.getElementById('another-amount');
    let rangeGroup = document.getElementById('range-group');
    let ranges = Array.from(rangeGroup.childNodes).filter((el) => el.value)
    let active = 4;

    ranges.map((el) => {
        el.addEventListener('click', (e) => {
            anotherAmount.value = e.target.value.slice(1)
            ranges[active].classList.remove('active')
            active = ranges.indexOf(e.target)
            ranges[active].classList.add('active')
        })
    });
    let values = ranges.map(r => r.value)
    anotherAmount.addEventListener('input', function(e){
        if (this.value.length > 4) {
            this.value = this.value.slice(0,4); 
        }
        let search = '$' + e.target.value;
        let idPresent = values.indexOf(search);
        if(~idPresent){
            ranges[idPresent].click();
        } else{
            ranges[active].classList.remove('active')
            ranges[active].checked = false;
        } 
    }) 
    ranges[active].click();  

})

