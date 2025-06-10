import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

const ChatInput = ({ handelSendMsg }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerToggle = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const handleEmojiClick = (emojiData) => {
    setMsg((prevMsg) => prevMsg + emojiData.emoji);
  };

  const sendChat = (event) => {
    event.preventDefault(); 
    if (msg.length > 0) {
      handelSendMsg(msg); 
      setMsg("");
    }
  };


  return (
    <Container>
      <div className="emoji-wrapper">
        <BsEmojiSmileFill onClick={handleEmojiPickerToggle} />
        {showEmojiPicker && (
          <div className="emoji-picker">
            <Picker onEmojiClick={handleEmojiClick} theme="dark" />
          </div>
        )}
      </div>
      <form className="input-box" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="Type your message..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container >
  );
};

export default ChatInput;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #1f1f2e;
  padding: 1rem 1.5rem;
  position: relative;
  border-top: 1px solid #333;

  .emoji-wrapper {
    position: relative;
    svg {
      font-size: 1.8rem;
      color: #f4c542;
      cursor: pointer;
      transition: transform 0.2s;
      &:hover {
        transform: scale(1.1);
      }
    }

    .emoji-picker {
      position: absolute;
      bottom: 60px;
      left: 0;
      z-index: 20;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
    }
  }

  .input-box {
    flex: 1;
    display: flex;
    align-items: center;
    background-color: #2c2c3a;
    border-radius: 30px;
    padding: 0.6rem 1rem;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);

    input {
      flex: 1;
      background: transparent;
      border: none;
      color: white;
      font-size: 1rem;
      padding: 0.3rem 0;
      &::placeholder {
        color: #aaa;
      }
      &:focus {
        outline: none;
      }
    }

    button {
      background-color: #6c63ff;
      border: none;
      border-radius: 50%;
      padding: 0.5rem;
      margin-left: 0.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.3s ease;

      svg {
        font-size: 1.5rem;
        color: white;
      }

      &:hover {
        background-color: #574fd6;
      }
    }
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 0.8rem;

    .input-box {
      width: 100%;
    }

    .emoji-picker {
      bottom: 100%;
    }
  }
`;
