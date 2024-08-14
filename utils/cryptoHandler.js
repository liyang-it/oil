/**
 * 加解密工具，文档： https://www.npmjs.com/package/crypto-js
 */

import CryptoJS from 'crypto-js/aes'
const secretKey = "LiYangAbcDEfghjklmnZop"

const cryptoHandler = {
	/**
	 * AES加密
	 * @param {*} message 加密的消息
	 * @returns  加密后的结果
	 */
	encryptByAES: function(message) {
		return CryptoJS.encrypt(`${message}`, secretKey).toString();
	},
	/**
	 * AES解密
	 * @param {*} message 需要解密的消息
	 */
	decryptByAES: function(message) {
		const bytes = CryptoJS.decrypt(`${message}`, secretKey);
		return bytes.toString(CryptoJS.enc.Utf8);
	}
}
export default cryptoHandler