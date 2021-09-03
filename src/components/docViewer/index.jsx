import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import Webviewer from '@pdftron/webviewer';

import docViewerStyles from './styles';
import { Add, Remove } from '@material-ui/icons';
import { useSelector } from 'react-redux';

const DocViewer = ({ projectId, doc, prediction }) => {
  const { user } = useSelector((state) => state.auth);
  const viewer = useRef(null);
  const styles = docViewerStyles();

  useEffect(() => {
    Webviewer(
      {
        path: 'http://dev.intelme.com.au/frontend-uidev/lib',
        // path: `/lib`,
        initialDoc: `/api/docstore/v1/documents/view/projects/${encodeURIComponent(
          projectId
        )}/${encodeURIComponent(doc)}`,
        disabledElements: [
          'toolsHeader',
          'viewControlsButton',
          'panToolButton',
          'ribbonsDropdown',
          'searchButton',
          'toggleNotesButton',
          'selectToolButton',
          'leftPanelButton',
        ],
        enableAnnotations: false,
        disableLogs: true,
      },
      viewer.current
    ).then((instance) => {});

    return () => {
      viewer.current = null;
    };
  }, []);

  return (
    <div className="pdf-container">
      <div className="webviewer" ref={viewer}></div>
    </div>
  );
};

export default DocViewer;
