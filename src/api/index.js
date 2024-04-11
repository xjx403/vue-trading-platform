import request from "@/utils/request";
import { get } from "core-js/core/dict";

const api = {
    userLogin(query){
        return request({
            url: '/user/login',
            method:'get',
            params:query
        })
    }
}