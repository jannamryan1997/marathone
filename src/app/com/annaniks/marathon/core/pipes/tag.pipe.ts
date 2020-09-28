import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'tagsFormat' })
export class TagsFormatPipe implements PipeTransform {

    transform(val): string {
        return `#${val}`
    }
}