import keyBy from 'lodash/keyBy.js';
import isEmpty from 'lodash/isEmpty.js';
import * as yup from 'yup';
import onChange from 'on-change';
import render from './view';

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
    },
    conveerFields: {
      conveer1: document.querySelector('.conveer1'),
      conveer2: document.querySelector('.conveer2'),
    },
  };
  const initialState = {
    form: {
      valid: true,
      fillingProcess: true,
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
    state.form.fillingProcess = false;
    const errors = validate(state.form.fields);
    state.form.errors = errors;
    state.form.valid = isEmpty(errors);
  });

  Object.entries(elements.conveerFields).forEach(([, fieldElement]) => {
    fieldElement.animate(
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
  })
};

export default app;
