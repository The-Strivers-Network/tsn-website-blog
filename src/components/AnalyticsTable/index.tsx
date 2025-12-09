import React from 'react';

interface Column<T> {
  key: keyof T;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formatter?: (value: any) => string;
}

interface TableProps<T extends Record<string, unknown>> {
  columns: Column<T>[];
  rows: T[];
  title: string;
}

export const AnalyticsTable = <T extends Record<string, unknown>>({
  columns,
  rows,
  title,
}: TableProps<T>) => {
  return (
    <div className="collection-list__tables" style={{ marginBottom: '2rem' }}>
      <div className="table-wrap">
        <h3 style={{ marginBottom: '1rem' }}>{title}</h3>
        <div className="table">
          <table cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                {columns.map((column, idx) => (
                  <th key={idx}>{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr className={`row-${index + 1}`} key={index}>
                  {columns.map((column, colIndex) => {
                    const cellValue = row[column.key];
                    return (
                      <td key={colIndex}>
                        {column.formatter ? column.formatter(cellValue) : String(cellValue ?? '')}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTable;
