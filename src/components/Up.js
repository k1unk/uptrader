import React, {useRef} from 'react';
import useFileUpload from "react-use-file-upload";

const Up = ({f}) => {

    const {
        files,
        fileNames,
        fileTypes,
        totalSize,
        totalSizeInBytes,
        handleDragDropEvent,
        clearAllFiles,
        createFormData,
        setFiles,
        removeFile,
    } = useFileUpload();

    const inputRef = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();

        files.map(async e => {

            f(e)
        })
    };

    return (
        <div>
            <div>
                <div className="form-container">
                    <div>
                        <ul>
                            {fileNames.map((name) => (
                                <li key={name}>
                                    <span>{name}</span>

                                    <span onClick={() => removeFile(name)}>remove</span>
                                </li>
                            ))}
                        </ul>

                        {files.length > 0 && (
                            <ul>
                                <li>File types found: {fileTypes.join(', ')}</li>
                                <li>Total Size: {totalSize}</li>
                                <li>Total Bytes: {totalSizeInBytes}</li>

                                <li className="clear-all">
                                    <button onClick={() => clearAllFiles()}>Clear All</button>
                                </li>
                            </ul>
                        )}
                    </div>
                    <div
                        onDragEnter={(e) => handleDragDropEvent(e)}
                        onDragOver={(e) => handleDragDropEvent(e)}
                        onDrop={(e) => {
                            handleDragDropEvent(e);
                            setFiles(e, 'a');
                        }}
                    >
                        <button onClick={() => inputRef.current.click()}>select files to upload</button>
                        <input
                            ref={inputRef}
                            type="file"
                            multiple
                            style={{display: 'none'}}
                            onChange={(e) => {
                                setFiles(e, 'a');
                                inputRef.current.value = null;
                            }}
                        />
                    </div>
                </div>

                <div className="submit">
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default Up;
