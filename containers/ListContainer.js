import React, { useEffect, useState, useCallback } from "react";
import Message from "../components/Message";

export default function ListContainer({ messages, sortType }) {
  const [loading, setLoading] = useState(false);
  const [actualMessages, setActualMessages] = useState(messages);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setActualMessages(messages);
      setLoading(false);
    }, 1000);
  }, [messages, sortType]);

  const handleDeleteMessage = useCallback(
    (uuid, content) => {
      const filteredMessages = actualMessages.filter(
        message => message.uuid !== uuid && message.content !== content
      );
      setActualMessages(filteredMessages);
    },
    [actualMessages]
  );

  return (
    <div className="list-container">
      {actualMessages.map(message => {
        const mapKey = `${message.uuid}-${message.content}`;
        return (
          <Message
            key={mapKey}
            message={message}
            onDeleteMessage={handleDeleteMessage}
          />
        );
      })}
      {loading && <p>Loading...</p>}
    </div>
  );
}
