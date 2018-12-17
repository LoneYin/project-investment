import CryptoJS from 'crypto-js/crypto-js'

export default function (queryData, key) {
    /**
    * API加密鉴权
    * 遵循安全规范
    *
    * #documentation: http://doc.imbabot.com/web/#/5?page_id=42
    *
    * 加密实现过程
    * 1.在请求体(object)中加入键值为key的13位unix时间戳
    * 2.数据以字典序排序(ksort)
    * 3.对数据进行url拼接
    * 4.以AES(ECB模式 pkcs5填充)
    * */

    var temp = Object.assign({
        //加入13位时间戳
        key: Date.parse(new Date()),
    }, queryData); //深拷贝数组

    //数据以字典序排序(ksort)
    temp = ksort(temp);

    //url拼接
    var temp_string = http_build_query(temp);

    key = CryptoJS.enc.Utf8.parse(key);
    var encrypted_string = CryptoJS.AES.encrypt(temp_string, key, {
        mode: CryptoJS.mode.ECB,
        //PKCS#5可以向上转换为PKCS#7
        padding: CryptoJS.pad.Pkcs7
    }).toString();

    return encrypted_string;
}


/**
 * 将对象拼接为URL-encoded字符串
 *
 * */
function http_build_query(obj) {
    const params = [];
    Object.keys(obj).forEach((key) => {
        let value = obj[key];
        // 如果值为undefined我们将其置空
        if (typeof value === 'undefined') {
            value = ''
        }
        // 对于需要编码的文本（比如说中文）我们要进行编码
        params.push([key, encodeURIComponent(value)].join('='))
    });
    return params.join('&');
}

/**
 * 字典序排序
 *
 * */
function ksort(obj) {
    var temp = {};
    Object.keys(obj).sort().forEach(key => {
        temp[key] = obj[key];
    });
    return temp;
}