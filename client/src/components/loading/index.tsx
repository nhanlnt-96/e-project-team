import './Loading.scss';

import CircleLoading from 'components/loading/CircleLoading';
import TeaCupLoading from 'components/loading/TeaCupLoading';
import React, { useMemo } from 'react';

interface IProps {
  isPageLoading?: boolean;
  isLoadingMask?: boolean;
  className?: string;
}

const Loading: React.FC<IProps> = ({ isPageLoading = false, isLoadingMask = false, className = '' }) => {
  const loadingContainerClass = useMemo(() => {
    return isPageLoading ? 'w-screen h-screen bg-black text-white' : 'w-full h-full text-inherit';
  }, [isPageLoading]);

  return !isLoadingMask ? <TeaCupLoading className={[loadingContainerClass, className].join(' ')} /> : <CircleLoading className={className} />;
};

export default Loading;
