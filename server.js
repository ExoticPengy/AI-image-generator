import * as dotenv from 'dotenv';
dotenv.config();

const modelslabApiKey = process.env.MODELSLAB

import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/dream', async (req, res) => {
    try {
        const prompt = req.body.prompt;

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "key" : modelslabApiKey,
            "prompt": prompt,
            "negative_prompt": "bad quality",
            "width": "512",
            "height": "512",
            "safety_checker": false,
            "seed": null,
            "samples":1,
            "base64":false,
            "webhook": null,
            "track_id": null
        });
        
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
    
        const aiResponse = await fetch("https://modelslab.com/api/v6/realtime/text2img", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    
        console.log(aiResponse)
    
        const image = data.output[0];
        res.send({ image });
    } catch (error) {
        console.error(error)
        res.status(500).send("Something went wrong.")
    }
});

app.listen(8080, () => console.log('make art on https://localhost:8080/dream'))