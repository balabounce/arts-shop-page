const calc = () => {
    const sizeDoc = document.querySelector('#size'),
        materialDoc = document.querySelector('#material'),
        optionsDoc = document.querySelector('#options'),
        calcForm = document.querySelector('.calc-price'),
        promocode = document.querySelector('.promocode');
    let size, material, options, result;
    let promocodeStr = '';
    let statusMessage;

    const resultCreate = () => {
        console.log(size, material, options);
        if(size && material) {
            if(calcForm.children.length > 0) {
                statusMessage.textContent = '';
            }
            let result = size + material;
            if(options) {
                result += options;
            }
            if(promocodeStr == 'IWANTPOPART') {
                result *= 0.7;
            }
            calcForm.textContent = `${result} руб`;
        }
        if(!size || !material) {
            if(calcForm.children.length == 0){
                statusMessage = document.createElement('div');
                statusMessage.classList.add('status-message');
                statusMessage.textContent = 'error';
                statusMessage.style.display = 'none';
                if(calcForm.textContent != 'Для расчета нужно выбрать размер картины и материал картины') {
                    calcForm.textContent = 'Для расчета нужно выбрать размер картины и материал картины';
                }
                calcForm.append(statusMessage);
            } 
        }
    };

    resultCreate();

    const priceList = (elem, option) => {
        let price;
        elem.children.forEach((e, index) => {
            if(option == e.textContent) {
                price = 1000 * index;
                if(index == 0) {
                    return false;
                }
            }
        });
        return price;
    };
    
    sizeDoc.addEventListener('change', (event) => {
        size = event.target.value;
        size = priceList(sizeDoc, size);
        resultCreate();
    });

    materialDoc.addEventListener('change', (event) => {
        material = event.target.value;
        material = priceList(materialDoc, material);        
        resultCreate();
    });

    optionsDoc.addEventListener('change', (event) => {
        options = event.target.value;
        options = priceList(optionsDoc, options);
        resultCreate();
    });

    promocode.addEventListener('input', (e) => {
        promocode.textContent = e.target.value;
        if(promocode.textContent == 'IWANTPOPART') {
            promocodeStr = 'IWANTPOPART';
            resultCreate();
        }
        else {
            promocodeStr = '';
        }
        resultCreate();
    });

};

export default calc;