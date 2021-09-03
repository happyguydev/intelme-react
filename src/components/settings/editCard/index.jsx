import Box from '@material-ui/core/Box';
import React, { useState } from 'react';

import AccountPanel from '../accountPanel';
import KeywordPanel from '../keywordPanel';

import EditProfileStyles, { AntTab, AntTabs } from './styles';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

const EditProfile = ({ userDetails }) => {
  const styles = EditProfileStyles();
  const [value, setValue] = useState(0);

  const handleSelect = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.root}>
      <div>
        <AntTabs value={value} onChange={handleSelect}>
          <AntTab label="Account" />
          <AntTab label="Keywords" />
        </AntTabs>

        <TabPanel value={value} index={0}>
          <div className={styles.tabContainer}>
            <AccountPanel userDetails={userDetails} />
          </div>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <div className={styles.tabContainer}>
            <KeywordPanel
              userDetails={userDetails}
              disciplines={
                userDetails.settings?.disciplines.length > 0 &&
                userDetails.settings?.disciplines[0].keywords
              }
            />
          </div>
        </TabPanel>
      </div>
    </div>
  );
};

export default EditProfile;
