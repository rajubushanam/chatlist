import React from "react";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import Header from "./components/Header";
import ListContainer from "./containers/ListContainer";
import Message from "./components/Message";
import App from "./App";

afterEach(cleanup);

const messages = [
  {
    sentAt: "2012-02-19T09:42:11.913Z",
    uuid: "435453",
    content: "Message 1",
    senderUuid: "2"
  },
  {
    sentAt: "2015-05-22T13:55:10.542Z",
    uuid: "4354353",
    content: "Message 2",
    senderUuid: "2"
  },
  {
    sentAt: "2012-01-20T01:31:33.751Z",
    uuid: "4354353",
    content: "Message 3",
    senderUuid: "1"
  },
  {
    sentAt: "2016-02-17T10:13:03.115Z",
    uuid: "435453",
    content: "Message 4",
    senderUuid: "2"
  },
  {
    sentAt: "2015-05-22T13:55:10.542Z",
    uuid: "4354353",
    content: "Message 5",
    senderUuid: "1"
  },
  {
    sentAt: "2018-05-22T13:55:10.542Z",
    uuid: "4354353",
    content: "Message 6",
    senderUuid: "1"
  }
];

describe("Sort Button and Next Button", () => {
  test("should display button with label Sort by Date(asc)", () => {
    render(<Header totalMessages={messages} sortOrder="asc" />);
    expect(screen.getByText("Sort by Date(asc)")).toBeTruthy();
  });
  test("should display button with label Next", () => {
    render(
      <Header
        totalMessages={messages}
        sortOrder="asc"
        currentPage={1}
        totalPages={2}
      />
    );
    expect(screen.getByText("Next >")).toBeTruthy();
  });
});

describe("Messages List Container", () => {
  test("should display No Messages if messages are empty", () => {
    render(<ListContainer messages={[]} sortType="asc" />);
    expect(screen.getByText("No Messages")).toBeTruthy();
  });
  test("should display button with label Next", () => {
    render(
      <Header
        totalMessages={messages}
        sortOrder="asc"
        currentPage={1}
        totalPages={2}
      />
    );
    expect(screen.getByText("Next >")).toBeTruthy();
  });
});

describe("Message Component", () => {
  test("should display Message component with UUID, content and date", () => {
    render(<Message message={messages[0]} />);
    expect(screen.getByText("Sender UUID: 2")).toBeTruthy();
    expect(screen.getByText("Message 1")).toBeTruthy();
    expect(screen.getByText("Sunday Feb 19, 2012 at 03:42:11")).toBeTruthy();
  });
});

describe("Sort Messages By Date ascending or descending", () => {
  test("should toggle sorted messages by date using Sort button", async () => {
    // can override the messages sent for this test from here, but left it to take the data.json messages for this test
    render(<App />);
    fireEvent(
      screen.getByText("Sort by Date(asc)"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );
    expect(screen.getByText("Sort by Date(desc)")).toBeTruthy();
    expect(screen.queryByText(/2018/)).toBeNull();
    expect(await screen.findAllByText(/2018/)).toBeTruthy();

    fireEvent(
      screen.getByText("Sort by Date(desc)"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );
    expect(screen.getByText("Sort by Date(asc)")).toBeTruthy();
    expect(screen.queryByText(/2012/)).toBeNull();
    expect(await screen.findAllByText(/2012/)).toBeTruthy();
  });
});

describe("Clicking Next or Prev button", () => {
  test("should show new message and remove current message in the page", async () => {
    // can override the messages sent for this test from here, but left it to take the data.json messages for this test
    render(<App />);
    expect(screen.queryAllByText("18")).toHaveLength(0);
    expect(
      screen.queryAllByText(/Monday Dec 17, 2012 at 09:08:37/)
    ).toHaveLength(0);
    fireEvent(
      screen.getByText("Next >"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );
    expect(
      (await screen.findAllByText("Sender UUID: 1")) &&
        (await screen.findByText("18"))
    ).toBeTruthy();
    expect(
      await screen.findByText(/Monday Dec 17, 2012 at 09:08:37/)
    ).toBeTruthy();

    fireEvent(
      screen.getByText("< Prev"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );
    expect(
      (await screen.findAllByText("Sender UUID: 2")) &&
        (await screen.findByText("15"))
    ).toBeTruthy();
    expect(
      await screen.findByText(/Sunday Feb 19, 2012 at 03:42:11/)
    ).toBeTruthy();
  });
});

describe("Clicking on delete icon", () => {
  test("should remove the message from the screen", async () => {
    // can override the messages sent for this test from here, but left it to take the data.json messages for this test
    render(<App />);
    expect(await screen.findByText("10")).toBeTruthy();
    expect(
      await screen.findByText("Monday Nov 5, 2012 at 05:37:00")
    ).toBeTruthy();

    fireEvent(
      screen.getByTestId(`delete-icon-43532134353-10`),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true
      })
    );
    expect(screen.queryAllByText("10")).toHaveLength(0);
    expect(
      screen.queryAllByText(/Monday Nov 5, 2012 at 05:37:00/)
    ).toHaveLength(0);
  });
});
