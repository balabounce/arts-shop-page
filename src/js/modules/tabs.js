const tabs = (headerSelector, tabSelector, activeClass, contentClass, exceptionSelector) => {
    const header = document.querySelector(headerSelector),
          tab = document.querySelectorAll(tabSelector),
          content = document.querySelector(contentClass),
          exception = document.querySelector(exceptionSelector);


    header.addEventListener('click', (e) => {
        header.children.forEach(elem => {
            elem.classList.remove(activeClass.replace(/\./g, ''));
        });
        removeTab();
        if(!e.target.classList.contains('grandmother') && !e.target.classList.contains('granddad')) {
            exception.style.display = 'none';
            showTab(e.target.classList.value);
        } else {
            exception.style.display = 'block';
            exception.style.marginTop = 10 + 'px';
            exception.classList.add('animated', 'fadeIn');
        }
        e.target.classList.add(activeClass.replace(/\./g, ''));
    });


    const showTab = (classname) => {
        content.children.forEach((elem) => {
                if(elem.classList.contains(classname)) {
                    setTimeout(() => {
                        elem.classList.add('animated', 'fadeIn');
                    }, 1);
                    elem.style.display = 'block';
                    elem.classList.remove('fadeIn');
                    
                }
                    
        });
    };

    const removeTab = () => {
        // content.style.display = 'none';
        content.children.forEach(elem => {
            elem.style.display = 'none';
            elem.classList.remove('animated', 'fadeIn');
        });
    };
};

export default tabs;