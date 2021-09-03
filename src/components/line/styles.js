import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

export const lineStyles = makeStyles({
  labelContainer: {
    position: 'relative',
    width: '100%',
    height: '1px',
    background: (props) => (!props.color ? '#F7F7F7' : props.color),
  },
  labelText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '19px',
    fontWeight: '400',
    lineHeight: '28px',
    backgroundColor: '#fff',
    color: '#5D616D',
    padding: '0 11px',
  },
});

export const LineComponent = styled.div``;
