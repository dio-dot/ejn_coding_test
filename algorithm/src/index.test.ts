import solution from "./index";

describe("Pocketmon GO", () => {
  test("Expected 0", () => {
    expect(solution(3, 9)).toBe(0);
  });
  test("Expected 500", () => {
    expect(solution(1, 23)).toBe(500);
  });
  test("Expected 1500", () => {
    expect(solution(5, 36)).toBe(1500);
  });
  test("Expected 6500", () => {
    expect(solution(13, 144)).toBe(6500);
  });
  test("Test", () => {
    expect(solution(0, 0)).toBe(0);
    expect(solution(0, 13)).toBe(0);
    expect(solution(13, 0)).toBe(500);
    expect(solution(25, 0)).toBe(1000);
    expect(solution(100, 10)).toBe(4500);
    expect(solution(10, 100)).toBe(4500);
    expect(solution(100, 100)).toBe(8000);
    expect(solution(1000000, 10000000)).toBe(458333000);
  });
});
