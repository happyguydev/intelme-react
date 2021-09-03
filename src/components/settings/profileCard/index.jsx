import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import profileCardStyles from './styles';
import { getOverview, getProfile } from '../../../store/actions/auth';
import Card from '../../card';
import Avatar from '../../avatar';
import { Divider } from '@material-ui/core';
import { uploadImage } from '../../../services/files';
import { toast } from 'react-toastify';
import { FiEdit } from 'react-icons/fi';
import { IconContext } from 'react-icons';
import ReactTooltip from 'react-tooltip';

const ProfileCard = ({ userDetails }) => {
  const [image, setImage] = useState('');
  const styles = profileCardStyles();
  const dispatch = useDispatch();
  const { overview } = useSelector((state) => state.auth);
  const { username } = useSelector((state) => state.auth.profile);

  const noExtraAccounts = false;

  useEffect(() => {
    const { username } = userDetails;
    dispatch(getOverview({ username }));
    if (userDetails?.settings?.icon) {
      setImage(`data:image/png;base64,${userDetails.settings.icon}`);
    }
  }, []);
  const onImageChange = async (event) => {
    try {
      await uploadImage({
        image: event.target.files[0],
        destination: 'user',
      }).then(() => {
        dispatch(getProfile({ username }));
      });
    } catch (err) {
      if (err?.response?.status === 400) {
        toast.error('File is to big please try again with an smaller one.');
      }
    }
  };
  return (
    <div className={styles.profileCardContainer}>
      <Card>
        <div className={styles.userImage}>
          <input
            type="file"
            name="myImage"
            className={styles.inputFile}
            onChange={onImageChange}
            id="file-upload"
          />

          <label
            data-tip="Upload an Image"
            for="file-upload"
            className={styles.label}
          >
            {/* <IconContext.Provider value={{ color: '#089bab', size: '20px' }}>
              <FiEdit />
            </IconContext.Provider> */}
            <Avatar
              userDetails={userDetails}
              width={144}
              height={144}
              fontSize="4.125rem"
            />
            <ReactTooltip className="tool-tips" />
          </label>
        </div>
        <div className={styles.username}>
          {userDetails?.firstName} {userDetails?.lastName}
        </div>

        <div className={styles.userCompany}>
          {userDetails?.settings?.location !== null &&
            userDetails?.settings?.location}
        </div>

        <div className={styles.userEmail}>{userDetails?.email}</div>

        {noExtraAccounts ? (
          <>
            <Divider className={styles.divider} />
            <div className={styles.connectedAccountsTitle}>
              Connected Accounts
            </div>
            <div className={styles.accountList}>
              <div className={styles.accountItem}>
                <img src="/google-flat-color-icon.svg" alt="Google GMail." />

                <div className={styles.accountName}>Lewis Hamilton</div>
                <div className={styles.accountConnectedBadge}>
                  <span>Connected</span>
                </div>
              </div>
              <div className={styles.accountItem}>
                <img src="/account-icon-1.svg" alt="X-logo" />
                <div className={styles.accountName}>Lewis Hamilton</div>
                <div className={styles.accountConnectedBadge}>
                  <span>Connected</span>
                </div>
              </div>
              <div className={styles.accountItem}>
                <img src="/account-icon-2.svg" alt="Symbol" />

                <div className={styles.accountUnconnectedBadge}>
                  <span>Connect</span>
                </div>
              </div>
            </div>
          </>
        ) : null}

        <Divider className={styles.divider} />
        <div>
          <div className={styles.projectItem}>
            <div className={styles.projectStatusTitle}>Project Active</div>
            <div className={styles.projectValue}>{overview?.active || 0}</div>
          </div>
          <div className={styles.projectItem}>
            <div className={styles.projectStatusTitle}>Projects completed</div>
            <div className={styles.projectValue}>
              {overview?.completed || 0}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileCard;
