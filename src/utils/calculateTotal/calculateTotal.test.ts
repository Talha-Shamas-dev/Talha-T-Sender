import { describe, it, expect } from 'vitest';
import { calculateTotal } from './calculateTotal';

describe('calculateTotal', () => {
  it('returns 0 for empty input', () => {
    expect(calculateTotal("")).toBe(0);
  });

  it('parses single number strings correctly', () => {
    expect(calculateTotal("42")).toBe(42);
    expect(calculateTotal("0")).toBe(0);
    expect(calculateTotal("3.14")).toBeCloseTo(3.14);
  });

  it('parses comma-separated numbers', () => {
    expect(calculateTotal("1,2,3")).toBe(6);
    expect(calculateTotal("10, 20, 30")).toBe(60);
  });

  it('parses newline-separated numbers', () => {
    expect(calculateTotal("1\n2\n3")).toBe(6);
    expect(calculateTotal("5\n10\n15")).toBe(30);
  });

  it('handles mixed commas and newlines', () => {
    expect(calculateTotal("1,2\n3,4\n5")).toBe(15);
  });

  it('ignores invalid numbers', () => {
    expect(calculateTotal("1,abc,3")).toBe(4);
    expect(calculateTotal("10\nfoo\n20")).toBe(30);
  });

  it('trims spaces properly', () => {
    expect(calculateTotal(" 1 , 2 \n 3 ")).toBe(6);
  });
});