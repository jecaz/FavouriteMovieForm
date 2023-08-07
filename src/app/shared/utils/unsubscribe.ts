import { Directive } from '@angular/core';
import { Subject } from 'rxjs';

import type { OnDestroy } from '@angular/core';

@Directive()
export class Unsubscribe implements OnDestroy {
    readonly destroy$ = new Subject<void>();

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
