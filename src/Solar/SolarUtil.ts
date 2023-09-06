import { Solar } from ".";

export class SolarUtil {
  static WEEK: string[] = ["日", "一", "二", "三", "四", "五", "六"];
  static DAYS_OF_MONTH: number[] = [
    31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
  ];
  static XINGZUO: string[] = [
    "白羊",
    "金牛",
    "双子",
    "巨蟹",
    "狮子",
    "处女",
    "天秤",
    "天蝎",
    "射手",
    "摩羯",
    "水瓶",
    "双鱼",
  ];

  static isLeapYear(year: number): boolean {
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
  }

  static getDaysOfMonth(year: number, month: number): number {
    if (1582 === year && 10 === month) {
      return 21;
    }
    const m = month - 1;
    let d = SolarUtil.DAYS_OF_MONTH[m];
    if (m === 1 && SolarUtil.isLeapYear(year)) {
      d++;
    }
    return d;
  }

  static getDaysOfYear(year: number): number {
    if (1582 === year) {
      return 355;
    }
    return SolarUtil.isLeapYear(year) ? 366 : 365;
  }

  static getDaysInYear(year: number, month: number, day: number): number {
    let days = 0;
    for (let i = 1; i < month; i++) {
      days += SolarUtil.getDaysOfMonth(year, i);
    }
    let d = day;
    if (1582 === year && 10 === month && day >= 15) {
      if (day >= 15) {
        d -= 10;
      } else if (day > 4) {
        throw new Error(`wrong solar year ${year} month ${month} day ${day}`);
      }
    }
    days += d;
    return days;
  }

  static getWeeksOfMonth(year: number, month: number, start: number): number {
    return Math.ceil(
      (SolarUtil.getDaysOfMonth(year, month) +
        Solar.fromYmd(year, month, 1).getWeek() -
        start) /
        7
    );
  }

  static getDaysBetween(
    ay: number,
    am: number,
    ad: number,
    by: number,
    bm: number,
    bd: number
  ): number {
    let n;
    let days;
    let i;
    if (ay == by) {
      n =
        SolarUtil.getDaysInYear(by, bm, bd) -
        SolarUtil.getDaysInYear(ay, am, ad);
    } else if (ay > by) {
      days = SolarUtil.getDaysOfYear(by) - SolarUtil.getDaysInYear(by, bm, bd);
      for (i = by + 1; i < ay; i++) {
        days += SolarUtil.getDaysOfYear(i);
      }
      days += SolarUtil.getDaysInYear(ay, am, ad);
      n = -days;
    } else {
      days = SolarUtil.getDaysOfYear(ay) - SolarUtil.getDaysInYear(ay, am, ad);
      for (i = ay + 1; i < by; i++) {
        days += SolarUtil.getDaysOfYear(i);
      }
      days += SolarUtil.getDaysInYear(by, bm, bd);
      n = days;
    }
    return n;
  }
}
