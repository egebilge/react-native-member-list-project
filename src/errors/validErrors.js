import * as React from 'react';

export default function validErrors() {
  const [nameValidError, setNameValidError] = React.useState('');
  const [emailValidError, setEmailValidError] = React.useState('');
  const [birthdateValidError, setBirthdateValidError] = React.useState('');
  const [entrancedateValidError, setEntrancedateValidError] =
    React.useState('');
}

const handleValidEmail = val => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (val.length === 0) {
    setEmailValidError('email address must be enter');
  } else if (reg.test(val) === false) {
    setEmailValidError('enter valid email address: [a-Z@.] ');
  } else if (reg.test(val) === true) {
    setEmailValidError('');
  }
};

const handleValidName = val => {
  let rjx = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;
  if (val.length === 0) {
    setNameValidError('name must be enter');
  } else if (rjx.test(val) === false) {
    setNameValidError('enter valid name: [a-Z a-Z]');
  } else if (rjx.test(val) === true) {
    setNameValidError('');
  }
};

const handleValidBirthdate = val => {
  let reg = /^\d{2}[.]\d{2}[.]\d{4}$/;
  if (val.length === 0) {
    setBirthdateValidError('birthdate must be enter');
  } else if (reg.test(val) === false) {
    setBirthdateValidError('enter valid birthdate: [*01.01.2001]');
  } else if (reg.test(val) === true) {
    setBirthdateValidError('');
  }
};

const handleValidEntrancedate = val => {
  let reg = /^\d{2}[.]\d{2}[.]\d{4}$/;
  if (val.length === 0) {
    setEntrancedateValidError('entrancedate must be enter');
  } else if (reg.test(val) === false) {
    setEntrancedateValidError('enter valid entrancedate: [*01.01.2001]');
  } else if (reg.test(val) === true) {
    setEntrancedateValidError('');
  }
};
