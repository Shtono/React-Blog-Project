import { useState } from 'react';
import ProgressBar from '../../layout/ProgressBar';

const UploadPhoto = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const types = ['image/png', 'image/jpeg'];


    const handleChange = (e) => {
        let selected = e.target.files[0];
        console.log(selected);
        if (selected && types.includes(selected.type)) {
            setFile(selected);
            setError(null);
            if (selected.size > 1100000) {
                setFile(null);
                setError('Size limit exceeded...(Size limit 1mb)')
            }
        } else {
            setFile(null);
            setError('Please Select an image file (png or jpeg)')
        }
    }
    return (
        <form>
            <label>
                <input type="file" onChange={handleChange} />
                <span>+</span>
            </label>
            <div>
                {error && <div>{error}</div>}
                {file && <div>{file.name}</div>}
                {file && <ProgressBar file={file} setFile={setFile} />}
            </div>
        </form>
    );
}

export default UploadPhoto;