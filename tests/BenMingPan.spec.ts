import "mocha";
import { assert, expect } from "chai";

import { BenMingPan } from "../src/BenMingPan";
import { Gong } from "../src/Gong";
import { Solar } from "../src/Solar";
import { Star } from "../src/Star";

describe("本命盤", () => {
  let solar = Solar.fromYmdHms(1988, 5, 9, 3, 0, 0);
  let lunar = solar.getLunar();
  let gender = 1;

  let benming = new BenMingPan(lunar, gender);

  it("命宮", () => {
    const expected = 2;
    const actual = benming.getMingGongPosition();
    assert.strictEqual(actual, expected);
  });

  it("身宮", () => {
    const expected = 6;
    const actual = benming.getShenGongPosition();
    assert.strictEqual(actual, expected);
  });

  it("命主星", () => {
    const expected = Star.createStar(26, "祿存");
    const actual = benming.getMingZhuXing();
    assert.deepEqual(actual, expected);
  });

  it("身主星", () => {
    const expected = Star.createStar(18, "文昌");
    const actual = benming.getShenZhuXing();
    assert.deepEqual(actual, expected);
  });

  it("五行", () => {
    const expected = "水";
    const actual = benming.getWuXing();
    assert.deepEqual(actual, expected);
  });

  // it("大運", () => {
  //   const expected = 2;
  //   const actual = benming.getGong(2).getDaYunStartAge();

  //   assert.strictEqual(actual, expected);
  // });

  it("紫微星", () => {
    const expected = new Star(0, "紫微");
    expected.belongToPalace = benming.getGong(1);
    expect(benming.getGong(1).getStars()).to.deep.include(expected);
  });

  it("天機星", () => {
    const expected = new Star(1, "天機");
    expected.belongToPalace = benming.getGong(0);
    expect(benming.getGong(0).getStars()).to.deep.include(expected);
  });

  it("廉貞星", () => {
    const expected = new Star(12, "廉貞");
    expected.belongToPalace = benming.getGong(5);
    expect(benming.getGong(5).getStars()).to.deep.include(expected);
  });

  it("祿存星", () => {
    const expected = new Star(26, "祿存");
    expected.belongToPalace = benming.getGong(5);
    expect(benming.getGong(5).getStars()).to.deep.include(expected);
  });

  it("天馬星", () => {
    const expected = new Star(27, "天馬");
    expected.belongToPalace = benming.getGong(2);
    expect(benming.getGong(2).getStars()).to.deep.include(expected);
  });

  it("破碎星", () => {
    const expected = new Star(44, "破碎");
    expected.belongToPalace = benming.getGong(1);
    expect(benming.getGong(1).getStars()).to.deep.include(expected);
  });

  it("天才星", () => {
    const expected = new Star(54, "天才");
    expected.belongToPalace = benming.getGong(6);
    expect(benming.getGong(6).getStars()).to.deep.include(expected);
  });

  it("天壽星", () => {
    const expected = new Star(55, "天壽");
    expected.belongToPalace = benming.getGong(10);
    expect(benming.getGong(10).getStars()).to.deep.include(expected);
  });

  it("左輔星", () => {
    const expected = new Star(16, "左輔");
    expected.belongToPalace = benming.getGong(6);
    expect(benming.getGong(6).getStars()).to.deep.include(expected);
  });

  it("天月星", () => {
    const expected = new Star(50, "天月");
    expected.belongToPalace = benming.getGong(4);
    expect(benming.getGong(4).getStars()).to.deep.include(expected);
  });

  it("文曲星", () => {
    const expected = new Star(19, "文曲");
    expected.belongToPalace = benming.getGong(6);
    expect(benming.getGong(6).getStars()).to.deep.include(expected);
  });

  it("地空星", () => {
    const expected = new Star(24, "地空");
    expected.belongToPalace = benming.getGong(9);
    expect(benming.getGong(9).getStars()).to.deep.include(expected);
  });

  it("火星", () => {
    const expected = new Star(22, "火星");
    expected.belongToPalace = benming.getGong(4);
    expect(benming.getGong(4).getStars()).to.deep.include(expected);
  });

  it("鈴星", () => {
    const expected = new Star(23, "鈴星");
    expected.belongToPalace = benming.getGong(0);
    expect(benming.getGong(0).getStars()).to.deep.include(expected);
  });

  it("三台", () => {
    const expected = new Star(56, "三台");
    expected.belongToPalace = benming.getGong(5);
    expect(benming.getGong(5).getStars()).to.deep.include(expected);
  });

  it("旬空", () => {
    const expected = new Star(60, "旬空");
    expected.belongToPalace = benming.getGong(10);
    expect(benming.getGong(10).getStars()).to.deep.include(expected);
  });

  it("天殤", () => {
    const expected = new Star(62, "天殤");
    expected.belongToPalace = benming.getGong(7);
    expect(benming.getGong(7).getStars()).to.deep.include(expected);
  });

  // it("子位", () => {
  //   let pos = 0;
  //   let expected = new Gong(pos, benming);
  //   expected.setGanIndex(0);
  //   expected.setIndex(10);

  //   const actual = benming.getGong(pos);
  //   assert.deepEqual(actual, expected);
  // });
  // it("寅位", () => {
  //   let pos = 2;

  //   let expected = new Gong(pos);
  //   expected.setGanIndex(0);
  //   expected.setIndex(0);

  //   const actual = benming.getGong(pos);
  //   assert.deepEqual(actual, expected);
  // });
  // it("亥位", () => {
  //   let pos = 11;
  //   let expected = new Gong(pos);
  //   expected.setGanIndex(9);
  //   expected.setIndex(9);

  //   const actual = benming.getGong(pos);
  //   assert.deepEqual(actual, expected);
  // });
});
