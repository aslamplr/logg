/**
 * Check is Mac platform
 */
export const isMac = () => {
  return window.navigator.platform.indexOf('Mac') > -1;
};

/**
 * Check is Windows platform
 */
export const isWin = () => {
  return window.navigator.platform.indexOf('Win') > -1;
};

/**
 * Get Random Color Hex code.
 */
export const getRandColorHex = () => {
  // https://www.paulirish.com/2009/random-hex-color-code-snippets/
  // tslint:disable-next-line:typedef
  return '#' + (function co(lor): string {   return (lor +=
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 16)])
    && (lor.length === 6) ?  lor : co(lor); })('');
};
