import { useState } from 'react';
import ProgressBar from '../../layout/ProgressBar'

const UploadPhoto = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const types = ['image/png', 'image/jpeg'];

    const handleChange = (e) => {
        let selected = e.target.files[0];

        if (selected && types.includes(selected.type)) {
            setFile(selected);
            setError(null);
        } else {
            setFile(null);
            setError('Please Select an image file (png or jpeg)')
        }
    }
    return (
        <form>
            <input type="file" onChange={handleChange} />
            <div>
                {error && <div>{error}</div>}
                {file && <div>{file.name}</div>}
                {file && <ProgressBar file={file} setFile={setFile} />}
            </div>
        </form>
    );
}

export default UploadPhoto;