export const getExtension = (filename) => {
    var parts = filename.split('.');
    return parts[parts.length - 1];
}

export const isVideo = (filename) => {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
        case 'm4v':
        case 'avi':
        case 'mpg':
        case 'mp4':
            return true;

        default:
            return false;
    }
}

export const isImage = (filename) => {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
        case 'jpg':
        case 'jpeg':
        case 'gif':
        case 'bmp':
        case 'png':
            return true;

        default:
            return false;
    }
}