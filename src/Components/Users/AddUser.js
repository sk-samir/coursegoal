import React, { useState } from "react";

import Card from "../UI/Card";

import Button from "../UI/Button";

import ErrorModal from "../UI/ErrorModal";

import classes from "./AddUser.module.css";

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredage, setEnteredage] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    if (enteredUsername.trim().length === 0 || enteredage.trim().length === 0) {
      setError({
        title: "Invalid Name or Age",
        message: "Please enter valid Name or Age",
      });
      return;
    }

    if (+enteredage < 1) {
      setError({
        title: "Invalid Age",
        message: "Please enter valid Age",
      });
      return;
    }

    props.onAddUser(enteredUsername, enteredage);
    setEnteredUsername("");
    setEnteredage("");
  };

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredage(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">UserName</label>
          <input
            id="username"
            type="text"
            value={enteredUsername}
            onChange={usernameChangeHandler}
          />
          <label htmlFor="age">Age (In Years</label>
          <input
            id="age"
            type="numbers"
            value={enteredage}
            onChange={ageChangeHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
