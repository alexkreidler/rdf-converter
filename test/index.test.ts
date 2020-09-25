import { foo } from "../src/index";

test("basic", () => {
  expect(foo()).toBeDefined();
});
