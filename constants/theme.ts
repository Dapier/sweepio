const COLOR = {
  primary: "#3E1FFF",
  white: "#FFF",
  starYellow: "#FFE347",
  black: "#293241",
  lightBlue: "#EBF2FA",
};

const FONT = {
  regularNun: "NunitoRegular",
  mediumNun: "NunitoMedium",
  boldNun: "NunitoBold",
  lightOpS: "OpSansLight",
  mediumOpS: "OpSansMedium",
  boldOpS: "OpSansBold",
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
  large: {
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 9,
    },
    shadowOpacity: 0.55,
    shadowRadius: 6.84,
    elevation: 9,
  },
};

export { COLOR, FONT, SHADOWS, SIZES };
