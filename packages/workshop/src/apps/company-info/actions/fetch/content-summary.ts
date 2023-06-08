import type { AxiosRequestConfig } from 'axios';
import { IGlobalVariable } from "@automatisch/types";

const summarizeContent = async ($: IGlobalVariable, content: string) => {
    const prompt = `You are given the entire content of a website, but it doesn't have any formatting. The content includes extra text like "home," "login," and "contact." Your task is to understand the main content of the website and explain it in simple language. Imagine you're explaining it to a 10-year-old. Here's what you need to do:\n
- Focus on the main content and ignore extra sections like [16]Privacy - [17]Terms
- Figure out what the website is about and what it wants to do.
- Use your own words to explain the website's main content. Don't copy any text from the website.
- Make sure your explanation is easy for a 10-year-old to understand.
- Include all important information that a reader should know.
- Write a detailed summary that is no longer than 200 words.\n
The content of the website is provided below:\n
  "${content}"n
Now, write your summary. A person reading your summary should instantly understand the purpose of the website.`;

    const payload = {
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.3,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 400,
    };

    const request: AxiosRequestConfig = {
        baseURL: 'https://api.openai.com',
        url: '/v1/completions',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${$.auth.data.apiKey}`
        },
        data: payload,
    }

    const { data } = await $.http.request(request);

    return data.choices[0].text.trim();
}

export default summarizeContent;
