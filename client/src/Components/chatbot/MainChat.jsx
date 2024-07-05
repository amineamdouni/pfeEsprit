import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useContext,
} from "react";
import ChatList from "./ChatList.jsx";
import ChatMessages from "./ChatMessages.jsx";
import { socket } from "../../helpers/socket.js";
import { Context } from "../../main.jsx";

import "./chat.css";
const MainChat = () => {
  const { token, setToken } = useContext(Context);

  const [chats, setChats] = useState([
    {
      id: 0,
      username: "Leela",
      avatar: "https://imgflip.com/s/meme/Futurama-Leela.jpg",
      messages: [
        "I can explain. It's very valuable. You won't have time for sleeping, soldier, not with all the bed making you'll be doing",
        "Who am I making this out to? We'll go deliver this crate like professionals, and then we'll go home",
        "No! The cat shelter's on to me. I never loved you",
        "Oh Leela! You're the only person I could turn to",
        "Um, is this the boring, peaceful kind of taking to the streets",
        "That's right, baby. I ain't your loverboy Flexo, the guy you love so much. You even love anyone pretending to be him!",
      ],
    },
    {
      id: 1,
      username: "Bender",
      avatar:
        "http://orig02.deviantart.net/9689/f/2012/027/9/c/mr_bender______classy__by_sgtconker1r-d4nqpzu.png",
      messages: [
        "Stop! Don't shoot fire stick in space canoe! Cause explosive decompression!",
        "Fry! Stay back! He's too powerful! You guys aren't Santa!",
        "Hi, I'm a naughty nurse, and I really need someone to talk to. $9.95 a minute",
        "Who are you, my warranty?!",
        "I will destroy you",
      ],
    },
    {
      id: 2,
      username: "Fry",
      avatar:
        "http://www.wallpaperno.com/thumbnails/detail/20121027/futurama%20fry%201920x1080%20wallpaper_www.wallpaperno.com_68.jpg",
      messages: [
        "Ooh, name it after me! But I've never been to the moon!",
        "You don't know how to do any of those",
        "The key to victory is discipline, and that means a well made bed",
        "Stop bickering or I'm going to come back there and change your opinions manually",
        "Can we have Bender Burgers again",
      ],
    },
    {
      id: 3,
      username: "Zoidberg",
      avatar:
        "http://images2.fanpop.com/images/photos/3300000/Zoidberg-futurama-3305418-1024-768.jpg",
      messages: [
        "All I want is to be a monkey of moderate intelligence who wears a suit",
        "Oh, I don't have time for this",
        "No! The kind with looting and maybe starting a few fires!",
        "Now, now. Perfectly symmetrical violence never solved anything",
        "Dissect its brain",
        // Repeating messages truncated for brevity
      ],
    },
  ]);

  useEffect(() => {
    // // Fetch initial chat messages and notifications
    // axios
    //   .get("http://localhost:4000/api/v1/chats")
    //   .then((response) => setMessages(response.data))
    //   .catch((error) => console.error(error));

    // axios
    //   .get("http://localhost:3001/api/notifications")
    //   .then((response) => setNotifications(response.data))
    //   .catch((error) => console.error(error));

    // Listen for chat messages
    socket.on("chat_message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Listen for notifications
    // socket.on("notification", (notification) => {
    //   setNotifications((prevNotifications) => [
    //     ...prevNotifications,
    //     notification,
    //   ]);
    // });

    // Clean up the effect
    return () => {
      socket.off("chat_message");
      socket.off("notification");
    };
  }, []);
  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };
  const [selectedChatId, setSelectedChatId] = useState(null);
  const messageInputRef = useRef(null);

  const selectChat = (id) => {
    setSelectedChatId(id);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const text = messageInputRef.current.value;
    if (text && selectedChatId !== null) {
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === selectedChatId
            ? { ...chat, messages: [...chat.messages, text] }
            : chat
        )
      );
      messageInputRef.current.value = "";
    }
  };

  const selectedChat = chats.find((chat) => chat.id === selectedChatId);

  return (
    <div className="container_chat">
      <div className="chat_inbox">
        <ChatList chats={chats} selectChat={selectChat} />
        <ChatMessages
          handleIconClick={handleIconClick}
          handleFileChange={handleFileChange}
          fileInputRef={fileInputRef}
          messageInputRef={messageInputRef}
          chat={selectedChat}
          handleFormSubmit={handleFormSubmit}
        />
      </div>
    </div>
  );
};

export default MainChat;
