/**
 * 页面跳转
 * @param {String} url
 */
function to(url) {
	uni.navigateTo({
		url: url
	});
}

function toNew(url) {
	uni.reLaunch({
		url: url
	});
}

function toTab(url) {
	uni.switchTab({
		url: url
	});
}

/**
 * 提示框
 */
function toast(icon, text, duration, mask, position) {
	duration = duration || 1500;
	mask = mask || true;
	position = position || false;
	uni.showToast({
		icon: icon,
		title: text,
		duration: duration,
		mask: mask,
		position: position,
	})
}
/**
 * 加载框
 */
function loading(text, mask) {
	text = text || '加载中'
	mask = mask || true;
	uni.showLoading({
		title: text,
		mask: mask,
	})
}

export default {
	to,
	toNew,
	toTab,
	toast,
	loading
}
