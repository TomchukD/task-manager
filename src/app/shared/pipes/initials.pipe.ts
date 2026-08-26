import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials',
  standalone: true,
})
export class InitialsPipe implements PipeTransform {
  transform(value?: string): string {
    const words = value?.trim().split(/\s+/).filter(Boolean) ?? [];

    if (words.length === 0) {
      return '';
    }

    const selectedWords = words.length === 1 ? words : [words[0], words.at(-1)!];

    return selectedWords
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  }
}
