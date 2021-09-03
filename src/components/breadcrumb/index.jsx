import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowRight } from '../icons/breadcrumbArrow.svg';

import './styles.scss';

const Breadcrumb = ({
  firstLink,
  firstLinkText,
  secondLink,
  secondLinkText,
  thirdLink,
  thirdLinkText,
}) => {
  return (
    <Breadcrumbs
      arial-label="breadcrumbs"
      separator={<ArrowRight />}
      classes={{
        root: 'container',
      }}
    >
      <Link to={firstLink}>
        <span className="text">
          {!firstLinkText ? firstLink.replace('/', '') : firstLinkText}
        </span>
      </Link>

      {secondLink ? (
        <Link to={secondLink}>
          <span className="text">
            {!secondLinkText ? secondLink.replace('/', '') : secondLinkText}
          </span>
        </Link>
      ) : null}

      {thirdLink ? (
        <Link to={thirdLink}>
          <span className="text">
            {!thirdLinkText ? thirdLink.replace('/', '') : thirdLinkText}
          </span>
        </Link>
      ) : null}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
