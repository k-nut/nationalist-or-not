const getImageThumbnail = (politician) => {
    const image = politician.image.value;
    const fileName = image.split("/").slice(-1);
    return `https://commons.wikimedia.org/w/thumb.php?width=200&f=${fileName}`
};

export {getImageThumbnail}
