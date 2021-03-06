import styled from "styled-components";

import { contentApp } from "~/styles/common";
import { commonSizes } from "~/styles/sizes";

export const ContentApp = styled.div`
  ${contentApp}
`;

export const MainTopBar = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  padding: ${commonSizes.containerMargin} 0;
`;

export const ContentSwitches = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
