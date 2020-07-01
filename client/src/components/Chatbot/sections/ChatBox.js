import React, { useEffect } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { saveMessage } from "../../../_action/chat_action";
import Message from "./Message";
import { List, Avatar } from "antd";
import { RobotOutlined, SmileOutlined } from "@ant-design/icons";
import CardComponent from "./Card";

function ChatBox() {
  const dispatch = useDispatch();
  const messagesFromRedux = useSelector(state => state.chat.messages);

  useEffect(() => {
    eventQuery("welcomeToMyWebsite");
  }, []);

  const testQuery = async text => {
    // let conversations = [];

    // 1. take care of the message I sent
    let conversation = {
      who: "user",
      content: {
        text: {
          text: text
        }
      }
    };
    dispatch(saveMessage(conversation));
    // console.log("text I sent ", conversation);

    // 2. TAKE CARE OF THE MESSAGE CHATBOT SENT
    const textQueryVarailabes = { text };

    try {
      // I will send request to the textQuery route
      const response = await Axios.post(
        "/api/dialogflow/textQuery",
        textQueryVarailabes
      );
      // let content = response.data.fulfillmentMessages[0];

      for (let content of response.data.fulfillmentMessages) {
        let conversation = {
          who: "bot",
          content: content
        };
        dispatch(saveMessage(conversation));
        // console.log("text bot sent ", conversation);
      }
    } catch (err) {
      conversation = {
        who: "bot",
        content: {
          text: {
            text: "Error just occured, please check the problem"
          }
        }
      };
      dispatch(saveMessage(conversation));
    }
  };

  const eventQuery = async event => {
    // 1. make a trigger this event function
    // => whenever call this components => useEffect

    // 2. TAKE CARE OF THE MESSAGE CHATBOT SENT
    const eventQueryVarailabes = { event };

    try {
      // I will send request to the textQuery route
      const response = await Axios.post(
        "/api/dialogflow/eventQuery",
        eventQueryVarailabes
      );
      //   let content = response.data.fulfillmentMessages[0];
      //   let conversation = {
      //     who: "bot",
      //     content: content
      //   };
      //   dispatch(saveMessage(conversation));

      for (let content of response.data.fulfillmentMessages) {
        let conversation = {
          who: "bot",
          content: content
        };
        dispatch(saveMessage(conversation));
      }
    } catch (err) {
      let conversation = {
        who: "bot",
        content: {
          text: {
            text: "Error just occured, please check the problem"
          }
        }
      };
      dispatch(saveMessage(conversation));
    }
  };

  const keyPressHandler = e => {
    if (e.key === "Enter") {
      if (!e.target.value) {
        return alert("you need to type something first");
      }

      // we will send request to text query route
      testQuery(e.target.value);
      e.target.value = "";
    }
  };

  const renderCards = cards =>
    cards.map((card, i) => (
      <CardComponent key={i} cardInfo={card.structValue} />
    ));

  const renderOneMessage = (message, i) => {
    console.log("message:", message);

    // we need to give some condition here to separate message kinds

    // template for normal text
    if (message.content && message.content.text && message.content.text.text) {
      return (
        <Message key={i} who={message.who} text={message.content.text.text} />
      );

      // template for card message
    } else if (
      message.content &&
      message.content.payload &&
      message.content.payload.fields.card
    ) {
      const AvatarSrc =
        message.who === "bot" ? <RobotOutlined /> : <SmileOutlined />;

      return (
        <List.Item style={{ padding: "1rem" }}>
          <List.Item.Meta
            avatar={<Avatar icon={AvatarSrc} />}
            title={message.who}
            description={renderCards(
              message.content.payload.fields.card.listValue.values
            )}
          />
        </List.Item>
      );
    }
  };

  const renderMessage = messages => {
    console.log("this", messages);
    if (messages) {
      return messages.map((message, i) => {
        return renderOneMessage(message, i);
      });
    } else {
      return null;
    }
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
      <div style={{ height: 644, width: "100%", overflow: "auth" }}>
        {renderMessage(messagesFromRedux)}
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
