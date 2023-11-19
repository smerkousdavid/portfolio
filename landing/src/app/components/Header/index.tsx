import * as React from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import Headroom from 'react-headroom';

export function Header() {
  return (
    <>
      <Headroom
        style={{
          height: '3vh',
          width: '100%',
          paddingLeft: '1vw',
          paddingRight: '1vw',
          paddingTop: '1vh',
        }}
      >
        <RightContainer>hey</RightContainer>
        {/* <Name>David's Website</Name> */}
      </Headroom>
    </>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
`;

const RightContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: end;
  align-items: center;
  margin-right: 0;
`;

const Name = styled.div`
  /* margin-top: -6vh; */
  margin-left: 10px;
  font-weight: bold;
  font-size: 2rem;
`;
