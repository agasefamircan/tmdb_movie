import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppToast = () => {
  return (
    <ToastContainer
      style={{ marginTop: '50px' }}
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
      theme="light"
    />
  );
};

export default AppToast;
