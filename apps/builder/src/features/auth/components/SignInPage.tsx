import { Seo } from '@/components/Seo'
import { TextLink } from '@/components/TextLink'
import { useScopedI18n } from '@/locales'
import { VStack, Heading, Text  } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { SignInForm } from './SignInForm'
// import { useState } from "react";
type Props = {
  type: 'signin' | 'signup'
  defaultEmail?: string
}

export const SignInPage = ({ type }: Props) => {
  const scopedT = useScopedI18n('auth')
  const { query } = useRouter();
  // const [emailInput, setEmailInput] = useState('');
  // const [ passwordInput , setPasswordInput ] = useState("");
  // // @ts-ignore
  // const handleEmailInputChange = (e) => setEmailInput(e.target.value)
  // // @ts-ignore
  // const handlePasswordInputChange = (e) =>  setPasswordInput(e.target.value)
  // const isError = emailInput === ''
  // const isPasswordError = passwordInput === ""
  // const signINButtonClicked = ( ) => {
  //   console.log("signIn Button clicked");
  //   fetch(`/api/login`, {
  //     method : "POST" ,
     
  //     body :  {
  //       // @ts-ignore
  //       email : "kapilutk063@gmail.com" ,
  //       password : "1234"
  //     }
  //   }).then( res => {
  //     console.log("response",res);
  //   } ).catch( err => {
  //     console.log("error",err);
  //   } )
  // }
  return (
    <VStack spacing={4} h="100vh" justifyContent="center">
      {/* <Seo
        title={
          type === 'signin'
            ? scopedT('signin.heading')
            : scopedT('register.heading')
        }
      />  */}
      {/* <VStack spacing={4} >
       <FormControl isInvalid={isError} >
       <FormLabel>Email</FormLabel>
      <Input type='email' value={emailInput} onChange={handleEmailInputChange} />
      {!isError ? (
        <FormHelperText>
          Enter the email.
        </FormHelperText>
      ) : (
        <FormErrorMessage>Email is required.</FormErrorMessage>
      )}
       </FormControl>
       <FormControl isInvalid={isPasswordError} >
       <FormLabel> Password  </FormLabel>
      <Input type='password' value={passwordInput} onChange={handlePasswordInputChange} />
      {!isPasswordError ? (
        <FormHelperText>
          Enter the Password.
        </FormHelperText>
      ) : (
        <FormErrorMessage>Password  is required.</FormErrorMessage>
      )}
       </FormControl>
       <Button colorScheme='linkedin' variant='outline' disabled={ isError || isPasswordError } onClick={signINButtonClicked} > Signin  </Button>
      </VStack> */}
       <Seo
        title={
          type === 'signin'
            ? scopedT('signin.heading')
            : scopedT('register.heading')
        }
      />
      <Heading
        onClick={() => {
          throw new Error('Sentry is working')
        }}
      >
        {type === 'signin'
          ? scopedT('signin.heading')
          : scopedT('register.heading')}
      </Heading>
      {type === 'signin' ? (
        <Text>
          {scopedT('signin.noAccountLabel.preLink')}{' '}
          <TextLink href="/register">
            {scopedT('signin.noAccountLabel.link')}
          </TextLink>
        </Text>
      ) : (
        <Text>
          {scopedT('register.alreadyHaveAccountLabel.preLink')}{' '}
          <TextLink href="/signin">
            {scopedT('register.alreadyHaveAccountLabel.link')}
          </TextLink>
        </Text>
      )}
      <SignInForm defaultEmail={query.g?.toString()} />
      {type === 'signup' ? (
        <Text fontSize="sm" maxW="400px" textAlign="center">
          {scopedT('register.aggreeToTerms', {
            termsOfService: (
              <TextLink href={'https://typebot.io/terms-of-service'}>
                {scopedT('register.termsOfService')}
              </TextLink>
            ),
            privacyPolicy: (
              <TextLink href={'https://typebot.io/privacy-policies'}>
                {scopedT('register.privacyPolicy')}
              </TextLink>
            ),
          })}
        </Text>
      ) : null}
    </VStack>
  )
}
