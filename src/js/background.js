// globally stored common folders that will be automatically marked as read
var commonFolders;

document.addEventListener("DOMContentLoaded", () => {
	console.log("background: addon loaded");
	
	// register a storage.onChanged event and update the global variable.
	browser.storage.onChanged.addListener((storageChange, areaName) => {
		// I think it is not important from which area the changes come.
		
		console.log("extension storage change event received: areaName is '" + areaName + "', storageChange is '" + JSON.stringify(storageChange) + "'");
		
		if (storageChange.hasOwnProperty("commonFolders") && Object.keys(storageChange.commonFolders.newValue).length > 0) {
			commonFolders = storageChange.commonFolders.newValue;
		}
	});
	
	// load options as in restoreOptions() and store it in a global var variable.
	loadCommonFoldersOptions().then((result) => {commonFolders = result;});
	
	browser.folders.onFolderInfoChanged.addListener((folder, folderInfo) => {
		if (!commonFolders) {
			// There are no common folders configured to be marked as read (or this is an error situation)
			return;
		}
		
		if (commonFolders[folder.type]) {
			if (folderInfo.unreadMessageCount > 0) {
				
				browser.messages.query({"folder": folder, "unread": true, "includeSubFolders": true}).then(
					(messageList) => {
						for (let message of messageList.messages) {
							browser.messages.update(message.id, {"read": true});
						}
					},
					(error) => {
						console.error("background: " + folder.type + "-folder: " + error);
					}
				);
			}
		}
	})
});