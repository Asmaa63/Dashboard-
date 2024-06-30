import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';

function Circle() {
    const [speciesId, setSpeciesId] = useState(7); // القيمة الافتراضية
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`https://perenual.com/api/hardiness-map?species_id=${speciesId}&key=sk-QZsh66399c5511a8b5371`);
                const htmlString = response.data;

                // طباعة محتوى الـ HTML للـ API للاستكشاف
                console.log(`HTML for speciesId ${speciesId}:`, htmlString);

                // استخدام cheerio لتحليل HTML واستخراج رابط الصورة
                const $ = cheerio.load(htmlString);
                const canvasElement = $('#myCanvas');
                const scriptElement = canvasElement.next('script');
                const scriptContent = scriptElement.html();

                // استخراج رابط الصورة من محتوى JavaScript
                const imageUrlMatch = scriptContent && scriptContent.match(/const firstImageUrl = "(.*?)";/);
                if (imageUrlMatch && imageUrlMatch[1]) {
                    setImageUrl(imageUrlMatch[1]);
                } else {
                    console.error("Image URL not found in the script content.");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, [speciesId]); // أضف speciesId إلى مصفوفة التبعية

    const handleInputChange = (event) => {
        setSpeciesId(event.target.value);
    };

    return (
        <div>
            <h1>Hardiness Map</h1>
            <input 
                type="number" 
                value={speciesId} 
                onChange={handleInputChange} 
                placeholder="Enter species ID" 
            />
            {imageUrl ? (
                <img src={imageUrl} alt="Hardiness Map" style={{ width: '100%', height: 'auto' }} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Circle;
