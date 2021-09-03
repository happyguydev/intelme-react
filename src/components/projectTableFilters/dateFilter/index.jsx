import React from 'react';
import { FocusableItem, Menu, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '../styles.scss';
import Calendar from '../../calendar';
import { ReactComponent as CalendarIcon } from '../../icons/calendarIcon.svg';

const DateFilter = (props) => {
  const { selectedRange, unselectRange, onSelectRange, startRange, endRange } =
    props;
  return (
    <Menu
      className="dateContainer"
      align="center"
      menuButton={({ open }) => (
        <MenuButton
          className={
            selectedRange[0] === null || selectedRange[1] === null
              ? 'filterButton'
              : 'selectedRange'
          }
        >
          {selectedRange[0] === null || selectedRange[1] === null ? (
            <>
              <CalendarIcon /> Issue Date
            </>
          ) : (
            <>
              <p>
                {' '}
                {selectedRange[0].getDate().toString().padStart(2, '0')}-
                {selectedRange[1].getDate().toString().padStart(2, '0')}{' '}
                {selectedRange[1].toLocaleString('default', { month: 'short' })}{' '}
                {selectedRange[1].getFullYear()}
              </p>
              <span onClick={() => unselectRange()}> Clear Filter </span>
            </>
          )}
        </MenuButton>
      )}
    >
      <FocusableItem
        children={() => (
          <Calendar
            startRange={startRange}
            endRange={endRange}
            onSelectRange={onSelectRange}
            hasRange
          />
        )}
      />
    </Menu>
  );
};

export default DateFilter;
