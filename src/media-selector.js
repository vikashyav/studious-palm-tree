import React, { useState } from 'react';

const MediaSelector = () => {
    const [mediaFiles, setMediaFiles] = useState([]);
    const [selectedMedia, setSelectedMedia] = useState(null);

    // Select a folder and load media files
    const handleSelectFolder = async () => {
        try {
            const directoryHandle = await window.showDirectoryPicker();
            const files = [];

            for await (const [name, handle] of directoryHandle) {
                if (handle.kind === 'file') {
                    const file = await handle.getFile();
                    const url = URL.createObjectURL(file);
                    files.push({ name, url, type: file.type });
                }
            }

            setMediaFiles(files);
        } catch (error) {
            console.error('Error selecting folder:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-4 text-center">Media Explorer</h1>
            <div className="flex justify-center mb-4">
                <button
                    onClick={handleSelectFolder}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Select Folder
                </button>
            </div>

            {mediaFiles.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {mediaFiles.map((file, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedMedia(file)}
                            className="cursor-pointer border rounded shadow hover:shadow-lg transition-shadow bg-white"
                        >
                            {file.type.startsWith('image') ? (
                                <img
                                    src={file.url}
                                    alt={file.name}
                                    className="w-full h-32 object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-32 bg-gray-200">
                                    <p className="text-sm text-gray-600">{file.name}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {selectedMedia && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="relative bg-white p-4 rounded-lg">
                        <button
                            onClick={() => setSelectedMedia(null)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                        >
                            ✖
                        </button>
                        {selectedMedia.type.startsWith('video') && (
                            <video src={selectedMedia.url} controls autoPlay className="w-full" />
                        )}
                        {selectedMedia.type.startsWith('audio') && (
                            <audio src={selectedMedia.url} controls autoPlay className="w-full" />
                        )}
                        {selectedMedia.type.startsWith('image') && (
                            <img src={selectedMedia.url} alt={selectedMedia.name} className="w-full" />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MediaSelector;
