import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/auth/AuthContext';
import { UsersContext } from '../../context/users/UsersContext';
import { db, fbStorage, timestamp } from '../../firebase';

const useFbStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);
    const { currentUser, setDropdown } = useContext(AuthContext);
    const { getUserInfo } = useContext(UsersContext);

    useEffect(() => {
        // References
        const storageRef = fbStorage.ref(file.name);
        const collectionRef = db.collection('users');

        storageRef.put(file).on('state_changed', (snapshot) => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(percentage);
        }, (err) => {
            setError(err)
        }, async () => {
            const url = await storageRef.getDownloadURL();
            setUrl(url);
            await collectionRef.doc(currentUser.uid).update({ imageUrl: url })
            getUserInfo(currentUser.uid)
            setDropdown('success', 'Profile picture updated')
        })
    }, [file])

    return { progress, url, error }
}

export default useFbStorage;