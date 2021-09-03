import styled from 'styled-components';

export const DownloadViewContainer = styled.div`
  .download-icon {
    margin-left: 24px;
    display: flex;
    align-items: center;
    cursor: pointer;
    .download-count {
      font-size: 14px;
      font-weight: 400;
      color: #858383;
      margin-left: 10px;
    }
    :hover svg path, :hover .download-count {
      stroke: #089BAB !important;
      color: #089BAB;
    }
  }
`;

export default DownloadViewContainer;
