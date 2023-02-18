import { useColorMode, useColorModeValue } from '@chakra-ui/react';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



export function successMsg(message: string) {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    theme: 'dark'
  });
}

export function errorMsg(message: string) {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    theme: 'dark'
  });
}