import { parseISO } from 'date-fns';
import formatRelative from 'date-fns/formatRelative';
import { enAU } from 'date-fns/locale';

const pureRelativeDate = (date) => {
  const formatRelativeLocale = {
    lastWeek: "'last' eeee",
    yesterday: "'yesterday'",
    today: "'today'",
    tomorrow: "'tomorrow'",
    nextWeek: "'next' eeee",
    other: ' dd LLL yy',
  };
  const locale = {
    ...enAU,
    formatRelative: (token) => formatRelativeLocale[token],
  };

  const today = new Date();
  const parsed = parseISO(date);
  return formatRelative(parsed, today, { locale });
};

export default pureRelativeDate;
