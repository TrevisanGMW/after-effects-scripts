/*
*    Project Organizer for After Effects
*   
*   @version 1.1 - 2017/12/03
*
*  The code is a bit messy, I know. It was just a study project...
*
*   v1.1 Patch bug that would execute the script when user clided the "X" button to cancel.
*   v1 Initial Release 2017/04/28
*/


function startScript(thisObj) {

    var myPanel = PanelUI(thisObj);
    
    if (myPanel != null && myPanel instanceof Window) {
        myPanel.close();
        Main();
    }

    function PanelUI(thisObj) {
        var mainPanel = thisObj instanceof Panel ? thisObj : new Window("palette", "Project Organizer", undefined, {
            resizeable: true
        });
        if (mainPanel != null) {
            var thisFile = File($.fileName);
            var thisFileFolder = Folder(thisFile.parent);
            var strFolder = Folder(thisFileFolder.fsName).toString();
            var testFile = new File(strFolder + "/Icon.png");
            if (!testFile.exists) {
                var g1 = mainPanel.add("group", undefined, {
                    margins: 0,
                    spacing: 0,
                    alignment: ["top", "left"],
                    alignChildren: ["center", "center"]
                });
                g1.iconBut1 = g1.add("button", undefined, "Toolkit");
                g1.iconBut1.onClick = function() {
                    Main();
                };
            } else {
                var theImage = ScriptUI.newImage(strFolder + "/Icon.png");
                var g1 = mainPanel.add("group", undefined, {
                    margins: 0,
                    spacing: 0,
                    alignChildren: ["center", "center"]
                });
                g1.iconBut1 = g1.add("iconbutton", undefined, theImage, {
                    style: "button"
                });
                g1.iconBut1.size = [34, 36];
                g1.iconBut1.onClick = function() {
                    //Main();
                    myPanel.close();
                };
            }
            mainPanel.layout.layout(true);
            mainPanel.layout.resize();
            mainPanel.onResize = function() {
                mainPanel.layout.resize();
            };
        }
        return mainPanel;
    }


// ********************** Main - Contains Most of the script's code **********************
    function Main() {
        function toolKit() {
            var ticked = new Array();
            var commentsTicked = false;
            
            // Checks if a folder with the given name exists
            function checkExists(folderName) {
                var folderExists = false;
                for (var i = 1; i <= app.project.numItems; i += 1) {
                    var cItem = app.project.item(i);
                    if (cItem instanceof FolderItem && cItem.name == folderName) {
                        cItem.parentFolder = app.project.rootFolder;
                        folderExists = true;
                        return true;
                    }
                }
                app.project.items.addFolder(folderName);
            }// End checkExists

            function askNames() {
                function getSetting(theNumber, initialValue) {
                    var theSetting = "Toolkit" + theNumber;
                }
            
                var win = new Window("dialog", "Project Organizer");
                win.preferredSize = [140, 100];
                win.orientation = "column";
                win.alignChildren = "fill";
                win.graphics.backgroundColor = win.graphics.newBrush(win.graphics.BrushType.SOLID_COLOR, [0, 0, 0]); // RGB Additive System
                var theFolder = new Folder(new File($.fileName).parent).fsName;
                var tempFile = new File(theFolder + "/Icon.png");
                if (tempFile.exists) {
                    var logo = win.add("image", undefined, new File(theFolder + "/Icon.png"));
                }
                var chk = win.add("checkbox", undefined, "Ignore selected items?", {
                    name: "Ignore"
                });
            
                var mainPanel1 = win.add("panel", undefined, "Let the magic begin!!!");
                mainPanel1.preferredSize = [100, 10];
                mainPanel1.orientation = "column";
                var r1 = mainPanel1.add("group", undefined, undefined, {
                    orientation: "row"
                });


                mainPanel1.buttonHlp = mainPanel1.add("button", undefined, "?");
                mainPanel1.buttonHlp.alignment = "bottom";
                var theTitle = "What script? What is happening? What is this window? Where am I? HELLPPP!!!!!!!111!!11!";
                var helpStr = "Project Organizer automatically moves all objects to folders that match their extensions. If it's not working, ask Guilherme for help";
                mainPanel1.buttonHlp.onClick = function() {
                    alert(helpStr, theTitle);
                };
                mainPanel1.buttonOK = mainPanel1.add("button", undefined, "Go");
                mainPanel1.buttonOK.alignment = "bottom";
                mainPanel1.buttonOK.preferredSize = [100, 50];
                mainPanel1.buttonOK.onClick = function() {
                    if (chk.value == false) {
                        ignore = false;
                    } else {
                        ignore = true;
                    }
                    this.parent.parent.close();

                    theNames = new Array("Solids", "Footage", "Images", "_Precomps", "Other", "Other", "Old Folders","Images"); // Change  Last Images to Vector in case you want to have another folder only for vectors
                };
                mainPanel1.buttonClose = mainPanel1.add("button", undefined, "Cancel");
                mainPanel1.buttonClose.alignment = "bottom";
                mainPanel1.buttonClose.onClick = function() {
                    this.parent.parent.close();
                    theNames = null;
                };
                win.center();
                win.show();
            }
            



            function getSelectedItems() {
                var selItems = new Array();

                function getSubContents(folder) {
                    if (folder != null && folder instanceof FolderItem) {
                        var i = folder.numItems;
                        while (i > 0) {
                            projItem = folder.items[i];
                            selItems[selItems.length] = projItem;
                            if (projItem instanceof FolderItem) {
                                getSubContents(projItem)
                            }
                            i--;
                        }
                    }
                    return selItems;
                }
                var i = app.project.selection.length;
                while (i--) {
                    var theItem = app.project.selection[i];
                    if (!(theItem instanceof FolderItem) && theItem.parentFolder == app.project.rootFolder) {
                        selItems[selItems.length] = theItem;
                    }
                    if (theItem instanceof FolderItem && theItem.parentFolder == app.project.rootFolder) {
                        selItems[selItems.length] = theItem;
                        getSubContents(theItem);
                    }
                }
                return selItems;
            }

            function contains(a, obj) {
                var i = a.length;
                while (i--) {
                    if (a[i] === obj) {
                        return true;
                    }
                }
                return false;
            }
            askNames();
            var namesArray = theNames;
            if (namesArray == null) {
                return;
            }
            if (ignore == true) {
                var keepArray = getSelectedItems();
            }
            if (ignore == false) {
                var keepArray = [];
            }
            for (var i = 0; i < namesArray.length; i += 1) {
                    checkExists(namesArray[i]);
            }
            for (var i = 1; i <= app.project.numItems; i += 1) {
                var cItem = app.project.item(i);
                if (cItem instanceof FolderItem && cItem.name == namesArray[0] && cItem.parentFolder == app.project.rootFolder) {
                    var fSolids = cItem;
                }
                if (cItem instanceof FolderItem && cItem.name == namesArray[1] && cItem.parentFolder == app.project.rootFolder) {
                    var fFootage = cItem;
                }
                if (cItem instanceof FolderItem && cItem.name == namesArray[2] && cItem.parentFolder == app.project.rootFolder) {
                    var fStills = cItem;
                }
                if (cItem instanceof FolderItem && cItem.name == namesArray[3] && cItem.parentFolder == app.project.rootFolder) {
                    var fCompositions = cItem;
                }
                if (cItem instanceof FolderItem && cItem.name == namesArray[4] && cItem.parentFolder == app.project.rootFolder) {
                    var fMissingFootage = cItem;
                }
                if (cItem instanceof FolderItem && cItem.name == namesArray[5] && cItem.parentFolder == app.project.rootFolder) {
                    var fAudio = cItem;
                }
                if (cItem instanceof FolderItem && cItem.name == namesArray[6] && cItem.parentFolder == app.project.rootFolder) {
                    var fOldFolders = cItem;
                }
                if (cItem instanceof FolderItem && cItem.name == namesArray[7] && cItem.parentFolder == app.project.rootFolder) {
                    var fVectors = cItem;
                }
            }

            function getCompositions() {
                var allComps = new Array();
                if (app.project != null) {
                    var items = app.project.items;
                    for (var i = 1; i <= items.length; i += 1) {
                        if (items[i] instanceof CompItem && contains(keepArray, items[i]) == false) {
                            allComps[allComps.length] = items[i];
                        }
                    }
                }
                return allComps;
            }
        
  
                var comps = getCompositions();
                for (var i = 0; i < comps.length; i += 1) {
                    comp = comps[i];
                    comp.parentFolder = fCompositions;
                }
            
            
            function getStills() {
                var allStills = new Array();
                if (app.project != null) {
                    var items = app.project.items;
                    for (var i = 1; i <= items.length; i += 1) {
                        if (items[i] instanceof FootageItem && items[i].mainSource instanceof FileSource && items[i].mainSource.isStill == 1 && contains(keepArray, items[i]) == false) {
                            allStills[allStills.length] = items[i];
                        }
                    }
                }
                return allStills;
            }
            if (true == true) {
                var stills = getStills();
                for (var i = 0; i < stills.length; i += 1) {
                    var still = stills[i];
                    var theName = still.mainSource.file.displayName;
                    var RE_vectorFormats = /\.ai|\.eps|\.pdf|\.pct|\.swf$/i;
                    if (theName.match(RE_vectorFormats) == null) {
                        still.parentFolder = fStills;
                    }
                }
            }

                var stills = getStills();
                var vectorCount = 0;
                for (var i = 0; i < stills.length; i += 1) {
                    var still = stills[i];
                    var theName = still.mainSource.file.displayName;
                    var RE_vectorFormats = /\.ai|\.eps|\.pdf|\.pct|\.swf$/i;
                    if (theName.match(RE_vectorFormats) != null && contains(keepArray, still) == false) {
                        still.parentFolder = fVectors;
                        vectorCount++;
                    }
                }
            

            function getSolids() {
                var allSolids = new Array();
                if (app.project != null) {
                    var items = app.project.items;
                    for (var i = 1; i <= items.length; i += 1) {
                        if (items[i] instanceof FootageItem && items[i].mainSource instanceof SolidSource && contains(keepArray, items[i]) == false) {
                            allSolids[allSolids.length] = items[i];
                        }
                    }
                }
                return allSolids;
            }
        
                var solids = getSolids();
                for (var i = 0; i < solids.length; i += 1) {
                    solid = solids[i];
                    solid.parentFolder = fSolids;
                }
            

            function getFootage() {
                var allFootage = new Array();
                if (app.project != null) {
                    var items = app.project.items;
                    for (var i = 1; i <= items.length; i += 1) {
                        if (items[i] instanceof FootageItem && items[i].mainSource instanceof FileSource && items[i].mainSource.isStill == 0 && items[i].hasVideo == true && contains(keepArray, items[i]) == false) {
                            allFootage[allFootage.length] = items[i];
                        }
                    }
                }
                return allFootage;
            }
                var fItems = getFootage();
                for (var i = 0; i < fItems.length; i += 1) {
                    fItem = fItems[i];
                    fItem.parentFolder = fFootage;
                }
            

            function getMissingFootage() {
                var missingItems = new Array();
                if (app.project != null) {
                    var items = app.project.items;
                    for (var i = 1; i <= items.length; i += 1) {
                        if (items[i] instanceof FootageItem && items[i].footageMissing == true && contains(keepArray, items[i]) == false) {
                            missingItems[missingItems.length] = items[i];
                        }
                    }
                }
                return missingItems;
            }

                var missingItems = getMissingFootage();
                for (var i = 0; i < missingItems.length; i += 1) {
                    missingItem = missingItems[i];
                    missingItem.parentFolder = fMissingFootage;
                }
            

            function getAudioFiles() {
                var audioFiles = new Array();
                if (app.project != null) {
                    var items = app.project.items;
                    for (var i = 1; i <= items.length; i += 1) {
                        if (items[i] instanceof FootageItem && items[i].mainSource instanceof FileSource && items[i].hasAudio == true && items[i].hasVideo == false && contains(keepArray, items[i]) == false) {
                            audioFiles[audioFiles.length] = items[i];
                        }
                    }
                }
                return audioFiles;
            }

                var aItems = getAudioFiles();
                for (var i = 0; i < aItems.length; i += 1) {
                    aItem = aItems[i];
                    aItem.parentFolder = fAudio;
                }
            

            function getEmptyFolders() {
                var a = new Array();
                for (var i = 1; i <= app.project.numItems; i += 1) {
                    var cItem = app.project.items[i];
                    if (cItem instanceof FolderItem && cItem.name !== namesArray[0] && cItem.name !== namesArray[1] && cItem.name !== namesArray[2] && cItem.name !== namesArray[3] && cItem.name !== namesArray[4] && cItem.name !== namesArray[5] && cItem.name !== namesArray[6] && cItem.name !== namesArray[7] && contains(keepArray, cItem) == false) {
                        a[a.length] = cItem;
                    }
                }
                return a;
            }

                var emptyFolders = getEmptyFolders();
                for (var i = 0; i < emptyFolders.length; i += 1) {
                    emptyFolders[i].parentFolder = fOldFolders;
                }
            
            var i = app.project.numItems;
            while (i-- && i > 0) {
                j = i;
                while (j-- && j > 0) {
                    var theItem = app.project.items[i];
                    var theNext = app.project.items[j];
                    if (theNext.name === theItem.name) {
                        if (theNext instanceof FolderItem && theItem instanceof FolderItem) {
                            if (theItem.numItems == 0) {
                                theItem.remove();
                            } else {
                                if (theNext.numItems == 0) {
                                    theNext.remove();
                                }
                            }
                        }
                    }
                }
            }



           var mediaFolder = app.project.items.addFolder("Media");
           for (var i = 1; i <= app.project.numItems; i += 1) {
                    var cItem = app.project.item(i);
                    if (cItem instanceof FolderItem && cItem.name == "Footage" && cItem.parentFolder == app.project.rootFolder) {
                        var gotchaBitch = cItem;
                        gotchaBitch.parentFolder = mediaFolder;
                    }
                }
            for (var i = 1; i <= app.project.numItems; i += 1) {
                    var cItem = app.project.item(i);
                    if (cItem instanceof FolderItem && cItem.name == "Images" && cItem.parentFolder == app.project.rootFolder) {
                        var gotchaBitch = cItem;
                        gotchaBitch.parentFolder = mediaFolder;
                    }
                }
            var otherFolder;
            for (var i = 1; i <= app.project.numItems; i += 1) {
                    var cItem = app.project.item(i);
                    if (cItem instanceof FolderItem && cItem.name == "Other" && cItem.parentFolder == app.project.rootFolder) {
                        var otherFolder = cItem;
                    }
                }
            
            
             for (var i = 1; i <= app.project.numItems; i += 1) {
                    var cItem = app.project.item(i);
                    if (cItem instanceof FolderItem && cItem.name == "Old Folders" && cItem.parentFolder == app.project.rootFolder) {
                        var oldFoldersFolder = cItem;
                        oldFoldersFolder.parentFolder = otherFolder;
                    }
                }
            
            var compsFolder = app.project.items.addFolder("Comps");
            for (var i = 1; i <= app.project.numItems; i += 1) {
                    var cItem = app.project.item(i);
                    if (cItem instanceof FolderItem && cItem.name == "_Precomps" && cItem.parentFolder == app.project.rootFolder) {
                        var precompsFolder = cItem;
                        precompsFolder.parentFolder = compsFolder;
                    }
                }
            
            
            
            
            
            
            
        }
        app.beginUndoGroup("Organize");
        toolKit();
        app.endUndoGroup();
    }
}

new startScript(this);


