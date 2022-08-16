function fillUIWithCommonFolderOptions(commonFolders) {
  document.querySelector("#inboxCheckbox").checked = commonFolders.inbox ? commonFolders.inbox == true : false;
  document.querySelector("#draftsCheckbox").checked = commonFolders.drafts ? commonFolders.drafts == true : false;
  document.querySelector("#sentCheckbox").checked = commonFolders.sent ? commonFolders.sent == true : false;
  document.querySelector("#trashCheckbox").checked = commonFolders.trash ? commonFolders.trash == true : false;
  document.querySelector("#templatesCheckbox").checked = commonFolders.templates ? commonFolders.templates == true : false;
  document.querySelector("#archivesCheckbox").checked = commonFolders.archives ? commonFolders.archives == true : false;
  document.querySelector("#junkCheckbox").checked = commonFolders.junk ? commonFolders.junk == true : false;
  document.querySelector("#outboxCheckbox").checked = commonFolders.outbox == true ? commonFolders.outbox : false;
}

function fillUIWithIncludeSubfoldersOption(includeSubfolders) {
  document.querySelector("#includeSubfoldersCheckbox").checked = includeSubfolders == true ? includeSubfolders : false;
}

function saveOptions(event) {
  // ********** common folder options
  let commonFolders = {
	commonFolders: {
      inbox: document.querySelector("#inboxCheckbox").checked,
      drafts: document.querySelector("#draftsCheckbox").checked,
      sent: document.querySelector("#sentCheckbox").checked,
      trash: document.querySelector("#trashCheckbox").checked,
      templates: document.querySelector("#templatesCheckbox").checked,
      archives: document.querySelector("#archivesCheckbox").checked,
      junk: document.querySelector("#junkCheckbox").checked,
      outbox: document.querySelector("#outboxCheckbox").checked
    }
  };
  
  console.info("Saving common folders options with local storage: " + JSON.stringify(commonFolders));
  
  browser.storage.local.set(commonFolders)
    .catch(e => {console.info("Exception occured in promise when saving locally stored common folder options: " + e);});

  // ********** include subfolders option
  let includeSubfolders = {
	includeSubfolders: document.querySelector("#includeSubfoldersCheckbox").checked
  };

  console.info("Saving include subfolders option with local storage: " + JSON.stringify(includeSubfolders));

  browser.storage.local.set(includeSubfolders)
    .catch(e => {console.info("Exception occured in promise when saving locally stored \"includeSubfolders\" option: " + e);});
  
  event.preventDefault();
}

function restoreOptions() {
	loadCommonFoldersOptions().then((commonFolders) => {fillUIWithCommonFolderOptions(commonFolders);});
	loadIncludeSubfoldersOption().then((includeSubfolders) => {fillUIWithIncludeSubfoldersOption(includeSubfolders);});
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);