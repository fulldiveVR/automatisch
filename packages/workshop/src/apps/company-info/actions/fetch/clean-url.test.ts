import cleanUrl from './clean-url';

describe('cleanUrl', () => {
    it('should remove whitespace and return the origin of the URL', () => {
        const rawUrl = '  https://www.example.com/path/to/page.html  ';
        const expected = 'https://www.example.com';

        const result = cleanUrl(rawUrl);

        expect(result).toBe(expected);
    });

    it('should add https:// if the URL does not start with http:// or https://', () => {
        const rawUrl = 'www.example.com';
        const expected = 'https://www.example.com';

        const result = cleanUrl(rawUrl);

        expect(result).toBe(expected);
    });
});
