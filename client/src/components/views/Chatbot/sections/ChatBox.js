import React, { useEffect } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { saveMessage } from "../../../../_action/chatbot_action";
import Message from "./Message";
import CardComponent from "./Card";

function ChatBox() {
  const messages = useSelector(state => state.chatbot.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    // eventQuery
    async function eventQuery(event) {
      // 1. make a trigger this event function
      // => whenever called this components => useEffect

      // 2. TAKE CARE OF THE MESSAGE CHATBOT SENT
      // async/ await 처리
      try {
        let response = await Axios.post("/api/dialogflow/eventQuery", {
          event
        });

        for (let content of response.data.fulfillmentMessages) {
          let conversation = {
            who: "bot",
            content: content
          };

          // console.log(conversation);
          dispatch(saveMessage(conversation));
        }
      } catch (err) {
        let conversation = {
          who: "bot",
          content: {
            text: {
              text: " Error just occured, please check the problem"
            }
          }
        };

        dispatch(saveMessage(conversation));
      }
    }

    eventQuery("welcomeToMyWebsite");
  }, [dispatch]);

  // textQruery
  //   "fulfillmentMessages": [
  //     {
  //         "platform": "PLATFORM_UNSPECIFIED",
  //         "text": {
  //             "text": [
  //                 "Hi! How are you doing?"
  //             ]
  //         },
  //         "message": "text"
  //     }
  // ],

  const textQruery = async text => {
    // 1. take care of the message I sent
    let conversation = {
      who: "user",
      content: { text: { text: text } }
    };
    // 대화목록 저장해서 뿌려주기
    // console.log(conversation);
    dispatch(saveMessage(conversation));

    // 2. TAKE CARE OF THE MESSAGE CHATBOT SENT
    // => I will send request to the textQuery route
    try {
      let response = await Axios.post("/api/dialogflow/textQuery", { text });
      for (let content of response.data.fulfillmentMessages) {
        conversation = {
          who: "bot",
          content: content
        };
        console.log(conversation);
        dispatch(saveMessage(conversation));
      }
    } catch (err) {
      conversation = {
        user: "bot",
        content: {
          text: { text: "Error just occured, please check the problem" }
        }
      };
      // console.log(conversation);
      dispatch(saveMessage(conversation));
    }
  };

  const keyPressHandler = e => {
    if (e.key === "Enter") {
      if (!e.target.value) return alert("Please enter your conversation! ");

      textQruery(e.target.value);
      e.target.value = "";
    }
  };

  const renderCards = cards => {
    // console.log("cards:", cards);
    return cards.map((card, i) => (
      <CardComponent key={i} cardInfo={card.structValue} />
    ));
  };

  const renderOneMessage = (message, i) => {
    // console.log("message:", message);

    let messageInfo = [];
    // we need to give some condition here to separate message kinds
    if (message.content && message.content.text && message.content.text.text) {
      // template for normal text
      messageInfo = message.content.text.text;
    } else if (message.content && message.content.payload.fields.card) {
      // template for card message

      messageInfo = renderCards(
        message.content.payload.fields.card.listValue.values
      );
    }
    console.log("messageInfo", messageInfo);
    return <Message key={i} who={message.who} text={messageInfo} />;
  };

  const renderMessage = messages => {
    // console.log("messages", messages);
    return messages.map((message, i) => renderOneMessage(message, i));
  };

  return (
    <div
      style={{
        height: 700,
        width: 700,
        border: "3px solid black",
        borderRadius: "7px"
      }}
    >
      <div style={{ height: 644, width: "100%", overflow: "auto" }}>
        {renderMessage(messages)}
      </div>
      <input
        style={{
          margin: 0,
          width: "100%",
          height: 50,
          borderRadius: "4px",
          padding: "5px",
          fontSize: "1rem"
        }}
        placeholder="Send a message..."
        onKeyPress={keyPressHandler}
        type="text"
      />
    </div>
  );
}

export default ChatBox;
