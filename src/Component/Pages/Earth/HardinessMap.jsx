import React, { useEffect } from 'react';
import './Hardin.css';

const HardinessMap = ({ speciesId }) => {
    useEffect(() => {
        try {
            console.log('HardinessMap useEffect triggered');
            const canvas = document.getElementById('myCanvas');
            const ctx = canvas.getContext('2d');

            const firstImageUrl = `https://perenual.com/storage/image/hardiness/lg/0.png`;
            const firstImage = new Image();
            firstImage.onload = () => {
                console.log('First image loaded');
                canvas.width = firstImage.width;
                canvas.height = firstImage.height;

                const imageUrls = ["https://perenual.com/storage/image/hardiness/lg/0.png"];
                for (let x = 7; x <= 7; x++) {
                    const url = `https://perenual.com/storage/image/hardiness/lg/${x}.png`;
                    imageUrls.push(url);
                }

                for (let i = 0; i < imageUrls.length; i++) {
                    const img = new Image();
                    img.onload = () => {
                        console.log(`Image ${i} loaded`);
                        if (i > 0) {
                            ctx.globalAlpha = 0.8;
                        }
                        ctx.drawImage(img, 0, 0);
                        ctx.globalAlpha = 1.0;
                    };
                    img.src = imageUrls[i];
                }
            };
            firstImage.src = firstImageUrl;
        } catch (error) {
            console.error('Error in HardinessMap useEffect:', error);
        }
    }, [speciesId]);

    return (
        <div className='canva'>
        <canvas id="myCanvas" style={{ width: '100%', height: '100%', border: '1px solid black' }}></canvas>
        </div>
    );
};

export default HardinessMap;
