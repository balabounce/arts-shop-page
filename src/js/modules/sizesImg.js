const sizesImg = () => {
    const sizes_blocks = document.querySelectorAll('.sizes-block'),
        sizes_text = document.querySelectorAll('.sizes-text');

    sizes_blocks.forEach(block => {
        let index = 0;
        let sizeImg;
        block.addEventListener('mousemove', (e) => {
            if((+(e.target.classList.value.replace(/\D/g, ''))) > 0 ) {
                index = +(e.target.classList.value.replace(/\D/g, ''));
                sizeImg = document.querySelector(`.size-${index}`);
                sizeImg.style.display = 'none';
                sizes_text.forEach((size_text, i) => {
                        if (size_text.classList.contains(`sizes-text-${index}`)) {
                            size_text.children.forEach(child => {
                                child.style.color = 'transparent';
                            });
                        }
                });
                sizeImg.style.display = 'block';

                setTimeout(() => {
                    sizeImg.src = `assets/img/sizes-${index}-1.png`;
                }, 50);
                
            }
        });
        block.addEventListener('mouseleave', (e) => {
            if(index != 0){
                sizes_text.forEach((size_text, i) => {
                    if (size_text.classList.contains(`sizes-text-${index}`)) {
                        size_text.children.forEach(child => {
                            if(child.classList.contains('size')) {
                                child.style.color = '#86b7d2';
                            } else{
                                child.style.color = 'black';
                            }
                        });
                    }
                });
                setTimeout(() => {
                    sizeImg.src = `assets/img/sizes-${index}.png`;
                }, 50);
            }        
        });
    });
};

export default sizesImg;