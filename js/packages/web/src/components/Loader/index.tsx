import { useMeta } from '@batafy/common';
import React, { FC } from 'react';
import { LoadingOutlined } from "@ant-design/icons"

export const LoaderProvider: FC = ({ children }) => {
  const { isLoading } = useMeta();

  return (
    <>
      <div className={`loader-container ${isLoading ? 'active' : ''}`}>
        <div className="loader-block">
          <LoadingOutlined style={{ fontSize: "40px", color: "white"}} />
          <div className="loader-title">loading...</div>
        </div>
      </div>
      {children}
    </>
  );
};
