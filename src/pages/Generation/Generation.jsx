import React, { useState } from 'react';

import Body from '../../components/Body/Body';
import { useEffect } from 'react';

function Generation({inputGen}) {
  const [gen, setGen] = useState('')

  useEffect(() => {
    setGen(inputGen)
  }, [inputGen]);

  return (
    <Body gen={gen} />
  )
}

export default Generation