"use client";
import { useEffect, useState } from 'react';
import { Button, Input, Typography, IconButton, Select, Option } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub, faGitlab } from '@fortawesome/free-brands-svg-icons';
import SignupService from './signup.service';
import { useRouter } from 'next/navigation';
import { errorMsg, infoMsg } from '@/components/customToastifyMsg';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator';
import { faEnvelope, faEye, faKey, faMessage } from '@fortawesome/free-solid-svg-icons';
import ReviewUserFingerprint from '@/components/fingerprintUtils';

const SignupForm = () => {

  const router = useRouter()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [sucess, setSuccess] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setSubmitted(false);
  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const fingerprint = await ReviewUserFingerprint()

    try {

      //validate email and password
      if (!validator.isEmail(email)) {
        errorMsg("invalid email format, please try again", faEnvelope)
        setSubmitted(false);
      } else if (!validator.isStrongPassword(password)) {
        setSubmitted(false);
        errorMsg("invalid or strong password is required", faKey)
      } else {
        const response = await SignupService.registerUser({ email, password }, fingerprint);

        if (response.status == 201 || response.status == 200) {
          //new account created or confirmation of account needed
          setSubmitted(true);
          setErrorMessage(null);
          setSuccess(response.data?.message);
          infoMsg(response.data?.message)
          setTimeout(() => {
            router.replace("/auth/verify");
          }, 1500);
        } else {
          infoMsg(response.response.data.message);
          setSubmitted(false);
        }
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.message);
        errorMsg(error.message)
        setSubmitted(false); //cause user to recorrect the details
      } else {
        setErrorMessage("Failed to Sign up, try again");
        setSubmitted(false); //cause user to recorrect the details
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-[#fefefe] border border-gray-400 rounded-lg p-8 w-96">
        <ToastContainer />
        <Typography variant="h4" className="text-center mb-6 text-gray-700">
          Create Your Account
        </Typography>


        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            onFocus={() => setSubmitted(false)}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`transition duration-300 ${submitted && !email ? 'border-red-500' : ''}`}
            required
          />


          <Input
            label="Password"
            type="password"
            value={password}
            onFocus={() => setSubmitted(false)}
            onChange={(e) => setPassword(e.target.value)}
            className={`transition duration-300 ${submitted && !password ? 'border-red-500' : ''}`}
            required
          />

          <Button
            type="submit"
            disabled={submitted}
            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white"
          >
            {submitted ? 'Processing...' : 'Sign up'}
          </Button>
        </form>

        <div className="mt-4 flex justify-between text-sm text-gray-600">
          <a href="/auth/reset-password" className="hover:text-blue-500">Forgot password? Reset</a>
          <a href="/auth/signin" className="hover:text-blue-500">Already have an account? Login</a>
        </div>

        <fieldset className="my-6 border-t border-gray-300 text-center">
          <legend className="px-2 text-gray-500">Continue with</legend>
        </fieldset>

        <div className="flex justify-center gap-x-2 mt-4">
          <IconButton
            color="lightBlue"
            onClick={() => {/* Google sign-in logic */ }}
          >
            <FontAwesomeIcon icon={faGoogle} className="text-lg" /> {/* Increase font size */}
          </IconButton>

          <IconButton
            color="lightBlue"
            onClick={() => {/* GitLab sign-in logic */ }}
          >
            <FontAwesomeIcon icon={faGitlab} className="text-lg" /> {/* Increase font size */}
          </IconButton>

          <IconButton
            color="lightBlue"
            onClick={() => {/* GitHub sign-in logic */ }}
          >
            <FontAwesomeIcon icon={faGithub} className="text-lg" /> {/* Increase font size */}
          </IconButton>
        </div>

      </div>
    </div>
  );
};

export default SignupForm;
