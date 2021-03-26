import { useEffect } from 'react';
import useFbStorage from '../customHooks/useFbStorage'

const ProgressBar = ({ file, setFile }) => {
    const { url, progress, error } = useFbStorage(file);

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