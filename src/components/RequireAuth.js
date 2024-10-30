import { axiosPrivate } from '@/api/apiConfig';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react'
import ReviewUserFingerprint from './fingerprintUtils';

const RequireAuth = (ChildrenLayout) => {

    const Wrapper = (props) => {

        let isMounted = true;

        useEffect(() => {

            const getAuthMe = async () => {

                const fingerprint = await ReviewUserFingerprint()

                try {

                    const apiResponse = await axiosPrivate.get("/auth", {
                        params: { fingerprint }
                    });

                    if (apiResponse.status == 200) {
                        isMounted = false;
                        //set auth data
                        
                    }

                } catch (error) {
                    console.log(error);
                }
            }

            getAuthMe();

            return () => {
                isMounted = false;
            }
        }, []);

        //...props will return deeper children
        return <ChildrenLayout {...props} />;
    }

    return Wrapper
}

export default RequireAuth