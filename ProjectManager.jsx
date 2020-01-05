/*
*    Project Manager
*
*       Tools to help the process of creation and distribution of projects
*   
*  @author Guilherme Trevisan - TrevisanGMW@hotmail.com
*  @Alpha version 0.6  - 2018/01/21
*
*   TO DO: 
*   create help info and windows
*   improve GUI
*   add option to add suffix _ASSEMBLY to saveNewAssembly
*
*
*   ****** What's New - UPDATE LOG ******
*
*   v0.6 Alpha 2018/01/21
*   Added duplicateRenderQueueWithSuffix function
*   Minor changes to the Temp UI
*   Checkboxes & Textboxes programmed into the UI
*   Name changed to "Project Manager"
*
*   v0.5 Alpha 2018/01/20
*   Added proper save comps as projects function
*   Save comps as project renamed to reduce & save
*   CompItem checks added to LUT invertion function
*   Temp GUI created
*
*   v0.4 Alpha 2018/01/20
*   Improved LUT visibility function (no status invertion)
*   Added result message and counter to LUT visibility function
*
*   v0.3 Alpha 2018/01/19
*   Added Set LUT Visibility function.
*   Fixed issues with no selection in reduceSave
*   Fixed issues with incorrect selection in setStartFrame
*   Added missing checks
*
*   v0.2 Alpha - 2018/01/18
*   Added reload RMD function.
*   Added reset start frame function.
*
*   v0.1 Alpha  - 2018/01/09
*   Save selected comps as project
*   Save project as assembly (forces AET file)
*
*/


panelStarter();

// ************************************* Functions  *************************************

