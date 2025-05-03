//Entry point for frontend
import app from "./app/app";

async function init(){
    await app.init("#app")
}

await init();
