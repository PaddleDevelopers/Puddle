import { System, SystemRequest, SystemResponse, DecodedURL, Route, redirect, ErrorLog } from "../mod.ts";

/**
 * GoogleAPIのアクセストークンを取得する。
 * Obtain an access token for Google API.
 * @param client_id Client ID.
 * @param client_secret Client secret.
 * @param redirect_url The URL to use to redirect from the Google API to the server.
 * @param code Code.
 * @returns Access token.
 */
export async function getAccessToken(client_id: string, client_secret: string, redirect_url: string, code: string): Promise<string> {
	const post = 'client_id=' + client_id + 
				'&redirect_uri=' + redirect_url + 
				'&client_secret=' + client_secret + 
				'&code=' + code + 
				'&grant_type=authorization_code';

	const response = await fetch('https://www.googleapis.com/oauth2/v4/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: post
	});

	if(response.status != 200)
		throw new Error('Error : Failed to receieve access token'); 

	const json_response = await response.json();
	const access_token: string = json_response['access_token'];

	return access_token;
}

/**
 * GoogleAPIからユーザー情報を取得する。
 * Get user information from Google API.
 * @param access_token Access token.
 * @returns An associative array containing user information.
 */
export async function getProfileInfo(access_token: string): Promise<{ [key: string]: string; }>  {
	const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo?fields=name,email,id,picture,verified_email', {
		method: 'GET',
		headers: {
			'Authorization': 'Bearer ' + access_token
		}
	});

	if(response.status != 200)
		throw new Error('Error : Failed to get user information'); 

	const json_response: {[key: string]: string;} = await response.json();

	return json_response;
}

/**
 * GoogleのOAuth2.0認証を導入するためのクラス。
 * A class for implementing Google's OAuth2.0 authentication.
 */
export class GoogleOAuth2 {

    /**
     * Google OAuth2.0 のクライアントを格納する変数。
     * A variable that stores the Google OAuth2.0 client.
     */
    static client: GoogleOAuth2 | null = null;

    /**
     * 作成できるインスタンスを一つに制限するメソッド。
     * This method limits the number of instances that can be created to one.
     */
    static setup(): GoogleOAuth2;
    static setup(client_id: string, client_secret: string, redirect_uri?: string, URL?: string[]): GoogleOAuth2
    static setup(client_id?: string, client_secret?: string, redirect_uri?: string, URL?: string[]): GoogleOAuth2 {
        if(GoogleOAuth2.client) return GoogleOAuth2.client;
        if(!(client_id && client_secret)) throw new Error("Specify the client ID and client secret.");
        
        return new GoogleOAuth2(client_id, client_secret, redirect_uri, URL);
    }

    /**
     * GoogleAPIで必要なクライアントID。
     * Client ID required by Google API.
     */
    #client_id: string;

    /**
     * GoogleAPIで必要なクライアントシークレット。
     * Client secret required by Google API.
     */
    #client_secret: string;

    #redirect_uri: string = "";

    #redirect_pathname: string;

    /**
     * Googleでログインするためのページにリダイレクトさせるためのルート。
     * Route to redirect to the page for logging in with Google.
     */
    #route_login: Route;

    constructor(client_id: string, client_secret: string, redirect_uri?: string, URL: string[] = []) {
        GoogleOAuth2.client = this;
        this.#client_id = client_id;
        this.#client_secret = client_secret;
        this.#redirect_pathname = redirect_uri? new DecodedURL(redirect_uri).pathname : "/auth_google";
        this.#route_login = new Route(`AUTH_${this.#redirect_pathname}`, URL)
        .GET((reqest: SystemRequest, response: SystemResponse)=>{
            const redirect_uri = this.#getGoogleOAuth2_URL(this.#client_id, `${reqest.getURL().origin}${this.#redirect_pathname}`);
            this.#redirect_uri = redirect_uri;
            response.redirect(redirect_uri);
        });
    }

    /**
     * クライアントIDのゲッター。
     * Getter of client ID.
     */
    get client_id(): string {
        return this.#client_id;
    }

    /**
     * クライアントシークレットのゲッター。
     * Getter of client secret.
     */
    get client_secret(): string {
        return this.#client_secret;
    }

    /**
     * URLの取得、設定を行う。
     * @param urls 許可するリクエストURL(可変長引数)。
     * @returns 引数がない場合はURLを、ある場合はthisを返す。
     */
    URL(): string[];
    URL(urls: string[]): GoogleOAuth2;
    URL(...urls: string[]): GoogleOAuth2;
    URL(...urls: string[]|string[][]): string[] | GoogleOAuth2 {
        if(!urls.length) return this.#route_login.URL();
        urls = urls.flat();
        this.#route_login.URL(urls);
        return this;
    }

    /**
     * GoogleAPIからユーザー情報を取得する。
     * Get user information from Google API.
     * @param process Handler function describing the process.
     *                Arguments: SystemRequest, SystemResponse, String.
     * @returns GoogleOAuth2 object.
     */
    LOGIN(process: Function): GoogleOAuth2 {
        new Route(this.#redirect_pathname, [], async (request: SystemRequest, response: SystemResponse) =>{
            try {
				const access_token = await getAccessToken(this.#client_id, this.#client_secret, this.#redirect_uri, request.getURL().searchParams.get("code")||"");
				const profile_info = await getProfileInfo(access_token);
                await process(request, response, profile_info);
			} catch(error) {
                new ErrorLog("error", error.message);
				await process(request, response, undefined);
			}
        });
        return this;
    }

    /**
     * GoogleAPIへリダイレクトする為のURLを生成する。
     * Generate a URL to redirect to the Google API.
     * @param client_id Client ID.
     * @param redirect_url The URL to use to redirect from the Google API to the server.
     * @returns URL to redirect to Google API.
     */
    #getGoogleOAuth2_URL(client_id: string, redirect_url: string): string {
        const google_oauth_url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
        google_oauth_url.searchParams.set('scope', 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email');
        google_oauth_url.searchParams.set('redirect_uri', redirect_url);
        google_oauth_url.searchParams.set('response_type', 'code');
        google_oauth_url.searchParams.set('client_id', client_id);
        google_oauth_url.searchParams.set('access_type', 'online');
        return google_oauth_url.toString();
    }
}