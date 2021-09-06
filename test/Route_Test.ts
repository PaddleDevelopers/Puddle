/**
 * Router.ts Routeクラスのテストファイル
 * @author Daruo(KINGVOXY)
 * @author AO2324(AO2324-00)
 * @Date   2021-09-04
 */

import { assertEquals }     from "https://deno.land/std@0.88.0/testing/asserts.ts";
import { Route }            from "../Router.ts";

/**
 * ディープコピー関数
 */
const deepCopy: any = (_object: any) => {
    return JSON.parse(JSON.stringify(_object));
}

// Routeオブジェクトに必要なもの
const path: string   = "/index.html";
const urls: string[] = ["/", "/top", "/Top", "/トップ"];
const get: Function = function() { return "GET!";    }
const put: Function = function() { return "PUT!";    }
const pos: Function = function() { return "POST!";   }
const del: Function = function() { return "DELETE!"; }

/**
 * Route生成テスト
 */
Deno.test({
    name: "Route生成テスト",
    fn(): void {
        let urls1: string[] = deepCopy(urls);
        let route: Route = new Route(path, urls1, get, put, pos, del);
        route = new Route(path);
        
    },
});

/**
 * equalsテスト
 */
Deno.test({
    name: "equalsテスト",
    fn(): void {
        const route: Route = new Route(path, deepCopy(urls), get, put, pos, del);
        const route2: Route = new Route("/route2.html", deepCopy(urls), get, put, pos, del);
        const route3: Route = new Route(path, ["/route3"], get, put, pos, del);
        const route4: Route = new Route(path, deepCopy(urls), put, put, pos, del);
        const route5: Route = new Route(path, deepCopy(urls), get, pos, pos, del);
        const route6: Route = new Route(path, deepCopy(urls), get, put, del, del);
        const route7: Route = new Route(path, deepCopy(urls), get, put, pos, get);

        assertEquals(true,  route.equals(route),  "同一オジェクトに変更があります");
        assertEquals(false, route.equals(route2), "変更されたpathの比較に異常があります．");
        assertEquals(false, route.equals(route3), "変更されたurlの比較に異常があります．");
        assertEquals(false, route.equals(route4), "変更されたgetの比較に異常があります．");
        assertEquals(false, route.equals(route5), "変更されたputの比較に異常があります．");
        assertEquals(false, route.equals(route6), "変更されたpostの比較に異常があります．");
        assertEquals(false, route.equals(route7), "変更されたdeleteの比較に異常があります．");

    },
});

/**
 * PATH取得テスト
 */
Deno.test({
    name: "PATH取得テスト",
    fn(): void {
        const route: Route = new Route(path, deepCopy(urls), get, put, pos, del);

        assertEquals(path, route.PATH(), "取得したpathに不正な変更があります．");
    },
});

/**
 * URL取得テスト
 */
Deno.test({
    name: "URL取得テスト",
    fn(): void {
        let route_after: Route = new Route(path, deepCopy(urls), get, put, pos, del);
        let route_before: Route = route_after.clone();
        
        // 引数無しの時は#URLが返る
        console.log(urls, route_after.URL(), route_before.URL())
        assertEquals([ "/", "/top", "/Top", "/トップ", "/index.html" ], route_after.URL(), "取得したurlに不正な変更があります．");
        // アリの時はthisが返る
        assertEquals(true, route_before.equals(route_after.URL("/", "/top", "/Top", "/トップ", "/index.html")), "オブジェクトを取得できていないか，取得したurlに不正な変更があります．");
        assertEquals(false, route_before.equals(route_after.URL("/", "/top", "/Top", "/トップ")), "オブジェクトを取得できていないか，取得したurlに不正な変更があります．");

    },
});

/**
 * GET取得テスト
 */
Deno.test({
    name: "GET取得テスト",
    fn(): void {
        const route: Route = new Route(path, urls, get, put, pos, del);

        // 引数無しの時は#GETが返る
        assertEquals(get, route.GET(), "取得したgetに不正な変更があります．");
        // アリの時はthisが返る
        assertEquals(true, route.equals(route.GET(get)), "オブジェクトを取得できていないか，取得したgetに不正な変更があります．");
    },
});

/**
 * PUT取得テスト
 */
Deno.test({
    name: "PUT取得テスト",
    fn(): void {
        const route: Route = new Route(path, urls, get, put, pos, del);

        // 引数無しの時は#PUTが返る
        assertEquals(put, route.PUT(), "取得したputに不正な変更があります．");
        // アリの時はthisが返る
        assertEquals(true, route.equals(route.PUT(put)), "オブジェクトを取得できていないか，取得したputに不正な変更があります．");
    },
});

/**
 * POST取得テスト
 */
Deno.test({
    name: "POST取得テスト",
    fn(): void {
        const route: Route = new Route(path, urls, get, put, pos, del);

        // 引数無しの時は#POSTが返る
        assertEquals(pos, route.POST(), "取得したpostに不正な変更があります．");
        // アリの時はthisが返る
        assertEquals(true, route.equals(route.POST(pos)), "オブジェクトを取得できていないか，取得したpostに不正な変更があります．");
    },
});

/**
 * DELETE取得テスト
 */
Deno.test({
    name: "DELETE取得テスト",
    fn(): void {
        const route: Route = new Route(path, urls, get, put, pos, del);

        // 引数無しの時は#DELETEが返る
        assertEquals(del, route.DELETE(), "取得したdeleteに不正な変更があります．");
        // アリの時はthisが返る
        assertEquals(true, route.equals(route.DELETE(del)), "オブジェクトを取得できていないか，取得したdeleteに不正な変更があります．");
    },
});