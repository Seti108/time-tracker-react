import { useEffect, useState } from "react";
import "./StopWatch.css";

export const StopWatch = () => {
  const [currentTime, setCurrentTime] = useState(null);
  const [trackingStarted, setTrackingStarted] = useState(false);
  const [trackerList, setTrackerList] = useState([]);
  const [trackerIndex, setTrackerIndex] = useState(0);
  const [changeName, setChangeName] = useState(false);

  // Functions
  const startTracking = () => {
    setCurrentTime(Math.floor(Date.now() / 1000));
    setTrackingStarted(true);
  };

  const stopTracking = () => {
    const stopTime = Math.floor(Date.now() / 1000); // Capture the stopTime
    setTrackingStarted(false);
    // Use the captured stopTime and the currentTime

    const newTracker = new TrackerObject(stopTime, currentTime, trackerIndex);
    setTrackerIndex(trackerIndex + 1);
    setTrackerList((trackerList) => [newTracker, ...trackerList]);
  };
  // Get human readable time from UNIX timestamp
  function getHoursAndMinutes(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours}:${minutes}`;
  }
  //Get the date from UNIX stamp in YY-MM-DD
  function getFormattedDate(timestamp) {
    const date = new Date(timestamp * 1000); // Multiply by 1000 to convert from seconds to milliseconds

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so we add 1
    const year = String(date.getFullYear()).slice(-2); // Get the last two digits of the year

    return `${day}-${month}-${year}`;
  }

  //Get the minutes spent on a task
  const getMinutesFromUnix = (start, stop) => {
    const seconds = Number(stop) - Number(start);
    return Math.floor(seconds / 60);
  };
  //Get the hours spent on a task
  const getHoursFromUnix = (start, stop) => {
    const seconds = parseFloat(stop) - parseFloat(start);
    return (seconds / 3600).toFixed(1);
  };

  // Delete a time tracker item by updating the state of timeTracker

  const deleteTrackerItem = (e) => {
    const index = Number(e.target.dataset.index);
    setTrackerList((trackerList) => {
      const updatedList = trackerList.filter(
        (tracker) => tracker.index !== index
      );
      updatedList.forEach((element, index) => {
        element.index = index;
      });
      setTrackerIndex(updatedList.length);
      return updatedList;
    });
  };

  // Add a function that updates the name of the correct index

  //On click, take the value of the input and push it into the state at the proper index
  // Create a new instance of the TrackerObject class
  class TrackerObject {
    constructor(stopTime, startTime, index) {
      this.name = "Tidrapport";
      this.date = getFormattedDate(stopTime);
      this.start = getHoursAndMinutes(startTime);
      this.stop = getHoursAndMinutes(stopTime);
      this.minutes = getMinutesFromUnix(startTime, stopTime);
      this.hours = getHoursFromUnix(startTime, stopTime);
      this.description = "En kommentar";
      this.index = index;
      this.edit = false;
    }
  }

  return (
    <>
      <section className="stop-watch">
        <div className="stop-watch-container">
          {trackingStarted ? (
            <div>
              <button className="stop-watch-stop" onClick={stopTracking}>
                Stop
              </button>
              <span className="stop-watch-current-time">
                Tidtagaren startad: {getHoursAndMinutes(currentTime)}
              </span>
            </div>
          ) : (
            <button className="stop-watch-start" onClick={startTracking}>
              Start
            </button>
          )}
        </div>
      </section>
      <section className="time-tracker-list">
        {trackerList.map(
          ({
            name,
            date,
            start,
            stop,
            minutes,
            hours,
            description,
            index,
            edit,
          }) => (
            <div
              key={index}
              className="time-tracker-list-container"
              data-index={index}
            >
              {changeName ? (
                <div className="time-tracker-list-item time-tracker-list-label">
                  <img
                    src="../../src/assets/PencilSquare.svg"
                    alt="redigera namn"
                    onClick={() => setChangeName(false)}
                  />
                  <form>
                    <input data-index={index} type="text"></input>
                    <button data-index={index} type="submit">
                      Spara
                    </button>
                  </form>
                </div>
              ) : (
                <div className="time-tracker-list-item time-tracker-list-label">
                  <img
                    src="../../src/assets/PencilSquare.svg"
                    alt="redigera namn"
                    data-index={index}
                    onClick={() => setChangeName(true)}
                  />
                  <span>{name}</span>
                </div>
              )}
              <div className="time-tracker-list-item time-tracker-list-date">
                <span>{date}</span>
              </div>
              <div className="time-tracker-list-item time-tracker-list-time">
                <span>
                  {start} - {stop}
                </span>
              </div>
              <div className="time-tracker-list-item time-tracker-list-minutes">
                <span>{minutes} min</span>
                <span> ARW</span>
                <span>~ {hours} tim</span>
              </div>
              <div className="time-tracker-list-item time-tracker-list-delete">
                <img
                  src="./src/assets/Trash.svg"
                  alt="ta bort tidrapport"
                  onClick={deleteTrackerItem}
                  data-index={index}
                />
              </div>
              <div className="time-tracker-list-item time-tracker-list-description">
                <img src="./src/assets/PencilSquare.svg" alt="redigera namn" />
                <span>Skriv dina kommentarer här...</span>
              </div>
            </div>
          )
        )}
        ;
      </section>
    </>
  );
};
