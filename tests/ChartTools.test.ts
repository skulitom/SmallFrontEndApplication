import { getAverageArray, calculateAge } from '../src/components/utils/ChartTools';

test("Correct age returned", () => {
  expect(calculateAge('20/06/1997')).toBe(24);
});

test("Average calculated correctly", () => {
  expect(getAverageArray([20, 40, 9], [1, 2, 3])).toBe([20, 20, 3]);
});

test("Average calculated with zero", () => {
  expect(getAverageArray([20, 40, 9], [0, 2, 3])).toBe([0, 20, 3]);
});