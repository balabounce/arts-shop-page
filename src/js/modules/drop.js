import { postData } from "../services/requests";

const drop = () => {
    const fileInputs = document.querySelectorAll('[name="upload"]');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(event => {
        fileInputs.forEach(input => {
            input.addEventListener(event, preventDefaults, false);
        });
    });

    function  preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(item) {
        item.closest('.file_upload').style.border = '4px solid pink';
        item.closest('.file_upload').style.backgroundColor = 'rgba(0,0,0, .7';
    }

    function unhighlight(item) {
        item.closest('.file_upload').style.border = 'none';
        if (item.closest('.calc-form')) {
            item.closest('.file_upload').style.backgroundColor = '#fff';
        } else if(item.closest('.row')) {
            item.closest('.file_upload').style.backgroundColor = '#f7e7e6';
        } else {
            item.closest('.file_upload').style.backgroundColor = '#ededed';
        }
    }

    ['dragenter', 'dragover'].forEach(event => {
        fileInputs.forEach(input => {
            input.addEventListener(event, () => {
                highlight(input);
            }, false);
        });
    });

    ['dragleave', 'drop'].forEach(event => {
        fileInputs.forEach(input => {
            input.addEventListener(event, () => {
                unhighlight(input);
            }, false);
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;
            let dots;
            let formData = new FormData();
            formData.set('file', input.files);
            postData('assets/question.php', formData).then(res => {
                console.dir(res);
            });
            const arr = input.files[0].name.split('.');
            arr[0].length > 6 ? dots = "..." : dots = '.'; 
            const name = arr[0].substring(0, 6) + dots  +  arr[1];
            input.previousElementSibling.textContent = name;
        });
    });
};



export default drop;