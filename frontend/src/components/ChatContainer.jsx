import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Logout from './Logout'
import ChatInput from './ChatInput'
import axios from 'axios';
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes.js'
import { useRef } from 'react';
import { v4 as uuidv4 } from "uuid"
const ChatContainer = ({ currentChat, currentUser, socket }) => {

  const [messages, setMessages] = useState([])
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const scrollRef = useRef();

  // useEffect(async () => {
  //   const response = await axios.post(getAllMessagesRoute, {
  //     from: currentUser._id,
  //     to: currentChat._id,
  //   })
  //   setMessages(response.data);
  // }, [currentChat])

  useEffect(() => {
    const getAllMessages = async () => {
      try {
        if (currentChat) {
          const response = await axios.get(getAllMessagesRoute, {
            params: {
              from: currentUser._id,
              to: currentChat._id,
            },
          });
          setMessages(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    if (currentChat) {
      getAllMessages();
    }
  }, [currentChat]);


  const handelSendMsg = async (msg) => {
    // alert(msg)
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    })
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      msg,
    })

    const msgs = [...messages]
    msgs.push({ fromSelf: true, message: msg });

    setMessages(msgs)
  }

  useEffect(() => {
  if (socket.current) {
    socket.current.on("msg-recieve", (msg) => {
      // console.log("msgs", msg);
      setArrivalMessage({ fromSelf: false, message: msg });'message'
    });
  }

  return () => {
    if (socket.current) socket.current.off("msg-recieve");
  };
}, [socket]);


  useEffect(() => {
    const dontknow2 = () => {
      arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }
    dontknow2()
  }, [arrivalMessage])


  useEffect(() => {
    const dontknow3 = () => {
      scrollRef.current?.scrollIntoView({ behaviour: "smooth" })
    }
    dontknow3()
  }, [messages])

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="" />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {
          messages.map((message) => {
            return (
              <div ref={scrollRef} key={uuidv4()}>
                <div className={`message ${message.fromSelf ? "sended" : "recivied"}`}>
                  <div className="content">
                    <p>
                      {message.message}
                    </p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      {/* <Messages /> */}
      <ChatInput handelSendMsg={handelSendMsg} />
    </Container>
  )
}

export default ChatContainer

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;