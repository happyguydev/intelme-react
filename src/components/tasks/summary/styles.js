import { makeStyles } from '@material-ui/core';
const SummaryViewStyles = makeStyles((theme) => ({
  title: {
    padding: '0',
    '& > h2 > p': {
      fontFamily: 'Montserrat',
      lineHeight: '24px',
      fontWeight: '500',
    }
  },
  summaryTitle: {
    fontSize: '24px',
    color: '#089BAB'
  },
  summaryCreator: {
    fontSize: '20px',
    color: '#4D4D4D',
    marginTop: '24px',
  },
  summaryKeyword: {
    fontFamily: 'Poppins !important',
    fontWeight: '400 !important',
    fontSize: '16px',
    lineHeight: '16px !important',
    letterSpacing: '-0.2px',
    marginTop: '16px',
  },
  content: {
    padding: '0',
    margin: '32px 0 20px',
    fontSize: '20px',
    lineHeight: '34px',
    color: '#4D4D4D',
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
    '& .highlight': {
      color: '#089BAB',
      backgroundColor: '#EDF5F6',
      fontStyle: 'normal'
    }
  },
  highlightConetnt: {
    marginBottom: '50px',
  },
  action: {
    padding: '0',
  }
}));

export default SummaryViewStyles;
