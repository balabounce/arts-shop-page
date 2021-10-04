import { getResource  } from "../services/requests";

const addStyles = (triggerSelector, wrapper) => {
    const trigger = document.querySelector(triggerSelector);
        // needClasses = document.querySelectorAll(oldClassesSelectors.replace(/\s/g, '')),
        // oldClasses = oldClassesSelectors.split(' '),
        // newClasses = newClassesSelectors.split(' ');
    
    // trigger.addEventListener('click', () => {
    //     trigger.remove();
    //     needClasses.forEach((elem) => {
    //         newClasses.forEach((e, i) => {
    //             elem.classList.add(e.replace(/./,''));
    //             elem.classList.add('animated', 'fadeInUp');
    //         });
    //         oldClasses.forEach((e, i) => {
    //             elem.classList.remove(e.replace(/./,''));
    //         });
    //     });
    // });

    trigger.addEventListener('click', () => {
        getResource('http://localhost:3000/styles')
            .then(res => createCards(res))
            .catch(error => console.log(error));

        trigger.remove();
    });

    function createCards(res) {
        res.forEach(({src, title, link}) => {
            let card = document.createElement('div');

            card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');

            card.innerHTML = `
                <div class='styles-block'>
                    <img src=${src} alt>
                        <h4>${title}</h4>
                        <a href="${link}">Подробнее</a>
                    </div>
                </div>
            `;

            document.querySelector(wrapper).appendChild(card);
        });
    }

    // <div class="hidden-lg hidden-md hidden-sm hidden-xs styles-2">
	// 				<div class=styles-block>
	// 					<img src=assets/img/styles-5.jpg alt>
	// 					<h4>Пастелью</h4>
	// 					<a href="#">Подробнее</a>
	// 				</div>
	// 			</div>
};

export default addStyles;