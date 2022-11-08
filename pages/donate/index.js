// смена цвета кнопки submit с неактивного на valid/invalid при фокусе на форме
  const form = document.querySelector('.subscribe-container');
  form.addEventListener('focusin', () => {
    form.classList.add('subscribe-form')
  });

// Подстветка и изменение сумм в разделе Amount
  const labelList = [...document.querySelectorAll('.digits')];
  const radioList = [...document.getElementsByName('donate-amount')];
  const amountInput = document.querySelector('.another-amount');
  const inputError = document.querySelector('.input-error');

  document.querySelector('.amount-choice').addEventListener('change', (e) => {
    changeDigitColor(e);
    radioList.forEach(el => {
      el.classList.remove('radio-checked');
    });
    e.target.classList.add('radio-checked');
    amountInput.value = e.target.value;
  });

  amountInput.addEventListener('input', e => {
    radioList.forEach(el => {
      el.removeAttribute('checked');
      el.classList.remove('radio-checked');
      if (e.target.value === el.value) {
        el.setAttribute('checked', 'true');
        el.classList.add('radio-checked');
        labelList[radioList.indexOf(el)].classList.add('checked');
      } else {
        labelList[radioList.indexOf(el)].classList.remove('checked');
      }
    });

    if (amountInput.value.length > 4) {
      amountInput.classList.add('invalid');
      amountInput.setCustomValidity("maximum amount 4 symbols!")
      inputError.innerText = "maximum amount 4 symbols!";
    } else {
      amountInput.classList.remove('invalid');
      amountInput.setCustomValidity('');
      inputError.innerText = '';
    }
  });

  function changeDigitColor(e) {
    labelList.forEach(el => {
      el.classList.remove('checked');
      if(el.getAttribute('for') === e.target.id) {
        el.classList.add('checked');
      };
    });
  }

// Открытие/закрытие поп-ап-меню
  const openBurMenu = document.querySelector('.header-nav-container');

  document.addEventListener('click', e => {
    if(!e.target.closest('.header-nav-container') && openBurMenu.classList.contains('menu-open')
      || e.target.classList.contains('burger-menu-close')
      || e.target.closest('a') && openBurMenu.classList.contains('menu-open')) {
      openBurMenu.classList.remove('menu-open')
    };
      if(e.target.closest('.burger-menu-btn')) {
      openBurMenu.classList.add('menu-open')
    };
  })