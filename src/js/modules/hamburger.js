const hamburger = (burgerSelector, burgerMenuSelector) => {
    const burger = document.querySelector(burgerSelector),
        burgerMenu = document.querySelector(burgerMenuSelector),
        clientWidth = document.documentElement.clientWidth;
    
    function clickon() {
        // burgerMenu.style.display = 'block';
        // console.log(burgerMenu);
        if (burgerMenu.style.display == 'none' || !burgerMenu.style.display) {
            burgerMenu.style.display = 'block';
            return;
        }
        if (burgerMenu.style.display == 'block') {
            burgerMenu.style.display = 'none';
            return;
        }
    }

    if (clientWidth < 992) {
        burger.addEventListener('click', clickon);
        window.addEventListener(`resize`, () => {
            if (document.documentElement.clientWidth >= 992) {
                burger.removeEventListener('click', clickon);
                burgerMenu.style.display = 'none';
            }
            else {
                burger.addEventListener('click', clickon);
            }
        });
    }
};

export default hamburger;