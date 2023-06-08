import type { AxiosRequestConfig } from 'axios';
import { IHttpClient } from '@automatisch/types';

const fetchPageContent = async ($: { http?: IHttpClient }, url: string) => {
    const request: AxiosRequestConfig = {
        url: `https://www.w3.org/services/html2txt?url=${encodeURIComponent(url)}&noinlinerefs=on&nonums=on`,
        method: 'GET',
    };
    const response = await $.http.request(request);

    const { data } = response

    const trimmed = data.replace(/(\r\n|\n|\r)/gm, "").replace(/\s+/g, " ").trim()
    const sliced = trimmed.slice(0, 3500);

    return sliced;
};

export default fetchPageContent;
