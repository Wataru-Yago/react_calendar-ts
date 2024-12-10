import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';

interface Event {
  date: Date;
  title: string;
}

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState("");

  const renderHeader = () => {
    return (
      <div className="header row flex-middle">
        <div className="col col-start" onClick={prevMonth}>
          <div className="icon">←</div>
        </div>
        <div className="col col-center">
          <span>{format(currentMonth, "yyyy年 MM月")}</span>
        </div>
        <div className="col col-end" onClick={nextMonth}>
          <div className="icon">→</div>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const date = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(date, i), "EEE")}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= monthEnd) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;

        days.push(
            <div
            className={`col cell ${!isSameMonth(day, monthStart) ? "disabled" : selectedDate && isSameDay(day, selectedDate) ? "selected" : ""}`}
            key={day.toString()}
            onClick={() => onDateClick(cloneDay)}
            >
            <span className="number">{formattedDate}</span>
            <div className="events">
              {events
                .filter(event => isSameDay(event.date, day))
                .map((event, idx) => (
                  <div key={idx} className="event">
                    {event.title}
                  </div>
                ))}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(<div className="row" key={day.toString()}>{days}</div>);
      days = [];
    }

    return <div className="body">{rows}</div>;
  };

  const onDateClick = (day: Date) => {
    setSelectedDate(day);
  };

  const prevMonth = () => {
    setCurrentMonth(prev => addDays(prev, -30));
  };

  const nextMonth = () => {
    setCurrentMonth(prev => addDays(prev, 30));
  };

  const handleAddEvent = () => {
    if (selectedDate && newEvent.trim()) {
      setEvents([...events, { date: selectedDate, title: newEvent }]);
      setNewEvent("");
    }
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      <div className="event-form">
        <input
          type="text"
          placeholder="新しい予定を追加"
          value={newEvent}
          onChange={(e) => setNewEvent(e.target.value)}
        />
        <button onClick={handleAddEvent}>追加</button>
      </div>
    </div>
  );
};

export default Calendar;
