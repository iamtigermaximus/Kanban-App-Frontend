import { useState } from 'react';

const useModalState = (initialState = false) => {
  const [open, setOpen] = useState(initialState);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return { open, handleOpen, handleClose };
};

export default useModalState;
