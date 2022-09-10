import { Injectable } from '@angular/core';

const w = () => {
  return window;
};

@Injectable()
export class WindowRefService {
  
  get window(): any {
    return w();
  }
  
}