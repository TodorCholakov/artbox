import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Error from "../errorHandling/Error";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const auth = getAuth();
const vh = window.innerHeight;
const Register = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const onLoginFormSubmitHandler = (e) => {
    e.preventDefault();

    const userName = e.target.userName.value;
    const password = e.target.password.value;

    console.log(userName, password);

    const AddUserIdToUsers = async (userId) => {
      try {
        await setDoc(doc(db, "users", userId), {
          userId: userId,
        });
        console.log("Document written with ID: ", userId);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };

    createUserWithEmailAndPassword(auth, userName, password)
      .then((userCredential) => {
        localStorage.setItem("uid", userCredential.user.uid);
        localStorage.setItem("email", userCredential.user.email);
        let userId = userCredential.user.uid;
        AddUserIdToUsers(userId);

        navigate("/auth/profile");
      })
      .catch((error) => {
        //    const errorCode = error.code;
        //    const errorMessage = error.message;
        // ..
        console.log(error);
        setError(error.code.slice(5).toUpperCase());
      });
  };

  return (
    <Container variants={subTitle} initial="hidden" animate="show">
      <SubContainer1>
        <form onSubmit={onLoginFormSubmitHandler}>
          <InputContainer>
            <NavTitle>
              <label htmlFor="email">Email:</label>
            </NavTitle>
            <Input id="email" type="text" name="userName" />
          </InputContainer>
          <InputContainer>
            <NavTitle>
              <label htmlFor="password">Password:</label>
            </NavTitle>
            <Input id="password" type="text" name="password" />
          </InputContainer>
          <InputContainer>
            <NavTitle>
              <label htmlFor="password"></label>
            </NavTitle>
            <SubmitButton type="submit" value="Register" />
          </InputContainer>
          <InputContainer>
            <NavTitle>
              <label htmlFor="password"></label>
            </NavTitle>
            <p>
              or login
              <Link to="/auth/login ">
                <b> here</b>
              </Link>
              <Error error={error} />
            </p>
          </InputContainer>
        </form>
      </SubContainer1>
      <SubContainer2>
        <Heading>REGISTER</Heading>
      </SubContainer2>
    </Container>
  );
};

const subTitle = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 2, ease: "easeIn" },
  },
};
const Container = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: stretch;
  overflow: hidden; /* Hide scrollbars */
  height: ${vh - 40}px;
  border-top: 1px solid white;
`;

const NavTitle = styled.span`
  font-size: 18px;
  width: 100px;
  margin-right: 5px;
`;
const InputContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

const Input = styled(motion.input)`
  display: flex;
  justify-content: center;
  padding: 5px;
  width: 200px;
  height: 40px;
`;
const SubContainer1 = styled.div`
  padding: 50px;
  width: 50%;
  background-color: #ffffff;

  flex-grow: 1;
  margin-top: 25vh;
`;
const SubContainer2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;

  background-color: #39393f;
  color: #ffffff;
`;

const Heading = styled.div`
  display: block;
  font-size: 90px;
  text-align: center;
`;

const SubmitButton = styled(motion.input)`
  background-color: #ffffff;
  border: 1px solid #000000;
  display: inline-block;
  cursor: pointer;
  color: #39393f;
  width: 200px;
  height: 40px;
  font-size: 16px;
  padding: 5px;
  width: 200px;
  height: 40px;

  transition: 0.5s;
  &:hover {
    transition: 0.5s;
    color: #ffffff;
    background-color: lightblue;
    background-color: #39393f;
  }
`;

export default Register;
