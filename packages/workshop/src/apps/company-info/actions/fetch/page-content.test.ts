import axios from 'axios';
import fetchPageContent from './page-content';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchPageContent', () => {
    it('should fetch and trim the content of a web page', async () => {
        const url = 'https://example.com';
        const expected = 'Hello, world!';

        mockedAxios.request.mockResolvedValueOnce({ data: expected });
        const $ = {
            http: mockedAxios,
        };

        const result = await fetchPageContent($, url);

        expect($.http.request).toHaveBeenCalledWith({
            url: `https://www.w3.org/services/html2txt?url=${encodeURIComponent(url)}&noinlinerefs=on&nonums=on`,
            method: 'GET',
        });
        expect(result).toEqual(expected);
    });
});