// GUI Function
function panelStarter() {
	// Create the window 
	var mainWindow = new Window('palette', 'Project Manager');
	this.windowRef = mainWindow;
	// Create a container panel 

    // ************************************* Save Comps As Projects  *************************************
    var saveCompAsProjectGroup = mainWindow.add("group", undefined, "saveCompAsProjectGroup");
    saveCompAsProjectGroup.orientation = "column";

    var newDestination; // null if not determined
    var firstPanel = saveCompAsProjectGroup.add("panel", undefined, ""); 
    var destinationPanel = firstPanel.add("panel", undefined, "Destination Folder"); 
    var fillerGroup = destinationPanel.add("group", [5,5,5,5], "Filler Group"); 
    var changeDestinationBtn = destinationPanel.add("button",[5,5,130,30], "Change Destination"); 
    var saveCompsPath = destinationPanel.add("statictext", undefined, "Project Root Folder");
    saveCompsPath.enabled = false;
    
    // Project Name as Prefix
    var hasProjectNameAsPrefix = firstPanel.add("checkbox", undefined, "Add Project Name as Prefix");
    hasProjectNameAsPrefix.value = true;
    
    // New Suffix Group
    var saveAsCompHasSuffixGroup = firstPanel.add("group",undefined, "saveAsCompHasSuffixGroup"); 
    var saveAsCompHasSuffixSuffix = saveAsCompHasSuffixGroup.add("checkbox", undefined, "Add Custom Suffix:");
    saveAsCompHasSuffixSuffix.value = false;
    var newSaveAsCompSuffix = saveAsCompHasSuffixGroup.add("edittext", undefined, "_01");    
    
    var saveCompAsProjectGroupMainBtns = firstPanel.add("group",undefined, ""); 
    var saveCompsBtn = saveCompAsProjectGroupMainBtns.add("button",undefined, "Save Comps as Projects"); 
    var saveCompsHelpBtn = saveCompAsProjectGroupMainBtns.add("button",[5,5,30,30], "?"); 
    saveCompsHelpBtn.helpTip = "More Information about this function";
    saveCompsBtn.helpTip = "Run script."; 
    
     // Save Comps Buttons
    saveCompsBtn.onClick = function()
    {
        if(saveAsCompHasSuffixSuffix.value == true){
            saveCompsAsProject(newDestination,hasProjectNameAsPrefix.value,newSaveAsCompSuffix.text);
            } else {
                saveCompsAsProject(newDestination,hasProjectNameAsPrefix.value,null);
                }
    }
    saveCompsHelpBtn.onClick = function()
    {
    alert("add help for save comps as projects here");
    }
    changeDestinationBtn.onClick = function()
    {
    newDestinationCheck = changeDestination();
    if (newDestinationCheck) {
        saveCompsPath.text =  newDestinationCheck;
        newDestination =  newDestinationCheck;
        } 
    }

    // ************************************* Reduce and Save  *************************************

    var reduceSaveGroup = mainWindow.add("group", undefined, "reduceSaveGroup");
    reduceSaveGroup.orientation = "column";

    var firstPanel = reduceSaveGroup.add("panel", undefined, ""); 
    var reduceSaveReopen = firstPanel.add("checkbox", undefined, "Reopen Initial Project");
    reduceSaveReopen.value = true;
    var reduceSaveGroupMainBtns = firstPanel.add("group",undefined, ""); 
    var reduceSaveBtn = reduceSaveGroupMainBtns.add("button",undefined, "Reduce and Save"); 
    var reduceSaveHelpBtn = reduceSaveGroupMainBtns.add("button",[5,5,30,30], "?"); 
    reduceSaveBtn.helpTip = "More Information about this function";
    reduceSaveHelpBtn.helpTip = "Run script."; 
    
     // Reduce Save Buttons
    reduceSaveBtn.onClick = function()
    {
            if (app.project.file != null) {
            reduceSave(reduceSaveReopen.value);
            } else 
            { 
                alert("Your project has never been saved. Save it first before using this script.");
            }
    }
    reduceSaveHelpBtn.onClick = function()
    {
    alert("add help for reduce save here");
    }


    // ************************************* Duplicate Render Queue with Suffix  *************************************

    var renderQueueSuffixGroup = mainWindow.add("group", undefined, "renderQueueSuffixGroup");
    renderQueueSuffixGroup.orientation = "column";

    var firstPanel = renderQueueSuffixGroup.add("panel", undefined, "");
    // New Suffix Text Group
    var newSuffixBtns = firstPanel.add("group",undefined, ""); 
    newSuffixBtns.add("statictext", undefined, "New Suffix: ");
    var newSuffix = newSuffixBtns.add("edittext", undefined, "LOG");
    // New Destination or not
    var renderQueueSuffixNewDestination = firstPanel.add("checkbox", undefined, "Render to a different folder");
    renderQueueSuffixNewDestination.value = true;
    
    var renderQueueSuffixGroupMainBtns = firstPanel.add("group",undefined, ""); 
    var renderQueueSuffixBtn = renderQueueSuffixGroupMainBtns.add("button",undefined, "Duplicate R.Queue with Suffix"); 
    var renderQueueSuffixHelpBtn = renderQueueSuffixGroupMainBtns.add("button",[5,5,30,30], "?"); 
    renderQueueSuffixBtn.helpTip = "More Information about this function";
    renderQueueSuffixHelpBtn.helpTip = "Run script."; 
    
     // Reduce Save Buttons
    renderQueueSuffixBtn.onClick = function()
    {
           duplicateRenderQueueWithSuffix(newSuffix.text,renderQueueSuffixNewDestination.value);
    }
    renderQueueSuffixHelpBtn.onClick = function()
    {
    alert("add help for duplicate render queue");
    }
    // ************************************* Other Functions  *************************************

    var otherFunctionsGroup = mainWindow.add("group", undefined, "otherFunctionsGroup");
    otherFunctionsGroup.orientation = "column";

    var firstPanel = otherFunctionsGroup.add("panel", undefined, ""); 
    
    //  1. Save New Assembly
    var saveNewAssemblyGroupMainBtns = firstPanel.add("group",undefined, ""); 
    var saveNewAssemblyBtn = saveNewAssemblyGroupMainBtns.add("button",undefined, "Save New Assembly"); 
    var saveNewAssemblyHelpBtn = saveNewAssemblyGroupMainBtns.add("button",[5,5,30,30], "?"); 
    saveNewAssemblyBtn.helpTip = "More Information about this function";
    saveNewAssemblyHelpBtn.helpTip = "Run script."; 
    
     //  2. Set LUTs Visibility
    var setLutsVisibilityGroupMainBtns = firstPanel.add("group",undefined, ""); 
    var setLutsVisibilityBtn = setLutsVisibilityGroupMainBtns.add("button",undefined, "Invert LUTs Visibility"); 
    var setLutsVisibilityHelpBtn = setLutsVisibilityGroupMainBtns.add("button",[5,5,30,30], "?"); 
    setLutsVisibilityBtn.helpTip = "More Information about this function";
    setLutsVisibilityHelpBtn.helpTip = "Run script."; 
    
    //  3. Reload RMDs
    var reloadRmdsMainBtns = firstPanel.add("group",undefined, ""); 
    var reloadRmdsBtn = reloadRmdsMainBtns.add("button",undefined, "Reload RMDs"); 
    var reloadRmdsHelpBtn = reloadRmdsMainBtns.add("button",[5,5,30,30], "?"); 
    reloadRmdsBtn.helpTip = "More Information about this function";
    reloadRmdsHelpBtn.helpTip = "Run script."; 
    
    //  4. Set Start Frame
    var setStartFramesMainBtns = firstPanel.add("group",undefined, ""); 
    var setStartFramesBtn = setStartFramesMainBtns.add("button",undefined, "Set Start Frames"); 
    var setStartFramesHelpBtn = setStartFramesMainBtns.add("button",[5,5,30,30], "?"); 
    setStartFramesBtn.helpTip = "More Information about this function";
    setStartFramesHelpBtn.helpTip = "Run script."; 
    
     // 1. Save New Assembly Buttons
    saveNewAssemblyBtn.onClick = function()
    {
    saveNewAssembly(); // add parameters for setting here // to do
    }
    saveNewAssemblyHelpBtn.onClick = function()
    {
    alert("add help save new assembly here");
    }

     // 2. Set LUTs Visibility Buttons
    setLutsVisibilityBtn.onClick = function()
    {
    setLUTsVisibility();
    }
    setLutsVisibilityHelpBtn.onClick = function()
    {
    alert("add help  here");
    }

     // 3. Reload RMDs Buttons
    reloadRmdsBtn.onClick = function()
    {
    reloadRMD();
    }
    reloadRmdsHelpBtn.onClick = function()
    {
    alert("add help here");
    }

     // 4. Set Start Frames Buttons
    setStartFramesBtn.onClick = function()
    {
    reloadRMD();
    }
    setStartFramesHelpBtn.onClick = function()
    {
    alert("add help here");
    }


    // Starts mainWindow
    mainWindow.show();
}


