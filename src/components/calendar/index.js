import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
// import 'react-nice-dates/build/style.css';
import './style.css';

export default function Calendar({
  setDatePicker,
  setDateText,
  excludeDates,
  hasRange,
  selectDate,
  onSelectRange,
  startRange,
  endRange,
}) {
  const [startDate, setStartDate] = useState('');

  return (
    <>
      {!hasRange ? (
        <div className="calendar div-feature">
          <div className="calendar-content">
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setDatePicker(date);
                setDateText(date);
              }}
              minDate={excludeDates ? new Date() : undefined}
              useWeekdaysShort={true}
              openToDate={
                (selectDate === "" || selectDate === undefined ) ?
                  new Date() : new Date(selectDate)
              }
              inline
            />
          </div>
        </div>
      ) : (
        <div className="calendar div-feature">
          <div className="calendar-content">
            <DatePicker
              selectsRange
              startDate={startRange}
              endDate={endRange}
              selected={startDate}
              shouldCloseOnSelect={true}
              onChange={(update) => onSelectRange(update)}
              minDate={excludeDates ? new Date() : undefined}
              useWeekdaysShort={true}
              inline
            />
          </div>
        </div>
      )}
    </>
  );
}