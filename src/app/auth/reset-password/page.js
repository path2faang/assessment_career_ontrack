"use client";
import { useState } from 'react';
import { Button, Input, Typography, IconButton } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub, faGitlab } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faFingerprint, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { errorMsg, infoMsg } from '@/components/customToastifyMsg';
import validator from 'validator';
import { axiosPublic } from '@/api/apiConfig';
import { useRouter } from 'next/navigation';
import ContinueWithAuth from '@/components/ContinueWithAuth';

const ResetPasswordRequest = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);


    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        //validate email

        if (!email) {
            errorMsg("email is required", faEnvelope);
        }
        else if (!validator.isEmail(email)) {
            errorMsg("invalid email format, please try again", faEnvelope);
        } else {

            try {

                const response = await axiosPublic.post("/auth/password/reset", { email });

                if (response.status == 200) {
                    infoMsg(response.data?.message);
                    setTimeout(() => {
                        router.push("/auth/verify");
                    }, 1500);
                } else {
                    errorMsg(error.response.data.message)
                    setSubmitted(false); //cause user to recorrect th
                }
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
                    Reset Password
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


                    <Button
                        disabled={submitted}
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white"
                    >
                        {submitted ? "processing..." : "Submit"}
                    </Button>
                </form>

                <div className="mt-4 flex justify-between text-sm text-gray-600">
                    <a href="/auth/reset-password" className="hover:text-blue-500">Already have an account? Login</a>
                    <a href="/auth" className="hover:text-blue-500">New account? Signup</a>
                </div>

                <ContinueWithAuth/>

            </div>
        </div>
    );
};

export default ResetPasswordRequest;
