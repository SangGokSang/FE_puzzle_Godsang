import dayjs, { Dayjs } from 'dayjs';

export function getContentWithEllipsis(content: string): string {
  return content.length > 10 ? content.slice(0, 6).concat('...') : content;
}

export function getDDay(birth: Dayjs): number {
  const diff = dayjs().year() - birth.year();
  const d_day = birth.add(diff + 1, 'year');
  return d_day.diff(dayjs(), 'day');
}
