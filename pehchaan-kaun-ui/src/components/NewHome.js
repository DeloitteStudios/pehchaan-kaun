import { useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import $ from "jquery";
import "../sass/newhome.scss";
import { createCanvas, getContext2dOrThrow } from 'face-api.js';
import clsx from "clsx";
import Card from './Card/Card';
import ImgInput from './ImgInput/ImgInput';
import { PieChart } from 'react-minimal-pie-chart';
import Button from './Button/Button';
import Popcard from './Popcard/Popcard';
const NewHome = (props) => {
    const [fileUrl, setFileUrl] = useState("");
    const [fileName, setFileName] = useState("");
    const [refImg, setRefImg] = useState("");
    const [refName, setRefName] = useState("");
    const [peopleList, setPeopleList] = useState([]);
    const [selUser, setSelUser] = useState({});
    const changeHandler = (event) => {
        let file = event.target.files[0];
        let imgLink = URL.createObjectURL(file);

        document.getElementById("ori-img").setAttribute("src", imgLink);
        let originalImage = document.getElementById("ori-img");
        // let imageContainer = document.getElementById("origin-img-cont");
        // let imgHeight = originalImage.height;
        // let imgWidth = originalImage.width;
        // console.log("IMG HEIGHT", originalImage.height);
        // imageContainer.style.height = imgHeight.toString() + "px";
        // imageContainer.style.width = imgWidth.toString() + "px";
        console.log(file);
        setFileUrl(imgLink);
        setFileName(file.name);
    };

    const refImgHandler = (event) => {
        let file = event.target.files[0];
        setRefImg(URL.createObjectURL(file));
        setRefName(file.name);
        console.log(file);
    };
    useEffect(() => {
        faceDescMaker(refImg);
    }, [refImg]);
    const faceDescMaker = async (link) => {
        // let referImg = new Image();
        // referImg.src = link;
        // console.log("REFER CONSOLE", referImg.height);
        // console.log("REFER CONSOLE", referImg.height, referImg.width);
        // Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        // faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
        // faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        // faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        // faceapi.nets.faceExpressionNet.loadFromUri('/models'),
        // ]).then(async (res) => {
        //     const fullFaceDescription = await faceapi.detectSingleFace(referImg).withFaceLandmarks().withFaceDescriptor();
        //     const faceDescriptors = [fullFaceDescription.descriptor];
        //     new faceapi.LabeledFaceDescriptors("HELLO there", faceDescriptors);
        // });
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
        console.log("FACE_API->", faceapi);
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
            canvas.style.left = "0px";
            // canvas.style.left = "40px";
            // canvas.classList.add("found-canvas");
            let originalImage = document.getElementById("ori-img");
            originalImage.style.position = "absolute";
            originalImage.style.left = "0px";
            let imageContainer = document.getElementById("origin-img-cont");
            console.log("IMAGE HERE", originalImage.height);
            let imgHeight = originalImage.height;
            let imgWidth = originalImage.width;
            imageContainer.style.height = imgHeight.toString() + "px";
            imageContainer.style.width = imgWidth.toString() + "px";

            imageContainer.append(canvas);
            // document.body.append(canvas);
            const displaySize = { width: OrImg.scrollWidth, height: OrImg.scrollHeight };
            faceapi.matchDimensions(canvas, displaySize);

            //FACE DESCRIPTOR MAKER
            let referImg = new Image();
            referImg.src = refImg;
            const fullFaceDescription = await faceapi.detectSingleFace(referImg).withFaceLandmarks().withFaceDescriptor();
            const faceDescriptors = [fullFaceDescription.descriptor];
            // console.log("DESC ARRAY FROM ->", faceDescriptors);
            let labeledDescriptors = [new faceapi.LabeledFaceDescriptors("HELLO there", faceDescriptors)];
            const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors);
            console.log("FACE MATCHER", faceMatcher);

            let peopleObj = [];
            const faces = faceapi.detectAllFaces(OrImg, new faceapi.TinyFaceDetectorOptions({ inputSize: 512 })).withFaceLandmarks().withFaceExpressions().withFaceDescriptors().then(async res => {
                console.log("FACES RESPONSE", res);

                //RUN MATCHER MAP
                let x;
                let facemapper = res.map((fd) => {
                    x = faceMatcher.findBestMatch(fd.descriptor);
                    console.log("XXXX FROM IN", x);
                });
                console.log("XXX FROM OUT", x);
                console.log("FACE MAPPER", facemapper);



                //DETECT ALL FACES AND DRAW ON CANVAS
                let resizedDetections = faceapi.resizeResults(res, displaySize);
                const boxesWithText = [
                    // new faceapi.BoxWithText(new faceapi.Rect(x, y, width, height), text),
                    new faceapi.Box(new faceapi.Rect(0, 0, canvas.width, canvas.height), 'some text')
                ];
                canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
                res.map((respFace) => {
                    let respheight = respFace.landmarks.imageHeight;
                    let respwidth = respFace.landmarks.imageWidth;
                    let xcor = respFace.landmarks.shift.x;
                    let ycor = respFace.landmarks.shift.y;

                    console.log("respheight respwidth", respheight, respwidth);
                    const regionsToExtract = [
                        new faceapi.Rect(xcor, ycor, respwidth, respheight)
                    ];
                    const foundfaces = faceapi.extractFaces(OrImg, regionsToExtract);
                    foundfaces.then((face) => {
                        console.log("FACE FOUND IS ", face);
                        face.forEach(fa => {
                            let tempImg = new Image();
                            tempImg.src = fa.toDataURL();
                            peopleObj.push({ expressions: respFace.expressions, imageURL: fa.toDataURL() });
                            // document.getElementById("found-faces").append(tempImg);
                        });
                    }).catch((err) => {
                        console.log("FOUND FACE ERROR ", err);
                    });
                });
                setPeopleList(peopleObj);
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
    const openHandler = () => {
        $("#overlay-cont-id").css("display", "flex");
        $(document.body).css("overflow", "hidden");
        $("#rest-cont").css("opacity", "0.5");
    };
    const closeHandler = () => {
        $("#overlay-cont-id").css("display", "none");
        $(document.body).css("overflow", "scroll");
        $("#rest-cont").css("opacity", "1");
    };
    useEffect(() => {
        $(document).on("click", (evt) => {
            console.log(evt.target.classList);
            if (evt.target.classList.contains("overlay-cont")) {
                closeHandler();
            }
        });
    });
    let detHandler = (propData) => {
        console.log("EVENT ID", propData);
        setSelUser(propData);
        openHandler();
    };
    // const RenderPeopleFunc = () => {
    //     return peopleList.length && peopleList.map((people, index) => {
    //         console.log("PEOPLE ARE", people);
    //         return <Card key={index.toString()} profileData={{ img: people.imageURL && people.imageURL, name: "HEllo", designation: "HEllo", empId: "HEllo" }} />;
    //     });

    // };
    { console.log("PEOPLE LIST", peopleList.length); }
    let renderPeople = peopleList.length && peopleList.map((people, index) => {
        return <Card profileData={{ img: people.imageURL && people.imageURL, name: `Person ${index + 1}`, designation: `Post ${index + 1}`, empId: `empId ${index + 1}` }} viewDetailsClick={detHandler} id={index.toString()} expressions={people.expressions} />;
    });
    let renderPie = peopleList.length && peopleList.map((people, index) => {
        let tempObj = [];
        let colorObj = {
            happy: "#00ff00",
            sad: "#ccc",
            neutral: "#e3d7bd",
            angry: "#ff0000",
            disgusted: "#896b60",
            surprised: "#0000ff"
        };
        Object.keys(people.expressions).map((item) => {
            tempObj.push({ title: item, value: people.expressions[item], color: colorObj[item] });
        });
        return <div className="pie-cont"><PieChart
            data={tempObj}
        /></div>;
        //[
        // { title: 'One', value: 10, color: '#E38627'; },
        // { title: 'Two', value: 15, color: '#C13C37'; },
        // { title: 'Three', value: 20, color: '#6A2135'; },
        //     ]
    });
    const hulo = () => {
        console.log("there");
        // changeHandler();
    };
    return (
        <div className="home-cont" id="home-cont">
            <div className="overlay-cont" id="overlay-cont-id">
                {Object.keys(selUser).length && <Popcard selUser={selUser} closer={closeHandler} />}
            </div>
            <div className="rest-cont" id="rest-cont">
                <div className={clsx("button-cont", refImg && fileUrl ? "hide-cont" : "")}>
                    {/* <div id="img-cont"></div> */}
                    {/* <input type="file" onChange={refImgHandler} /> */}
                    <ImgInput handler={refImgHandler} index="1" isUploaded={refImg ? true : false} fileName={refName ? refName : ""} defaultName="Reference Image" />
                    {/* <input type="file" onChange={changeHandler} /> */}
                    <ImgInput handler={changeHandler} index="2"
                        isUploaded={fileUrl ? true : false} fileName={fileName ? fileName : ""} defaultName="Image to be scanned"
                    />
                    {/* <button onClick={caller}>Click me</button> */}

                </div>

                {
                    refImg && fileUrl ?
                        <div className='recognize-btn-cont'><Button onClick={caller} value="Recognize" /></div>
                        : <></>

                }
                <div id="origin-img-cont" style={{ position: "relative" }}>
                    <img id="ori-img" />
                </div>
                <div className='found-faces' id="found-faces"></div>
                {peopleList.length ? <div className='people-list-head'>Identified People</div> : <></>}
                {peopleList.length ? <div className='card-list-cont'>{peopleList.length ? renderPeople : <></>}
                </div> : <></>}
                {/* {peopleList.length ? renderPie : <></>} */}
            </div>
        </div>
    );
};
export default NewHome;