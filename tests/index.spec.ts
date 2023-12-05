import "mocha";
import { assert } from "chai";

import BenMingPan from "../src/index";

describe("NPM Package", () => {
  it("should be an object", () => {
    assert.isObject(BenMingPan);
  });

});
