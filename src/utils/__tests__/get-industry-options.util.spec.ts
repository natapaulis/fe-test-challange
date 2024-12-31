import { describe, it, expect } from 'vitest';
import { getIndustryOptions } from '../get-industry-options.util';
import { Customer } from 'types';

describe('getIndustryOptions', () => {
    it('should return an empty array when customerList is empty', () => {
        const customerList: Customer[] = [];
        const result = getIndustryOptions(customerList);
        expect(result).toEqual([]);
    });

    it('should return unique industry options', () => {
        const customerList: Customer[] = [
            { id: 1, company: 'Customer 1', industry: 'Tech' },
            { id: 2, company: 'Customer 2', industry: 'Finance' },
            { id: 3, company: 'Customer 3', industry: 'Tech' },
        ]  as any;
        const result = getIndustryOptions(customerList);
        expect(result).toEqual([
            { text: 'Tech', value: 'Tech' },
            { text: 'Finance', value: 'Finance' },
        ]);
    });

    it('should handle customers with no industry', () => {
        const customerList: Customer[] = [
            { id: 1, company: 'Customer 1', industry: 'Tech' },
            { id: 2, company: 'Customer 2', industry: '' },
            { id: 3, company: 'Customer 3', industry: 'Finance' },
        ] as any;
        const result = getIndustryOptions(customerList);
        expect(result).toEqual([
            { text: 'Tech', value: 'Tech' },
            { text: '', value: '' },
            { text: 'Finance', value: 'Finance' },
        ]);
    });
});