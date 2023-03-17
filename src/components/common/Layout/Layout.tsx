import React, { ReactNode, useEffect } from 'react';
import styled from '@emotion/styled';
import Header from '../Header';
import { useSetRecoilState } from 'recoil';
import { useMediaQuery } from 'react-responsive';
import isMobile from 'src/core/recoil/isMobile';
import Footer from '../Footer';
import { SerializedStyles } from '@emotion/react';

interface LayoutProps {
  children: ReactNode;
  useHeader?: boolean;
  layoutCss?: SerializedStyles;
}

const Wrapper = styled.div`
  position: relative;
  max-width: 768px;
  min-width: 360px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 20px 20px 40px;
  display: flex;
  flex-direction: column;
`;

const Body = styled.main`
  position: relative;
  flex: 1;
`;

export default function Layout({ children, useHeader = true, layoutCss }: LayoutProps) {
  // const isMobileSize = useMediaQuery({ minWidth: 768 });
  // const setIsMobile = useSetRecoilState(isMobile);

  // useEffect(() => {
  //   setIsMobile(isMobileSize);
  // }, [isMobileSize]);
  return (
    <Wrapper css={layoutCss}>
      {useHeader && <Header />}
      <Body>{children}</Body>
      {/* <Footer /> */}
    </Wrapper>
  );
}
