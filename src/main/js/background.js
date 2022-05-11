document.addEventListener("DOMContentLoaded", () => {
	//console.log("addon loaded");
	
	messenger.folders.onFolderInfoChanged.addListener((folder, folderInfo) => {
		//console.log("folder has changed");
		
		if (folder.type == "junk" || 
			folder.type == "trash" || 
			folder.type == "drafts" || 
			folder.type == "templates") {
				
			//console.log(folder.type + "-folder has changed");
			
			if (folderInfo.unreadMessageCount > 0) {
				//console.log(folder.type + "-folder: " + folderInfo.unreadMessageCount + " unread messages");
				
				messenger.messages.query({"folder": folder, "unread": true}).then(
					(messageList) => {
						for (let message of messageList.messages) {
							//console.log(folder.type + "-folder: " + "marking message with id '" + message.id + "' as read");
							
							messenger.messages.update(message.id, {"read": true});
						}
					},
					(error) => {
						console.error(folder.type + "-folder: " + error);
					}
				);
			}
		}
	})
});