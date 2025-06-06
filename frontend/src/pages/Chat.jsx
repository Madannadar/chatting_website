import { useEffect, useState } from 'react';
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { allUsersRoute } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';

function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  // useEffect(async () => {
  //   if (!localStorage.getItem("chat-app")) {
  //     navigate('/login')
  //   } else {
  //     setCurrentUser(await JSON.parse(localStorage.getItem('chat-app')))
  //   }
  // })
  // useEffect(async () => {
  //   if (currentUser) {
  //     if (currentUser.isAvatarImageSet) {
  //       const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
  //       setContacts(data.data)
  //     } else {
  //       navigate('/setAvatar');
  //     }
  //   }
  // }, [currentUser])

  // React expects useEffect to return either:
  // nothing (i.e. undefined), or
  // a cleanup function (e.g. for unsubscribing)
  // But async functions always return a Promise, which causes issues with  React's cleanup mechanism (destroy is not a function is part of that).

// Fix
// Wrap the async logic inside the useEffect with an inner async function instead:
  useEffect(() => {
    const fetchUser = async () => {
      if (!localStorage.getItem("chat-app")) {
        navigate('/login');
      } else {
        setCurrentUser(JSON.parse(localStorage.getItem('chat-app')));
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate('/setAvatar');
        }
      }
    };
    fetchContacts();
  }, [currentUser]);

  const handelChatChange = (chat) => {
    setCurrentChat(chat);
  }
  return (
    <>
      <Container>
        <div className='container'>
          <Contacts contacts={contacts} currentUser={currentUser} changeChat={handelChatChange} />
        </div>
      </Container>
    </>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat

