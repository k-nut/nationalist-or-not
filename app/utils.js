const getImageThumbnail = (politician) => {
    const image = politician.image.value;
    const fileName = _.last(image.split("/"));
    return `https://commons.wikimedia.org/w/thumb.php?width=200&f=${fileName}`
};

export {getImageThumbnail}