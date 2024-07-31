import toast from 'react-hot-toast';

export const errorToast = (msg = 'Something went wrong.', toastId = '') =>
  toast.error(msg, {
    duration: 2000,
    id: toastId,
  });

/* Success Toast Message*/
export const successToast = (msg = 'Success', toastId = '') =>
  toast.success(msg, {
    duration: 2000,
    id: toastId,
  });
