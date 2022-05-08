import { FIREBASE_ERROR } from "common/constants/errors";
import { NETWORK_STATE } from "common/constants/global";
import { TLoginData } from "components/pages/login/types";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import useDatabase from "hooks/useDatabase/useDatabase";
import { useEffect, useState } from "react";
import { TCreds } from "./types";

const useAuth = (notifyOpen?: React.Dispatch<React.SetStateAction<boolean>>) => {
    const auth = getAuth();
    const { updateUsers } = useDatabase();
    const [isAuth, setIsAuth] = useState(false);
    const [isLoadingCreateUser, setIsLoadingCreateUser] = useState<keyof typeof NETWORK_STATE>(NETWORK_STATE.RESOLVED)
    const [isLoadingLoginUser, setIsLoadingLoginUser] = useState<keyof typeof NETWORK_STATE>(NETWORK_STATE.RESOLVED)
    const [logInError, setLogInError] = useState<null | string>(null);
    const [signInError, setSignInError] = useState<null | string>(null)

    const createUser = (creds: TCreds) => {
        setIsLoadingCreateUser(NETWORK_STATE.PENDING);
        const { firstName, lastName, email, password } = creds;
        if (!email || !password) {
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                setIsLoadingCreateUser(NETWORK_STATE.RESOLVED);
                await updateProfile(userCredential.user, { displayName: `${firstName} ${lastName}` })
                await updateUsers(userCredential.user)
            })
            .catch((error) => {
                const errorCode = error.code;
                setSignInError(errorCode)
                const failedAuthCodes = [FIREBASE_ERROR.EMAIL_EXISTS, FIREBASE_ERROR.TOO_MANY_ATTEMPTS_TRY_LATER];
                if (failedAuthCodes.includes(errorCode)) {
                    setLogInError(errorCode);
                }
                setIsLoadingCreateUser(NETWORK_STATE.REJECTED);
                notifyOpen && notifyOpen(true)
            })
    }


    const loginUser = (creds: TLoginData) => {
        const { email, password } = creds;
        setIsLoadingLoginUser(NETWORK_STATE.PENDING);
        signInWithEmailAndPassword(auth, email, password)
            .then((resolve) => {
                setIsLoadingLoginUser(NETWORK_STATE.RESOLVED);
            }).catch((error) => {
                const errorCode = error.code;
                const failedAuthCodes = [FIREBASE_ERROR.USER_NOT_FOUND, FIREBASE_ERROR.INVALID_PASSWORD, FIREBASE_ERROR.TOO_MANY_ATTEMPTS_TRY_LATER];
                if (failedAuthCodes.includes(errorCode)) {
                    setLogInError(errorCode);
                }
                setIsLoadingLoginUser(NETWORK_STATE.REJECTED);
                notifyOpen && notifyOpen(true)
            })
    }

    const logOut = () => {
        auth.signOut().then(() => {
            setIsAuth(false);
        })
    }



    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuth(true);
                return;
            }
            setIsAuth(false);
        });
    }, [auth])

    return {
        createUser, loginUser, logOut, loaders: { isLoadingCreateUser, isLoadingLoginUser }, errors: {
            logInError, signInError
        }, auth: { isAuth }
    }
}

export default useAuth;