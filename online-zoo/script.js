window.addEventListener('load', function (e) {
    let menuInput = document.getElementById("nav-enabler"),
        main = document.body.getElementsByTagName('main')[0];
    let disableScroll = () => {
        document.body.style.overflowY = 'hidden';
    };
    let enableScroll = () => {
        document.body.style.overflowY = '';
    };

    menuInput.addEventListener('change', function (e) {
        e.target.checked
            ? (disableScroll(), main.style.filter = 'brightness(0.5)')
            : (enableScroll(), main.style.filter = '');
    })

    main.addEventListener('click', function (e) {
        if (document.body.style.overflowY == 'hidden') {
            document.body.style.overflowY = '';
            main.style.filter = ''
            menuInput.checked = false;
            enableScroll();
        } 
    })

    let popupContainer = this.document.createElement('div');
    popupContainer.classList.add('popupContainer');

    this.document.body.appendChild(popupContainer);

    let isPopupEnabled = false;
    let enablePopUp = () => {
        popupContainer.classList.add('active');
        isPopupEnabled = true;
        // disableScroll();

    },
    disablePopUp = () => {
        popupContainer.classList.remove('active');
        // enableScroll();
        isPopupEnabled = false;
    };

    popupContainer.addEventListener('click', function(e){
        if(e.target === popupContainer){
            disablePopUp();
        } 
    });

 

    //////
    
    document.addEventListener('wheel', function(e) {
        if(isPopupEnabled){
            e.preventDefault();
        }
        // doStuff(e);
    }, { passive: false });
    
    //////

    let assignPopupContent = (contentNode) => {
        popupContainer.innerHTML = '';
        popupContainer.appendChild(contentNode);
    }
    
    let testimonials = document.querySelector('div.user-cards-container');
    if(testimonials){
        Array.from(testimonials.childNodes).filter((el) => el.classList)
        .map((el)=>{
            el.addEventListener('click', (e) => {
                assignPopupContent(el.cloneNode(true));
                enablePopUp();
            })
        })
    }    
})