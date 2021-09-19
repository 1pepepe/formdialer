import React, { useState, useEffect, useReducer } from 'react';

import Sidebar from './Sidebar';

export default function Home() {

  useEffect(() => {

  },[]);
  return (
    <React.Fragment>
      <Sidebar
        activeListItem='Home'
      />
    </React.Fragment>
  )
}