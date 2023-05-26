import './DataTable.scss';

import { Table, TableProps } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { SvgIcons } from 'assets/icons/svgIcons';
import React, {MouseEvent} from 'react';

interface IProps<T> extends TableProps<T> {
  data: T[];
  columns: ColumnsType<T>;
}

interface IExpandIconProps {
  expanded: boolean;
  // eslint-disable-next-line no-unused-vars
  onClick: (event: MouseEvent<HTMLElement>) => void;
}

export const ExpandIcon: React.FC<IExpandIconProps> = ({ expanded, onClick, ...props }) => {
  return (
    <button {...props} className='outline-none focus:ring-0' onClick={onClick}>
      {React.cloneElement(SvgIcons.ChevronUp, { className: `w-4 h-4 transition duration-100 ease-in-out ${expanded ? 'rotate-90' : ''}` })}
    </button>
  );
};

export default function DataTable<T>({ columns, data, ...props }: IProps<T>): JSX.Element {
  return (
    <div className='w-full overflow-y-auto data-table'>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore*/}
      <Table {...props} columns={columns} dataSource={data} />
    </div>
  );
}
