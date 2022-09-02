var EventUtil = {
	// 得到事件
	getEvent:function(event){
		return event ? event : window.event;
	},
	// 得到事件的目标
	getTarget:function(event){
		return event.target || event.srcElement;
	},
	// 添加事件
	addEvent:function(element, type, handler){
		// DOM2级事件处理程序，false表示在冒泡阶段处理事件程序
		if(element.addEventListener){
			element.addEventListener(type, handler, true);
		} else if(element.attachEvent){
		    // IE事件处理程序
			element.attachEvent("on" + type, handler);
		} else{
		    // DOM0级
			element["on" + type]=handler;
		}
	},
	// 移除事件
	removeEvent:function(element, type, handler){
		if(element.removeEventListener){
			element.removeEventListener(type, handler);
		} else if(element.detachEvent){
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
		}
	},
	// 阻止事件默认行为
	preventDefault:function(event){
		if(event.preventDefault){
			event.preventDefault;
		} else {
			event.returnValue = false;
		}
	},
	// 阻止事件冒泡和捕获
	stopPropagation:function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	}
}

// 使用方法
var btn = document.getElementById("myBtn"),
    handler = function () {
        console.log("Clicked");
    };

EventUtil.addHandler(btn,"click",handler);
EventUtil.removeHandler(btn,"click",handler);