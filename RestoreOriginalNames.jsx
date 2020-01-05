/*
*    Restore Original File Names for AE
*   
*  @author Guilherme Trevisan - TrevisanGMW@gmail.com
*  @version 1 .1 - 2017/12/27
*
*
*   v1.1 - Fixed bug where files inside of folders wouldn't be affected.
*
*   v1 Initial Release 2017/12/24
*/





// **************************************************** Script Main ****************************************************

panelStarter();
//undoGroupGenerator(); // for debugging purposes


// **************************************************** Functions ****************************************************
// starts GUI for the script
function panelStarter() {
var mainPanel = new Window("palette", "Restore Original File Names", undefined);

var g1 = mainPanel.add("group", undefined, {
					margins: 0,
					spacing: 0,
					alignment: ["top", "left"],
					alignChildren: ["center", "center"]
				});
			
				mainPanel.preferredSize = [200, 100];
				mainPanel.orientation = "column";
				mainPanel.alignChildren = "fill";
				mainPanel.graphics.backgroundColor = mainPanel.graphics.newBrush(mainPanel.graphics.BrushType.SOLID_COLOR, [0, 0, 0]); // RGB Additive System
				var theFolder = new Folder(new File($.fileName).parent).fsName;
				var tempFile = new File(theFolder + "/Icon.png");
				if (tempFile.exists) {
					var logo = mainPanel.add("image", undefined, new File(theFolder + "/Icon.png"));
				}
			
			
				var checkBox = mainPanel.add("checkbox", undefined, "Affect only selected files?", {
					name: "onlySelectedFiles"
				});
				checkBox.value = false;
				
				var mainFunction = mainPanel.add("panel", undefined, "Restoration time!!!");
				mainFunction.preferredSize = [100, 10];
				mainFunction.orientation = "column";
				var r1 = mainFunction.add("group", undefined, undefined, {
					orientation: "row"
				});
			
			 mainFunction.buttonHlp = mainFunction.add("button", undefined, "?");
				mainFunction.buttonHlp.alignment = "bottom";
				var theTitle = "What script? What is happening? What is this window? Where am I? HELLPPP!!!!!!!111!!11!";
				var helpStr = "This script restores the names of the files in the project window back to their original imported names (before the user manually changed it to something else) . If it's not working, ask Guilherme for help";
				mainFunction.buttonHlp.onClick = function() {
					alert(helpStr, theTitle);
				}
			
				mainFunction.buttonOK = mainFunction.add("button", undefined, "Restore");
				mainFunction.buttonOK.alignment = "bottom";
				mainFunction.buttonOK.preferredSize = [100, 50];
				mainFunction.buttonOK.onClick = function() {
					if (checkBox.value == false) {
						changeOnlySelected = false;
					} else {
						changeOnlySelected = true;
					}
					this.parent.parent.close();
					undoGroupGenerator();

				}
			
			  mainFunction.buttonClose = mainFunction.add("button", undefined, "Cancel");
				mainFunction.buttonClose.alignment = "bottom";
				mainFunction.buttonClose.onClick = function() {
					this.parent.parent.close();
				};


mainPanel.show();


}
// creates an undo group before executing the script
function undoGroupGenerator(){
	app.beginUndoGroup("Restore Original Names"); // Start Undo
	
		//changeOnlySelected = false; // for debugging purposes
		restoreOriginalNames(changeOnlySelected);

	app.endUndoGroup(); // End Undo
}
// Restores original file names - Main part of the script
function restoreOriginalNames(onlySelected){
	var selectedItems = getSelectedFiles();
	// only selected
	if (onlySelected == true){
		/*for (var i = 1; i <= app.project.numItems; i += 1) {
			var cItem = app.project.item(i);
				if (cItem.name != cItem.mainSource.file.displayName && contains(selectedItems,cItem) == true) {
					cItem.name = cItem.mainSource.file.displayName;
				} */
        var allFiles = getAllFiles();
        for (var i = 0; i <= allFiles.length; i += 1) {
			var cItem = allFiles[i];
				if (cItem != null && cItem.name != cItem.mainSource.file.displayName && contains(selectedItems,cItem) == true) {
					cItem.name = cItem.mainSource.file.displayName;
				}
    
		}
	// else changes everything
	} else {
        var allFiles = getAllFiles();
        for (var i = 0; i <= allFiles.length; i += 1) {
			var cItem = allFiles[i];
				if (cItem != null && cItem.name != cItem.mainSource.file.displayName ) {
					cItem.name = cItem.mainSource.file.displayName;
				}
		}
	}
	// alert user in case nothing was changed/selected
	if ((selectedItems.length > 0) == false && onlySelected == true) {
		alert ("No files were selected, nothing changed.");
		}
}
 // Retuns whether or not array "a" contains obj using strict equality
function contains(a, obj) {

			var i = a.length;
			while (i--) {
				if (a[i] === obj) {
					return true;
				}
			}
			return false;
		}
    
    // Returns an array with all objects in the project
function getAllFiles() {
			var allFilesArray = new Array();
			if (app.project != null) {
				var items = app.project.items;
				for (var i = 1; i <= items.length; i += 1) {
					if (items[i] instanceof FootageItem && items[i].mainSource instanceof FileSource) {
						allFilesArray[allFilesArray.length] = items[i];
					}
				}
			}
			return allFilesArray;
			
			}
// Returns an array contaning all selected objects
function getSelectedFiles() {
                var allFilesArray = new Array();
                var allSelectedFilesArray = new Array();
                var selItems = new Array();
                if (app.project != null) {
                    var items = app.project.items;
                    for (var i = 1; i <= items.length; i += 1) {
                        if (items[i] instanceof FootageItem && items[i].mainSource instanceof FileSource) {
                            allFilesArray[allFilesArray.length] = items[i];
                        }
                    }
                }
            
            var i = app.project.selection.length;
            while (i--) {
				var theItem = app.project.selection[i];
                    if (theItem instanceof FootageItem && theItem.mainSource instanceof FileSource) {
                            allSelectedFilesArray[allSelectedFilesArray.length] = theItem
                    
                    } else if (theItem instanceof FolderItem) {
                        getSubContents(theItem)
                        }
            
            }
        
         function getSubContents(folder) {
				if (folder != null && folder instanceof FolderItem) {
					var i = folder.numItems;
					while (i > 0) {
						projItem = folder.items[i];
						allSelectedFilesArray[allSelectedFilesArray.length] = projItem;
						if (projItem instanceof FolderItem) {
							getSubContents(projItem)
						}
						i--;
					}
                //alert(allSelectedFilesArray);
				}
			}
        
        return allSelectedFilesArray;
        }