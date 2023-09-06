import "mocha";
import { assert } from "chai";

import { BenMingPan } from "../src/BenMingPan";
import { Gong } from "../src/Gong";
import { Solar } from "../src/Solar";

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

  // it("子位", () => {
  //   let pos = 0;
  //   let expected = new Gong(pos);
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
