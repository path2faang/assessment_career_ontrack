"use client";
import { useState } from 'react';
import { Button, Input, Typography, IconButton } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub, faGitlab } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faFingerprint, faKey, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { errorMsg, infoMsg } from '@/components/customToastifyMsg';
import validator from 'validator';
import { axiosPublic } from '@/api/apiConfig';
import { useParams, useRouter } from 'next/navigation';
import ContinueWithAuth from '@/components/ContinueWithAuth';

const ResetPasswordForm = () => {
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const {token} = useParams() ?? " ";

    const router = useRouter();
    
    if(!token) {
        router.replace("/auth/signin");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        //validate credentials

        if (!password) {
            errorMsg("password is required", faEnvelope);
            return ;
        } else if (!repeatPassword) {
            errorMsg("repeat password is required", faEnvelope);
            return ;
        }
        else if (!validator.isStrongPassword(password)) {
            errorMsg("strong password is required", faKey);
            return ;
        } else if (repeatPassword != password) {
            errorMsg("password do not match", faKey);
            return ;
        } else {

            try {

                const response = await axiosPublic.put(`/auth/password/${token}`, { password });

                if (response.status == 201) {
                    infoMsg(response.data?.message);
                    setTimeout(() => {
                        router.push("/auth/signin");
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
                    if (error.response.status == 403 || error.response.status == 400 && !error.response.data.success || error.response.status == 404) {
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
                    New Password Form
                </Typography>


                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Password"
                        type="password"
                        onFocus={() => setSubmitted(false)}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`transition duration-300 ${submitted && !password ? 'border-red-500' : ''}`}
                        required
                    />

                    <Input
                        label="Repeat Password"
                        type="password"
                        onFocus={() => setSubmitted(false)}
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        className={`transition duration-300 ${submitted && !repeatPassword ? 'border-red-500' : ''}`}
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

            </div>
        </div>
    );
};

export default ResetPasswordForm;