// Save selected comps as project // crashing when no path data
function reduceSave(reopenAfterDone){
    
    app.beginUndoGroup("Reduce And Save");// begin UNDO group

    var allComps= getCompositions();
    //alert(allComps); // debugging
               var i = app.project.selection.length;
               var allSelectedComps = new Array();
                while (i--) {
                    var theItem = app.project.selection[i];
                        if(theItem instanceof CompItem){
                            allSelectedComps[allSelectedComps.length] = theItem;
                        }
                }
            
            
    if(allSelectedComps.length > 0){
            
     var currentProject = app.project.file; 

    app.project.reduceProject(allSelectedComps);

    app.project.saveWithDialog()

    if(reopenAfterDone){ // checkbox in the UI
        
        app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES); 
        app.open(currentProject);
    }

} else {
    alert ("You have no comps selected");
    }

//currentProject = null;

app.endUndoGroup();

//app.executeCommand(16); // Undo last command
}
// Get all comps in the project
function getCompositions() {
	var allComps = new Array();
	if (app.project != null) {
		var items = app.project.items;
		for (var i = 1; i <= items.length; i += 1) {
			if (items[i] instanceof CompItem) {
				allComps[allComps.length] = items[i];
			}
		}
	}
	return allComps;
}
// Saves current project as AET file.
function saveNewAssembly() {
var newProjectFolder = new File("Select Destination & Name");
var targetFolder = newProjectFolder.saveDlg();
if (targetFolder != null) {
    var newFilePath = targetFolder.path + "/" + targetFolder.displayName + ".aet";
    var newProjectFolderTwo = new File(newFilePath);
    app.project.save(newProjectFolderTwo);
    } 
}
// Reload selected files, function created specially for R3D files and the reload of RMDs
function reloadRMD(){

    app.beginUndoGroup("Realod RMD");

    var selectionArray = app.project.selection;
    if(selectionArray.length > 0) {
        var numberOfReloads = 0; // count how many files were reloaded.
        for (var i = 0; i < selectionArray.length; i++) {
           if (selectionArray[i] instanceof FootageItem) {
                var fileHolder = selectionArray[i];
                var newFile = new File(fileHolder.file);
                var oldName = fileHolder.name;
                selectionArray[i].replaceWithPlaceholder("Place Holder", fileHolder.width,fileHolder.height,fileHolder.frameRate,fileHolder.duration);
                selectionArray[i].replace(newFile);
                selectionArray[i].name = oldName;
                numberOfReloads++;
              }
           }
        //alert(numberOfReloads); debugging
              if(numberOfReloads == 1){
                alert(numberOfReloads + " file was reloaded. Don't forget to purge cache.");
                } else if (numberOfReloads > 1) {
                    alert(numberOfReloads + " files were reloaded. Don't forget to purge cache.");
                    }
                    else
                    { 
                        alert("No files were reloaded. You have to select footage items.");
                        }

        } else {
            alert("You don't have anything selected.");
            }

    app.endUndoGroup();

}
// Set Start Frames // currently fixed at 0
function setStartFrame(){
    app.beginUndoGroup("Reset Start Frame");
	
//frameRate = parseFloat(prompt("What is the frame rate?"));
frameRate = 0;

var myItems = app.project.selection;
var numberOfCompsAffected = 0;
for (var i = 0; i < myItems.length; i++) {
   if (myItems[i] instanceof CompItem) {
      //myItems[i].displayStartTime = 1/frameRate;
      myItems[i].displayStartTime = 0;
      numberOfCompsAffected++;
      }
   }

    if(numberOfCompsAffected == 1){
         var result = numberOfCompsAffected + " comp had its Start Time set to 0";
        } else if (numberOfCompsAffected > 1){
             var result = numberOfCompsAffected + " comps had their Start Time set to 0";
            } else {
                var result = "No comps were affected. Please, Select Comp Items.";
                }
  
   alert(result);
   
   app.endUndoGroup();
}

