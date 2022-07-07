import { format, isValid } from 'date-fns';
import parseISO from 'date-fns/parseISO';
import { es, enUS as en } from 'date-fns/locale';

const dateLocales = { es, en };

export default function dateFilter(value, dateFormat = 'dd/MM/yyyy', locale = 'es') {
  if (typeof value !== 'string' && isValid(value)) {
    return format(value, dateFormat, { locale: dateLocales[locale] });
  }
  return format(parseISO(value), dateFormat, { locale: dateLocales[locale] });
}
