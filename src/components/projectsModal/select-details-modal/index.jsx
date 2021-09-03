import React, { useState } from 'react';
import './style.css';
import { FaRegStar } from 'react-icons/fa';
import { FiCalendar } from 'react-icons/fi';
import { IconContext } from 'react-icons';
import {
  Menu,
  MenuButton,
  FocusableItem,
  MenuItem,
  MenuRadioGroup,
} from '@szhsin/react-menu';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';
import '@szhsin/react-menu/dist/index.css';
import Calendar from '../../calendar';
export default function DetailsTask({ title, setDatePicker, selectDate }) {
  const [date, setDate] = useState('');
  const setDateText = (date) => {
    setDate(date);
  };
  return (
    <div>
      <h3 className="title-add-details">{title}</h3>
      <div className="content-add-details">
        <div
          className={`${'wrapper-box flex-box'} ${date !== '' && 'activeCal'}`}
        >
          <IconContext.Provider
            value={{
              color: '#858383',
              size: '24px',
            }}
          >
            {title === 'Priority' ? <FaRegStar /> : <FiCalendar />}
          </IconContext.Provider>
        </div>

        <Menu
          direction="right"
          menuButton={
            <MenuButton className="border-0 p-0">
              <div className="add-assigner">
                <div className="assigner-img">
                  <h4 className="title-add-details placeholder">
                    {date !== ''
                      ? format(date, 'dd MMMM yyyy', {
                          locale: enGB,
                        })
                      : (selectDate === "" || selectDate === undefined)
                        ? `Set ${title}`
                        : format(new Date(selectDate), 'dd MMMM yyyy', {
                          locale: enGB,
                        })
                    }
                  </h4>
                </div>
              </div>
            </MenuButton>
          }
        >
          <FocusableItem
            children={() => (
              <Calendar
                excludeDates
                setDatePicker={setDatePicker}
                setDateText={setDateText}
                selectDate={selectDate}
              />
            )}
          />
        </Menu>
      </div>
    </div>
  );
}
