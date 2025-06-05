import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes"
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import multiavatar from '@multiavatar/multiavatar/esm'
import { toast } from "react-toastify";

const SetAvatar = () => {

    const api = 'https://api.multiavatar.com/4578945'
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState([]);
    const [isLoading, setIsLoading] = useState();
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    useEffect(() => {
        const user = localStorage.getItem("chat-app");
        if (!user) navigate("/login");
    }, [navigate]);

    const generateRandomName = () => Math.random().toString(36).substring(2, 10);

    useEffect(() => {
        const generateAvatars = () => {
            const data = [];
            for (let i = 0; i < 4; i++) {
                const randomName = generateRandomName();
                const svgCode = multiavatar(randomName);
                const encoded = btoa(unescape(encodeURIComponent(svgCode)));
                data.push(encoded);
            }
            setAvatar(data);
            setIsLoading(false);
        };

        generateAvatars();
    }, []);



    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Please select an avatar", toastOptions);
            return;
        }

        const user = await JSON.parse(
            localStorage.getItem("chat-app")
        );

        const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
            image: avatar[selectedAvatar],
        });
        console.log(data)

        if (data.isSet) {
            user.isAvatarImageSet = true;
            user.avatarImage = data.image;
            localStorage.setItem(
                "chat-app",
                JSON.stringify(user)
            );
            navigate("/chat");
        } else {
            toast.error("Error setting avatar. Please try again.", toastOptions);
        }
    };

    return (
        <>
            {isLoading ? (
                <Container>
                    <img src={loader} alt="loader" className="loader" />
                </Container>
            ) : (
                <Container>
                    <div className="title-container">
                        <h1>Pick an Avatar as your profile picture</h1>
                    </div>
                    <div className="avatars">
                        {avatar.map((avatar, index) => (
                            <div
                                key={index}
                                className={`avatar ${selectedAvatar === index ? "selected" : ""
                                    }`}
                                onClick={() => setSelectedAvatar(index)}
                            >
                                <img
                                    src={`data:image/svg+xml;base64,${avatar}`}
                                    alt={`avatar-${index}`}
                                />
                            </div>
                        ))}
                    </div>
                    <button onClick={setProfilePicture} className="submit-btn">
                        Set as Profile Picture
                    </button>
                    <ToastContainer />
                </Container>
            )}
        </>
    );
}

export default SetAvatar


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }

  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;

      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }

      &:hover {
        cursor: pointer;
        transform: scale(1.1);
      }
    }

    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }

  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;

    &:hover {
      background-color: #3c0edc;
    }
  }
`;