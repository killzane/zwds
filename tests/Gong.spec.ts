import "mocha";
import { assert } from "chai";

import { Gong } from "../src/Gong";
import { BenMingPan } from "../src/BenMingPan";
import { Solar } from "../src/Solar";

describe("constructor", () => {
  it("should create a Gong object with correct properties", () => {
    let solar = Solar.fromYmdHms(1988, 5, 9, 3, 0, 0);
    let lunar = solar.getLunar();
    let gender = 1;

    let benming = new BenMingPan(lunar, gender);

    const houseNumber = 0;
    const gong = new Gong(houseNumber, benming);

    assert.isObject(gong);
    assert.strictEqual(gong.getBenMingPan(), benming);
    assert.equal(gong.getZhiIndex(), houseNumber);
  });
});

describe("宮位", () => {
    let solar = Solar.fromYmdHms(1988, 5, 9, 3, 0, 0);
    let lunar = solar.getLunar();
    let gender = 1;

    let benming = new BenMingPan(lunar, gender);

    const houseNumber = 0;
    const gong = new Gong(houseNumber, benming);

  it("干", () => {
    const expected = '甲';
    const actual = gong.getGan();
    assert.strictEqual(actual, expected);
  });

  it("支", () => {
    const expected = '子';
    const actual = gong.getZhi();
    assert.strictEqual(actual, expected);
  });

  it("人事十二宮", ()=>{
    const expected = '夫妻';
    const actual = gong.getGongName();
    assert.strictEqual(actual, expected);
  })
});
