import { Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, useColorModeValue, VStack, useColorMode, Checkbox, Tooltip } from "@chakra-ui/react";
import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import User from "../interfaces/User";
import { errorMsg, successMsg } from "../services/toastify";
import { addUser, checkIfEmailExists } from "../services/usersService";

interface RegisterProps {

}

const Register: FunctionComponent<RegisterProps> = () => {

  let navigate = useNavigate();

  let formik = useFormik({
    initialValues: { email: '', password: '', name: '', isBusiness: false },
    validationSchema: yup.object({
      email: yup.string().required().min(5),
      password: yup.string().required().min(8),
      name: yup.string().required().min(2),
      isBusiness: yup.boolean(),
    }),
    onSubmit: async (values: User) => {
      await checkIfEmailExists(values.email) ?
        errorMsg('This email is already in use')
        :
        addUser({ ...values, cardIds: [], lovedCardIds: [] })
          .then(res => {
            sessionStorage.setItem('userData', JSON.stringify({
              id: res.data.id,
              email: res.data.email,
              name: res.data.name,
              isBusiness: res.data.isBusiness,
            }));
            successMsg('Registered successfully');
            navigate('/');
          })
          .catch(err => console.log(err))
    }
  });

  return (
    <Flex
      w='100%'
      flexDir='column'
      p={['', '22px']}
      gap={['', '22px']}
    >
      <form onSubmit={formik.handleSubmit}>
        <Flex flexDir='column' gap='22px'>

          {/* EMAIL */}
          <FormControl isRequired isInvalid={formik.touched.email && formik.errors.email?.length! > 0}>
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
              <FormHelperText>Please enter an Email for your accout</FormHelperText>
            )}
          </FormControl>

          {/* PASSWORD */}
          <FormControl isRequired isInvalid={formik.touched.password && formik.errors.password?.length! > 0}>
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
              <FormHelperText>Please enter a Password for your account</FormHelperText>
            )}
          </FormControl>

          {/* NAME */}
          <FormControl isRequired isInvalid={formik.touched.name && formik.errors.name?.length! > 0}>
            <FormLabel>Name</FormLabel>
            <Input
              bg={useColorModeValue('white', '#111')}
              name='name'
              type='text'
              size={['sm', 'md', 'lg']}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
            ) : (
              <FormHelperText>Please enter a Name for your account</FormHelperText>
            )}
          </FormControl>

          <FormControl>
            <Checkbox
              size='lg'
              name='isBusiness'
              type='boolean'
              isChecked={formik.values.isBusiness}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <Tooltip
                label='To produce customized cards on this platform, it is necessary to have a Business Account.'
                fontSize='sm'
              >
                Im a Business.
              </Tooltip>
            </Checkbox>
          </FormControl>

          <Button
            mt='12'
            size='lg'
            fontWeight='bold'
            isDisabled={!formik.dirty || !formik.isValid}
            bg='hotpink'
            type="submit"
          >
            Register
          </Button>

        </Flex>
      </form>
    </Flex >
  );
}

export default Register;