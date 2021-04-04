import { useState } from 'react';
import ProgressBar from '../../layout/ProgressBar';

const UploadPhoto = ({ toggleShowUpload }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const types = ['image/png', 'image/jpeg'];


    const handleChange = (e) => {
        let selected = e.target.files[0];
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
        <form className="update-photo">
            <label>
                <input type="file" onChange={handleChange} />
                <span><i className="fas fa-plus fa-3x"></i></span>
            </label>
            <div>
                {error && <div className='error'>{error}</div>}
                {file && <div>{file.name}</div>}
                {file && <ProgressBar file={file} setFile={setFile} toggleShowUpload={toggleShowUpload} />}
            </div>
        </form>
    );
}

export default UploadPhoto;