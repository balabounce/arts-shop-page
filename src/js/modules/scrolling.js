const scrolling = (upSelector) => {
    const upElem = document.querySelector(upSelector);

    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 1650) {
            upElem.classList.add('animated', 'fadeIn');
            upElem.classList.remove('fadeOut');
        } else {
            upElem.classList.add('fadeOut');
            upElem.classList.remove('fadeIn');
        }
    });

    // Scrolling with raf

    let links = document.querySelectorAll('[href^="#"]'),
        speed = 0.3;

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            let heightTop = document.documentElement.scrollTop,   //сколько проскроленно на момент килка
                hash = this.hash, //хеш кликнутой ссылки
                toBlock = document.querySelector(hash).getBoundingClientRect().top, //верхняя граница нужного элемента
                start = null;
            requestAnimationFrame(step);

            function step(time) {
                if (start === null) {
                    start = time;
                }
                let progress = time - start,
                
                    r = (toBlock < 0 ? Math.max(heightTop - progress/speed, heightTop + toBlock) : Math.min(heightTop + progress/speed, heightTop + toBlock)); //
                                                                            //кол-во пикселей на которое нужно пролистать
                    document.documentElement.scrollTo(0, r); //скрол к вычисленным сверху пикселям
                // console.log(toBlock, r, heightTop + progress/speed, heightTop + toBlock);

                if (r != heightTop + toBlock) {
                    requestAnimationFrame(step);
                } else {
                    location.hash = hash;
                }
            }
        });
    });
};

export default scrolling;