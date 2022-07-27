function fillUIWithCommonFolderOptions(commonFolders) {
  document.querySelector("#inboxCheckbox").checked = commonFolders.inbox ? commonFolders.inbox : false;
  document.querySelector("#draftsCheckbox").checked = commonFolders.drafts ? commonFolders.drafts : false;
  document.querySelector("#sentCheckbox").checked = commonFolders.sent ? commonFolders.sent : false;
  document.querySelector("#trashCheckbox").checked = commonFolders.trash ? commonFolders.trash : false;
  document.querySelector("#templatesCheckbox").checked = commonFolders.templates ? commonFolders.templates : false;
  document.querySelector("#archivesCheckbox").checked = commonFolders.archives ? commonFolders.archives : false;
  document.querySelector("#junkCheckbox").checked = commonFolders.junk ? commonFolders.junk : false;
  document.querySelector("#outboxCheckbox").checked = commonFolders.outbox ? commonFolders.outbox : false;
}

function saveOptions(event) {
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
  
  console.log("Saving common folders options with local storage: " + JSON.stringify(commonFolders));
  
  messenger.storage.local.set(commonFolders)
    .catch(e => {console.log("Exception occured in promise when saving locally stored common folder options: " + e);});

  event.preventDefault();
}

function restoreOptions() {
	loadCommonFoldersOptions().then((commonFolders) => {fillUIWithCommonFolderOptions(commonFolders);});
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);