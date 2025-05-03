import { RequestMaker } from "jolt-ui";

/**
 * @typedef {METHODS}
 * @type {Object}
 * @property {string} GET
 * @property {string} POST
 * @property {string} POSTFORM
 * @property {string} PUT
 * @property {string} PUTFORM
 * @property {string} PATCH
 * @property {string} PATCHFORM
 * @property {string} DELETE
 */
export const METHODS = {
    GET: "get",
    POST: "post",
    POSTFORM: "postForm",
    PUT: "put",
    PUTFORM: "purForm",
    PATCH: "patch",
    PATCHFORM: "patchForm",
    DELETE: "delete"
}

async function _runFunction(func){
    let [error, response] = await func;
    if(error){
        return [error, undefined]
    }
    [error, response] = await response.json();
    if(error){
        return [error, undefined]
    }
    return [undefined, response];
}

/**
 * 
 * @param {Object} configs
 * @param {string} configs.endpoint
 * @param {METHODS} configs.method
 * @param {Object|FormData} [configs.payload] 
 */
export async function runFunction({endpoint, method, payload}){
    if(method == METHODS.GET || method == METHODS.DELETE){
        return await _runFunction(RequestMaker[method]({url: endpoint}));
    }
    return await _runFunction(RequestMaker[method]({url: endpoint, data: payload}))
}