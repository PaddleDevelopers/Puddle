/**
 * ルーティングを行うクラスファイル。
 * @author Daruo(KINGVOXY)
 * @author AO2324(AO2324-00)
 * @Date   2021-08-27
 */
export class Route {

    /** サーバーへのリクエストの名前 */
    #PATH: String;

    /** リクエストを許可する別名 */
    #URL: String[];

    /** GETリクエスト時の処理をまとめた関数 */
    #GET: Function;

    /** PUTリクエスト時の処理まとめた関数 */
    #PUT: Function;

    /** POSTリクエスト時の処理まとめた関数 */
    #POST: Function;

    /** DELETEリクエスト時の処理まとめた関数 */
    #DELETE: Function;

    constructor(PATH: String, URL?: String[], GET?: Function, PUT?: Function, POST?: Function, DELETE?: Function) {
        this.#PATH = PATH;
        this.#URL = URL || [];
        this.#GET = GET;// || default_get;
        this.#PUT = PUT;// || default_PUT;
        this.#POST = POST;// || default_POST;
        this.#DELETE = DELETE;// || default_DELETE;

        if(!this.#URL.includes(this.#PATH)) this.#URL.push(this.#PATH);
    }

    /**
     * サーバーへのリクエストの名前を返す。
     * @returns PATH
     */
    PATH(): String {
        return this.#PATH;
    }

    /**
     * URLの取得、設定を行う。
     * @param urls 許可するリクエストURL(可変長引数)。
     * @returns 引数がない場合はURLを、ある場合はthisを返す。
     */
    URL(...urls: String[]): String[] | Route {

        if(!urls.length) return this.#URL;

        this.#URL = urls;
        return this;

    }

    /**
     * GETの取得、設定を行う。
     * @param process 処理内容を記述した関数。
     * @returns 引数がない場合はGETを、ある場合はthisを返す。
     */
    GET(process?: Function): Function | Route {

        if(!process) return this.#GET;

        this.#GET = process;
        return this;

    }

    /**
     * PUTの取得、設定を行う。
     * @param process 処理内容を記述した関数。
     * @returns 引数がない場合はPUTを、ある場合はthisを返す。
     */
    PUT(process?: Function): Function | Route {

        if(!process) return this.#PUT;

        this.#PUT = process;
        return this;

    }

    /**
     * POSTの取得、設定を行う。
     * @param process 処理内容を記述した関数。
     * @returns 引数がない場合はPOSTを、ある場合はthisを返す。
     */
    POST(process?: Function): Function | Route {

        if(!process) return this.#POST;

        this.#POST = process;
        return this;

    }

    /**
     * DELETEの取得、設定を行う。
     * @param process 処理内容を記述した関数。
     * @returns 引数がない場合はDELETEを、ある場合はthisを返す。
     */
    DELETE(process?: Function): Function | Route {

        if(!process) return this.#DELETE;

        this.#DELETE = process;
        return this;

    }

    /**
     * Routeオブジェクト動詞を比較する。
     * @param route 比較対象のRouteオブジェクト。
     * @returns 同じオブジェクトであればtrueを、そうでなければfalseを返す。
     */
    equals(route: any): Boolean {
        const Path: Boolean = this.#PATH == route.PATH();
        const Url: Boolean = this.#URL.toString() == route.URL().toString();
        const Get: Boolean = this.#GET.toString() == route.GET().toString();
        const Put: Boolean = this.#PUT.toString() == route.PUT().toString();
        const Post: Boolean = this.#POST.toString() == route.POST().toString();
        const Delete: Boolean = this.#DELETE.toString() == route.DELETE().toString();
        return Path && Url && Get && Put && Post && Delete;
    }

    /**
     * 自身をディープコピーする。
     * @returns 自身と同じパラメータを持つRouteオブジェクトを返す。
     */
    clone(): Route {
        return new Route(this.#PATH, this.#URL, this.#GET, this.#PUT, this.#POST, this.#DELETE);
    }
}