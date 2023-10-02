import React from "react";
import { Link, useNavigate } from "react-router-dom";
import InputControl from "./inputControl";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, firestore } from "./firebaseConfig";
import styles from "./Signup.module.css";
import firebase from "firebase/compat/app";
function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true);
    if (values.email.endsWith("iitj.ac.in")) {
      const userCredential = createUserWithEmailAndPassword(auth, values.email, values.pass)
        .then(async (res) => {
          const auth = firebase.auth();
          const currUser = auth.currentUser;

          if (currUser) {
            currUser.sendEmailVerification()
              .then(() => {
                alert("Verify your email")
              })
              .catch((error) => {
                console.log(error)
              });
          }
          firestore.collection('users').doc(res.user.uid).set({
            email: res.user.email,
            name: values.name,
          });
          setSubmitButtonDisabled(false);
          const user = res.user;
          await updateProfile(user, {
            displayName: values.name,
          });
          navigate('/homePage')
        })
        .catch((err) => {
          setSubmitButtonDisabled(false);
          setErrorMsg(err.message);
        });
      

    }
    else {
      // Display an error message or prevent registration
      alert("Invalid email domain. Registration is allowed only for 'iitj.ac.in' addresses.");
    }


    // try {
    //   // Create a new user with email and password          
    //   // Access the newly created user
    //   const user = userCredential.user;
    //   console.log(userCredential);
    //   firestore.collection('users').doc(user.uid).set({
    //     email: user.email,
    //     // Add more user details as needed
    //   });
    //   // Store additional user data in Firestor

    //   // User signup success
    //   console.log('User signed up successfully');
    // } catch (error) {
    //   console.error('Error signing up:', error.message);
    // }
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Signup</h1>

        <InputControl
          label="Name"
          placeholder="Enter your name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <InputControl
          label="Email"
          placeholder="Enter email address"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputControl
          label="Password"
          placeholder="Enter password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={handleSubmission} disabled={submitButtonDisabled}>
            Signup
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;