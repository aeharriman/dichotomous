export interface KeyObject {
    [mainKey: number]: {
      [subKey: string]: {
        text: string;
        goTo: number | string;
      };
    };
  }

export interface NamedStringKey {
    name: string;
    key: string;
}
