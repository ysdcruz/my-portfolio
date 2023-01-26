import { useState, useEffect } from 'react'
import axios from "axios"

import Button from '../Button/Button'
import InputField from '../InputField'

import './MessageForm.css'
import Alert from '../Alert/Alert'
import ComponentLoader from '../Loader/ComponentLoader/ComponentLoader'

const MessageForm = ({ className }) => {

  const form = document.getElementById("message-form");

  const [inputValue, setInputValue] = useState(
    {
      name: "",
      email: "",
      message: "",
      nameValid: false,
      emailValid: false,
      emailError: "Email address cannot be empty.",
      messageValid: false
    }
  );

  const [alert, setAlert] = useState({
    isOpen: false,
    status: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }), validateField(name, value));
  };
  
  const resetForm = () => {
    // Reset state and form
    setInputValue({
      name: "",
      email: "",
      message: "",
      nameValid: false,
      emailValid: false,
      emailError: "Email address cannot be empty.",
      messageValid: false
    });

    form.reset();
      
    setAlert({
      isOpen: false,
      status: "",
    });

    [...document.querySelectorAll(".form--group")].forEach(nav => {
      nav.classList.remove("input--focus", "input--error");
    });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    var inputFields = document.getElementsByClassName("form--group");

    if(!(inputValue.nameValid && inputValue.emailValid && inputValue.messageValid)) {
      if(!inputValue.nameValid)
        inputFields[0].classList.add("input--focus", "input--error");

      if(!inputValue.emailValid) {
        inputFields[1].querySelector(".error--wrapper").innerHTML = inputValue.emailError;
        inputFields[1].classList.add("input--focus", "input--error");
      }
        
      if(!inputValue.messageValid)
        inputFields[2].classList.add("input--focus", "input--error");
    } else {
      const newMessage = {
        name: inputValue.name,
        email: inputValue.email,
        message: inputValue.message
      }

      // Show loader
      setLoading(true);
      
      axios.post("http://localhost:3001/send", newMessage)
        .then(res => {
          setAlert({
            isOpen: true,
            status: "success"
          });
    
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          
          setAlert({
            isOpen: true,
            status: "failed"
          });
    
          setLoading(false);
        });
    }
  }

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

  useEffect(() => {
    if(alert.isOpen === false && alert.status === "success") {
      resetForm();
    }
  });

  return (
    <>
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
      {alert.isOpen && <Alert alert={alert} closeAlert={setAlert} successTitle='Your message was sent successfully.' successMsg='Thank you for messaging me. I&apos;ll get back to you as soon as possible!' failedTitle='Your message could not be sent.' failedMsg='Something went wrong. Don&apos;t worry, let&apos;s try again.'/>}
    </>
  )
}

export default MessageForm
