// interface 
export interface KeyObject {
    [mainKey: number]: {
      [subKey: string]: {
        text: string;
        goTo: number | string;
      };
    };
  }