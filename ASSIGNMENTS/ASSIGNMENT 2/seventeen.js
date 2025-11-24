function downloadFile(filename, callback) {
    setTimeout(() => {
        console.log("Downloading " + filename + "...");
        callback();
    }, 2000);
}

downloadFile("movie.mp4", () => {
    console.log("Download complete!");
});
