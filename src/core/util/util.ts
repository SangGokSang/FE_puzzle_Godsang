import dayjs, { Dayjs } from 'dayjs';
import { MyPage } from 'src/pages/myPage';

export function getContentWithEllipsis(content: string): string {
  return content.length > 10 ? content.slice(0, 6).concat('...') : content;
}

export function getDDay(birth: Dayjs): number {
  const diff = dayjs().year() - birth.year();
  const d_day = birth.add(diff + 1, 'year');
  return d_day.diff(dayjs(), 'day');
}

export function diffDay(birth: string): MyPage {
  const countNextAge = dayjs().get('y') - +birth.slice(0, 4) + 1;
  const changeBirth = dayjs('2024' + birth.substr(4));
  const targetTime = dayjs('2023-06-01');
  const dDay = changeBirth.diff(targetTime, 'days');
  const countMeals = +dDay * 3;
  const countBooks = Math.floor(+dDay / 7);
  const countBodyProfile = Math.floor(+dDay / 90);

  return { countNextAge, dDay, countMeals, countBooks, countBodyProfile };
}
