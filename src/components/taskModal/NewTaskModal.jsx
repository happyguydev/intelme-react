import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '../button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import LineInput from '../textInputs/LineInput';
import BorderInput from '../textInputs/BorderInput';
import Dropdown from './dropdown';
import DetailsTask from '../projectsModal/select-details-modal';
import PriorityButton from './PriorityMenu/index';
import Assignee from './AssigneeMenu';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getProjects } from '../../store/actions/projects';
import { addTask } from '../../store/actions/tasks';
import { toast } from 'react-toastify';
import {
  getAllProjects,
  getProjectMembers,
  searchProject,
} from '../../services/projects';
const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: '50px',
    paddingBottom: '20px',
    borderRadius: '10px',
  },
  closeButton: {
    position: 'absolute',
    right: '12px',
    top: '12px',
  },
  title: {
    fontFamily: 'Montserrat, sans-serif !important',
    fontSize: '1.5rem',
    fontWeight: '500',
  },
  firstLine: {
    width: '100%',
  },
  secondLine: {
    width: '100%',
    display: 'flex',
    itemsAlign: 'center',
    marginTop: '25px',
  },
  thirdLine: {
    width: '100%',
    display: 'flex',
    itemsAlign: 'center',
    marginTop: '30px',
  },
  label: {
    fontSize: '20px',
    fontWeight: '500',
    fontFamily: 'Montserrat',
    marginRight: '15px',
    color: '#404040',
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '25px',
    '&:hover': {
      color: 'var(--text-normal)',
    },
  },

  action: {
    justifyContent: 'flex-end',
    marginTop: '25px',
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

function NewTaskModal(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { projects } = useSelector((state) => state.projects);
  const [selectedAssignee, setSelectedAssignee] = useState();
  const [projectAssignees, setProjectAssignees] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState();
  const [allProjects, setAllProjects] = useState([]);
  const [onLoad, setOnLoad] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setUpdate(false);

    const fetchProjects = async () => {
      await searchProject({ limit: 60, include: 'name' }).then(
        async (response) => {
          setAllProjects(response.result);

          if (Object.keys(props.editData).length > 0) {
            await getProjectMembers({
              projectId: props.editData.projectId,
            }).then((res) => {
              setProjectAssignees(res?.users);

              const project = response.result.filter((project) => {
                return project.id === props.editData.projectId;
              });

              const assignedTo = res?.users.filter((assignee) => {
                return (assignee.username = props.editData.assignedTo);
              });

              setSelectedAssignee(assignedTo[0]);
              selectPriority(props.editData.priority);
              setUpdate(true);

              setNewtask((previous) => {
                return {
                  ...previous,
                  name: props.editData.name,
                  description: props.editData.description,
                  projectId: props.editData.projectId,
                  projectName: project[0].name,
                  assignedTo: assignedTo[0].username,
                  priority: props.editData.priority,
                  dueDate: props.editData.dueDate,
                  id: props.editData.id,
                };
              });
            });
          }
        }
      );
    };

    fetchProjects().then(() => {
      setOnLoad(false);
    });
  }, []);

  const selectAssignee = (assignee) => {
    setSelectedAssignee(assignee);
    setNewtask((previous) => {
      return { ...previous, assignedTo: assignee.username };
    });
  };
  const setDatePicker = (date) => {
    setNewtask((previous) => {
      return { ...previous, dueDate: date.toLocaleDateString('en-CA') };
    });
  };
  const unselectAssignee = () => {
    setSelectedAssignee();
    setNewtask((previous) => {
      return { ...previous, assignedTo: null };
    });
  };
  const selectPriority = (priority) => {
    setSelectedPriority(priority);
    setNewtask((previous) => {
      return { ...previous, priority: priority };
    });
  };
  const unselectPriority = () => {
    setSelectedPriority(null);
    setNewtask((previous) => {
      return { ...previous, priority: null };
    });
  };

  const [newtask, setNewtask] = useState({
    name: '',
    description: '',
    projectId: '',
    projectName: '',
    assignedTo: null,
    priority: null,
    dueDate: '',
  });
  const formInputsAreValid = Boolean(
    !newtask.name ||
      !newtask.dueDate ||
      !newtask.projectName ||
      !newtask.assignedTo
  );
  const clearTheNewTaskField = () => {
    setNewtask({
      name: '',
      description: '',
      projectId: '',
      projectName: '',
      assignedTo: null,
      priority: null,
      dueDate: '',
    });
  };
  const changeDropdown = async (value) => {
    setNewtask((previous) => {
      return { ...previous, projectId: value.id, projectName: value.name };
    });

    setOnLoad(true);
    await getProjectMembers({ projectId: value.id }).then((res) => {
      setOnLoad(false);
      setProjectAssignees(res?.users);
    });
  };

  const handleInputChange = (e) => {
    setNewtask((previous) => {
      return { ...previous, [e.target.name]: e.target.value };
    });
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      open={props.open}
      onClose={() => props.handleModalClose(clearTheNewTaskField)}
      aria-labelledby="max-width-dialog-title"
      classes={{ paper: classes.dialog }}
    >
      {(props.loading || onLoad) && (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      )}
      <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={() => props.handleModalClose(clearTheNewTaskField)}
      >
        <CloseIcon />
      </IconButton>
      {/* <Calendar /> */}
      <div className={classes.firstLine}>
        <LineInput
          onChange={handleInputChange}
          value={newtask.name}
          name="name"
          placeholder="Add task name"
          required={true}
        />
      </div>

      <div className={classes.secondLine}>
        <div className={classes.wrapper}>
          <span className={classes.label}>In</span>
          <Dropdown
            current={newtask.projectName}
            options={allProjects}
            onClick={changeDropdown}
            parent="task"
          />
        </div>

        <div className={classes.wrapper}>
          <span className={classes.label}>For</span>

          <Assignee
            assigneeOptions={projectAssignees}
            hasFilter
            selectedAssignee={selectedAssignee}
            onClick={selectAssignee}
            unselectAssignee={unselectAssignee}
          />

          {/* <Simple /> */}
        </div>
      </div>

      <BorderInput
        multiline={true}
        rows={4}
        rowsMax={4}
        placeholder="Type description here..."
        style={{ marginTop: '30px' }}
        value={newtask.description}
        name="description"
        onChange={handleInputChange}
      />

      <div className={classes.thirdLine}>
        <div style={{ marginRight: '60px' }}>
          <PriorityButton
            current="Priority"
            selectPriority={selectPriority}
            selectedPriority={selectedPriority}
            unselectPriority={unselectPriority}
          />
        </div>
        {/* <div style={{ marginRight: "60px" }}><DetailsTask title="Priority" /></div> */}

        <DetailsTask
          title="Due Date"
          setDatePicker={setDatePicker}
          selectDate={newtask.dueDate}
        />
      </div>

      <DialogActions className={classes.action}>
        <Button
          onClick={() => props.handleModalClose(clearTheNewTaskField)}
          textButton
        >
          Cancel
        </Button>
        <Button
          disabled={formInputsAreValid}
          onClick={() =>
            props.handleSubmit(newtask, update, clearTheNewTaskField)
          }
          primaryBig
          background="#FF8A47"
        >
          {update ? 'Edit Task' : 'Create Task'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewTaskModal;
