import "mocha";
import { assert } from "chai";

import { Solar } from "../src/Solar";
import { SolarUtil } from "../src/Solar/SolarUtil";

describe("Solar", () => {
  it("toYmd()", () => {
    const solar = Solar.fromYmd(2019, 5, 1);
    assert.strictEqual(solar.toYmd(), "2019-05-01");
  });

  it("toString()", () => {
    const solar = Solar.fromYmd(2019, 5, 1);
    assert.strictEqual(solar.toString(), "2019-05-01");
  });

  it("toFullString()", () => {
    const solar = Solar.fromYmd(2019, 5, 1);
    assert.strictEqual(
      solar.toFullString(),
      "2019-05-01 00:00:00 星期三 金牛座"
    );
  });

  it("getLunar()", () => {
    const solar = Solar.fromYmd(2019, 5, 1);
    const lunar = solar.getLunar();
    assert.strictEqual(lunar.toString(), "二〇一九年三月廿七");
    assert.strictEqual(
      lunar.toFullString(),
      "二〇一九年三月廿七 己亥(猪)年 戊辰(龙)月 戊戌(狗)日 子(鼠)时 纳音[平地木 大林木 平地木 桑柘木] 星期三 西方白虎 星宿[参水猿](吉) 彭祖百忌[戊不受田田主不祥 戌不吃犬作怪上床] 喜神方位[巽](东南) 阳贵神方位[艮](东北) 阴贵神方位[坤](西南) 福神方位[艮](东北) 财神方位[坎](正北) 冲[(壬辰)龙] 煞[北]"
    );
  });

  it("next()", () => {
    let solar = Solar.fromYmd(2020, 1, 23);
    assert.strictEqual(solar.nextDay(1).toString(), "2020-01-24");

    solar = Solar.fromYmd(2020, 2, 3);
    assert.strictEqual(solar.nextDay(-3).toString(), "2020-01-31");

    solar = Solar.fromYmd(2020, 2, 9);
    assert.strictEqual(solar.nextDay(6).toString(), "2020-02-15");

    solar = Solar.fromYmd(2020, 1, 17);
    assert.strictEqual(solar.nextDay(1).toString(), "2020-01-18");
  });

  it("getJulianDay()", () => {
    const solar = Solar.fromYmd(2020, 7, 15);
    assert.strictEqual(solar.getJulianDay(), 2459045.5);
  });

  it("fromJulianDay()", () => {
    const solar = Solar.fromJulianDay(2459045.5);
    assert.strictEqual(solar.toYmdHms(), "2020-07-15 00:00:00");
  });

  it("1", () => {
    const solar = Solar.fromYmdHms(2020, 5, 24, 13, 0, 0);
    assert.strictEqual(solar.getLunar().toString(), "二〇二〇年闰四月初二");
  });

  it("6", () => {
    const solar = Solar.fromYmd(11, 1, 1);
    assert.strictEqual(solar.getLunar().toString(), "一〇年腊月初八");
  });

  it("7", () => {
    const solar = Solar.fromYmd(11, 3, 1);
    assert.strictEqual(solar.getLunar().toString(), "一一年二月初八");
  });

  it("9", () => {
    const solar = Solar.fromYmd(26, 4, 13);
    assert.strictEqual(solar.getLunar().toString(), "二六年三月初八");
  });

  it("10", () => {
    assert.strictEqual(SolarUtil.isLeapYear(1500), false);
  });

  it("14", () => {
    const solar = Solar.fromYmd(1582, 10, 4);
    assert.strictEqual(solar.nextDay(1).toYmd(), "1582-10-15");
  });

  it("15", () => {
    const solar = Solar.fromYmd(1582, 10, 15);
    assert.strictEqual(solar.nextDay(-1).toYmd(), "1582-10-04");
  });

  it("16", () => {
    const solar = Solar.fromYmd(1582, 10, 15);
    assert.strictEqual(solar.nextDay(-5).toYmd(), "1582-09-30");
  });
});
