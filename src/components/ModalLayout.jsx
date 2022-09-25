import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Modal } from 'antd';

const ModalLayout = ({ btnText, title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        type="primary"
        className="px-2 py-1 mb-2  bg-blue-500 rounded-md"
        onClick={() => setOpen(true)}
      >
        {btnText}
      </Button>
      <Modal
        title={title}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalLayout;
