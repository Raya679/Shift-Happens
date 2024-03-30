import React, { useState, useEffect, useCallback } from 'react';

function Calendar() {
  const [selectedDate, setSelectedDate] = useState('');

  const [journalContent, setJournalContent] = useState({
    grateful: '',
    feelings: '',
    memorableMoments: ''
  });

  const getCurrentMonthYear = useCallback(() => {
    const currentDate = new Date();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  }, []);

  const showCalendar = useCallback(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const calendarArray = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarArray.push(<li key={`prev-${i}`} className="w-1/7"></li>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      calendarArray.push(
        <li
          key={i}
          id={`date-${i}`}
          className="inline-block w-1/7 h-24 text-center text-lg text-black leading-24 cursor-pointer"
          onClick={() => handleDateClick(i)}
        >
          {i}
        </li>
      );
    }

    return calendarArray;
  }, []);

  useEffect(() => {
    showCalendar();
  }, [showCalendar]);

  const handleDateClick = useCallback((day) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const selectedDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(selectedDate.toLocaleDateString());

    const selectedDateElements = document.querySelectorAll('.calendar .days li.selected');
    selectedDateElements.forEach((element) => {
      element.classList.remove('selected');
    });

    const clickedDateElement = document.getElementById(`date-${day}`);
    clickedDateElement.classList.add('selected');

    setJournalContent(getJournalEntry(selectedDate.toLocaleDateString()));
  }, []);

  function saveJournal() {
    localStorage.setItem(selectedDate, JSON.stringify(journalContent));
    alert('Journal entry saved successfully!');
  }

  function getJournalEntry(date) {
    return localStorage.getItem(date) || '';
  }

  return (
    <div>
      <h1 className="text-center text-3xl font-bold mb-4 mx-auto">My Journal</h1>
      <div className="calendar max-w-screen-lg mx-auto mt-10 h-screen">
        <div className="month text-center font-semibold">
          {getCurrentMonthYear()}
        </div>
        <ul className="weekdays m-0 p-2 bg-blue-300">
          <li className="inline-block w-1/7 text-center text-black">Mon</li>
          <li className="inline-block w-1/7 text-center text-black">Tue</li>
          <li className="inline-block w-1/7 text-center text-black">Wed</li>
          <li className="inline-block w-1/7 text-center text-black">Thu</li>
          <li className="inline-block w-1/7 text-center text-black">Fri</li>
          <li className="inline-block w-1/7 text-center text-black">Sat</li>
          <li className="inline-block w-1/7 text-center text-black">Sun</li>
        </ul>
        <ul className="days w-full pt-0 bg-blue-400 m-0">
          {showCalendar()}
        </ul>
        <div className="journal-entry">
          <div className="selected-date">{selectedDate}</div>
          <div className="question-answer">
            <label htmlFor="grateful">What are you grateful for today?</label>
            <textarea
              id="grateful"
              value={journalContent.grateful}
              onChange={(e) => setJournalContent({...journalContent, grateful: e.target.value})}
              className="w-full h-32 p-2 text-lg border border-gray-300 shadow rounded-lg mb-5 focus:outline-none"
              name="grateful"
            ></textarea>
          </div>
          <div className="question-answer">
            <label htmlFor="feelings">How did you feel today?</label>
            <textarea
              id="feelings"
              value={journalContent.feelings}
              onChange={(e) => setJournalContent({...journalContent, feelings: e.target.value})}
              className="w-full h-32 p-2 text-lg border border-gray-300 shadow rounded-lg mb-5 focus:outline-none"
              name="feelings"
            ></textarea>
          </div>
          <div className="question-answer">
            <label htmlFor="memorableMoments">Any memorable moments?</label>
            <textarea
              id="memorableMoments"
              value={journalContent.memorableMoments}
              onChange={(e) => setJournalContent({...journalContent, memorableMoments: e.target.value})}
              className="w-full h-32 p-2 text-lg border border-gray-300 shadow rounded-lg mb-5 focus:outline-none"
              name="memorableMoments"
            ></textarea>
          </div>
          <button
            onClick={saveJournal}
            className="block mx-auto text-lg text-center bg-blue-500 rounded-lg border-none h-8 w-24 hover:opacity-90"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
