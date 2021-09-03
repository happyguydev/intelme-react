import styled from 'styled-components';

export const Styles = styled.div`
  display: block;
  max-width: 100%;
  margin-top: 1.5rem;
  .tableWrap {
    display: block;
    max-width: 100%;
    overflow-x: auto;
    overflow-y: scroll;
    max-height: 40rem;
  }
  table {
    width: 100%;
    border-spacing: 0;
    thead {
      text-align: left;
      margin: 0;
      border: 0;
      font-family: Poppins, sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 0.75rem;
      line-height: 1rem;
      letter-spacing: -0.2px;
      color: var(--gray-normal);
      tr {
        background: var(--white) !important;
      }
    }
    tr {
      height: 2.25rem;
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: var(--teal-light);
        .empty {
          circle {
            stroke: var(--gray-normal);
          }
          path {
            fill: var(--gray-normal);
          }
        }
      }
      td:last-child {
        padding-right: 1rem;
      }
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    .whiteRow {
      background: var(--white);
    }

    .standardRow {
      background: var(--gray-lighter);
    }
    
    .selectedRow {
      background: var(--teal-light);
    }

    th {
      margin: 0;
      font-weight: normal;
      font-style: normal;
      font-size: 0.75rem;
      line-height: 1rem;
      font-family: Poppins, sans-serif;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: var(--gray-normal);
      letter-spacing: -0.2px;
      padding-left: 1rem;
      span {
        display: flex;
      }
    }

    td {
      margin: 0;
      font-weight: normal;
      font-style: normal;
      font-size: 0.75rem;
      line-height: 1rem;
      font-family: Poppins, sans-serif;
      white-space: nowrap;
      text-overflow: ellipsis;

      color: var(--text-normal);
      letter-spacing: -0.2px;
      padding-left: 1rem;

      /* The secret sauce */
      /* Each cell should grow equally */
      width: 1%;
      /* But "collapsed" cells should be as small as possible */
      &.collapse {
        width: 0.0000000001%;
      }

      :last-child {
        border-right: 0;
      }
    }
    .expandedRow {
      height: auto;
      overflow-y: auto;
      white-space: normal;
      background: transparent;
      padding: 0;
      overflow: hidden;
      cursor: default;
      &:hover {
        background: transparent;
      }
      height: inherit;
      td {
        padding: 0 !important;
      }

      //.my-dropdown-slidedown {
      //  overflow-x: auto;
      //}
      div {
        /* height: 0;
          height: inherit; */
      }
    }
  }
`;
