import { PipeTransform } from '@angular/core';

export class MostRecentFirstPipe implements PipeTransform {
    private compare(a, b) {
        const createdOnA = a.createdOn;
        const createdOnB = b.createdOn;

        let comparison = 1;
        if (createdOnA > createdOnB) {
            comparison = -1;
        }
        return comparison;
    }

    transform(policies: [any]): [any] {
        if (policies && policies.length > 0) {
            return policies.sort(this.compare);
        }
    return null;
    }
}
