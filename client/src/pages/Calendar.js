import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

function Calendar() {
  const { user } = useAuthContext();
  const [selectedDate, setSelectedDate] = useState('');
  const [journalContent, setJournalContent] = useState({
    grateful: '',
    feelings: '',
    memorableMoments: ''
  });
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getCurrentMonthYear = useCallback(() => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  }, [currentDate]);

  const handleDateClick = useCallback(async (day) => {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const selectedDate = new Date(currentYear, currentMonth, day).toLocaleDateString();
    setSelectedDate(selectedDate);
    await fetchJournalEntry(selectedDate);
  }, [currentDate]);

  const showCalendar = useCallback(() => {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const calendarArray = [];
    const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarArray.push(<li key={`prev-${i}`} className="w-1/7 h-24"></li>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      calendarArray.push(
        <li
          key={i}
          id={`date-${i}`}
          className="inline-block w-1/7 h-24 text-center text-lg text-black leading-24 cursor-pointer border border-gray-200 py-2"
          onClick={() => handleDateClick(i)}
        >
          {i}
        </li>
      );
    }
    return (
      <div className="grid grid-cols-7 gap-1">
        {dayLabels.map((label, index) => (
          <div key={index} className="inline-block text-center text-black font-semibold py-2">{label}</div>
        ))}
        {calendarArray}
      </div>
    );
  }, [currentDate, handleDateClick]);
  
  const saveJournal = async () => {
    try {
      const response = await axios.post('/api/calendar/add', {
        grateful: journalContent.grateful,
        feelings: journalContent.feelings,
        memorableMoments: journalContent.memorableMoments,
        date: selectedDate // Pass the selected date to the backend
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });
      await fetchJournalEntry(selectedDate); // Fetch updated content after saving
    } catch (error) {
      console.error('Error saving journal entry:', error);
    }
  };

  const fetchJournalEntry = async (date) => {
    try {
      if (user && user.token) {
        const response = await axios.get(`/api/calendar/date?date=${date}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        const journalData = response.data;
        setJournalContent(journalData);
      }
    } catch (error) {
      console.error('Error fetching journal entry:', error);
    }
  };

  useEffect(() => {
    fetchJournalEntry(selectedDate); // Fetch journal entry when the component mounts
  }, [selectedDate]);

  return (
    <div className="max-w-screen-lg mx-auto mt-10 h-screen">
      <h1 className="text-center text-3xl font-bold mb-4">My Journal</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <button className="text-lg font-semibold" onClick={handlePreviousMonth}>
            &lt; Previous Month
          </button>
          <div className="text-center font-semibold">
            {getCurrentMonthYear()}
          </div>
          <button className="text-lg font-semibold" onClick={handleNextMonth}>
            Next Month &gt;
          </button>
        </div>
        {showCalendar()}
      </div>
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <div className="selected-date mb-4">{selectedDate}</div>
        <div className="question-answer mb-4">
          <label htmlFor="grateful">What are you grateful for today?</label>
          <textarea
            id="grateful"
            value={journalContent.grateful}
            onChange={(e) => setJournalContent({...journalContent, grateful: e.target.value})}
            className="w-3/4 h-32 p-2 text-lg border border-gray-300 shadow rounded-lg focus:outline-none"
            name="grateful"
          ></textarea>
        </div>
        <div className="question-answer mb-4">
          <label htmlFor="feelings">How did you feel today?</label>
          <textarea
            id="feelings"
            value={journalContent.feelings}
            onChange={(e) => setJournalContent({...journalContent, feelings: e.target.value})}
            className="w-3/4 h-32 p-2 text-lg border border-gray-300 shadow rounded-lg focus:outline-none"
            name="feelings"
          ></textarea>
        </div>
        <div className="question-answer mb-4">
          <label htmlFor="memorableMoments">Any memorable moments?</label>
          <textarea
            id="memorableMoments"
            value={journalContent.memorableMoments}
            onChange={(e) => setJournalContent({...journalContent, memorableMoments: e.target.value})}
            className="w-3/4 h-32 p-2 text-lg border border-gray-300 shadow rounded-lg focus:outline-none"
            name="memorableMoments"
          ></textarea>
        </div>
        <button
          onClick={saveJournal}
          className="block mx-auto text-lg text-center bg-blue-500 rounded-lg border-none h-10 w-24 hover:opacity-90"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Calendar;