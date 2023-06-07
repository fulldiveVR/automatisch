import path from 'node:path';
import fs from 'node:fs';
import axios from 'axios';
import { IApp } from '@automatisch/types';

import appConfig from '../config/app';

type TApps = Record<string, Promise<{ default: IApp }>>;

interface IWorkshopApp {
    id: string;
    name: string;
}

const appsPath = path.resolve(__dirname, '../apps/');
const workshopPath = path.resolve(__dirname, '../../workshop/');

let isWorkshopLoaded = false;

export const internalApps = fs
    .readdirSync(appsPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .reduce((apps, dirent) => {
        apps[dirent.name] = import(path.resolve(appsPath, dirent.name));
        return apps;
    }, {} as TApps);

const allApps = internalApps;

const getWorkshopApps = async (): Promise<IWorkshopApp[]> => {
    const response = await axios.get(`${appConfig.workshopApiUrl}/apps/list`);
    return response.data as IWorkshopApp[];
};

const downloadWorkshopApp = async (app: IWorkshopApp): Promise<string> => {
    const response = await axios({
        method: 'GET',
        url: `${appConfig.workshopApiUrl}/apps/${app.id}.js`,
        responseType: 'stream',
    });

    if (!fs.existsSync(workshopPath)) {
        fs.mkdirSync(workshopPath);
    }

    return new Promise((resolve, reject) => {
        const bundlePath = path.join(workshopPath, `${app.id}.js`);
        response.data.pipe(fs.createWriteStream(bundlePath))
            .on('error', reject)
            .on('finish', () => {
                resolve(bundlePath);
            });
    });
};

const loadWorkshopAppsIfNeeded = async () => {
    if (isWorkshopLoaded) return;

    const list = await getWorkshopApps();
    for (const app of list) {
        const path = await downloadWorkshopApp(app);
        allApps[app.id] = import(path);
    }
    isWorkshopLoaded = true;
};

const getApps = async (): Promise<TApps> => {
    await loadWorkshopAppsIfNeeded();

    return allApps;
}

export default getApps;