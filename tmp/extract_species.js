const fs = require('fs');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');

async function processImages() {
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({ apiKey });
  const results = [];

  for (let i = 1; i <= 12; i++) {
    const imgPath = `/tmp/fish_img/img_${i}.png`;
    if (!fs.existsSync(imgPath)) continue;
    const imgBuffer = fs.readFileSync(imgPath);

    try {
      const res = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: [
          {
            inlineData: {
              mimeType: 'image/png',
              data: imgBuffer.toString('base64')
            }
          },
          'Extract all fish/aquatic species listed or depicted in this stock list image. Provide a JSON array where each element is an object with keys: "commonName", "scientificName", "description", "careLevel", "temperament", "origin", "diet", "tempRange", "phRange", "minTankSize". If scientific name is not explicitly written on the image, provide the correct official scientific name for that common name. Return ONLY valid JSON array.'
        ]
      });
      console.log(`=== IMG ${i} ===`);
      console.log(res.text);
      results.push({ imgIndex: i, output: res.text });
    } catch(e) {
      console.error(`Error processing img ${i}:`, e.message);
    }
  }

  fs.writeFileSync('/tmp/extracted_species.json', JSON.stringify(results, null, 2));
}

processImages();
