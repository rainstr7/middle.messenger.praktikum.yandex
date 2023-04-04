import {expect} from 'chai';
import {set} from './helpers';

describe('set function', () => {
    const keyPath = 'test';
    const value = 'some value';
    let obj: Record<string, unknown>;

    beforeEach(() => {
        obj = {};
    });

    it('should set a value by keyPath to the object', () => {
        set(obj, keyPath, value);

        expect(obj).to.haveOwnProperty(keyPath, value);
    });

    it('should return original object if it`s is not an object', () => {
        const notAnObject = 'string';

        const result = set(notAnObject, keyPath, value);

        expect(result).to.eq(notAnObject);
    });

    it('should throw an error if path is not a string', () => {
        const keyPathNotAString = 10;

        // @ts-ignore because we want to check behaviour in runtime
        const f = () => set(obj, keyPathNotAString, value);

        expect(f).to.throw(Error);
    });
});
