import { useEffect } from 'react';
import useFbStorage from '../customHooks/useFbStorage'

const ProgressBar = ({ file, setFile }) => {
    const { url, progress, error } = useFbStorage(file);
    console.log(progress, url, error);

    useEffect(() => {
        if (url) {
            setFile(null);
        }
    }, [url])
    return (
        <div>Progress</div>
    );
}

export default ProgressBar;