type SUPPORTED_METHODS = "GET" | "POST" | "PUT" | "DELETE";
type AUTH_URLs = `/auth/${"register" | "login" | "verify"}`;
type API_URLs = `/api/${"items" | "profile"}`;
type API_WITH_PARAMS = `${API_URLs}${`/${number}` | `/${number}/toggle` | `/${number}/` | `/${number}/toggle/` | "/" | ""}`;
type VALID_URL_FORMAT = AUTH_URLs | API_URLs | API_WITH_PARAMS;

interface fetcherArgs {
    url: VALID_URL_FORMAT | string;
    method: SUPPORTED_METHODS;
    data: any;
}

interface FetchOpts {
    headers: HeadersInit;
    method: SUPPORTED_METHODS;
    body?: any;
}

export const TOKEN_KEY = "token";

function fetcher({ url, method, data }: fetcherArgs) {
    return new Promise<any>(async (resolve, reject) => {
        const TOKEN = localStorage.getItem(TOKEN_KEY);

        const headers: HeadersInit = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`
        };

        if (!TOKEN) delete headers.Authorization;

        const fetchOpts: FetchOpts = {
            method,
            headers
        };

        if (method === "POST" || method === "PUT") {
            const body = JSON.stringify(data);
            fetchOpts["body"] = body;
        } else {
            delete headers["Content-Type"];
        }

        try {
            const res = await fetch(url, fetchOpts);
            const data = await res.json();

            if (res.ok) {
                resolve(data);
            } else {
                console.error(data);
                reject(data.message);
            }
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
}

export const GET = (url: VALID_URL_FORMAT) => fetcher({ url, method: "GET", data: null });
export const DELETE = (url: VALID_URL_FORMAT) => fetcher({ url, method: "DELETE", data: null });
export const POST = (url: VALID_URL_FORMAT, data: any) => fetcher({ url, method: "POST", data });
export const PUT = (url: VALID_URL_FORMAT, data: any) => fetcher({ url, method: "PUT", data });
