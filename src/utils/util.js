import moment from 'moment';

import { Modal, Toast } from 'antd-mobile';


/**
 * setStorage 存储
 * getStorage 取到
 * removeStorage 移除
 */
export const storage = {
	setStorage: (name, val) => {
		sessionStorage.setItem(name, val);
	},

	getStorage: (val) => {
		let str = sessionStorage.getItem(val);
		if (str) {
			try {
				var obj = JSON.parse(str);
				return obj;
			} catch (e) {
				return str;
			}
		} else {
			return null;
		}
	},
	removeStorage: (val) => {
		sessionStorage.removeItem(val)
	}
}



/**
 * 数组去重
 */
export const compare = (value) => {
	let arr=[],hash={};
	value.forEach(item=>{
		arr.push(item.countDayStr)
	})
	for(let i in arr) {
			if(hash[arr[i]]) {
					return false;
　　   }
			hash[arr[i]] = true;
	}
	return true;
}


/**
 * 返回上一级
 */
export const goBack = (value, that) => {
	that.props.history.go(value)
}

/**
 *时间戳格式化时间
 */
export const getDate = (value) => {
	if (value){
		return moment(value).format('YYYY-MM-DD HH:mm:ss');
	} else{
		return '';
	}

}

/**
 *时间转化时间戳
 */
export const timestamp = (value) => {
	return moment(value, 'YYYY-MM-DD').valueOf();
}

/**
 *数组加入key，解决浏览器告警
 */
export const keyData = (data) => {
	data.forEach((item, index) => {
		item.id = index;
	})
	return data;
}


/**
 * 模态框提示
 *
 */
export const modalInfo = (title='提示', value, callback) => {
	Modal.alert(
		title,value,
		[
			{
				text:'确定',
				onPress:callback&&callback
			}
		],
		'android');
}



/**
 * Toast 提示
 * value 提示内容
 * duration 时长
 * callback 回调
 */
export const toastInfo = (value,duration, callback) => {
	Toast.info(value, duration, callback&&callback)
}



/**
 * Toast loading 展示
 * value 提示内容
 */

export const showLoading = (value='加载中') => {
	Toast.loading(value, 0);
}

/**
 * Toast loading 隐藏
 * value 提示内容
 */

export const hideLoading = () => {
	Toast.hide();
}


