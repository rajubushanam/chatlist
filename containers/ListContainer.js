import React, { useEffect, useState, useCallback } from "react";
import ErrorComponent from "../components/ErrorComponent";
import Message from "../components/Message";

export default function ListContainer({ messages, sortType }) {
  const [loading, setLoading] = useState(false);
  const [actualMessages, setActualMessages] = useState(messages);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      const timer = setTimeout(() => {
        setActualMessages(messages);
        setLoading(false);
      }, 800);
      return () => {
        clearTimeout(timer);
      };
    } catch (e) {
      setHasError(true);
    }
  }, [messages, sortType]);

  const handleDeleteMessage = useCallback(
    (uuid, content) => {
      try {
        const filteredMessages = actualMessages.filter(
          message => message.uuid !== uuid && message.content !== content
        );
        setActualMessages(filteredMessages);
      } catch (e) {
        setHasError(true);
      }
    },
    [actualMessages]
  );

  return (
    <div className="list-container">
      {!hasError &&
        actualMessages.map(message => {
          const mapKey = `${message.uuid}-${message.content}`;
          return (
            <Message
              key={mapKey}
              message={message}
              onDeleteMessage={handleDeleteMessage}
            />
          );
        })}
      {!hasError && actualMessages.length === 0 && "No Messages"}
      {!hasError && loading && <p>Loading...</p>}
      {hasError && <ErrorComponent />}
    </div>
  );
}
