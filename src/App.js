import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import "./style.css";
import ListContainer from "./containers/ListContainer.js";
import Header from "./components/Header.js";
import ErrorComponent from "./components/ErrorComponent.js";

// This is the list of messages.
import { messages } from "./data.json";

const App = () => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentMessageList, setCurrentMessageList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPerPage, setMaxPerPage] = useState(5);
  const [lastPostIndex, setLastPostIndex] = useState(5);
  const [firstPostIndex, setFirstPostIndex] = useState(0);
  const [allMessages, setAllMessages] = useState(messages);
  const [totalPages, setTotalPages] = useState(1);
  const [hasError, setHasError] = useState(false);

  const handleFilterMessages = messages => {
    try {
      return messages.filter((message, index) => {
        const { content, uuid } = message;
        return (
          index ===
          messages.findIndex(
            obj => obj.uuid === uuid && obj.content === content
          )
        );
      });
    } catch (e) {
      setHasError(true);
    }
  };

  useEffect(() => {
    try {
      const filteredMessages = handleFilterMessages(allMessages);
      const sortedMessages = sortMessages(filteredMessages);
      const currentMessages = sortedMessages.slice(
        firstPostIndex,
        lastPostIndex
      );
      const calcTotalPages = Math.ceil(allMessages.length / maxPerPage);
      setCurrentMessageList(currentMessages);
      setAllMessages(sortedMessages);
      setTotalPages(calcTotalPages);
    } catch (e) {
      setHasError(true);
    }
  }, []);

  useEffect(() => {
    handleCurrentMessages(currentPage);
  }, [sortOrder]);

  const sortMessages = messages => {
    try {
      return messages.slice().sort((a, b) => {
        const date1 = new Date(a.sentAt);
        const date2 = new Date(b.sentAt);
        if (sortOrder === "asc") {
          return date1 - date2;
        } else {
          return date2 - date1;
        }
      });
    } catch (e) {
      setHasError(true);
    }
  };

  const handleSortOrder = () => {
    try {
      let newSortOrder = "";
      if (sortOrder === "asc") {
        newSortOrder = "desc";
      } else {
        newSortOrder = "asc";
      }
      setSortOrder(newSortOrder);
    } catch (e) {
      setHasError(true);
    }
  };

  const handleCurrentMessages = currentPage => {
    try {
      const newLastPostIndex = currentPage * maxPerPage;
      const newFirstPostIndex = newLastPostIndex - maxPerPage;
      const sortedMessages = sortMessages(allMessages);
      const newCurrentMessageList = sortedMessages.slice(
        newFirstPostIndex,
        newLastPostIndex
      );
      setCurrentPage(currentPage);
      setFirstPostIndex(newFirstPostIndex);
      setLastPostIndex(newLastPostIndex);
      setCurrentMessageList(newCurrentMessageList);
    } catch (e) {
      setHasError(true);
    }
  };

  const handleButtonPrev = () => {
    try {
      if (currentPage > 1) {
        handleCurrentMessages(currentPage - 1);
      }
    } catch (e) {
      setHasError(true);
    }
  };

  const handleButtonNext = () => {
    try {
      if (currentPage < totalPages) {
        handleCurrentMessages(currentPage + 1);
      }
    } catch (e) {
      setHasError(true);
    }
  };

  return (
    <div className="main-body">
      {!hasError && (
        <Header
          sortOrder={sortOrder}
          handleSortOrder={handleSortOrder}
          totalMessages={messages}
          currentPage={currentPage}
          totalPages={totalPages}
          handleButtonPrev={handleButtonPrev}
          handleButtonNext={handleButtonNext}
        />
      )}
      {!hasError && (
        <ListContainer sortType={sortOrder} messages={currentMessageList} />
      )}
      {hasError && <ErrorComponent />}
    </div>
  );
};

export default App;
