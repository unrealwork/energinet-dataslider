'use strict';

export function referrerYear(url: string): number {
  if (!url) {
    return NaN;
  }
  const partsBySlash = url.split('/');
  if (partsBySlash.length > 2) {
    const preLastPart = partsBySlash[partsBySlash.length - 2];
    try {
      const splittedPart = preLastPart.split('-');
      const yearString = splittedPart[splittedPart.length - 1];
      return parseInt(yearString, 0);
    } catch (e) {
      return NaN;
    }
  } else {
    return NaN;
  }
}

