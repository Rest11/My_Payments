import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { DEFAULT_DATE_FORMAT } from "../app.constants";

@Pipe({ name: 'prettyDate', pure: false })
export class PrettyDatePipe implements PipeTransform {
    transform (date: Date, format?: string): string {
        if (!date) { return ''; }

        const dateFormat: string = format || DEFAULT_DATE_FORMAT;

        return moment(date).format(dateFormat);
    }
}
