import React from 'react';
import { isToday, parseISO, isBefore } from 'date-fns';
import formatRelative from 'date-fns/formatRelative';
import { enAU } from 'date-fns/locale';
import { makeStyles } from '@material-ui/core';

const relativeDateStyles = makeStyles({
  pastDate: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '0.75rem',
    lineHeight: '1rem',
    color: 'var(--util-red-300)',
  },
  todayDate: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '0.75rem',
    lineHeight: '1rem',
    color: 'var(--util-green-normal)',
  },
  upcomingDate: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '0.75rem',
    lineHeight: '1rem',
    color: 'var(--text-normal)',
  },
});

export const RelativeDate = ({ date }) => {
  const formatRelativeLocale = {
    lastWeek: "'Last' eeee",
    yesterday: "'Yesterday'",
    today: "'Today'",
    tomorrow: "'Tomorrow'",
    nextWeek: "'Next' eeee",
    other: ' dd LLL yy',
  };

  const locale = {
    ...enAU,
    formatRelative: (token) => formatRelativeLocale[token],
  };
  const styles = relativeDateStyles();
  const today = new Date();
  const parsed = parseISO(date);
  const formattedDate = formatRelative(parsed, today, { locale });

  return (
    <>
      {isToday(parsed, today) ? (
        <span className={styles.todayDate}> {formattedDate} </span>
      ) : isBefore(parsed, today) ? (
        <span className={styles.pastDate}> {formattedDate} </span>
      ) : (
        <span className={styles.upcomingDate}>{formattedDate}</span>
      )}
    </>
  );
};

export default RelativeDate;
