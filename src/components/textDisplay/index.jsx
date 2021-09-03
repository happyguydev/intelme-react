import React, { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import textStyles from './styles';

const TextDisplay = ({ text, charNumber, isWhite }) => {
  const [display, setDisplay] = useState('none');

  const props = { display };

  const styles = textStyles(props);

  return (
    <>
      {text?.length > charNumber ? (
        <OverlayTrigger
          placement="bottom-start"
          delay={{ show: 100, hide: 300 }}
          overlay={
            <Tooltip
              className={styles.longStringBlack}
              {...props}
              id="text-tooltip"
            >
              {text}
            </Tooltip>
          }
        >
          <div className={styles.textContainer}>
            <span>
              {text?.length > charNumber
                ? text?.substr(0, charNumber - 1) + '...'
                : text}
            </span>
          </div>
        </OverlayTrigger>
      ) : (
        <div className={styles.textContainer}>
          <span>
            {text?.length > charNumber
              ? text?.substr(0, charNumber - 1) + '...'
              : text}
          </span>
        </div>
      )}
    </>
  );
};

export default TextDisplay;
