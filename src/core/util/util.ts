import dayjs, { Dayjs } from 'dayjs';
import { NextRouter } from 'next/router';
import { ParsedUrlQueryInput } from 'querystring';

export function getContentWithEllipsis(content: string): string {
  return content.length > 10 ? content.slice(0, 6).concat('...') : content;
}

export function getDDay(birth: Dayjs): number {
  const diff = dayjs().year() - birth.year();
  const d_day = birth.add(diff + 1, 'year');
  return d_day.diff(dayjs(), 'day');
}

export const useMovePage = (router: NextRouter, pathname: string, query?: ParsedUrlQueryInput) => {
  return () => {
    router.push({ pathname, query });
  };
};
