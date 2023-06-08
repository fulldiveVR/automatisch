const cleanUrl = (rawUrl: string) => {
    // trim whitespace
    let url = rawUrl.trim();

    // make sure url starts with http:// or https://
    // if not, add https://
    if (!/^https?:\/\//i.test(url)) {
        url = "https://" + url;
    }

    // parse url object
    const urlObject = new URL(url);
    return urlObject.origin;
}

export default cleanUrl;
