import { axiosPublic } from "@/api/apiConfig";

class SignupService {

    static async registerUser(requestBody, fingerprint) {

        //sign up
        try {
            return await axiosPublic.post("/auth", requestBody, {
                params: {fingerprint}
            });

        } catch (error) {
            return error;
        }

    }

}

export default SignupService;