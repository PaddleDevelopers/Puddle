import { System, Route } from "../mod.ts";

/**
 * HTMLファイル内に埋め込まれた変数にテキストを挿入してHTMLを作成する関数。
 * Function to create HTML by inserting text into variables embedded in an HTML file.
 * @param html Text in html format that contains variables.
 * @param params An associative array with variable names as keys, called in html.
 * @param filePath File path.
 * @returns The html after inserting text into the variable.
 */
export function htmlCompile(html: string, params: { [key: string]: ( string | Number ); }, filePath?: string): string {
    const paths = html.match(/\{\{\s*createPath\(.+\)\s*\}\}/g);
    const filePathArray = (filePath || "").split("/");
    filePathArray.pop();
    filePath = filePathArray.join("/").replace("./", "/");
    if(paths) {
        for(let path of paths) {
            let _path = (path?.match(/(?<=\().+(?=\))/)||"")[0] || "";
            if(filePath.length) _path = _path.replace("./", `${filePath}/`).replace(/\"|\'|\`/g, "");
            html = html.replace(path, _path);
            if(!Route.isThePathInUse(`.${_path}`))System.createRoute(`.${_path}`);
        }
    }
    for(let param in params) {
        const regExp: RegExp = new RegExp(`{{\\s*${param}\\s*}}`,`g`);
        html = html.replace(regExp, String(params[param]));
    }
    return html;
}