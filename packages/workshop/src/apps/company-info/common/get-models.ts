import { IGlobalVariable } from "@automatisch/types";
import { AxiosRequestConfig } from "axios";

const getModels = async ($: IGlobalVariable) => {
    const request: AxiosRequestConfig = {
        baseURL: 'https://api.openai.com',
        url: '/v1/models',
        headers: {
            'Authorization': `Bearer ${$.auth.data.apiKey}`
        },
    }

    return await $.http.request(request);
};

export default getModels;