import classes from "./Checkout.module.css";
import { useState } from "react";
import useInputNew from "./use-input";

const Checkout = (props) => {

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInputNew((value) => value.trim() !== "" );

  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: streetInputHasError,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetstreetInput,
  } = useInputNew((value) => value.trim() !== "" );

  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetcityInput,
  } = useInputNew((value) => value.trim() !== "" );

  const {
    value: enteredPostalCode,
    isValid: enteredPostalCodeIsValid,
    hasError: postalCodeInputHasError,
    valueChangeHandler: postalCodeChangeHandler,
    inputBlurHandler: postalCodeBlurHandler,
    reset: resetPostalCodeInput,
  } = useInputNew((value) => value.trim().length === 6 );

  const confirmHandler = (event) => {
    event.preventDefault();

    let formIsValid = false;

    if(enteredNameIsValid && enteredCityIsValid && enteredPostalCodeIsValid && enteredStreetIsValid){
      formIsValid = true;
    }

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    })

    resetNameInput();
    resetstreetInput();
    resetPostalCodeInput();
    resetcityInput();
  };

  const nameControlCLasses = `${classes.control} ${!nameInputHasError ? '' : classes.invalid}`

  const streetControlCLasses = `${classes.control} ${!streetInputHasError ? '' : classes.invalid}`

  const postalCodeControlCLasses = `${classes.control} ${!postalCodeInputHasError ? '' : classes.invalid}`

  const cityControlCLasses = `${classes.control} ${!cityInputHasError ? '' : classes.invalid}`

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlCLasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" onChange={nameChangeHandler} onBlur={nameBlurHandler} value={enteredName} />
        {nameInputHasError && <p>Please Entere a Valid Name!</p>}
      </div>
      <div className={streetControlCLasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" onChange={streetChangeHandler} onBlur={streetBlurHandler} value={enteredStreet}  />
        {streetInputHasError && <p>Please Entere a Valid Street!</p>}
      </div>
      <div className={postalCodeControlCLasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" onChange={postalCodeChangeHandler} onBlur={postalCodeBlurHandler} value={enteredPostalCode} />
        {postalCodeInputHasError && <p>Please Entere a Valid postalCode(6 Characters long)!</p>}
      </div>
      <div className={cityControlCLasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" onChange={cityChangeHandler} onBlur={cityBlurHandler} value={enteredCity} />
        {cityInputHasError && <p>Please Entere a Valid City!</p>}

      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
