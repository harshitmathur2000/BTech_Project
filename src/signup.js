import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InputControl from "./inputControl";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth, firestore } from "./firebaseConfig";
import styles from "./Signup.module.css";

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        setEmailVerified(true);
        alert("User is authenticated and email is verified");
        window.location.href = "/homePage";
      }
    });
    
    return () => {
      // Clean up the listener when the component unmounts
      unsubscribe();
    };
  }, []);

  const handleSubmission = async () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill in all fields");
      return;
    }

    setErrorMsg("");
    setSubmitButtonDisabled(true);

    if (values.email.endsWith("iitj.ac.in")) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.pass
        );

        // Send email verification
        const user = userCredential.user;
        await sendEmailVerification(user);

        alert("Verify your email");
        // Wait for the user to be signed in and email verified before navigating
        auth.onAuthStateChanged((user) => {
          if (user && user.emailVerified) {
            firestore.collection("users").doc(user.uid).set({
              email: user.email,
              name: values.name,
            });
            updateProfile(user, {
              displayName: values.name,
            });
            // Redirect to homepage once email is verified
            window.location.href = "/homePage";
          }
        });
      } catch (error) {
        setSubmitButtonDisabled(false);
        setErrorMsg(error.message);
      }
    } else {
      alert(
        "Invalid email domain. Registration is allowed only for 'iitj.ac.in' addresses."
      );
      setSubmitButtonDisabled(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Signup</h1>

        {emailVerified ? (
          <p>Email verified! Redirecting to homepage...</p>
        ) : (
          <>
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
              type="password"
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
          </>
        )}
      </div>
    </div>
  );
}

export default Signup;