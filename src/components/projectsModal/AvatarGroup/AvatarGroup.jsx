import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Avatar from '@material-ui/core/Avatar';
import ReactTooltip from 'react-tooltip';
const useStyles = makeStyles((theme) => ({
  avatar: {
    color: '#089BAB !important',
    background: '#EDF5F6',
    fontSize: '12px',
  },
  avatargroup: {
    marginRight: '20px',
    '& .MuiAvatar-colorDefault': {},
  },
}));

export default function CustomAvatarGroup(props) {
  const classes = useStyles();
  return (
    <AvatarGroup max={5} className={classes.avatargroup}>
      {props.users?.length !== 0 &&
        props.users?.map((user, index) => (
          <div
            style={{ border: 'none' }}
            data-tip={
              !user?.icon &&
              (props.mode === 'people'
                ? `${
                    !user?.firstName || !user?.lastName
                      ? `${user.username}`
                      : `${user?.firstName + ' '}${user?.lastName}`
                  }`
                : `${user?.name}`)
            }
          >
            <Avatar
              key={index}
              // className={classes.avatar}
              alt={'firstname'}
              src={
                user?.settings?.icon
                  ? `data:image/png;base64,${user?.settings?.icon}`
                  : ''
              }
              style={{
                backgroundColor:
                  props.mode === 'people'
                    ? `#${user?.settings?.color}`
                    : `#${user?.color}`,
                borderRadius: props.mode !== 'people' && '6px',
                fontSize: '15px',
                fontWeight: 500,
                fontFamily: 'Poppins',
              }}
            >
              {!user?.icon &&
                (props.mode === 'people'
                  ? `${
                      !user?.firstName || !user?.lastName
                        ? `${user.username.slice(0, 2).toUpperCase()}`
                        : `${user?.firstName
                            .charAt(0)
                            .toUpperCase()}${user?.lastName
                            .charAt(0)
                            .toUpperCase()}`
                    }`
                  : `${user?.name?.toUpperCase().slice(0, 2)}`)}
            </Avatar>
            <ReactTooltip
              backgroundColor="#404040"
              arrowColor="#404040"
              className="tool-tips"
            />
          </div>
        ))}
    </AvatarGroup>
  );
}
