function buildDefaultCommonFolders() {
  return {
    drafts: true,
	trash: true,
	templates: true,
	junk: true
  };
}

async function loadCommonFoldersOptions() {
  let commonFolders = buildDefaultCommonFolders();

  let result = await messenger.storage.sync.get('commonFolders');
  
	console.log("Result loaded from sync storage: " + JSON.stringify(result));
	
	if (result.hasOwnProperty("commonFolders") && Object.keys(result.commonFolders).length > 0) {
	  commonFolders = result.commonFolders
	  
	  console.log("Using common folders loaded from sync storage: " + JSON.stringify(commonFolders));
	}
	else {
	  console.log("Using default common folders: " + JSON.stringify(commonFolders));
	}
	
	return commonFolders;
}
