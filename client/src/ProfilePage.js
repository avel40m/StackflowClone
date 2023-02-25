import axios from "axios";
import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import BlueButton from "./BlueButton";
import Header1 from "./Header1";
import UserContext from "./UserContext";

const Container = styled.div`
  margin: 30px 20px;
`;

function ProfilePage() {
  const { checkAuth, user } = useContext(UserContext);
  const [redirectToTheHomePage, setRedirectToTheHomePage] = useState(false);

  function logout() {
    axios
      .post("http://localhost:3030/logout", {}, { withCredentials: true })
      .then(() => {
        checkAuth().catch(() => setRedirectToTheHomePage(true));
      })
      .catch((e) => console.log(e));
  }

  return (
    <>
      {redirectToTheHomePage && <Navigate to="/" />}
      <Container>
        <Header1>Profile</Header1>
        {user && (
          <>
          <p>Hello user {user.email}</p>
          <BlueButton onClick={() => logout()}>Logout</BlueButton>
          </>
          )}
        {!user && <p>You are not logged in</p>}
      </Container>
    </>
  );
}

export default ProfilePage;
