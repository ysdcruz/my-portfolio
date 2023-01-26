import Button from '../Button/Button'
import InputField from '../InputField'

import './MessageForm.css'
import ComponentLoader from '../Loader/ComponentLoader/ComponentLoader'

const MessageForm = ({ className, inputValue, setInputValue, handleSubmit, loading }) => {


  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }), validateField(name, value));
  };

  const validateField = (fieldName, value) => {
    var nameValid = inputValue.nameValid;
    var emailValid = inputValue.emailValid;
    var emailError = inputValue.emailError;
    var messageValid = inputValue.messageValid;
  
    switch(fieldName) {
      case "name":
        nameValid = !(isEmpty(value));
        break;
      case "email":
        emailValid = !(isEmpty(value)) && isValidEmail(value);
        emailError = isEmpty(value) ? "Email address cannot be empty." : ( isValidEmail(value) ? "" : "Please enter a valid email address." );
        break;
      case "message":
        messageValid = !(isEmpty(value));
        break;
      default:
        break;
    }

    // Update validity of name, email, and message and retain values of other keys
    setInputValue({
      ...inputValue,
      nameValid: nameValid,
      emailValid: emailValid,
      emailError: emailError,
      messageValid: messageValid,
    });
  };

  const isEmpty = (value) => {
    return value === null || value.match(/^ *$/) !== null;
  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  return (
    <div className={`${className} form--container`}>
      <form id='message-form' className='flex-row'>
        <InputField 
          tag='input' 
          type='text' 
          label='Your Name' 
          name='name' 
          placeholder='Enter your name' 
          value={inputValue.name} 
          onChange={handleChange} 
          isRequired={true} 
          errorMsg='Name cannot be empty.'/>
        <InputField 
          tag='input' 
          type='email' 
          label='Email Address' 
          name='email' 
          placeholder='Enter your email address' 
          value={inputValue.email} 
          onChange={handleChange}
          isRequired={true} 
          errorMsg={inputValue.emailError} />
        <InputField 
          tag='textarea' 
          label='Your Message' 
          name='message' 
          placeholder='Type your message...' 
          value={inputValue.message} 
          onChange={handleChange}
          isRequired={true} 
          errorMsg='Message cannot be empty.'/>
        <div className='btn--wrapper content-center'>
          <Button text='Send' color='var(--color-primary)' hasArrow={true} handleClick={handleSubmit} />
        </div>
      </form>
      {loading && <ComponentLoader />}
    </div>
  )
}

export default MessageForm
