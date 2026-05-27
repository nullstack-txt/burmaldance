function normalizeImageUrl(url) {
    url = url.trim();
    if (!url) return null;

    if (url.includes("img_url=")) {
        const params = new URL(url); 
        url = params.searchParams.get("img_url");
    }

    return url || null;
}

