import './CollapseComp.scss';

import { Collapse, CollapseProps } from 'antd';
import { SvgIcons } from 'assets/icons/svgIcons';
import React, { ReactNode } from 'react';

interface IProps extends CollapseProps {
  children: ReactNode;
}

const CollapseComp: React.FC<IProps> = ({ children, ...props }) => {
  return (
    <Collapse
      {...props}
      bordered={false}
      expandIconPosition='end'
      expandIcon={({ isActive }) => React.cloneElement(SvgIcons.ChevronUp, { className: `text-black w-4 h-4 ${isActive ? 'rotate-90' : 'rotate-0'}` })}
      className='collapse-comp'
    >
      {children}
    </Collapse>
  );
};

export default CollapseComp;
