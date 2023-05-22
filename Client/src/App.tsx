import * as React from 'react';
import { useState } from 'react';
import ApplicationNavigation from './Navigation/ApplicationNavigation';
import Auth from './Navigation/AuthPages/Auth';


function App () {
  const [isSignup, setIsSignup] = useState(false);

  return( <ApplicationNavigation/>)
}

export default App;
