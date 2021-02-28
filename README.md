## The Problem: Chat Messages

# Installation Instructions-
 - Running on stackblitz would run the code directly, please visit this [link](https://stackblitz.com/edit/chatlist?file=App.js) to access the project on stackblitz directly. The only difference between stackblitz and local project is src folder, local project has every file/folder under src folder while stackblitz has every file/folder at main root level 
 - If running this project on a local IDE, unzip the folder to any favorable location on the machine. So the folder name would be 'chatlist'. 
 - Open cmd line at the project root location and run **'yarn'** to install all required dependencies.
 - To start the app, run **'yarn start'** to start the app.
 - This should run the app locally on your browser on **PORT 3000** automatically. If any other app is running on the same port it would ask if we can run on a different port, please enter yes in the cmd line to open the page in the browser.

# IDE-
 - Used stackblitz to run the code and also ran it on VSCode.
# Libraries Used-
  - **react/react-dom - v16.14.0** - react and react-dom libraries.
  - **react-icons - v4.2.0** - we are using delete icon from the font-awesome icons.
  - **@testing-library/react (react-testing-library) - v11.2.5** - we are using react-testing-library to assert on test cases (more on this in Testing section).

# Technology Stack - 
 - Javascript, CSS, React.js, JSX

# Folder/File Structure-
  - *index.js* - starting point for the app, imports App component here.
  - *App.js* - Contains the Header and ListContainer components here, all the app rendering happens in this functional component. Logic for sorting messages and handling messages in a page are in this component.
  - *style.css* - contains all the styling for the app
  - *components* - folder that contains all the components related to the app, in our case we have Message.js, Header.js and ErrorComponent.js.
  - *containers* - folder that contains all the containers related to the app, in our case we have only one container called ListContainer.js
  - *utils* - folder that contains all the reusable global strings/objects/utility functions. In our case we have dateUtils.js that includes all date related objects.

# Description-
  - Component Layout - We follow the react architecture of top-down approach and separating the UI into reusable components. Considering the app data flow being small, we wouldnt need to worry about data handling libraries like redux. 
  ![alt text](https://drive.google.com/uc?id=1OTG4CZuUtvlWwCZkrkPLdZIP1jQ2jfOT)

    - In index.js we render App component. App component renders Header component and ListContainer. Header component renders sort button and messages info, pages button which contains prev and next buttons along with page information, finally ListContainer that contains the complete list of messages for each page.
    - ListContainer renders the Message component which includes all the information about the message. This Message component is reused for each message. Messages are mapped inside ListContainer reusing Message component.
    - While rendering the messages added a mock delay using setTimeout to show Loading and then show messages after one second.

# Requirements & Explanation-
1. **All messages are displayed in a list.**
   - We are displaying all the messages in a list paginated with 5 per page.
2. **Each message has its content, senderUuid, and sentAt properties displayed.**
   - We are showing the content, senderUuid and sentAt for each message inside the Message.js component.
3. **Messages are displayed at-most once. If there are duplicated messages, we would like them to be deduplicated if the uuid and content are the same.**
   - Using the filtering logic explained below we are removing any duplicates with above condition.
4. **Instead of showing the sentAt timestamp, we would like to display a more human-readable string such as "DayOfTheWeek Month Day, Year at Time".**
   - We are formatting the date using the javascript date functions like getDate, getMonth, getYear, getHours, getMinutes, getSeconds to show as the requirement asked for.
5. **Support sorting by sentAt in either ascending or descending order.**
   - Sorting is done both ascending or descending order. We are using the javascript .sort() function to sort the
   data based on date. We are using the callback function in the .sort function to compare the dates and return based
   on the difference. 
6. **Support pagination through messages where each page contains 5 messages. You are welcome to implement this how you see fit, e.g. infinite scrolling, a button, etc.**
   - We are doing pagination using buttons, explained below in the Pagination logic section.
7. **Allow a message to be deleted. You are welcome to implement this how you see fit.**
   - Added delete icon for each message, user can click on the icon to delete the message. We are filtering and removing the message index from that particular page message list. 

  *Filtering logic* - We filter all the messages by checking for duplicate messages based on the uuid and content combination as mentioned in the requirements. We do filtering of messages at the start of the app before doing any of the sorting or pagination logic.

  *Sorting logic* - We provide both ascending and descending sorting by date using the toggle button, the toggle button will switch the order of all messages by date.

  *Pagination logic* - 
   - We are using pagination using Next/Prev buttons here, reason for using pagination without infinite scrolling is mainly due to the sorting functionality. Sorting on a non-rendered items might make user experience little bad.
   - We calculate the totalPages using totalMessages/maxCountPerPage.
   - We take the firstIndex of the current page and lastIndex of the current page to get the
  list of messages to show on a specific page. We use javascript slice functionality to get messages between these two indices.
   - Based on current page number we recalculate the firstIndex and lastIndex every time the next/prev button is pressed.
# Error Handling
  - We have a very simple error handling for the app. If there is any error that gets into catch statements we set the hasError state and show the ErrorComponent. This Component shows there is an error and try again with a refresh, this helps the user to not see any debug messages or blank screen on the page. A better user experience.
  - We can make this more advanced by using Toast containers on top of the screen with red color for errors and green for success messages.
# Testing
  - Using **jest** and **react-testing-library** we are running few tests as below, we chose these testing libraries because they are suggested by React website, also they have good testing performance. react-testing-library always checks the component output which shouldnt change if UI remains the same, this makes things easy to test and the test cases will not need to change for any logic change in the component.
 
  **List of tests:**
    - If the list of messages is empty, the app should show 'No Messages' text.
    - Render Header component to check for Sort Button and Next Button existence.
    - Render List Component to check for 'No Messages' text when there are no messages.
    - Render Message Component to check for Sender UUID, Content and Date values.
    - Clicking on Sort by Date button should render a text with Year as 2018 and clicking again should show Year as 2012.
    - Clicking on Next page should render Sender UUID: 1 and 18 on the screen and should not have Sender UUID: 2 and content 18 on the screen, and vice versa after clicking Prev button. 
    - Clicking on delete icon should remove the corresponding message from the screen, check for that message existence on the screen.
Command line should be something like this after running the tests:
 ![alt text](https://drive.google.com/uc?id=13FmzNrqIoec29PIFgU8Xz0wCdjGhL3gt)

  **How to run the tests:**
    - In cmd line at the root project location, run 'yarn test'
    - This should start the tests and show you the progress of tests. If all tests are passed you should see number of tests passed in green color. If any of the tests fail it will show you the details of the failed test along with DOM screenshot at that time.
