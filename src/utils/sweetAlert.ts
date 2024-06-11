import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const showAlert = async (title: string, text: string, icon: 'success' | 'error' | 'warning' | 'info' | 'question') => {
  return MySwal.fire({
    title,
    text,
    icon,
    confirmButtonText: 'OK',
  });
};
