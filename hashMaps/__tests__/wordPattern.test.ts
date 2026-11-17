import { wordPattern } from '../wordPattern.ts';
import { describe, expect, it } from '@jest/globals';

describe('isAnagram', () => {
    it('should pass tests', () => {
        let pattern = "abba", s = "dog cat cat dog";
        expect(wordPattern(pattern, s)).toBe(true);

        pattern = "abba", s = "dog cat cat fish";
        expect(wordPattern(pattern, s)).toBe(false);

        pattern = "aaaa", s = "dog cat cat dog";
        expect(wordPattern(pattern, s)).toBe(false);

        pattern = "abc", s = "b c a";
        expect(wordPattern(pattern, s)).toBe(true);

        pattern = "abba", s = "dog dog dog dog";
        expect(wordPattern(pattern, s)).toBe(false);
    });
});