document.addEventListener('DOMContentLoaded', () => {

  // Design form (additional)

  const form = document.querySelector('.form'),
        headersInput = form.querySelectorAll('span'),
        inputs = form.querySelectorAll('input');
        

  function changeElemSizeOnLow(evt) {
    evt.preventDefault();

    inputs.forEach((input, i) => {
      if (input === evt.target || headersInput[i] === evt.target) {
        headersInput[i].style.top = '0px';
        headersInput[i].style.fontSize = '12px';
        input.focus();
      }
    });
  }

  function changeElemSizeOnHigh(evt) {
    evt.preventDefault();

    inputs.forEach((input, i) => {
      if (input !== evt.target && headersInput[i] !== evt.target && input.value === '') {
        headersInput[i].style.top = '20px';
        headersInput[i].style.fontSize = '16px';
      }
    });


  }

  form.addEventListener('click', changeElemSizeOnLow);
  form.addEventListener('touch', changeElemSizeOnLow);

  window.addEventListener('click', changeElemSizeOnHigh);
  window.addEventListener('touch', changeElemSizeOnHigh);



  // Custom Validity

  let messageValidityName = document.createElement('div'),
      messageValidityTel = document.createElement('div'),
      messageValidityEmail = document.createElement('div');
  let errorInputName,
      errorInputTel;
    
  messageValidityName.classList.add('message-validity');
  messageValidityTel.classList.add('message-validity');
  messageValidityEmail.classList.add('message-validity');

  function changeStyleInput(input) {
    input.style.outline = '1px solid red';
    input.style.outlineOffset = '5px';
    input.style.borderBottom = 'none';
  }

  function defaultStyleInput(input) {
    input.style.outline = 'none';
    input.style.outlineOffset = '';
    input.style.borderBottom = '2px solid var(--white)';
  }

  function validate(input) {
    if (input['name'] === 'name') {

      if (stateInputName === 'submit') {
        if (input.value === '') {
          changeStyleInput(input);
          messageValidityName.textContent = 'Пожалуйста укажите имя';
          input.after(messageValidityName);
          errorInputName = true;
        } else if (!validateName(input.value)) {
          changeStyleInput(input);
          messageValidityName.textContent = 'Имя может состоять только из букв';
          input.after(messageValidityName);
          errorInputName = true;
        }
      } else if (stateInputName === 'not submit') {
          if (input.value === '' || validateName(input.value)) {
            defaultStyleInput(input);
            if (document.querySelector('.label-name .message-validity')) {
              document.querySelector('.label-name .message-validity').remove();
            }
            errorInputName = false;
          } else {
            changeStyleInput(input);
            messageValidityName.textContent = 'Имя может состоять только из букв';
            input.after(messageValidityName);
            errorInputName = true;
          }
      }

    } else if (input['name'] === 'tel') {

      let count = 0;
      let checkCountNumberInputTel = 0;
  
      for (let str of input.value) {
        if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].indexOf(+str) !== -1) {
          count++;
        }
      }
      checkCountNumberInputTel = count;
      
      if (checkCountNumberInputTel < 11 ) {
        changeStyleInput(input);
        messageValidityTel.textContent = 'Пожалуйста укажите номер телефона';
        input.after(messageValidityTel);
        errorInputTel = true;
      } else {
        defaultStyleInput(input);
        if (document.querySelector('.label-tel .message-validity')) {
          document.querySelector('.label-tel .message-validity').remove();
        }
        errorInputTel = false;
      }

    } else if (input['name'] === 'email') {

      if (input.value === '' || validateEmail(input.value)) {
        defaultStyleInput(input);
        if (document.querySelector('.label-email .message-validity')) {
          document.querySelector('.label-email .message-validity').remove();
        }
      } else if (!validateEmail(input.value)) {
        changeStyleInput(input);
        messageValidityEmail.textContent = 'Укажите корректный e-mail';
        input.after(messageValidityEmail);
        }

    }
  }


    // Input name

  const inputName = form.querySelector('.input-name');
  
  function validateName(name) {
    let re = /^([a-zа-яё]+)$/i;
    return re.test(name);
  }

  inputName.addEventListener('input', () => {
    validate(inputName);
  });


    // Input tel and custom placeholder (mask for Input tel)

  const inputTel = form.querySelector('.input-tel');

  function setCursorPosition(pos, e) {
    if (e.setSelectionRange) e.setSelectionRange(pos, pos);
    else if (e.createTextRange) {
      var range = e.createTextRange();
      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select();
    }
  }

  function mask(e) {
    var matrix = this.placeholder,// .defaultValue
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
    def.length >= val.length && (val = def);
    matrix = matrix.replace(/[_\d]/g, function(a) {
      return val.charAt(i++) || "_";
    });
    this.value = matrix;
    i = matrix.lastIndexOf(val.substr(-1));
    i < matrix.length && matrix != this.placeholder ? i++ : i = matrix.indexOf("_");
    setCursorPosition(i, this);
  }

  window.addEventListener("DOMContentLoaded", function() {
    inputTel.addEventListener("input", mask, false);
    setCursorPosition(3, inputTel);
  });

  inputTel.addEventListener('focus', () => {
    inputTel['placeholder'] = '+7(___)___-__-__';
  });
  
  inputTel.addEventListener('blur', () => {
    if (inputTel.value === '' || inputTel['placeholder'] == inputTel.value) {
      inputTel['placeholder'] = '';
      inputTel.value = '';
    }
  });


    // Input email

  const inputEmail = form.querySelector('.input-email');

  function validateEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

    // Sent form

  const buttonForm = form.querySelector('.button');
  let messageValiditySubmit = document.createElement('div');
  let stateInputName = 'not submit';
  
  messageValiditySubmit.classList.add('message-validity-submit');
  messageValiditySubmit.textContent = 'Заполните обязательные поля (имя и телефон)';


  buttonForm.addEventListener('click', (evt) => {
    evt.preventDefault();
    
     // validation name
    stateInputName = 'submit';
    validate(inputName);
    stateInputName = 'not submit';

    // validation tel
    validate(inputTel);

    // validation email
    validate(inputEmail);
    
    // validation form
    if (form.checkValidity() && !errorInputName && !errorInputTel) {
      console.log('All rights');
      if (document.querySelector('.message-validity-submit')) {
        document.querySelector('.message-validity-submit').remove();
      }

      // реализовать отправку данных на сервер
    } else {
      buttonForm.before(messageValiditySubmit);
    }
  });



    // Scroll 



});