import { Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, useColorModeValue } from "@chakra-ui/react";
import { useFormik } from "formik";
import { FunctionComponent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { UserContext } from "../context/UserContext";
import User from "../interfaces/User";
import { successMsg, errorMsg } from "../services/toastify";
import { loginUser } from "../services/usersService";

interface LoginProps { }

const Login: FunctionComponent<LoginProps> = () => {

  let navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);

  let formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: yup.object({
      email: yup.string().required().min(5),
      password: yup.string().required().min(8),
    }),
    onSubmit: (values: User) => {
      loginUser(values)
        .then(res => {
          if (res.data.length) {
            sessionStorage.setItem('userData',
              JSON.stringify({
                id: res.data[0].id,
                email: res.data[0].email,
                name: res.data[0].name,
                isBusiness: res.data[0].isBusiness,
              }));
            setUserData({ id: res.data[0].id, email: res.data[0].email, name: res.data[0].name, isBusiness: res.data[0].isBusiness });
            successMsg('Logged in successfully');
            navigate('/');
          } else {
            errorMsg('Email or Password are incorrect');
          }
        })
        .catch(err => console.log(err));
    }
  });

  return (
    <Flex
      flexDir='column'
      p='22px'
      gap='33px'
    >
      <form onSubmit={formik.handleSubmit}>
        <Flex flexDir='column' gap='22px'>

          {/* EMAIL */}
          <FormControl isInvalid={formik.touched.email && formik.errors.email?.length! > 0}>
            <FormLabel>Email</FormLabel>
            <Input
              bg={useColorModeValue('white', '#111')}
              name='email'
              type='email'
              size={['sm', 'md', 'lg']}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            ) : (
              <FormHelperText>Please enter your Email</FormHelperText>
            )}
          </FormControl>

          {/* PASSWORD */}
          <FormControl isInvalid={formik.touched.password && formik.errors.password?.length! > 0}>
            <FormLabel>Password</FormLabel>
            <Input
              bg={useColorModeValue('white', '#111')}
              name='password'
              type='password'
              size={['sm', 'md', 'lg']}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            ) : (
              <FormHelperText>Please enter your Password</FormHelperText>
            )}
          </FormControl>

          <Button
            mt='12'
            size='lg'
            fontWeight='bold'
            isDisabled={!formik.dirty || !formik.isValid}
            bg='hotpink'
            type="submit"
          >Login</Button>

        </Flex>
      </form>
    </Flex >
  );
}

export default Login;