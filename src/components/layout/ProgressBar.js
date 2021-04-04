import { useEffect } from 'react';
import useFbStorage from '../customHooks/useFbStorage'

const ProgressBar = ({ file, setFile, toggleShowUpload }) => {
    const { url, progress, error } = useFbStorage(file);

    useEffect(() => {
        if (url) {
            setFile(null);
        }
        return () => {
            toggleShowUpload()
        }
    }, [url])
    return error ? (
        <div className="progress-bar-error">{error.message}</div>
    ) :
        (
            <div className="progress-bar" style={{ width: { progress } }}></div>
        )
}

export default ProgressBar;