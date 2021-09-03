
import React  from 'react';
import Tooltip from '@material-ui/core/Tooltip';

import { ReactComponent as Download } from '../../icons/download.svg';
import UseStylesTooltip from './bell-follow-styles';
import DownloadViewContainer from './download-styles';

const DownloadFunction = ({ row }) => {
  const tooltipClasses = UseStylesTooltip();

  return (
      <DownloadViewContainer>
        <Tooltip classes={tooltipClasses} title="Download all attachments" arrow>
          <div className="download-icon">
            <Download />
            <span className="download-count">13</span>
          </div>
        </Tooltip>
      </DownloadViewContainer>
    )
};

export default DownloadFunction;
