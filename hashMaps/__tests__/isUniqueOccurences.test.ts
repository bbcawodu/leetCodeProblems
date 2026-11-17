import { isUniqueOccurences } from '../isUniqueOccurences.ts';
import { describe, expect, it } from '@jest/globals';

describe('isUniqueOccurences', () => {
    it('should pass tests', () => {
        let array = [1,2,2,1,1,3];
        expect(isUniqueOccurences(array)).toBe(true);

        array = [1,2];
        expect(isUniqueOccurences(array)).toBe(false);

        array = [-3,0,1,-3,1,1,1,-3,10,0];
        expect(isUniqueOccurences(array)).toBe(true);
    });
});