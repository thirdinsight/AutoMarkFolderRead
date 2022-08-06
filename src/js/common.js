function buildDefaultCommonFolders() {
  return {
    drafts: true,
	trash: true,
	templates: true,
	junk: true
  };
}

function buildDefaultIncludeSubfolders() {
  return true;
}

async function loadCommonFoldersOptions() {
  let commonFolders = buildDefaultCommonFolders();

  let result = await browser.storage.local.get('commonFolders');
  
	console.log("CommonFoldersOptions result loaded from local storage: " + JSON.stringify(result));
	
	if (result.hasOwnProperty("commonFolders") && Object.keys(result.commonFolders).length > 0) {
	  commonFolders = result.commonFolders
	  
	  console.log("Using commonFoldersOptions loaded from local storage: " + JSON.stringify(commonFolders));
	}
	else {
	  console.log("Using default commonFoldersOptions: " + JSON.stringify(commonFolders));
	}
	
	return commonFolders;
}

async function loadIncludeSubfoldersOption() {
  let includeSubfolders = buildDefaultIncludeSubfolders();

  let result = await browser.storage.local.get('includeSubfolders');
  
	console.log("IncludeSubfoldersOption result loaded from local storage: " + JSON.stringify(result));
	
	if (result.hasOwnProperty("includeSubfolders")) {
	  includeSubfolders = result.includeSubfolders
	  
	  console.log("Using includeSubfoldersOption loaded from local storage: " + JSON.stringify(includeSubfolders));
	}
	else {
	  console.log("Using default includeSubfoldersOption: " + JSON.stringify(includeSubfolders));
	}
	
	return includeSubfolders;
}
