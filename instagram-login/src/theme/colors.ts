const colors = {
  alabastar: '#fafafa',
  black: 'hsla(0, 0%, 0%, 1)',
  blackTransparent: (opacity: number) => `hsla(0, 0%, 0%, ${opacity})`,
  mineShaft: '#262626',
  pictonBlue: 'hsla(208.7, 85.19%, 57.65%, 1)',
  pictonBlueTransparent: (opacity: number) =>
    `hsla(208.7, 85.19%, 57.65%, ${opacity})`,
  tunaTransparent: (opacity: number) => `hsla(240, 5.51%, 24.9%, ${opacity})`,
  white: 'hsla(0, 0%, 100%, 1)',
  whiteTransparent: (opacity: number) => `hsla(0, 0%, 100%, ${opacity})`,
};

export const lightColors = {
  bg: colors.white,
  btnBg: colors.pictonBlue,
  btnBgDisabled: colors.pictonBlueTransparent(0.5),
  btnDisabledText: colors.whiteTransparent(0.5),
  btnText: colors.white,
  footerBg: colors.white,
  footerBorder: colors.tunaTransparent(0.29),
  icon: colors.mineShaft,
  inputBg: colors.alabastar,
  inputBorder: colors.blackTransparent(0.1),
  inputPlaceholder: colors.blackTransparent(0.2),
  inputText: colors.mineShaft,
  label: colors.blackTransparent(0.4),
  linkBtnText: colors.pictonBlue,
  logo: colors.mineShaft,
  seperatorLine: colors.blackTransparent(0.2),
  seperatorText: colors.blackTransparent(0.4),
};
