import keyBy from 'lodash/keyBy.js';
import has from 'lodash/has.js';
import isEmpty from 'lodash/isEmpty.js';
import * as yup from 'yup';
import onChange from 'on-change';

const schema = yup.object().shape({
  name: yup.string().trim().required('Введите ваше имя'),
  email: yup.string().required('Введите ваш Email').email('Некорректный Email'),
});

const validate = (fields) => {
  try {
    schema.validateSync(fields, { abortEarly: false });
    return {};
  } catch (e) {
    return keyBy(e.inner, 'path');
  }
};

const handleProcessState = (elements, processState) => {
  switch (processState) {
    case 'sent':
      elements.container.innerHTML = 'User Created!';
      break;

    case 'error':
      elements.submitButton.disabled = false;
      break;

    case 'sending':
      elements.submitButton.disabled = true;
      break;

    case 'filling':
      elements.submitButton.disabled = false;
      break;

    default:
      // https://ru.hexlet.io/blog/posts/sovershennyy-kod-defolty-v-svitchah
      throw new Error(`Unknown process state: ${processState}`);
  }
};

const renderError = (fieldElement, error) => {
  // Простой способ: очищать контейнер полностью перерисовывая его
  // Более сложный способ, с оптимизацией: если элемент существует, то заменять контент
  // Если элемент не существует, то создаём новый. Всё это является частью отрисовки
  fieldElement.classList.add('is-invalid');
  const feedbackElement = fieldElement.nextElementSibling;
  feedbackElement.textContent = error.message;
};

const renderErrors = (elements, errors, prevErrors, state) => {
  Object.entries(elements.fields).forEach(([fieldName, fieldElement]) => {
    const error = errors[fieldName];
    // правильный путь - проверять модель, а не DOM. Модель - единый источник правды.
    const fieldHadError = has(prevErrors, fieldName);
    const fieldHasError = has(errors, fieldName);
    console.log(fieldHadError, fieldHasError) 
    if (!fieldHadError && !fieldHasError) {
      return;
    }

    if (fieldHadError && !fieldHasError) {
      fieldElement.classList.remove('is-invalid');
      fieldElement.nextElementSibling.textContent = '';
      return;
    }

    if (fieldHasError) {
      renderError(fieldElement, error);
    }
  });
};

const render = (elements, initialState) => (path, value, prevValue) => {
  switch (path) {
    case 'form.processState':
      handleProcessState(elements, value);
      break;

    case 'form.processError':
      handleProcessError();
      break;

    case 'form.valid':
      elements.submitButton.disabled = !value;
      break;

    case 'form.errors':
      renderErrors(elements, value, prevValue, initialState);
      break;

    default:
      break;
  }
};

const app = () => {
  const elements = {
    inputs: document.querySelectorAll('input'),
    submitButton: document.querySelector('#submit-button'),
    select: document.querySelector('#cities'),
    fields: {
      name: document.getElementById('name'),
      phone: document.getElementById('phone'),
      email: document.getElementById('email'),
      delivering: document.getElementById('delivering'),
    }
  };
  const initialState = {
    form: {
      valid: true,
      processState: 'filling',
      processError: null,
      errors: {},
      fields: {
        name: '',
        email: '',
        phone: '',
        delivering: 'Красноярск',
      },
      fieldsUi: {
        touched: {
          name: false,
          email: false,
          password: false,
          passwordConfirmation: false,
        },
      },
    },
  };

  const state = onChange(initialState, render(elements, initialState));
  Object.entries(elements.fields).forEach(([fieldName, fieldElement]) => {
    fieldElement.addEventListener('input', (e) => {
      const { value } = e.target;
      state.form.fields[fieldName] = value;
      state.form.fieldsUi.touched[fieldName] = true;
      const errors = validate(state.form.fields);
      state.form.errors = errors;
      state.form.valid = isEmpty(errors);
    });
  });

  elements.submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    const errors = validate(state.form.fields);
    state.form.errors = errors;
    state.form.valid = isEmpty(errors);
    // state.form.processState = 'sending';
    // state.form.processError = null;
  });

  const element1 = document.querySelector('.conveer1');
  const element2 = document.querySelector('.conveer2');
  element1.animate(
    [
      { transform: 'translate(0)' },
      { transform: 'translate(33%)' },
      { transform: 'translate(33.1%)' },
      { transform: 'translate(66%)' },
      { transform: 'translate(66.1%)' },
      { transform: 'translate(99.9%)' },
      { transform: 'translate(100%)' },
    ],
    {
      duration: 3000,
      iterations: Infinity,
    },
  );
  element2.animate(
    [
      { transform: 'translate(0)' },
      { transform: 'translate(33%)' },
      { transform: 'translate(33.1%)' },
      { transform: 'translate(66%)' },
      { transform: 'translate(66.1%)' },
      { transform: 'translate(99.9%)' },
      { transform: 'translate(100%)' },
    ],
    {
      duration: 3000,
      iterations: Infinity,
    },
  );
};

export default app;
