import { Solar } from "./Solar";
import { Lunar } from "./Lunar";
import { EightChar } from "./EightChar";

export class Person {
  private name: string;
  private birthday: Solar;
  private lunarBirthday: Lunar;
  private eightChar: EightChar;

  constructor(name: string, birthday: Date) {
    this.name = name;
    this.birthday = Solar.fromYmdHms(1970, 10, 1, 10, 10, 0);
    this.lunarBirthday = this.birthday.getLunar();
    this.eightChar = this.lunarBirthday.getEightChar();
    this.eightChar.setSect(1); // 晚子算隔天
  }

  public getName(): string {
    return this.name;
  }

  toString(): string {
    return `Name: ${
      this.name
    }, Birthday: ${this.birthday.toFullString()}, Lunar: ${this.lunarBirthday.toFullString()}`;
  }

  printEightChar(): void {
    let d = this.eightChar;
    console.log(d);
    console.log(
      d.getYearWuXing() +
        ", " +
        d.getMonthWuXing() +
        ", " +
        d.getDayWuXing() +
        ", " +
        d.getTimeWuXing()
    );
    console.log(
      d.getYearNaYin() +
        ", " +
        d.getMonthNaYin() +
        ", " +
        d.getDayNaYin() +
        ", " +
        d.getTimeNaYin()
    );
    console.log(
      d.getYearShiShenGan() +
        ", " +
        d.getMonthShiShenGan() +
        ", " +
        d.getDayShiShenGan() +
        ", " +
        d.getTimeShiShenGan()
    );

    // 年支十神
    console.log("年支十神 = " + d.getYearShiShenZhi());

    // 月支十神
    console.log("月支十神 = " + d.getMonthShiShenZhi());

    // 日支十神
    console.log("日支十神 = " + d.getDayShiShenZhi());

    // 时支十神
    console.log("时支十神 = " + d.getTimeShiShenZhi());

    // 获取男运
    var yun = d.getYun(0);
    console.log("gender = " + yun.getGender());
    // 起运
    console.log(
      "出生" +
        yun.getStartYear() +
        "年" +
        yun.getStartMonth() +
        "个月" +
        yun.getStartDay() +
        "天后起运"
    );

    // 获取大运表
    var daYunArr = yun.getDaYun();
    for (var i = 0, j = daYunArr.length; i < j; i++) {
      var daYun = daYunArr[i];
      console.log(
        "大运[" +
          i +
          "] = " +
          daYun.getStartYear() +
          "年 " +
          daYun.getStartAge() +
          "岁 " +
          daYun.getGanZhi()
      );
    }

    // 第1次大运流年
    var LiuNianArr = daYunArr[1].getLiuNian();
    for (var i = 0, j = LiuNianArr.length; i < j; i++) {
      var liuNian = LiuNianArr[i];
      console.log(
        "流年[" +
          i +
          "] = " +
          liuNian.getYear() +
          "年 " +
          liuNian.getAge() +
          "岁 " +
          liuNian.getGanZhi()
      );
    }
  }
}
