import { isCloseStrings } from '../isCloseStrings.ts';
import { describe, expect, it } from '@jest/globals';

describe('isCloseStrings', () => {
    it('should pass tests', () => {
        let word1 = "abc";
        let word2 = "bca";
        expect(isCloseStrings(word1, word2)).toBe(true);

        word1 = "a";
        word2 = "aa";
        expect(isCloseStrings(word1, word2)).toBe(false);

        word1 = "cabbba";
        word2 = "abbccc";
        expect(isCloseStrings(word1, word2)).toBe(true);

        word1 = "uau";
        word2 = "ssx";
        expect(isCloseStrings(word1, word2)).toBe(false);
    });
});