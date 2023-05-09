import { useRef, useEffect } from 'react';

function VideoPreview({ videoFile }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // When the video is loaded, start playing it and update the canvas
        video.addEventListener('loadedmetadata', function () {
            video.play();
            setInterval(function () {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
            }, 1000 / 60);
        });

        return () => {
            video.removeEventListener('loadedmetadata', function () { });
        };
    }, [videoFile]);

    return (
        <>
            <video ref={videoRef} style={{ display: "none" }} muted="true">
                <source src={URL.createObjectURL(videoFile)} type={videoFile.type} />
            </video>
            <canvas ref={canvasRef} />
        </>
    );
}

export default VideoPreview;
