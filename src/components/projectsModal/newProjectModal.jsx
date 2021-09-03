import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '../../components/button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { Typography } from '@material-ui/core';
import LineInput from './LineInput';
import BorderInput from './BorderInput';
import UserAvatar from '../../components/avatar';
import TopIconLabelWrapper from './TopIconLabelWrapper';
import CircularProgress from '@material-ui/core/CircularProgress';

import AvatarGroup from './AvatarGroup/AvatarGroup';
import Dropdown from './dropdown';
import { AiOutlineUserAdd } from 'react-icons/ai';
import {
  getAllPeople,
  getAllTeams,
  addProject,
  getProjects,
} from '../../store/actions/projects';
import UserSelector from '../../components/userSelector';

import { FaRegUser } from 'react-icons/fa';
import { ReactComponent as SenderIcon } from '../icons/senderIcon.svg';
import { ReactComponent as CheckOutlined } from '../icons/checkOutlined.svg';
import { toast } from 'react-toastify';
import { getUserProfile } from '../../services/auth';

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: '50px',
    paddingBottom: '20px',
    backgroundImage: 'url(./new-project.svg)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right top',
    backgroundSize: 'contain',
    borderRadius: '10px',
    '& .MuiAvatarGroup-avatar': {
      margin: '0px',
      marginRight: '4px',
    },
    '& .MuiAvatarGroup-root .MuiAvatar-colorDefault': {
      color: '#fff',
      backgroundColor: '#089BAB',
      fontSize: '16px',
      fontFamily: 'Poppins',
      fontWeight: 500,
    },
  },
  closeButton: {
    position: 'absolute',
    right: '12px',
    top: '12px',
  },
  title: {
    fontFamily: 'Poppins !important',
    fontSize: '1.5rem',
    fontWeight: '500',
    color: '#404040',
  },
  firstLine: {
    width: '65%',
  },
  secondLine: {
    width: '33%',
  },
  inputWrapper: {
    width: '68%',
    display: 'flex',
    marginTop: '20px',
    itemsAlign: 'center',
    justifyContent: 'space-between',
  },
  widgetWrapper: {
    width: '68%',
    display: 'flex',
    marginTop: '20px',
    justifyContent: 'space-between',
    itemsAlign: 'center',
  },
  descWrapper: {
    width: '68%',
    marginTop: '20px',
    justifyContent: 'space-between',
    itemsAlign: 'center',
  },
  infoWrapper: {
    width: '68%',
    display: 'flex',
    marginTop: '20px',
    justifyContent: 'space-between',
    itemsAlign: 'center',
  },
  labelWrapper: {
    width: '48%',
    display: 'flex',
    flexDirection: 'column',
    // marginTop: '20px',
    justifyContent: 'space-between',
    itemsAlign: 'center',
  },
  borderInput: {
    width: '48%',
  },
  username: {
    marginLeft: '10px',
    fontFamily: 'Montserrat, sans-serif !important',
    fontSize: '16px',
    color: '#089BAB',
    fontWeight: '500',
  },
  addUser: {
    color: '#858383',
    fontSize: '1.375rem',
    background: 'transparent',
    border: '1.5px dashed #858383',
    marginRight: '20px',
    cursor: 'pointer',
    '&:hover': {
      borderColor: 'var(--teal-primary)',
    },
    '&:hover svg': {
      color: 'var(--teal-primary)',
    },
  },
  action: {
    justifyContent: 'center',
    marginTop: '25px',
    marginLeft: '10%',
  },
  subtitle: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '500',
    fontSize: '1rem',
    lineHeight: '150%',
    color: 'var(--text-normal)',
    marginBottom: '0.9375rem',
  },
  smallText: {
    fontFamily: 'Poppins !important',
    fontWeight: '500',
    fontSize: '12px',
    color: '#089BAB',
    marginLeft: '60px',
    marginTop: '10px',
  },
  selectorWrapper: {
    position: 'relative',
  },
  root: {
    display: 'flex',
    background: 'rgba(0,0,0,0.09)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: '0px',
    zIndex: '99',
    top: '0px',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiCircularProgress-colorPrimary': {
      color: 'var(--teal-primary)',
    },
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

