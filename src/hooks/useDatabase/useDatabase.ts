import { NETWORK_STATE } from "common/constants/global";
import { getAuth, updateProfile, User } from "firebase/auth";
import { equalTo, get, getDatabase, onValue, orderByChild, push, query, ref, set, update } from "firebase/database";
import { useState } from "react";
import { TMessage, TPreviewMessage, TUser } from "./types";

const useDatabase = () => {

    const [users, setUsers] = useState<TUser[]>([])
    const [user, setUser] = useState<TUser | null>(null);
    const [previewMessages, setPreviewMessages] = useState<TPreviewMessage[]>([]);
    const [messages, setMessages] = useState<TMessage[]>([]);
    const [isLoading, setIsLoading] = useState<NETWORK_STATE>(NETWORK_STATE.RESOLVED);

    const database = getDatabase();

    const updateUsers = async (creds: User) => {
        const usersRef = ref(database, `users/${creds.uid}`)
        set(usersRef, {
            displayName: creds.displayName,
            id: creds.uid,
            photoURL: creds.photoURL,
            email: creds.email,
            phoneNumber: creds.phoneNumber,
            createdAt: creds.metadata.creationTime
        })
    }

    const updateProfilePicture = (url: string) => {
        const auth = getAuth();
        const usersRef = ref(database, `users/${auth.currentUser?.uid}`)
        if (auth.currentUser) {
            updateProfile(auth.currentUser, { photoURL: url })
        }
        update(usersRef, {
            photoURL: url,
        })
    }

    const getUserById = (id: string) => {
        const usersRef = ref(database, `users/${id}`)
        get(usersRef).then((response) => {
            if (response.exists()) {
                setUser((response.val()))
            }
        });
    }

    const getUsers = () => {
        setIsLoading(NETWORK_STATE.PENDING)
        const usersRef = ref(database, 'users');
        get(usersRef).then((response) => {
            setIsLoading(NETWORK_STATE.RESOLVED)
            if (response.exists()) {
                setUsers(Object.values(response.val()))
            }
        }).catch(() => {
            setIsLoading(NETWORK_STATE.REJECTED)
        });
    }

    const sendMessage = (id: string, message: string) => {
        const auth = getAuth();
        const messagesRef = ref(database, `preview_messages`);
        const previewDataMessage = {
            senderId: auth.currentUser?.uid,
            recipient: id,
            previewMessage: message,
            timestamp: +new Date(),
        }
        push(messagesRef, previewDataMessage).then((response) => {
            const deepMessagesRef = ref(database, `messages/${id}`);
            const pushDataMessage = {
                senderId: auth.currentUser?.uid,
                message: message,
                displayName: auth.currentUser?.displayName,
                timestamp: +new Date(),
            }
            push(deepMessagesRef, pushDataMessage)
            onValue(deepMessagesRef,
                (response) => {
                    setMessages(prev => ([...prev, ...Object.values(response.val())] as TMessage[]))
                })
        })
    }

    const getPreviewMessages = () => {
        const auth = getAuth();
        const messagesRef = ref(database, `preview_messages`);
        onValue(messagesRef,
            (response) => {
                if (response.exists()) {
                    setPreviewMessages(prev => ([...prev, ...Object.values(response.val()) as TPreviewMessage[]]))
                }
            })

    }

    const getMessagesById = (id: string) => {
        const auth = getAuth();
        const messagesRef = ref(database, `messages/${auth.currentUser?.uid}/`);
        onValue(messagesRef, (response) => {
            setIsLoading(NETWORK_STATE.RESOLVED)
            if (response.exists()) {
                setMessages(Object.values(response.val()))
            }
        })
    }


    return {
        updateUsers, updateProfilePicture, getUsers, getUserById, sendMessage, getPreviewMessages, getMessagesById, data: {
            users, user, previewMessages, messages
        }, loaders: {
            isLoading
        }
    }
}

export default useDatabase;

