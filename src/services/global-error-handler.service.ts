import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(
    private readonly _injector: Injector,
  ) { }

  public handleError(error: Error) {
    const zone = this._injector.get(NgZone);
    const router = this._injector.get(Router);
    const route = this._injector.get(ActivatedRoute);
  
    zone.run( () => {
      router.navigate(['error'], {relativeTo: route});
    });
  }
}
