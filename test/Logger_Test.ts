/**
 * Loggerクラステストファイル
 * @author Daruo(KINGVOXY)
 * @author AO2324(AO2324-00)
 * @Date   2021-09-25
 */

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Logger, Log } from "../mod.ts";


// ログファイルの名前
const fileName: string = "logger_test.log";

// 前回のテストファイルの削除
try {
    await Deno.remove("./log/"+fileName);
} catch (e) {
    console.log("No such old log file.");
}

// ロガー
const logger: Logger = new Logger();

/**
 * writeテスト
 */
Deno.test({
    name: "writeテスト",
    async fn(): Promise<void> {
        await logger.write(fileName, "Test1\n").then(async()=>{
            assertEquals("Test1\n", await Deno.readTextFile("./log/"+fileName));
        });
    },
});

/**
 * readテスト
 */
Deno.test({
    name: "readテスト",
    async fn(): Promise<void> {
        assertEquals("Test1\n", await logger.read(fileName));
    },
});

/**
 * insertテスト
 */
Deno.test({
    name: "insertテスト",
    async fn(): Promise<void> {
        await logger.insert(fileName, "Test2\n");
        assertEquals("Test1\nTest2\n", await logger.read(fileName));
    },
});

/**
 * recordテスト
 */
Deno.test({
    name: "recordテスト",
    async fn(): Promise<void> {
        const log: Log = new Log("Data1", "Data2");
        log.fileName = fileName

        await logger.record(log);
        const res = await logger.read(fileName);
        assertEquals(true, res.includes(",Data1,Data2"));
        
    },
});
