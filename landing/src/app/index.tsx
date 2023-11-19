/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { BlogPage } from './pages/BlogPage/Loadable';
import { Header } from './components/Header';
import { useTranslation } from 'react-i18next';
import { planetConfigs } from './components/SolarSystem/Util';
import styled from 'styled-components/macro';


export function App() {
  const { i18n } = useTranslation();
  return (
    <>
      {/* {buildFacts({
        img: planetConfigs.earth.imageSrc,
        planet: 'Earth',
        orbit: 365.26,
        diameter: 12756,
        surface: 59,
        au: 1,
        moons: 'one',
        site: 'https://space-facts.com/earth/' 
      })} */}
      <HomePage />
      <GlobalStyle />
    </>
  );
}
