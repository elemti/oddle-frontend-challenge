import React from 'react';

let MainLayout = ({ children, ...props }) => {
  return (
    <main {...props} css={`
      display: flex;
      height: 100%;
      & > div:only-child {
        max-width: 1440px;
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
      }
    `}>
      {children}
    </main>
  );
};

export default MainLayout;
