import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

const InputField = ({ tag, type, label, name, placeholder, value, onChange, isRequired, errorMsg }) => {

  const isEmpty = (value) => {
    return value === null || value.match(/^ *$/) !== null;
  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const onFocus = (evt) => {
    var formGroup = evt.target.closest(".form--group");
    formGroup.classList.add("input--focus");
    formGroup.classList.remove("input--error");
  };

  const onBlur = (evt) => {
    var formGroup = evt.target.closest(".form--group");

    if(isEmpty(evt.target.value)) 
      formGroup.classList.remove("input--focus");
    else {
      if(evt.target.type === "email") {
        if(isValidEmail(evt.target.value))
          formGroup.classList.remove("input--error");
        else
          formGroup.classList.add("input--error");
      }
    }

  };

  const element = tag === 'input' ? (
      <input 
        type={type} 
        id={name} 
        value={value} 
        name={name} 
        placeholder={placeholder} 
        onChange={onChange} 
        onFocus={onFocus} 
        onBlur={onBlur} 
        required={isRequired} />
    ) : (
      <textarea 
        id={name} 
        value={value} 
        name={name} 
        placeholder={placeholder} 
        onChange={onChange} 
        onFocus={onFocus} 
        onBlur={onBlur} 
        required={isRequired}/>
    );
  
  const errorContainer = errorMsg === null ? (
    <></>
  ) : (
    <span className='error--wrapper flex-row'>
      <FontAwesomeIcon icon={faTriangleExclamation} className='fa-sm' />
      {errorMsg}
    </span>
  ) ;

  return (
    <div className='form--group'>
      <label htmlFor={name}>{label}</label>
      <div className='input--wrapper'>
        {element}
      </div>
      {errorContainer}
    </div>
  )
}

export default InputField
