import styled from "styled-components"
import Robot from "../assets/robot.gif"
import Logout from "./Logout";

const Welcome = ({ currentUser }) => {
  if (!currentUser) {
    return (
      <Container>
        <h2>Loading user...</h2>
      </Container>
    );
  }

  return (
    <Container>
      < Logout  />
      <img src={Robot} alt="Robot" />
      <h1>Welcome, <span>{currentUser.username}!</span></h1>
      <h2>Please select a chat to start messaging</h2>
    </Container>
  )
}

export default Welcome

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