// Sets visibility of layers named "LUT" in selected comps. ON/OFF switch (Uses getCompositions function)
function setLUTsVisibility() {
    
  app.beginUndoGroup('Set LUTs Visibility ON/OFF');// undo possiblilty
  
    // prerequisites
  var allComps= getCompositions();
  var i = app.project.selection.length;
  var allSelectedComps = new Array();
  
  if(i > 0) {
            while (i--) {
				var theItem = app.project.selection[i];
                if(theItem instanceof CompItem){
                   allSelectedComps[allSelectedComps.length] = theItem;
                   }
            }
   } else {
       alert("Please select comps that you want to affect.");
       return;
       }
   
   // Checks if at least one comp was found in the selection
   if(allSelectedComps.length < 1){
       alert("No comps were found in your selection");
       return;
       }
   
    var currentStatus = false;
    var hasCheckedCurrentStatus = false;
    var howManyLutsWereFound = 0;
    var howManyComps = allSelectedComps.length;
            while (howManyComps--) {
                var curComp = allSelectedComps[howManyComps];
                
                for(var i = 1; i < curComp.layers.length + 1; i++) {
                    if(curComp.layers[i].name == 'LUT' && hasCheckedCurrentStatus == false){ // checks status of the first LUT found in project
                        //alert(curComp.layers[i].enabled);
                        currentStatus = curComp.layers[i].enabled;
                        hasCheckedCurrentStatus = true;
                        }
                      // check name
                    if(curComp.layers[i].name == 'LUT') {
                        // turn into opposite (determined by first LUT found
                        if(currentStatus) {
                            curComp.layers[i].enabled = false;
                            } else { 
                                curComp.layers[i].enabled = true;
                                }
                       //curComp.layers[i].enabled = !curComp.layers[i].enabled; // invert 
                       howManyLutsWereFound++;
                    }
            }
  }

   if(currentStatus == true && howManyLutsWereFound > 1) {
       var message = howManyLutsWereFound + " LUTs were affected and are now visible (ON)";
       alert(message);
       } else if (currentStatus == false && howManyLutsWereFound > 1){
           var message = howManyLutsWereFound + " LUTs were affected and are now invisible (OFF)";
           alert(message);
           } else if (currentStatus == true && howManyLutsWereFound == 1){
               var message = howManyLutsWereFound + " LUT was affected and is now visible (ON)";
               alert(message);
           } else if (currentStatus == false && howManyLutsWereFound == 1){
                   var message = howManyLutsWereFound + " LUT was affected and is now invisible (OFF)";
                   alert(message);
               } else {
               alert('No layers with the name "LUT" were found. Did you select the right comps?');
               }
  
  
  app.endUndoGroup();
}
// Saves every selected composition as project.
function saveCompsAsProject(targetFolder, addPrefixProjectName, customSuffix) {
    var scriptValues = new Object();
    scriptValues.targetFolder = targetFolder;
    scriptValues.metRequirements = true;
    
    //  *************************************  Check if there is a project open    *************************************
    if (!app.project) {
        scriptValues.message = "There is no project currently open. Please, open a project, and then select one or more composition to export";
        scriptValues.metRequirements = false;
    }

    // ************************************* Check if project was ever saved. *************************************
    if (scriptValues.metRequirements) {
        scriptValues.project = app.project.file;
        if (scriptValues.project) {
            app.project.save(scriptValues.project);
            scriptValues.OriginalProjectName = scriptValues.project.name;
            scriptValues.projectName = scriptValues.project.name.replace(/%20/gi, " ");
            scriptValues.projectName = scriptValues.projectName.substr(0, scriptValues.projectName.length - 4);
            scriptValues.projectPath = scriptValues.project.path;
        } else {
            scriptValues.message = "You need to save your project first";
            scriptValues.metRequirements = false;
        }
    }

    // ************************************* Check if selecting something *************************************
    if (scriptValues.metRequirements) {
        scriptValues.selection = app.project.selection;
        if (scriptValues.selection.length == 0) {
            scriptValues.message = "Please select the compositions that you want to export.";
            scriptValues.metRequirements = false;
        }
    }

    // ************************************* Check if user selected compItems *************************************
    if (scriptValues.metRequirements) {
        var selectionArray = new Array();
        for (var e = 0; e < scriptValues.selection.length; e += 1) {
            if (scriptValues.selection[e] instanceof CompItem) {
                selectionArray[selectionArray.length] = scriptValues.selection[e].id;
            }
        }
        if (selectionArray.length == 0) {
            scriptValues.message ="No compositions were found in your selection";
            scriptValues.metRequirements = false;
        }
    }

    // ************************************* Check Destination Folder *************************************
    if (scriptValues.metRequirements) {
        scriptValues.selection = selectionArray;
        if (scriptValues.targetFolder) {
            savingPath = scriptValues.targetFolder.toString();
        } else {
            savingPath = scriptValues.projectPath;
        }
    

        // ************************************* Integrety Check, ID Match & Loop *************************************
        for (var e = 0; e < scriptValues.selection.length; e += 1) {
            for (var d = 1; d <= app.project.numItems; d += 1) {
                if (app.project.item(d).id == scriptValues.selection[e]) {
                    currentComp = app.project.item(d);
                    break;
                }
            }

            // ************************************* Project name as Prefix & Suffix Options************************************* 
            
            if(customSuffix == null) {
                customSuffix = "";
                }
              
            
            if (!addPrefixProjectName){
                var newCompAsProject = new File(savingPath + "/"  + currentComp.name + customSuffix + ".aep");
            } else {
                var newCompAsProject = new File(savingPath + "/" + scriptValues.projectName + "_" + currentComp.name + customSuffix + ".aep");
            }
        
            // ************************************* Don't replace in case it exists ************************************* 
            if (newCompAsProject.exists){
                for (a = 1; a; a++) {
                    var newCompAsProject = new File(savingPath + "/" + scriptValues.projectName + "_" + currentComp.name + customSuffix + "_" + a + ".aep");
                    if (!newCompAsProject.exists) {
                        break;
                    }
                }
            }
        
            // Save current project, reduce, save changes and reopen initial project.
            app.project.save(newCompAsProject);
            app.project.reduceProject(currentComp);
            app.project.close(CloseOptions.SAVE_CHANGES);
            app.open(scriptValues.project);
        }
        scriptValues.message = "Compositions successfully exported as Projects";
    }

    // ************************************* Outputs Final Message ************************************* 
    alert(scriptValues.message, "Success");
}
// Change Destination function changes the destination for saveCompsAsProject
function changeDestination() {
    var newProjectFolder = new File("Select Destination");
    var targetFolder = newProjectFolder.saveDlg();
    if (targetFolder) {
        var result = Folder.decode(targetFolder.path);
        return result;
    } else {
        return null;
        }
}
// Readds items currently listed in the render queue with a different destination and a suffix // Parameters : a string containing the suffix.
function duplicateRenderQueueWithSuffix(suffix, differentLocation) {
    if(differentLocation){
        var newProjectFolder = new File("Select Destination");
        var targetFolder = newProjectFolder.saveDlg();
        if (targetFolder != null) {
            var whileIndex = app.project.renderQueue.numItems;
            var itemIndex = 1;
                    while (whileIndex) {
                        var currentItem = app.project.renderQueue.item(itemIndex)
                        var currentItemdisplayName = currentItem.outputModule(1).file.displayName;
                        var newItem = currentItem.duplicate();
                        var newFilePath = targetFolder.path + "/" + currentItemdisplayName.slice(0,-4) + "_" +suffix + currentItemdisplayName.slice(-4);
                        var newItemFilePath = new File(newFilePath);
                        newItem.outputModule(1).file = newItemFilePath;
                        itemIndex++;
                        whileIndex--;
                    }
            } 
    }
    else {
        var whileIndex = app.project.renderQueue.numItems;
        var itemIndex = 1;
                while (whileIndex) {
                    var currentItem = app.project.renderQueue.item(itemIndex)
                    var currentItemdisplayName = currentItem.outputModule(1).file.displayName;
                    var targetFolder = currentItem.outputModule(1).file.path;
                    var newItem = currentItem.duplicate();
                    var newFilePath = targetFolder + "/" + currentItemdisplayName.slice(0,-4) + "_" +suffix + currentItemdisplayName.slice(-4);
                    var newItemFilePath = new File(newFilePath);
                    newItem.outputModule(1).file = newItemFilePath;
                    itemIndex++;
                    whileIndex--;
                }

        }
}
