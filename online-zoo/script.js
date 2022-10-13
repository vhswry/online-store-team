window.addEventListener('load', function(e){
    let menuInput = document.getElementById("nav-enabler"),
        main = document.body.getElementsByTagName('main')[0];
        let disableScroll = () => {
            document.body.style.overflowY = 'hidden';
            main.style.filter = 'brightness(0.5)';
            menuInput.checked = true;
        };
        let enableScroll = () => {
            document.body.style.overflowY = '';
            main.style.filter = '';
            menuInput.checked = false;
        };

    menuInput.addEventListener('change', function(e){
        e.target.checked 
        ? disableScroll() 
        : enableScroll();
    })
    main.addEventListener('click',function(e){
        if(document.body.style.overflowY == 'hidden'){
            enableScroll();
        }
    })

})