function MaxWidthDialog(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { people, teams } = useSelector((state) => state.projects);
  const { profile } = useSelector((state) => state.auth);

  const { onNewProject } = props;

  // const [teamUsers, setTeamUsers] = useState([{}]);

  const dropdownValues = [
    { value: 'On Hold' },
    { value: 'Active' },
    { value: 'Completed' },
  ];

  const [visible, setVisible] = useState(false);

  const [currentPeople, setCurrentPeople] = useState([]);
  const [currentTeams, setCurrentTeams] = useState([]);

  const [newproj, setNewproj] = useState({
    name: '',
    number: '',
    description: '',
    sender: '',
    contacts: '',
    address: '',
    status: '',
    inCharge: {
      userId: profile?.settings?.userId,
      name: profile?.username,
    },
    users: currentPeople,
    teams: currentTeams,
  });
  const [loading, setLoading] = useState(false);
  const [newProjValidations, setNewProjValidations] = useState({
    name: false,
    number: false,
  });

  useEffect(() => {
    dispatch(getAllPeople());
    dispatch(getAllTeams());
  }, []);

  const formInputsAreValid = Boolean(
    !newProjValidations.name || !newProjValidations.number
  );

  const handleClickUser = () => {
    setVisible(!visible);
  };

  const changeDropdown = (value) => {
    setNewproj((previous) => {
      return { ...previous, status: value };
    });
  };

  const handleInputChange = (e) => {
    let value = e.target.value;
    let fieldName = e.target.name;
    if (value.length === 0) {
      switch (fieldName) {
        case 'name':
          setNewProjValidations((validations) => ({
            ...validations,
            name: false,
          }));
          break;
        case 'number':
          setNewProjValidations((validations) => ({
            ...validations,
            number: false,
          }));
          break;
        default:
          break;
      }
    } else {
      switch (fieldName) {
        case 'name':
          setNewProjValidations((validations) => ({
            ...validations,
            name: true,
          }));
          break;
        case 'number':
          setNewProjValidations((validations) => ({
            ...validations,
            number: true,
          }));
          break;
        default:
          break;
      }
    }
    setNewproj((previous) => {
      return { ...previous, [e.target.name]: e.target.value };
    });
  };

  const clearProjectfields = () => {
    setNewproj({
      name: '',
      number: '',
      description: '',
      sender: '',
      contacts: '',
      address: '',
      status: '',
      users: [],
      teams: [],
    });
  };
  const handleSubmit = () => {
    setLoading(true);
    setNewproj((previous) => {
      return {
        ...previous,
        teams: currentTeams.map((team) => team.teamId),
        users: currentPeople.map((person) => person.username),
      };
    });
    const { teams, users, ...data } = newproj;

    dispatch(
      addProject({
        ...data,
        members: {
          teams: currentTeams.map((team) => team.teamId),
          users: currentPeople.map((people) => people.username),
        },
      })
    )
      .then(async (res) => {
        console.log(res);
        const inChargeDetails = await getUserProfile({
          username: res.data?.ownerId,
        });
        res.data.inChargeDetails = inChargeDetails;
        await onNewProject(res.data);
        setLoading(false);
        toast.success('Project created successfully!');

        props.handleModalClose(clearProjectfields);
      })
      .catch((err) => {
        setLoading(false);
        if (err?.response?.status === 400) {
          toast.error('Project Name or Project Number already exist.');
        } else if (err?.response?.stauts === 500) {
          toast.error(
            'An error has occurred in the platform, please contact your manager or try again later.'
          );
        }
      });
  };
  const handlePeopleClick = (person, mode, isChecked) => {
    if (mode === 'people') {
      setCurrentPeople((prev) => {
        console.log(prev);
        if (prev.some((each) => each.userId === person.userId)) {
          if (isChecked) {
            return prev;
          } else {
            return prev.filter((each) => each.userId !== person.userId);
          }
        } else {
          return [...prev, person];
        }
      });
    } else {
      setCurrentTeams((prev) => {
        if (mode === 'team') {
          if (prev.some((each) => each.teamId === person.teamId)) {
            if (isChecked) {
              return prev;
            } else {
              return prev.filter((each) => each.teamId !== person.teamId);
            }
          } else {
            return [...prev, person];
          }
        } else {
          return prev;
        }
      });
    }
    setNewproj((previous) => {
      return {
        ...previous,
        teams: currentTeams.map((team) => team.teamId),
        users: currentPeople.map((person) => person.username),
      };
    });
  };

  const handleIsChecked = (team, person, type) => {
    if (person && currentPeople.includes(person)) {
      return true;
    } else if (team && currentTeams.includes(team)) {
      return true;
    } else return false;
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth="lg"
      open={props.open}
      onClose={() => props.handleModalClose(clearProjectfields)}
      aria-labelledby="max-width-dialog-title"
      classes={{ paper: classes.dialog }}
    >
      {loading && (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      )}
      <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={() => props.handleModalClose(clearProjectfields)}
      >
        <CloseIcon />
      </IconButton>
      <Typography className={classes.title}>Create a New Project</Typography>
      <div className={classes.inputWrapper}>
        <div className={classes.firstLine}>
          <LineInput
            onChange={handleInputChange}
            value={newproj.name}
            name="name"
            placeholder="Add project name"
            required={true}
            width="400px"
          />
        </div>
        <div className={classes.secondLine}>
          <LineInput
            onChange={handleInputChange}
            value={newproj.number}
            name="number"
            error
            placeholder="Project Number"
          />
        </div>
      </div>
      <div className={classes.widgetWrapper}>
        <TopIconLabelWrapper icon={<SenderIcon />} label="Sender">
          <BorderInput
            onChange={handleInputChange}
            value={newproj.sender}
            name="sender"
            placeholder="Sender"
          />
        </TopIconLabelWrapper>
        <TopIconLabelWrapper icon={<FaRegUser />} label="In Charge">
          <UserAvatar userDetails={profile} width="36px" height="36px" />
          <Typography className={classes.username}>
            {profile?.firstName} {profile?.lastName}
          </Typography>
        </TopIconLabelWrapper>
        <TopIconLabelWrapper icon={<CheckOutlined />} label="Status">
          <Dropdown
            current={newproj.status}
            options={dropdownValues}
            onClick={changeDropdown}
          />
        </TopIconLabelWrapper>
      </div>
      <div className={classes.descWrapper}>
        <Typography className={classes.subtitle}>
          Project Description
        </Typography>
        <BorderInput
          onChange={handleInputChange}
          value={newproj.description}
          name="description"
          placeholder="Type project description here..."
          multiline={true}
          rows={3}
          rowsMax={3}
        />
      </div>
      <div className={classes.infoWrapper}>
        <div className={classes.labelWrapper}>
          <Typography className={classes.subtitle}>Contacts</Typography>
          <BorderInput
            onChange={handleInputChange}
            value={newproj.contacts}
            placeholder="Type contacts name here..."
            multiline={true}
            name="contacts"
            rows={3}
            rowsMax={3}
          />
        </div>
        <div className={classes.labelWrapper}>
          <Typography className={classes.subtitle}>Address</Typography>
          <BorderInput
            onChange={handleInputChange}
            value={newproj.address}
            placeholder="Add address of project..."
            multiline={true}
            name="address"
            rows={3}
            rowsMax={3}
          />
        </div>
      </div>
      <div className={classes.inputWrapper}>
        <TopIconLabelWrapper label="Add people to the project">
          <div className={classes.selectorWrapper}>
            <Avatar className={classes.addUser} onClick={handleClickUser}>
              <AiOutlineUserAdd />
            </Avatar>
            <UserSelector
              transform="translate(-8%, 0)"
              visible={visible}
              selectable
              data={{ people, teams }}
              onClickAction={(person, mode, isChecked) =>
                handlePeopleClick(person, mode, isChecked)
              }
              checked={handleIsChecked}
              emptyText="There is no members."
            />
          </div>
          <AvatarGroup users={currentTeams} mode="team" />
          <AvatarGroup users={currentPeople} mode="people" />
        </TopIconLabelWrapper>
      </div>
      {currentTeams?.length > 0 && (
        <Typography className={classes.smallText}>Teams</Typography>
      )}
      <DialogActions className={classes.action}>
        <Button
          onClick={() => props.handleModalClose(clearProjectfields)}
          textButton
        >
          Cancel
        </Button>
        <Button
          disabled={formInputsAreValid}
          onClick={handleSubmit}
          primaryBig
          background="#FF8A47"
        >
          Create Project
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MaxWidthDialog;
