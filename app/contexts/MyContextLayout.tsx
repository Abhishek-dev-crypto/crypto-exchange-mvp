'use client';

import React from 'react';
import { MyContextProvider } from './MyContext';
import MyComponent from '../components/MyComponent';

type Props = {
  children: React.ReactNode;
};

export default function MyContextLayout({ children }: Props) {
  return (
    <MyContextProvider>
      <MyComponent />
      {children}
    </MyContextProvider>
  );
}
