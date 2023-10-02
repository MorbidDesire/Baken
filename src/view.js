import has from 'lodash/has.js';

const renderError = (fieldElement, error) => {
    fieldElement.classList.add('is-invalid');
    const feedbackElement = fieldElement.nextElementSibling;
    feedbackElement.textContent = error.message;
  };
  
  const renderErrors = (elements, errors, prevErrors, state) => {
    Object.entries(elements.fields).forEach(([fieldName, fieldElement]) => {
      const error = errors[fieldName];
      const fieldHadError = has(prevErrors, fieldName);
      const fieldHasError = has(errors, fieldName);
      if (!fieldHadError && !fieldHasError) {
        return;
      }
  
      if (fieldHadError && !fieldHasError) {
        fieldElement.classList.remove('is-invalid');
        fieldElement.nextElementSibling.textContent = '';
        return;
      }
    
      if ((state.form.fieldsUi.touched[fieldName] && fieldHasError) || (!state.form.fillingProcess && fieldHasError)) {
        renderError(fieldElement, error);
      }
    });
  };
  
  const render = (elements, initialState) => (path, value, prevValue) => {
    switch (path) {
      case 'form.processError':
        handleProcessError();
        break;
      case 'form.errors':
        renderErrors(elements, value, prevValue, initialState);
        break;
      default:
        break;
    }
  };

  export default render;
