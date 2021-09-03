import React from 'react';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

import { linkStyles, LinkComponent } from './styles';

const Link = ({ icon, iconPosition, disabled, children, color, onPress }) => {
  const props = {
    disabled,
    children,
    iconPosition,
    color,
  };

  const styles = linkStyles(props);

  return (
    <>
      {!icon ? (
        <LinkComponent onClick={onPress} className={styles.primary}>
          {children}
        </LinkComponent>
      ) : (
        <LinkComponent onClick={onPress} className={styles.primary}>
          <SettingsOutlinedIcon color="primary" className={styles.iconStyle} />
          <span className={styles.linkText}>{children}</span>
        </LinkComponent>
      )}
    </>
  );
};

export default Link;
