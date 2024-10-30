"use client";
import { useState } from 'react';
import { Button, Input, Typography, IconButton } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub, faGitlab } from '@fortawesome/free-brands-svg-icons';
import { faFingerprint, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import validator from 'validator';
import { errorMsg, infoMsg } from '@/components/customToastifyMsg';
import { useRouter } from 'next/navigation';
import { axiosPrivate } from '@/api/apiConfig';
import ReviewUserFingerprint from '@/components/fingerprintUtils';

const LoginForm = () => {

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);


    const fingerprint = await ReviewUserFingerprint()


    //validate password
    if (!validator.isStrongPassword(password)) {
      errorMsg("strong password is required")
    } else if (!validator.isEmail(email)) {
      errorMsg("invalid email format, please try again");
    } else {

      try {

        const signInResponse = await axiosPrivate.post("/auth/login", { email, password }, {
          params: { fingerprint }
        });

        infoMsg(signInResponse.data.message)

        localStorage.setItem("refreshToken", signInResponse.data.refreshToken);

        setTimeout(() => {
          router.replace("/dashboard");
        }, 800);


      } catch (error) {

        if (error.response) {
          if (error.response.status == 400 && error.response.data.success) {
            infoMsg(error.response.data.message)
            setSubmitted(false); //cause user to recorrect the details
          }
          if (error.response.status == 403 || error.response.status == 400 && !error.response.data.success) {
            errorMsg(error.response.data.message)
            setSubmitted(false); //cause user to recorrect the details
          }
        } else {
          errorMsg("Failed to Sign in, try again");
          setSubmitted(false); //cause user to recorrect the details
        }
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-[#fefefe] border border-gray-400 rounded-lg p-8 w-96">
        <Typography variant="h4" className="text-center mb-6 text-gray-700">
          Login Account
        </Typography>


        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`transition duration-300 ${submitted && !email ? 'border-red-500' : ''}`}
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`transition duration-300 ${submitted && !password ? 'border-red-500' : ''}`}
            required
          />

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white"
          >
            Sign In
          </Button>
        </form>

        <div className="mt-4 flex justify-between text-sm text-gray-600">
          <a href="/auth/reset-password" className="hover:text-blue-500">Forgot password? Reset</a>
          <a href="/auth" className="hover:text-blue-500">New account? Signup</a>
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

export default LoginForm;
