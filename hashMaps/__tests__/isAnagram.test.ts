import {isAnagram} from '../isAnagram.ts';
import { describe, expect, it } from '@jest/globals';

describe('isAnagram', () => {
    it('should pass tests', () => {
        let s = "anagram", t = "nagaram";
        expect(isAnagram(s, t)).toBe(true);

        s = "rat", t = "car";
        expect(isAnagram(s, t)).toBe(false);

        s = "aacc", t = "ccac";
        expect(isAnagram(s, t)).toBe(false);
    });
});