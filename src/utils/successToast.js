import { toast } from 'react-toastify';
import { ReactComponent as ToastError } from '../components/icons/toastErrorIcon.svg';

import styled from 'styled-components';

const ToastContainer = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  svg {
    margin-right: 1.5rem;
  }
`;

export function error(message) {
  return toast.error(
    <ToastContainer>
      <ToastError />
      <span>{message}</span>
    </ToastContainer>
  );
}
