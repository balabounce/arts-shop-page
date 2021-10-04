
export const closeModal = (modalSelector) => {
    const modal = document.querySelector(modalSelector);
    modal.style.display = 'none';
    // modal.classList.remove('active')
    modal.classList.remove('animated', 'fadeInUp');
    modal.classList.add('animated', 'fadeOutUp');
    document.body.classList.remove('modal-open');
};

export const openModal = (modalSelector, clickOn) => {
    const modal = document.querySelector(modalSelector);
    clearTimeout(modalTimerId); 
    modal.style.display = 'block';

    modal.classList.remove('animated', 'fadeOutUp');

    modal.classList.add('animated', 'fadeInUp');
    // modal.classList.remove('hide');
    document.body.classList.add('modal-open');
};

const modalTimerId = setTimeout(() => openModal('.popup-consultation'), 60000);

function scrollGift() {
    let scroll = calcScroll();

    let pageHeight = document.documentElement.scrollHeight;
    let scrollHeight = window.pageYOffset + document.documentElement.clientHeight;
    let openedModals = document.querySelectorAll('.clicked').length;
    if ( (scrollHeight+100  >= pageHeight) && (openedModals == 0) ) {
        giftOpen('.fixed-gift');
        document.body.style.marginRight = `${scroll}px`;
        window.removeEventListener('scroll', scrollGift);
    }
}

window.addEventListener('scroll', scrollGift);
    
const giftOpen = (selector) => {
    let gift = document.querySelector(selector);
    setTimeout(() => {
        gift.classList.add('animated', 'fadeOutUp');
        setTimeout(() => {
            gift.style.display = 'none';
        }, 500);
    }, 300);
    openModal('.popup-gift');

};


const calcScroll = () => {
    let div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflow = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    return scrollWidth;
};

export const modals = (triggerSelector, exitSelector, modalSelector, clickOn) => {

    let trigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector),
        scroll = calcScroll();

    if(clickOn != true) {
        trigger.forEach(elem => elem.addEventListener('click', function listener (event)  {
            elem.classList.add('clicked');
            if(triggerSelector == '.fixed-gift') {
                giftOpen(triggerSelector);
            }
            event.preventDefault();
            openModal(modalSelector, clickOn);
            document.body.style.marginRight = `${scroll}px`;
        }));
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains(exitSelector.replace(/\./g,''))) {
            closeModal(modalSelector);
            document.body.style.marginRight = `0px`;
        }
    });

};
export default modals;