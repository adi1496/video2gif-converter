import {createFFmpeg, fetchFile} from '@ffmpeg/ffmpeg';

const ffmmep = createFFmpeg({log: true});

const logElement = document.getElementById('log');
const inputFile = document.getElementById('file');
const container = document.getElementById('container');
let video;

const setLog = async (message) => {
    logElement.textContent = message;
}

const convertToGif = async (videoFile) => {
    setLog('Loading...');
    // write the uploaded file in memory as test.mp4
    await ffmmep.FS('writeFile', 'test.mp4', await fetchFile(videoFile));

    // convert test.mp4 to gif
    await ffmmep.run('-i', 'test.mp4', '-t', '2.5', '-ss', '2.0', '-f', 'gif', 'out.gif');

    // read the gif file from memory and save it to data var
    const data = await ffmmep.FS('readFile', 'out.gif');

    // creating the url for the image
    const url = URL.createObjectURL(new Blob([data.buffer], {type: 'image/gif'}));


    const imageElement = document.createElement('img');
    imageElement.setAttribute('src', url);
    imageElement.setAttribute('width', '450');

    container.insertAdjacentElement('beforeend', imageElement);
    setLog('Completed! \n In order to convert a new gif, reload the page');
}

(async () => {
    setLog('Loading...');
    await ffmmep.load();
})();
setLog('Application ready!🔥 Choose a video and convert it to gif');

inputFile.addEventListener('change', (event) => {
    setLog('Loading video...');
    const videoFile = event.target.files[0];
    video = videoFile;
    // console.log(videoFile);

    const videoElement = document.createElement("video");
    videoElement.setAttribute('class', 'video');
    videoElement.setAttribute('controls', 'controls');
    videoElement.setAttribute('width', '450');
    videoElement.setAttribute('src', URL.createObjectURL(videoFile));
    container.insertAdjacentElement('beforeend', videoElement);

    const button = document.createElement('button');
    button.innerHTML = 'Convert to Gif';
    button.setAttribute('id', 'convert');

    container.insertAdjacentElement('afterbegin', button);
    document.getElementById('convert').addEventListener('click', () => {convertToGif(video)});

    setLog('Video loaded successfully');
});



