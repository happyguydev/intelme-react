import React, { useState } from 'react';
import { AvatarGroup } from '@material-ui/lab';
import Avatar from '../../avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const MemberList = ({ members }) => {
  const [usersVisible, setUsersVisible] = useState(false);

  const showTeamUsers = () => {
    setUsersVisible(current => !current);
  }

  return (
    <>
      <div className="avatar-content" onClick={showTeamUsers}>
        <AvatarGroup className="avatar-group" max={3}>
          {members.slice(0, 3).map((member, index) => {
            return (
              <Avatar
                key={index}
                width="24px"
                height="24px"
                fontSize="0.75rem"
                userDetails={member}
              />
            )
          })}
        </AvatarGroup>

        {usersVisible &&
          <List className="avatar-list">
            {members.map((member, index) => {
              return (
                <ListItem>
                  <Avatar
                    key={index}
                    userDetails={member}
                    width="1.5rem"
                    height="1.5rem"
                    fontSize="0.75rem"
                  />
                  <span className="avatar-name">{member.username}</span>
                </ListItem>
              )
            })}
          </List>
        }
      </div>

      {members.length > 3 && <span className="avatar-more-count">and {members.length - 3} other{members.length > 4 ? 's' : ''}</span>}
    </>
  );
};

export default MemberList;
