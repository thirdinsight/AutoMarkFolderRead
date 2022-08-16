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
  
	console.info("CommonFoldersOptions result loaded from local storage: " + JSON.stringify(result));
	
	if (result.hasOwnProperty("commonFolders") && Object.keys(result.commonFolders).length > 0) {
	  commonFolders = result.commonFolders
	  
	  console.info("Using commonFoldersOptions loaded from local storage: " + JSON.stringify(commonFolders));
	}
	else {
	  console.info("Using default commonFoldersOptions: " + JSON.stringify(commonFolders));
	}
	
	return commonFolders;
}

async function loadIncludeSubfoldersOption() {
  let includeSubfolders = buildDefaultIncludeSubfolders();

  let result = await browser.storage.local.get('includeSubfolders');
  
	console.info("IncludeSubfoldersOption result loaded from local storage: " + JSON.stringify(result));
	
	if (result.hasOwnProperty("includeSubfolders")) {
	  includeSubfolders = result.includeSubfolders
	  
	  console.info("Using includeSubfoldersOption loaded from local storage: " + JSON.stringify(includeSubfolders));
	}
	else {
	  console.info("Using default includeSubfoldersOption: " + JSON.stringify(includeSubfolders));
	}
	
	return includeSubfolders;
}
