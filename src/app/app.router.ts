import {RouterModule, Route} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

const routes: Route[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(
  routes,
  {
    useHash: true
  }
);
