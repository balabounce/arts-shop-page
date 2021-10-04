import addStyles from "./modules/addStyles";
import accordion from "./modules/accordion";
import calc from "./modules/calc";
import forms from "./modules/forms";
import hamburger from "./modules/hamburger";
import modals from "./modules/modals";
import sizesImg from "./modules/sizesImg";
import sliders from "./modules/sliders";
import tabs from "./modules/tabs";
import scrolling from "./modules/scrolling";
import drop from "./modules/drop";

window.addEventListener('DOMContentLoaded', ()  => {
    document.querySelector('.fixed-gift').style.left = `${+document.documentElement.clientWidth/12}rem`;
    
    hamburger('.burger', '.burger-menu');
    modals('.button-design','.popup-close', '.popup-design');
    modals('.button-consultation', '.popup-close', '.popup-consultation' );
    modals('.fixed-gift', '.popup-close', '.popup-gift' );
    addStyles('.button-styles', '#styles .row');
    forms();
    calc();
    tabs('.portfolio-menu', '.portfolio-block', '.active', '.portfolio-wrapper', '.portfolio-no');
    sizesImg();
    accordion('.accordion-heading', '.accordion-block');
    sliders('.main-slider-item', 'vertical');
    sliders(".feedback-slider-item", 'horizontal', '.main-prev-btn', '.main-next-btn', '.main-slider-btn');
    scrolling('.pageup');
    drop();
    // alert( 'Текущая прокрутка сверху: ' + `${document.documentElement.scrollHeight - document.documentElement.scrollTop}` + `\n Длина всей страницы ${+document.documentElement.clientHeight}` );
});