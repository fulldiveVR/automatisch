import { IApp } from '@automatisch/types';
import appInfoConverter from '../helpers/app-info-converter';
import getApp from '../helpers/get-app';
import getApps, { internalApps } from '../helpers/get-apps';

class App {
  static async findAll(name?: string, stripFuncs = true): Promise<IApp[]> {
    const list = Object.keys(await getApps());

    if (!name) {
      return Promise.all(
        list.map(
          async (name) => await this.findOneByName(name, stripFuncs)
        )
      );
    }

    return Promise.all(
      list
        .filter((app) => app.includes(name.toLowerCase()))
        .map(async (name) => await this.findOneByName(name, stripFuncs))
    );
  }

  static async findOneByName(name: string, stripFuncs = false): Promise<IApp> {
    const rawAppData = await getApp(name.toLocaleLowerCase(), stripFuncs);

    return appInfoConverter(rawAppData);
  }

  static async findOneByKey(key: string, stripFuncs = false): Promise<IApp> {
    const rawAppData = await getApp(key, stripFuncs);

    return appInfoConverter(rawAppData);
  }

  static async checkAppAndAction(appKey: string, actionKey: string): Promise<void> {
    const app = await this.findOneByKey(appKey);

    if (!actionKey) return;

    const hasAction = app.actions?.find(action => action.key === actionKey);

    if (!hasAction) {
      throw new Error(`${app.name} does not have an action with the "${actionKey}" key!`);
    }
  }

  static async checkAppAndTrigger(appKey: string, triggerKey: string): Promise<void> {
    const app = await this.findOneByKey(appKey);

    if (!triggerKey) return;

    const hasTrigger = app.triggers?.find(trigger => trigger.key === triggerKey);

    if (!hasTrigger) {
      throw new Error(`${app.name} does not have a trigger with the "${triggerKey}" key!`);
    }
  }

  static isInternalApp(appKey: string): boolean {
    return appKey in internalApps();
  }
}

export default App;
