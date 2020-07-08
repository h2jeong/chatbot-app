import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button, message } from "antd";

function Subscriber(props) {
  const auth = useSelector(state => state.user.auth);
  const [IsSubscribe, setIsSubscribe] = useState(false);
  const [SubscribedCount, setSubscribedCount] = useState(0);

  useEffect(() => {
    axios
      .post("/api/subscribe/getCount", { userTo: props.userTo })
      .then(res => {
        if (res.data.success) {
          console.log(res.data);
          setSubscribedCount(res.data.count);
        } else {
          message.error("Failed to get subscribed count");
        }
      });
  }, [props.userTo]);

  const handleSubscribe = () => {
    if (!auth.isAuth) {
      return message.warning("Log in and subscribe");
    }
    // if (props.userTo === auth.user._id) return;

    const variable = {
      userTo: props.userTo,
      userFrom: auth.user._id
    };

    axios.post("/api/subscribe/isSubscribed", variable).then(res => {
      if (res.data.success) {
        console.log(res.data);
        setIsSubscribe(true);
      } else {
        // message.error("Failed to subscribe");
        setIsSubscribe(false);
      }
    });

    if (!IsSubscribe) {
      axios.post("/api/subscribe/onSubscribe", variable).then(res => {
        if (res.data.success) {
          console.log(res.data);
          setIsSubscribe(!IsSubscribe);
          setSubscribedCount(SubscribedCount + 1);
        } else {
          message.error("Failed to subscribe");
        }
      });
    } else {
      axios.post("/api/subscribe/Unsubscribe", variable).then(res => {
        if (res.data.success) {
          console.log(res.data);
          setIsSubscribe(!IsSubscribe);
          setSubscribedCount(SubscribedCount - 1);
        } else {
          message.error("Failed to unsubscribe");
        }
      });
    }
  };

  return (
    <Button
      onClick={handleSubscribe}
      style={{
        backgroundColor: `${IsSubscribe ? "#AAAAAA" : "#CC0000"}`,
        height: "3rem",
        borderRadius: "3px",
        color: "white",
        fontWeight: "500",
        fontSize: "1rem",
        textTransform: "uppercase"
      }}
      disabled={props.userTo === auth.user._id}
    >
      {SubscribedCount} {IsSubscribe ? "Subscribed" : "Subscribe"}
    </Button>
  );
}

export default Subscriber;
