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

    let href = urlObject.href;

    //remove trailing slash if it exists
    if (href[href.length - 1] === "/") {
        href = href.slice(0, -1);
    }

    return href;
}

export default cleanUrl;
