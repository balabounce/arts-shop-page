const accordion = (triggersSelector, itemsSelector) => {
    const buttons = document.querySelectorAll(triggersSelector);


    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            if(this.nextElementSibling.classList.contains('active-content')) {
                this.classList.remove('active-style');
                this.nextElementSibling.classList.remove('active-content');
                this.nextElementSibling.style.maxHeight = 0 + 'px';
                // this.nextElementSibling.style.overflow = 'hidden';

                return;
            }
            buttons.forEach(btn => {
                btn.classList.remove('active-style');
                btn.nextElementSibling.classList.remove('active-content');
                btn.nextElementSibling.style.maxHeight = 0 + 'px';
            });
            this.classList.add('active-style');
            this.nextElementSibling.classList.add('active-content');
            // this.nextElementSibling.style.overflow = 'visible';

            if (this.classList.contains('active-style')) {
                this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + "px";
            } else  {
                // this.classList.remove('active-style');
                this.nextElementSibling.style.maxHeight = 0 + 'px';
            }
        });
    });

    //     blocks.forEach(block => {
    //         block.classList.add('animated', 'fadeInUp');
    //     });

    // buttons.forEach(button => {
    //     button.addEventListener('click', () => {
    //         if (!button.classList.contains('active')) {
    //             buttons.forEach(button => {
    //                 button.classList.remove('active', 'active-style');
    //             });
    //             button.classList.add('active', 'active-style');
    //         }
    //         else {
    //         }
    //     });
    // });

    // questBtn.forEach(question => {
    //     question.addEventListener('click', () => {
    //         question.classList.add('ui-accordion-header-active');
    //         setTimeout(() => {
    //             question.nextElementSibling.style.display = 'block';

    //             setTimeout(() => {
    //                 question.nextElementSibling.classList.add('animated', 'fadeInDown');
    //             }, 600);
    //         }, 150);
    //         question.nextElementSibling.classList.remove('animated', 'fadeOutUp');
    //         question.nextElementSibling.classList.add('animated', 'fadeInDown');

    //     });
    // });

};

export default accordion;