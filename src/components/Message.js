import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { dayMapping, monthMapping, hoursMapping } from "../utils/dateUtils.js";
import ErrorComponent from "./ErrorComponent.js";

export default function Message({ message, onDeleteMessage }) {
  const [hasError, setHasError] = useState(false);

  const formatDate = date => {
    try {
      const jsDate = new Date(date);
      const day = dayMapping[jsDate.getDay()];
      const month = monthMapping[jsDate.getMonth()];
      const dateNum = jsDate.getDate();
      const year = jsDate.getFullYear();
      const hours = hoursMapping[jsDate.getHours()];
      const jsDateMinutes = jsDate.getMinutes();
      const minutes = jsDateMinutes > 9 ? jsDateMinutes : `0${jsDateMinutes}`;
      const jsDateSeconds = jsDate.getSeconds();
      const seconds = jsDateSeconds > 9 ? jsDateSeconds : `0${jsDateSeconds}`;
      const formatDate = `${day} ${month} ${dateNum}, ${year} at ${hours}:${minutes}:${seconds}`;
      return formatDate;
    } catch (e) {
      setHasError(true);
    }
  };

  const { senderUuid, sentAt, uuid, content } = message;
  const formattedDate = formatDate(sentAt);

  return (
    <>
      {!hasError && (
        <div className="message-container">
          <div className="message-header">
            <p>Sender UUID: {senderUuid}</p>
            <p>
              {formattedDate}
              <FaTrashAlt
                data-testid={`delete-icon-${uuid}-${content}`}
                onClick={() => onDeleteMessage(uuid, content)}
                style={{ marginLeft: 20, cursor: "pointer" }}
                size="0.9em"
                color="red"
              />
            </p>
          </div>
          {content}
        </div>
      )}
      {hasError && <ErrorComponent />}
    </>
  );
}
