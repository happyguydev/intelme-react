import React, { useRef, useEffect, useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
const OverflowTip = props => {
  // Create Ref
  const textElementRef = useRef();

  const compare = textElementRef
    // setHover(compare);
    console.log("Tooltip", compare)


  // Define state and function to update the value
  const [hoverStatus, setHover] = useState(false);

  return (
    <Tooltip
      title={props.value}
      interactive
      disableHoverListener={!hoverStatus}
      style={{fontSize: '2em'}}
    >
      <div
        ref={textElementRef}
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: '100px'
        }}
      >
        433333333333333333333333333333333333333333444444444444444
      </div>
    </Tooltip>
  );
};

export default OverflowTip;