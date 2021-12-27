document.addEventListener('DOMContentLoaded', function (event) {
    const fileInput = document.getElementById('fileInput');

    fileInput.addEventListener('change', (e) => {
        // get a reference to the file
        const file = e.target.files[0];

        if (!file.type.match('image/jpeg.*')) {
            alert('Please select a JPEG image');
            return;
        }

        // encode the file using the FileReader API
        const reader = new FileReader();
        reader.onloadend = (e) => {
            // get the base64String from FileReader API
            const base64String = reader.result;
            let newPhotoData;

            const newExifData = piexif.load(base64String);
            console.log('Original GPS Data:', newExifData.GPS);

            if (document.getElementById('exif_remove_all').checked) {
                console.log('Stripping all Exif data');
                // example to strip to strip all Exif metadata
                newPhotoData = piexif.remove(e.target.result);
            } else {
                console.log('Stripping only GPS Exif data');
                // strip only Exif GPS metadata
                newPhotoData = stripExifData(base64String);
            }

            // verify that new image has GPS data removed by loading the Exif data of the new image
            verifyGPSExifData(newPhotoData);

            // display the new image in the browser
            displayImage(newPhotoData);
        };
        reader.readAsDataURL(file);
    });
});

/**
 * Strips GPS Exif metadata from base64 image
 *
 * @param {*} base64String
 * @returns base64String
 */
const stripExifData = (base64String) => {
    const newExif = piexif.load(base64String);

    // remove GPS exif data
    delete newExif.GPS;

    // Convert the new Exif object into binary form
    const newExifBinary = piexif.dump(newExif);

    // Embed the Exif data into the image data and return the new image data
    return piexif.insert(newExifBinary, base64String);
};

const verifyGPSExifData = (base64String) => {
    // verify that new image has GPS data removed by loading the Exif data of the new image
    const newExifData = piexif.load(base64String);

    if (
        !newExifData.hasOwnProperty('GPS') ||
        (newExifData.hasOwnProperty('GPS') &&
            Object.keys(newExifData.GPS).length === 0)
    ) {
        console.log('GPS Data Removed');
    } else {
        console.log('GPS Data Found:', newExifData.GPS);
    }
};

const displayImage = (imageData) => {
    document.getElementById('base64image').src = imageData;
    document.getElementById('base64image').style.display = 'block';
};
