import { commonSizes, drawerSizes } from "./sizes";
import { commonColors } from "./colors";

export const fontFamily = "'Prompt', sans-serif";

export const alignItemCenter = `
  display: inline-flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

export const mainContainer = `
  font-family: ${fontFamily};
  position: relative;
  width: 100%;
  margin: 0 auto 0 auto;
  background-color: ${commonColors.backgroundDark}
`;

export const flexContainer = `
  display: flex;
  min-height: 100vh;
  box-sizing: border-box;
  justify-content: flex-start;
`;

export const contentApp = `
  width: calc(100% - ${drawerSizes.width} - ${commonSizes.containerMargin});
  margin: 0 ${commonSizes.containerMargin}
  ${commonSizes.containerMargin} 0;
`;

export const mainButton = `
  font-family: ${fontFamily};
  font-weight: 500;
  font-size: 1.0em;
  display: inline-block;
  min-width: 150px;
  padding: 15px 30px;
  margin: 0 1.25em;
  background-color: ${commonColors.accent};
  color: ${commonColors.textPrimary};
  border-radius: 50px;
  border: ${commonColors.buttonBorder};
  outline: none;
  cursor: pointer;
  transition: all 150ms ease-in-out;

  &:hover {
    border: ${commonColors.buttonBorderHover};
  }
`;

export const textButton = `
  font-family: ${fontFamily};
  font-weight: 500;
  font-size: 1.0em;
  color: ${commonColors.textButton};
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 150ms ease-in-out;

  &:hover {
    border: ${commonColors.textButtonHover};
  }
`;
