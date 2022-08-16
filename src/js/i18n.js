function showInternationalizedText(messageKey, replacement1, replacement2, replacement3, replacement4) {
	if (!messageId) {
    	console.error("No messageId provided, cannot display internationalized text.");
    	document.write("[error: messageId missing]");
	}
	
	document.write(browser.i18n.getMessage(messageId, replacement1, replacement2, replacement3, replacement4));
}

function fillMessagesInOptionsPage() {
	let allInBody = document.querySelectorAll('[messageKey]');
	
	for (let element of allInBody) {
//		console.debug(element);
		
		let messageKey = element.getAttribute("messageKey");
		if (!messageKey) {
			console.warn("messageKey is missing for element: " + element);
			continue;
		}
		
		element.innerHTML = browser.i18n.getMessage(messageKey);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	fillMessagesInOptionsPage();

	console.info("background: processed i18n for options page");
});
