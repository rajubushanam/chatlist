import React, { useCallback } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { dayMapping, monthMapping, hoursMapping } from "../utils/dateUtils.js";

export default function Message({ message, onDeleteMessage }) {
  const formatDate = date => {
    const jsDate = new Date(date);
    const day = dayMapping[jsDate.getDay()];
    const month = monthMapping[jsDate.getMonth()];
    const dateNum = jsDate.getDate();
    const year = jsDate.getFullYear();
    const hours = hoursMapping[jsDate.getHours()];
    const minutes = jsDate.getMinutes();
    const seconds =
      jsDate.getSeconds() > 9 ? jsDate.getSeconds() : `0${jsDate.getSeconds()}`;
    const formatDate = `${day} ${month} ${dateNum}, ${year} 
    at ${hours}:${minutes}:${seconds}`;
    return formatDate;
  };

  const { senderUuid, sentAt, uuid, content } = message;
  const formattedDate = formatDate(sentAt);

  return (
    <div className="message-container">
      <div className="message-header">
        <p>Sender UUID: {senderUuid}</p>
        <p>
          {formattedDate}
          <FaTrashAlt
            onClick={() => onDeleteMessage(uuid, content)}
            style={{ marginLeft: 20, cursor: "pointer" }}
            size="0.9em"
            color="red"
          />
        </p>
      </div>
      {content}
    </div>
  );
}
