import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const PageMeta: FC = () => {
  const { title, description, keyword } = useSelector(
    (state: RootState) => state.pageMetas
  );

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keyword} />
    </Helmet>
  );
};

export default PageMeta;