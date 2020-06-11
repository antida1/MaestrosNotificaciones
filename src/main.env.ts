import { enableProdMode, NgZone } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Router } from '@angular/router';

import { AppModule } from './app/app.module';
import singleSpaAngular from 'single-spa-angular';
import { GlobalConstants } from './app/shared/utils/utils.const';

enableProdMode();

const ngLifecycles = singleSpaAngular({
  bootstrapFunction: (singleSpaProps) => {
    GlobalConstants.singleSpaProps = singleSpaProps;
    return platformBrowserDynamic().bootstrapModule(AppModule);
  },
  template: '<hermex />',
  Router,
  NgZone: NgZone,
  domElementGetter: () =>  {
    let dom = document.getElementById('hermex-app');

    if (!dom) {
      dom = document.createElement('div');
      dom.id = 'hermex-app';
      document.body.appendChild(dom);
    }

    return dom;
  }
});

export const bootstrap = (props: any) => ngLifecycles.bootstrap(props);
export const mount = (props: any) => ngLifecycles.mount(props);
export const unmount = (props: any) => {
  return ngLifecycles.unmount(props).then(()=>{
    document.getElementById("hermex-app").innerHTML = '';
  });
} 