import { postData } from "../services/requests";

const postDataFunction = (url, formData, statusMessage, statusImg, textMessage, mainform) => {
    postData(url, formData).then(res => {
        console.log(res);
        statusImg.setAttribute('src', message.ok);
        textMessage.textContent = message.success;
        mainform.innerHTML = statusMessage.innerHTML;
    }).catch(() => {
        statusImg.setAttribute('src', message.fail);
        textMessage.textContent = message.error;
        mainform.innerHTML = statusMessage.innerHTML;
    }).finally(() => {
        clearInputs(inputs);
        setTimeout(() => {
            // document.body.classList.remove('modal-open');
            // mainform.closest('.fadeInUp').classList.add('fadeOutUp');
        }, 5000);
    });
};



const inputs = document.querySelectorAll('input'),
    form = document.querySelectorAll('form'),
    content = '.main-form',
    phones = document.querySelectorAll('input[name="phone"]'),
    names = document.querySelectorAll('input[name="name"]'),
    comments = document.querySelectorAll('textarea[name="message"]'),
    specialComments = document.querySelectorAll('input[name="message"]'),
    uploads = document.querySelectorAll('[name="upload"]'),
    buttonSpec = document.querySelector('.button-special');

    let validateMessageElem = document.createElement('div');
    validateMessageElem.classList.add('status-message');
    if(!buttonSpec.nextElementSibling){
        buttonSpec.after(validateMessageElem);
    }


const message = {
    loading: 'Загрузка',
    error: 'Что-то пошло не так',
    success: 'Отлично. Данные получены.',
    spinner: 'assets/img/spinner.gif',
    ok: 'assets/img/ok.png',
    fail: 'assets/img/fail.png'
};

const path = {
    designer: 'assets/server.php',
    question: 'assets/question.php'
};

const validatePhone = (phone) => {
    let regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

    return regex.test(phone);
};

const validateName = (name) => {
    let regex = /^[?!,.а-яА-ЯёЁ0-9\s]+$/g;

    return regex.test(name);
};

const validateMessage = (input, type) => {
    let toValidate;
    if (type == 'phone') {
        toValidate = validatePhone;
        // console.log(toValidate(value));
    }
    if (type == 'name' || type == 'message') {
        toValidate = validateName;
    }
    if(input.parentNode.classList.contains('input-wrapper')) {
        return specialForm(type, toValidate(input.value, type));
    }
    if (!toValidate(input.value)) {
        if(type =='phone') {
            input.nextSibling.innerText = 'Номер введен неверно';
        }  if(type =='name') {
            input.nextSibling.innerText = 'Введите имя на кириллице';
        }  if(type =='message') {
            input.nextSibling.innerText = 'Комментарий д.б. на русском';
        } 
            
    } else {
        input.nextSibling.innerText = '';
    }
    input.nextSibling.style.color = 'red';
};

const clearInputs = (inputs) => {
    inputs.forEach(input => {
        input.value = '';
    });
};



const formStatusCreate = () => {
    let statusMessage = document.createElement('div');
    statusMessage.classList.add('status');

    return statusMessage;
};


const addValidateMessage = (input) => {
    let validateMessageElem = document.createElement('div');
    validateMessageElem.classList.add('status-message');
    if(input.name){
        validateMessageElem.classList.add(input.name);
    }
    if(input.parentNode.classList.contains('input-wrapper')){
            return '';
    }
    input.after(validateMessageElem);
};



const checkForError = () => {
    let error = false;
    let statuses = document.querySelectorAll('.status-message');
    statuses.forEach(status => {
        if(status.innerText != '' && status.innerText != 'error') {
            error = true;
        }
    });
    return error;
};

const destroyError = () => {
    let statuses = document.querySelectorAll('.status-message');
    statuses.forEach(status => {
            status.textContent = '';
    });
};

inputs.forEach(input  =>  {
     if(!input.parentNode.classList.contains('input-wrapper')) {
        addValidateMessage(input);
    }
});

comments.forEach(comment => {
     if(!comment.parentNode.classList.contains('input-wrapper')) {
        addValidateMessage(comment);
    }
});

uploads.forEach(upload => {
    upload.addEventListener('input', () => {
        console.log(upload.files[0]);
        let dots;
        const arr = upload.files[0].name.split('.');
        arr[0].length > 6 ? dots = "..." : dots = '.'; 
        const name = arr[0].substring(0, 6) + dots  +  arr[1];
        upload.previousElementSibling.textContent = name;
    });
});


const specialForm = (type, error) => {
    destroyError();
    if(!error) {
        buttonSpec.nextElementSibling.textContent = 'Ошибка. Только киррилица и российские номера';
        buttonSpec.nextElementSibling.style.marginTop = '10px';
        buttonSpec.nextElementSibling.style.color = 'red';
    }
};

const forms = () => {
    form.forEach(elem => {
        elem.addEventListener('submit', (event) => {
            event.preventDefault();
            if(checkForError() == false)
            {
                const mainform = elem.closest(content);
                const formData = new FormData(elem);
                let statusMessage = formStatusCreate();
                let api;
                if(elem.firstElementChild.classList.contains('input-wrapper')) {
                    console.log(formData.get('name'), validateName(formData.get('name')));
                    if(!validateName(formData.get('name')) || !validateName(formData.get('phone')) || !validateName(formData.get('message'))) {
                        specialForm('', false);
                        return;
                    }
                    // validateMessage(formData.get('name'), 'name');
                    // specialForm('phone', validateMessage(formData.get('phone'), 'phone'));
                }
                if (elem.classList.contains('calc-form')) {
                    if(+document.querySelector('.calc-price').textContent.replace(/\D/g, '')) {
                        let res = +document.querySelector('.calc-price').textContent.replace(/\D/g, '');
                        formData.set('result', res);
                    }
                }
                elem.closest('.popup-design') || elem.classList.contains('calc-form') ? api = path.designer : api = path.question;
                let statusImg = document.createElement('img');
                statusImg.setAttribute('src',  message.spinner);
                statusMessage.appendChild(statusImg);

                let textMessage = document.createElement('div');
                textMessage.textContent = message.loading;
                statusMessage.appendChild(textMessage);
                mainform.classList.add('animated', 'fadeOutUp', 'status');
                setTimeout(() =>{
                    mainform.classList.remove('animated', 'fadeOutUp');
                    postDataFunction(api, formData, statusMessage, statusImg, textMessage, mainform);
                }, 400);
            }
        });
        phones.forEach(input => input.addEventListener('input', () => {
            validateMessage(input, 'phone');
        }));
        names.forEach(input => input.addEventListener('input', () => {
            validateMessage(input, 'name');
        }));
        comments.forEach(input => input.addEventListener('input', () => {
            validateMessage(input, 'message');
        }));
        specialComments.forEach(input => input.addEventListener('input', () => {
            validateMessage(input, 'message');
        }));
    }); 
};

// export {postDataFunction};

export default forms;