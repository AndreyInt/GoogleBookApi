import {classNames} from './classNames';

describe('classNames', () => {
    test('with first param', () => {
        expect(classNames('someClass')).toBe('someClass');
    });
    test('with additional class', () => {
        const expected = 'someClass cls1 cls2';
        expect(classNames('someClass', {}, ['cls1', 'cls2'])).toBe(expected);
    });
    test('with mods', () => {
        const expected = 'someClass cls1 cls2 hover black';
        expect(classNames('someClass',
            {hover: true, scroll: false, theme: undefined, black: true},
            ['cls1', 'cls2'])).toBe(expected);
    });
});
