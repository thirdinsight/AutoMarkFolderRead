// globally stored common folders that will be automatically marked as read
var commonFolders;

/**
	Returns true if the given folder is a common folder (selected in options panel) or if it resides inside a common folder (selected) and false otherwise. 
 */
async function isInsideCommonFolder(folder) {
	// If there are no common folders selected in the options panel then the folder cannot be in a common folder or it must be ignored.
	if (!commonFolders) {
		return false;
	}
	
	// If the given folder is itself a common folder then it is found and true is returned.
	if (commonFolders[folder.type]) {
//		console.log("Processing 'onFolderInfoChanged' for folder '" + JSON.stringify(folder) + "'");
		return true;
	}

	// Otherwise the parent folders are inspected to see if the given folder is inside a common folder.
	let parentMailFolders = await browser.folders.getParentFolders(folder, false);
//	console.log("Processing 'onFolderInfoChanged' for folder '" + JSON.stringify(folder) + "' with parent folders '" + JSON.stringify(parentMailFolders) + "'");
		
	for (const parentMailFolder of parentMailFolders){
	   	if (commonFolders[parentMailFolder.type]) {
	   		return true;
	   	}
	}
	
	return false;
}

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
		
		isInsideCommonFolder(folder).then(isInside => {
			if (isInside && folderInfo.unreadMessageCount > 0) {
				
				browser.messages.query({"folder": folder, "unread": true, "includeSubFolders": true}).then(
					(messageList) => {
						for (let message of messageList.messages) {
							browser.messages.update(message.id, {"read": true});
						}
					},
					(error) => {
						console.error("background: " + folder + "-folder: " + error);
					}
				);
			}
		});
	})
});