import { useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import $ from "jquery";
import "../sass/newhome.scss";
const NewHome = (props) => {
    const [fileUrl, setFileUrl] = useState("");
    const [refImg, setRefImg] = useState("");
    const changeHandler = (event) => {
        let file = event.target.files[0];
        let imgLink = URL.createObjectURL(file);
        setFileUrl(imgLink);
        document.getElementById("ori-img").setAttribute("src", imgLink);
        let originalImage = document.getElementById("ori-img");
        let imageContainer = document.getElementById("origin-img");
        let imgHeight = originalImage.scrollHeight;
        let imgWidth = originalImage.scrollWidth;
        imageContainer.style.height = imgHeight;
        imageContainer.style.width = imgWidth;
        console.log(file);
    };
    const refImgHandler = (event) => {
        let file = event.target.files[0];
        setRefImg(URL.createObjectURL(file));
        console.log(file);
    };
    function loadRandomImage() {
        const image = new Image();
        image.crossOrigin = true;
        return new Promise((resolve, reject) => {
            image.addEventListener('error', (error) => reject(error));
            image.addEventListener('load', () => resolve(image));
            image.src = 'https://source.unsplash.com/512x512/?face,friends';
            console.log("helo tere");
            document.getElementById("img-cont").append(image);
        });
    }
    const caller = async () => {
        // let x = await faceapi.nets.tinyFaceDetector.loadFromUri('./models');
        Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models'),
        ]).then(async (res) => {
            // const image = loadRandomImage().then(async (res) => {
            // let OrImg = new Image();
            // OrImg.src = fileUrl;

            let OrImg = document.getElementById("ori-img");
            console.log("y is here", OrImg, OrImg.scrollHeight, OrImg.scrollWidth);
            const canvas = faceapi.createCanvas(OrImg);
            canvas.setAttribute("class", "found-canvas");
            canvas.style.position = "absolute";
            canvas.style.left = "40px";
            // canvas.classList.add("found-canvas");
            let originalImage = document.getElementById("ori-img");
            let imageContainer = document.getElementById("origin-img");
            // let imgHeight = originalImage.scrollHeight;
            // let imgWidth = originalImage.scrollWidth;
            // imageContainer.style.height = imgHeight;
            // imageContainer.style.width = imgWidth;

            imageContainer.append(canvas);
            // document.body.append(canvas);
            const displaySize = { width: OrImg.scrollWidth, height: OrImg.scrollHeight };
            faceapi.matchDimensions(canvas, displaySize);
            const faces = faceapi.detectAllFaces(OrImg, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions().then(res => {
                console.log("FACES RESPONSE", res);
                //DETECT ALL FACES AND DRAW ON CANVAS
                let resizedDetections = faceapi.resizeResults(res, displaySize);
                canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
                faceapi.draw.drawDetections(canvas, resizedDetections);
                faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
                faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
            }).catch(err => console.log("error in catch", err));
            console.log("FACESSS", faces);

            let referenceImage = new Image();
            referenceImage.src = refImg;
            console.log("file url from in", refImg);
            const results = faceapi.detectAllFaces(referenceImage, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions().then(res => {
                console.log("res from compare", res);
                // let disSize = { width: 800, height: 800 };
                // let resizedDetections = faceapi.resizeResults(res[0], disSize);
                // canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
                // faceapi.draw.drawDetections(canvas, resizedDetections);
                // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
                // faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
            }).catch(err => console.log("ERROR from compare", err));
            console.log("RESULTS==>", results);
            // });
            console.log("RESPONSE HER", res);

        }).catch(err => { console.log("ERROR FROM MODEL LOADER", err); });
        // let x = await faceapi.loadTinyFaceDetectorModel('/models');
        // x.then(res => {
        //     console.log("RESPONSE", res);
        // }).catch(err => console.log("error in catch", err));
        // console.log(x);
        // const image = loadRandomImage().then(async (res) => {
        //     // console.log("FACEAPIIIIIII", faceapi.nets.tinyFaceDetector.loadFromUri('/models'));
        //     // await faceapi.nets.tinyFaceDetector.loadFromUri('/models');

        //     await faceapi.nets.tinyFaceDetector.loadFromUri('./models').then(res => {
        //         console.log("res from okay", res);
        //         const faces = faceapi.detectAllFaces(res, new faceapi.TinyFaceDetectorOptions()).then(res => console.log(res)).catch(err => console.log("error in catch", err));
        //         console.log(faces);
        //     }).catch(err => {
        //         console.log("error from other catch", err);
        //     });
        //     console.log("i am loaded");

        // });

        // console.log("faceapi->", faceapi);
        // console.log("IMAGE", image);
        // const faces = await faceapi.detectAllFaces(image, new faceapi.TinyFaceDetectorOptions()).then(res => res.json()).then(res => console.log("RESS->", res)).catch(err => console.log("ERR found in catch", err));
        // console.log("faces result", faces);
        // x.then(res => res.json()).then(res => console.log(res)).catch(err => console.log("error in then response", err));
    };
    useEffect(() => {
    }, []);
    return (
        <div className="">
            <h1>This is the title</h1>
            Original Image
            <div className="res-cont">
                <div id="img-cont"></div>
                ref
                <input type="file" onChange={refImgHandler} />
                orig
                <input type="file" onChange={changeHandler} />
                <button onClick={caller}>Click me</button>
            </div>
            <div id="origin-img" style={{ position: "relative" }}>
                <img id="ori-img" style={{ position: "absolute", left: "40px" }} />
            </div>

        </div>
    );
};
export default NewHome;