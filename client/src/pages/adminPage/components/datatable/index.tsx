import { Table, TableProps } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';

interface IProps<T> extends TableProps<T> {
  data: T[];
  columns: ColumnsType<T>;
}

export default function DataTable<T>({ columns, data, ...props }: IProps<T>): JSX.Element {
  return (
    <div className='w-full overflow-y-auto'>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore*/}
      <Table {...props} columns={columns} dataSource={data} />
    </div>
  );
}
