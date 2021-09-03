import
  React,
  {
    Fragment,
    useCallback,
    useEffect,
    useRef,
    useImperativeHandle,
    forwardRef
  }
from 'react';

import {
  useTable,
  useExpanded,
  usePagination,
  useRowSelect,
} from 'react-table';
import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';
import { Styles } from './styles';

const Table = forwardRef(({
  columns,
  data,
  initialState,
  renderSubRowComponent,
  getTrProps = (props) => props,
  getSelectedRows,
}, ref) => {
  const rowRef = useRef(null);

  const stateReducer = useCallback((newState, action, prevState) => {
    if (action.type === 'toggleRowExpanded') {
      const prevTokens = Object.keys(prevState.expanded);
      const newTokens = Object.keys(newState.expanded);

      if (newTokens.length > 1) {
        const nextExpanded = {};
        // const scroll = rowRef;
        for (const t of newTokens) {
          if (!prevTokens.includes(t)) {
            nextExpanded[t] = true;
            // scroll?.current?.scrollIntoView({
            //   behavior: 'smooth',
            //   block: 'nearest',
            //   inline: 'nearest',
            // });
          }
        }
        return { ...newState, expanded: nextExpanded };
      }
    }
    return newState;
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    visibleColumns,
    selectedFlatRows,
    toggleAllRowsSelected
  } = useTable(
    {
      columns,
      data,
      initialState,
      stateReducer,
    },
    useExpanded,
    usePagination,
    useRowSelect
  );

  useEffect(() => {
    if (getSelectedRows) getSelectedRows(selectedFlatRows.map(item => item.original));
  },[selectedFlatRows]);

  useImperativeHandle(ref, () => ({
    validate() {
      toggleAllRowsSelected(false)
    }

  }));

  return (
    <Styles>
      <div className="tableWrap">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps({
                      className: column.collapse ? 'collapse' : '',
                    })}
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              const rowProps = row.getRowProps();
              return (
                <Fragment key={rowProps.key}>
                  <tr
                    className={i % 2 === 0 ? 'standardRow' : ''}
                    {...getTrProps(row)}
                  >
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps({
                            className: cell.column.collapse ? 'collapse' : '',
                          })}
                        >
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                  <tr className="expandedRow" ref={rowRef}>
                    <td colSpan={visibleColumns.length}>
                      <SlideDown className={'my-dropdown-slidedown'}>
                        {row.isExpanded && renderSubRowComponent({ row })}
                      </SlideDown>
                    </td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </Styles>
  );
});

export default Table;
