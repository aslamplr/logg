export const isMac = () => {
  return window.navigator.platform.indexOf('Mac') > -1;
};

export const isWin = () => {
  return window.navigator.platform.indexOf('Win') > -1;
};
