import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import editAccountFormStyles from './styles';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { updateSettings, updateProfile } from '../../../../store/actions/auth';
import { Avatar, Button, Grid, Typography } from '@material-ui/core';
import FormField from '../../../formField';
import Link from '../../../link';
import TeamListItem from '../../teamList';
import { toast } from 'react-toastify';

const EditAccountForm = ({ userDetails, onClick }) => {
  const styles = editAccountFormStyles();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state?.auth);

  const [firstName, setFirstName] = useState(profile ? profile?.firstName : '');
  const [lastName, setLastName] = useState(profile ? profile?.lastName : '');
  const [email, setEmail] = useState(profile ? profile?.email : '');
  const [mobileNo, setMobileNo] = useState(
    profile ? profile?.settings?.mobileNo : ''
  );
  const [jobTitle, setJobTitle] = useState(
    profile ? profile?.settings?.jobTitle : ''
  );
  const [teamList, setTeamList] = useState(profile?.settings?.teams);

  const disciplineNames = userDetails?.settings?.disciplines
    ?.map((item) => item.name)
    .join(', ');

  const [userEditValidations, setUserEditValidations] = useState({
    firstNameError: false,
    lastNameError: false,
    emailError: false,
    emailTypeError: false,
    mobileNoError: false,
    jobTitleError: false,
  });
  const formInputsAreValid = Boolean(
    userEditValidations.firstNameError ||
      userEditValidations.lastNameError ||
      userEditValidations.emailError ||
      userEditValidations.emailTypeError ||
      userEditValidations.mobileNoError ||
      userEditValidations.jobTitleError
  );

  const handleChange = (v, fieldName) => {
    let value = v.target.value;

    if (value.length > 0) {
      switch (fieldName) {
        case 'firstName':
          setUserEditValidations((userEditValidations) => ({
            ...userEditValidations,
            firstNameError: false,
          }));
          break;
        case 'lastName':
          setUserEditValidations((userEditValidations) => ({
            ...userEditValidations,
            lastNameError: false,
          }));
          break;
        case 'email':
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            setUserEditValidations((userEditValidations) => ({
              ...userEditValidations,
              emailTypeError: true,
            }));
          } else {
            setUserEditValidations((userEditValidations) => ({
              ...userEditValidations,
              emailTypeError: false,
              emailError: false,
            }));
          }
          setUserEditValidations((userEditValidations) => ({
            ...userEditValidations,
            emailError: false,
          }));
          break;
        case 'jobTitle':
          setUserEditValidations((userEditValidations) => ({
            ...userEditValidations,
            jobTitleError: false,
          }));
          break;
        default:
          break;
      }
    } else {
      switch (fieldName) {
        case 'firstName':
          setUserEditValidations((userEditValidations) => ({
            ...userEditValidations,
            firstNameError: true,
          }));
          break;
        case 'lastName':
          setUserEditValidations((userEditValidations) => ({
            ...userEditValidations,
            lastNameError: true,
          }));
          break;
        case 'email':
          setUserEditValidations((userEditValidations) => ({
            ...userEditValidations,
            emailTypeError: false,
            emailError: true,
          }));
          break;
        case 'jobTitle':
          setUserEditValidations((userEditValidations) => ({
            ...userEditValidations,
            jobTitleError: true,
          }));
          break;
        default:
          break;
      }
    }

    switch (fieldName) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'jobTitle':
        setJobTitle(value);
        break;
      default:
        break;
    }
  };

  const handleMobileNoChange = (mobileNo) => {
    if (mobileNo.length > 0) {
      setUserEditValidations((userEditValidations) => ({
        ...userEditValidations,
        mobileNoError: false,
      }));
    } else {
      setUserEditValidations((userEditValidations) => ({
        ...userEditValidations,
        mobileNoError: true,
      }));
    }

    setMobileNo(mobileNo);
  };

  const onSubmit = async () => {
    const username = userDetails.username;
    try {
      const body = {
        userId: userDetails.settings.userId,
        username: username,
        email: email,
        firstName: firstName,
        lastName: lastName,
        enabled: true,
        emailVerified: true,
        requiredActions: {},
      };
      const userData = {
        jobTitle: jobTitle,
        mobileNo: mobileNo,
        location: userDetails.settings.location,
        keywords: userDetails.settings.keywords,
      };

      dispatch(updateSettings(userData));
      dispatch(updateProfile({ username }, body)).then(() => {
        setFirstName(firstName);
        setLastName(lastName);
      });

      toast.success('Profile Changes successful!');
    } catch (error) {
      toast.error(
        'An error occured in the platform, please try again or contact your manager.'
      );
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6}>
          <FormField
            label="First Name"
            placeholder="First Name"
            required
            value={firstName}
            defaultValue={firstName}
            onChange={(v) => handleChange(v, 'firstName')}
            error={userEditValidations.firstNameError}
            helperText={
              userEditValidations.firstNameError &&
              'Please indicate your first name.'
            }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormField
            label="Last name"
            placeholder="Last Name"
            value={lastName}
            defaultValue={lastName}
            onChange={(v) => handleChange(v, 'lastName')}
            error={userEditValidations.lastNameError}
            helperText={
              userEditValidations.lastNameError &&
              'Please indicate your last name.'
            }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormField
            label="Email"
            placeholder="E-mail"
            value={email}
            defaultValue={email}
            onChange={(v) => handleChange(v, 'email')}
            error={
              !userEditValidations.emailError
                ? userEditValidations.emailTypeError
                : true
            }
            helperText={
              !userEditValidations.emailTypeError
                ? userEditValidations.emailError
                  ? 'Please indicate your email.'
                  : ''
                : 'Please indicate your valid email.'
            }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Typography className={styles.formFieldLabel}>
            <span>Reporting to</span>
          </Typography>
          <div className={styles.userAvatar}>
            <Avatar src="/frontend-dev/user-2.svg" width="40px" height="40px" />
            <span>{userDetails?.settings?.reportingTo}</span>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <div className={styles.mobileTitleContainer}>
            {userEditValidations.mobileNoError && (
              <div className={styles.mobileNoRequiredTick} />
            )}
            <Typography className={styles.formFieldLabel}>Mobile</Typography>
          </div>
          <PhoneInput
            country={'au'}
            value={mobileNo}
            enableAreaCodeStretch
            disableCountryCode="true"
            defaultValue={mobileNo}
            placeholder="(04)123 456 78"
            masks={{ au: '(..)... ... ..' }}
            containerClass={styles.profilePhone}
            inputClass={
              userEditValidations.mobileNoError
                ? 'profilePhoneInput profilePhoneInput-error'
                : styles.profilePhone
            }
            buttonClass={
              userEditValidations.mobileNoError
                ? 'profilePhoneButton profilePhoneButton-error'
                : 'profilePhoneButton'
            }
            onChange={handleMobileNoChange}
          />
          {userEditValidations.mobileNoError && (
            <Typography className={styles.mobileNoError}>
              <span>Please indicate your mobile number.</span>
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Typography className={styles.formFieldLabel}>
            <span>Password</span>
          </Typography>
          <Button className={styles.changePasswordButton} onClick={onClick}>
            <span>Change password</span>
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormField
            label="Job Title"
            value={jobTitle}
            placeholder="Job Title"
            defaultValue={jobTitle}
            onChange={(v) => handleChange(v, 'jobTitle')}
            error={userEditValidations.jobTitleError}
            helperText={
              userEditValidations.jobTitleError &&
              'Please indicate your job title.'
            }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormField
            label="Discipline"
            disabled
            placeholder="Discipline"
            defaultValue={disciplineNames}
            value={disciplineNames}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} />
        <Grid item xs={12} sm={12} md={6}>
          <div className={styles.actionButtons}>
            <Link>Cancel</Link>
            <Button
              className={styles.submitButton}
              disabled={formInputsAreValid}
              onClick={onSubmit}
            >
              Save changes
            </Button>
          </div>
        </Grid>
      </Grid>
      <hr className={styles.divider} />
      <p className={styles.teamsTitle}>My Teams</p>
      {teamList?.map((team) => {
        return <TeamListItem teamDetail={team} key={team.teamId} />;
      })}
    </>
  );
};

export default EditAccountForm;
