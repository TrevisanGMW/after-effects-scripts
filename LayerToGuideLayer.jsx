/*
*    LayerToGuideLayer
*
*       Allows user to input a layer name, then makes layers with that name into guide layers or from guide layer to normal layers.
*       
*        Features:
*               -dialogue for user to input layer name
*               -option to add more names (like a + button)
*               -checkboxes for 'make guide layers only' and 'make regular layers only'.  
*               When the checkboxes are off, the script will look at the current status of the layer and make it the opposite.  
*               If a layer is already a guide layer and the 'make guide layers only' checkbox is on, then that layer will be ignored. 
*
*        Changes: 
*        V 2.1
*           - Text and Help Text changed
*        V 2.0
*           -
*        V 1.0
*/

/*------------------------------------------------ SCRIPT -------------------------------------------------*/
//Version
var version = 2.1;

//Script Name
var scriptName = "LayerToGuideLayer";

/*------------------------------------------------ GLOBALS -------------------------------------------------*/
// Project
var project = app.project;

// Composition List
var compositions = [];

//Name Input Array
var nameInputs = [];

//Window
var gui = null;
var guiWidth = 200;

var helpW = null;

//Help Text 
var helpTextText = "Allows user to input a layer name, then makes layers with that name into guide layers or (from guide layer) to normal layers and/or changes the visibility status.\nTo add more names click on +. Empty names won't be considered.\nTo delete all (except 1) name input click Clear.\nTo update composition selection click Refresh.\nYou can select more than one composition in the project viewer which shall be affected.\n(Don't forget to refresh after new Selection)";
helpTextText += "\n\nVersion: "+ String(version);

/*---------------------------------------- Graphics ----------------------------------------*/
var helpIcon = ["\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x0F\x00\x00\x00\x0F\b\x06\x00\x00\x00;\u00D6\u0095J\x00\x00\x00\tpHYs\x00\x00.#\x00\x00.#\x01x\u00A5?v\x00\x00\x0B\x1FiTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.6-c142 79.160924, 2017/07/13-01:06:39        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stEvt=\"http://ns.adobe.com/xap/1.0/sType/ResourceEvent#\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmlns:photoshop=\"http://ns.adobe.com/photoshop/1.0/\" xmlns:tiff=\"http://ns.adobe.com/tiff/1.0/\" xmlns:exif=\"http://ns.adobe.com/exif/1.0/\" xmp:CreatorTool=\"Adobe Photoshop CC 2018 (Windows)\" xmp:CreateDate=\"2018-07-24T11:35-07:00\" xmp:MetadataDate=\"2018-07-24T12:01:37-07:00\" xmp:ModifyDate=\"2018-07-24T12:01:37-07:00\" dc:format=\"image/png\" xmpMM:InstanceID=\"xmp.iid:c5fe913f-118f-654f-8437-15532f531e52\" xmpMM:DocumentID=\"adobe:docid:photoshop:7b092281-3d00-3945-9923-8b20003d6d3d\" xmpMM:OriginalDocumentID=\"xmp.did:15e6b366-39d2-9546-b921-ec871f19a3b9\" photoshop:ColorMode=\"3\" photoshop:ICCProfile=\"sRGB IEC61966-2.1\" tiff:Orientation=\"1\" tiff:XResolution=\"3000000/10000\" tiff:YResolution=\"3000000/10000\" tiff:ResolutionUnit=\"2\" exif:ColorSpace=\"1\" exif:PixelXDimension=\"50\" exif:PixelYDimension=\"50\"> <xmpMM:History> <rdf:Seq> <rdf:li stEvt:action=\"created\" stEvt:instanceID=\"xmp.iid:15e6b366-39d2-9546-b921-ec871f19a3b9\" stEvt:when=\"2018-07-24T11:35-07:00\" stEvt:softwareAgent=\"Adobe Photoshop CC 2018 (Windows)\"/> <rdf:li stEvt:action=\"saved\" stEvt:instanceID=\"xmp.iid:9385cfcc-ab86-904c-a9c3-ab6e19000edc\" stEvt:when=\"2018-07-24T11:35:19-07:00\" stEvt:softwareAgent=\"Adobe Photoshop CC 2018 (Windows)\" stEvt:changed=\"/\"/> <rdf:li stEvt:action=\"saved\" stEvt:instanceID=\"xmp.iid:b164f1e3-d12f-5e4e-a8ee-2a78ca26bc8c\" stEvt:when=\"2018-07-24T12:01:37-07:00\" stEvt:softwareAgent=\"Adobe Photoshop CC 2018 (Windows)\" stEvt:changed=\"/\"/> <rdf:li stEvt:action=\"converted\" stEvt:parameters=\"from application/vnd.adobe.photoshop to image/png\"/> <rdf:li stEvt:action=\"derived\" stEvt:parameters=\"converted from application/vnd.adobe.photoshop to image/png\"/> <rdf:li stEvt:action=\"saved\" stEvt:instanceID=\"xmp.iid:c5fe913f-118f-654f-8437-15532f531e52\" stEvt:when=\"2018-07-24T12:01:37-07:00\" stEvt:softwareAgent=\"Adobe Photoshop CC 2018 (Windows)\" stEvt:changed=\"/\"/> </rdf:Seq> </xmpMM:History> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:b164f1e3-d12f-5e4e-a8ee-2a78ca26bc8c\" stRef:documentID=\"adobe:docid:photoshop:e86ecced-d16b-ac4b-841e-490c0b6380c8\" stRef:originalDocumentID=\"xmp.did:15e6b366-39d2-9546-b921-ec871f19a3b9\"/> <photoshop:TextLayers> <rdf:Bag> <rdf:li photoshop:LayerName=\"?\" photoshop:LayerText=\"?\"/> </rdf:Bag> </photoshop:TextLayers> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\u008A\u00F58M\x00\x00\x01iIDAT(\u0091\u0095\u00D3=kTA\x18\x05\u00E0'\u00B3\x1B\u00F0\u008B\x181\u00BB\x04\u00ACL!\u0088\u00A0\u0082Q\u0089]\x1A!\x10\u00B0\u00D2\u00D5-\u00FC\x01\u0082\u00B5\u00DA\x07\u00C4\u009F X)Jb\u0091F\u00B0\bZ\u00A70\x1B\u00AB\u00C4*\u0091\x15\x02\u00BA\u008B\u009A\x10CX\u0092,\x16w\u00AE\\\u00AE\u00F7\n\u009Ejf\u00CE\u009Cw\u00CE;sf`\u00E3\u00FCC\x19\x04\u00DC\u00C4\x1DL\u00A0\u008E\x0E\x161\u008B\u00D7\u00E8\u00A7\u009B\x072\u00E2\u00D3\u0091\x1CW\u008E%4\u00B0\x0E\u00D5\u00B88\x16\u00AB\u00D7ah\u00E6\u0086\u00C3\x13gUF\u008E\u00DBk\x7F\u00F3\u00F3\u00D1+\u00FB+\x1D\u00B1\u00F0\"\u00AEa-D\u00ABs\u00A9\x10\u00FA\u00DB\u00BBv\x16\u0096m=}\u00ABR\x1Bv\u00E2q3{z=\u00B6\x10\u00AA\u00B8\u0095\u00B7\u00FA\u00EB\u00C9\u00C2\u009F\u00F1\u00E0\u0099S\u008EL^\u00C8\u00DB\x1FG#\u00E0\u00EE?z486\u00AA\u00B7\u00DA.\u00A2n\x07\\*\x13\x1E{p]\u00A56lkf\u00BE\u0088\u00BE\x1Cdz\u00CD\u00A2z\u00AEn\u00A89i\u00FB\u00C5\u00FB\u00F4\u00B2\u00F28\x19$\u00EF\u00F8\x17\x0EM_\x04\u00BB\u00F3\u00CBe\u00C6\u00BE\x07\u00B4\u008A\u0098\u0083\u008D\x1Fz\u00ABm\u00FD\u00AF;e\u00E2\x0FU<\u00C7T\u009E\u00E9\u00BD\u00FBd\u00EF\u00E3\u00972!\u00CC\x06I\u00AA\u0096\u00F2L\u00ED\u00E5}#\u00CF\u00EE\t\u00A3G\u008B\u0084-\u00CC\x05IV\x1Br\u00BD\u00EFw6\x1Dt7\u008Blw\u00E2\u00FE\u00FE\u00FFf\u00BB%\t\u00D5:I4S|\u00C6U\u00C9\u008Fz\u0083n\\\u00EF\u00C6y\x13WR!\u00FC\x06\u00F6Ved\u0089\u00FD\u00CC>\x00\x00\x00\x00IEND\u00AEB`\u0082"];

/*---------------------------------------- Helper Functions ----------------------------------------*/
function canWriteFiles() {  
    if (isSecurityPrefSet()) return true;  

    alert(scriptName+" requires access to write files.\n" +  
        "Go to the \"General\" panel of the application preferences and make sure " +  
        "\"Allow Scripts to Write Files and Access Network\" is checked.");  
    app.executeCommand(2359);  
    
    return isSecurityPrefSet();  
  
  
    function isSecurityPrefSet() {  
        return app.preferences.getPrefAsLong(  
            "Main Pref Section",  
            "Pref_SCRIPTING_FILE_NETWORK_SECURITY"  
        ) === 1;  
    }  
}  

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] == obj) {
            return true;
        }
    }
    return false;
}

function getActiveComposition() {
        var tCurrentComposition = [];
        if(project.activeItem instanceof CompItem) {
            tCurrentComposition.push(app.project.activeItem);
        }
        if(project.activeItem == null)
            for(var i = 0; i < project.selection.length; i++){
                if(project.selection[i] instanceof CompItem) {tCurrentComposition.push(project.selection[i]);}
            }
        return tCurrentComposition;
}

function addNameInput(group) {
    var newNameG = group.add("group");
    newNameG.size = [guiWidth, 100];
    newNameG.Text = newNameG.add("staticText",[0,0,40,30],"Name:");
    newNameG.Input = newNameG.add("editText",[0,0,guiWidth-40,30],""); 
    if(nameInputs.length > 0) 
        gui.layout.layout(true);
    // add to nameInputs  
    nameInputs.push(newNameG.Input);
}

function applyToLayers(comps, guide,visibility, names) {
    var stringArray = [];
    for(var i = 0; i < names.length; i++){
        if(names[i].text != "")
            if(!stringArray.contains(names[i].text))
                stringArray.push(names[i].text);
    }
    
    for(var c = 0; c < comps.length; c++){
        for(var l = 1; l <= comps[c].numLayers;l++){
            if(stringArray.contains(comps[c].layer(l).name)){
                    if(guide != null) {
                        comps[c].layer(l).guideLayer = guide;
                    }
                     if(visibility != null) {
                        comps[c].layer(l).enabled = visibility;
                    }
            }
        }
    }
}
/*------------------------------------------------------ MAIN ----------------------------------------------------*/
if(canWriteFiles()) {
    currentComposition = getActiveComposition();
    mainGui();
}

/*------------------------------------------------------ GUI ----------------------------------------------------*/
function mainGui(){
    //Help Window
    gui = new Window("palette",scriptName,undefined,{resizeable:false,});
    gui.orientation = "column";
    gui.alignChildren = ["fill", "fill"];
    gui.preferedSize = [ guiWidth, undefined];
  
    /* HEAD */
    gui.head = gui.add("group");
    gui.head.alignment = ['right','top'];
      
    //Help BTN
    myFile = new File("~/Desktop/xxxmyFilexxx.png");
    myFile.encoding = "BINARY";
    myFile.open( "w" );
    myFile.write( helpIcon );
    myFile.close();
    
    gui.head.helpBtn = gui.head.add("iconbutton", undefined, myFile, {style:"toolbutton", toggle:true});
    gui.head.helpBtn.maximumSize = [17,17];
    gui.head.helpBtn.onClick = function() {
        helpWindow();
    };
    
    //no longer need the file, remove it.
    myFile.remove();
  
    /* Body */
    gui.body = gui.add("group");
    gui.body.orientation = "column";
    
   if(currentComposition.length == 1) {
        compNameText = gui.body.add("staticText",[0,0,guiWidth,12], currentComposition[0].name);
    } else if(currentComposition.length > 1){
        compNameText = gui.body.add("staticText",[0,0,guiWidth,12], "Compositions: " + currentComposition.length);
    } else {
        compNameText = gui.body.add("staticText",[0,0,guiWidth,12], "");
    }
    
    gui.body.top = gui.body.add("group");
    gui.body.top.alignment = ['right','top'];
    
    /* Clear Button */
    gui.body.top.clearButton = gui.body.top.add("button", undefined, "Clear");
    gui.body.top.clearButton.onClick = function () {
        for(var i = gui.body.input.children.length-1; i > 0 ; i--)
            gui.body.input.remove(gui.body.input.children[i]);
        nameInputs = [];
        nameInputs.push(gui.body.input.children[0].Input);
        gui.layout.layout(true);
    }
    
    /* RefreshBTN*/
    gui.body.top.refreshBtn = gui.body.top.add("button", undefined, "Refresh");
    gui.body.top.refreshBtn.onClick = function() {
        currentComposition = getActiveComposition();
            if(currentComposition.length == 1) {
                compNameText.text = currentComposition[0].name;
            } else if(currentComposition.length > 1){
                compNameText.text = "Compositions: " + currentComposition.length;
            } else {
                compNameText.text = "";
            }
    };

    gui.body.top.addButton = gui.body.top.add("button",[0,0,28,28],"+");
    gui.body.top.addButton.onClick = function() { addNameInput(gui.body.input)};
    
    
    gui.body.input = gui.body.add("group");
    gui.body.input.orientation = "column";
    
    addNameInput(gui.body.input);
    
    gui.body.options = gui.body.add("group");
    gui.body.options.guideGroup = gui.body.options.add("group");
    gui.body.options.guideGroup.orientation = "column";
    gui.body.options.guideGroup.guideCheck = gui.body.options.guideGroup.add("checkbox",undefined, "Guide Layer");
   
    gui.body.options.guideGroup.radios = gui.body.options.guideGroup.add("panel");
    gui.body.options.guideGroup.radios.enabled = false;
    gui.body.options.guideGroup.radios.add("radiobutton",undefined,"Make guide Layer");
    gui.body.options.guideGroup.radios.add("radiobutton",undefined,"Make normal Layer");
    gui.body.options.guideGroup.radios.children[0].value = true;
    
     gui.body.options.guideGroup.guideCheck.onClick = function () {
         gui.body.options.guideGroup.radios.enabled = gui.body.options.guideGroup.guideCheck.value;         
         gui.layout.layout(true);
     };

    gui.body.options.visibilityGroup = gui.body.options.add("group");
    gui.body.options.visibilityGroup.orientation = "column";
    gui.body.options.visibilityGroup.visibilityCheck = gui.body.options.visibilityGroup.add("checkbox",undefined, "Visibility");
    gui.body.options.visibilityGroup.radios = gui.body.options.visibilityGroup.add("panel");
    gui.body.options.visibilityGroup.radios.enabled = false;
    gui.body.options.visibilityGroup.radios.add("radiobutton",undefined,"On");
    gui.body.options.visibilityGroup.radios.add("radiobutton",undefined,"Off");
    gui.body.options.visibilityGroup.radios.children[0].value = true;
    
     gui.body.options.visibilityGroup.visibilityCheck.onClick = function () {
         gui.body.options.visibilityGroup.radios.enabled = gui.body.options.visibilityGroup.visibilityCheck.value;         
         gui.layout.layout(true);
    };
    
    gui.applyBtn = gui.add("button",undefined,"Apply");

    gui.applyBtn.onClick = function() {
        app.beginUndoGroup(scriptName);
            var guide = (gui.body.options.guideGroup.guideCheck.value) ? gui.body.options.guideGroup.radios.children[0].value : null;
            var visibility =(gui.body.options.visibilityGroup.visibilityCheck.value)? gui.body.options.visibilityGroup.radios.children[0].value: null;
            applyToLayers(currentComposition, guide, visibility,nameInputs);
        app.endUndoGroup();
    }
    
    //On Close Clean Up
    gui.onClose = function () {  
        if(helpW != null)
        {
               helpW.close();
        }
    }

    // Quit BTN   
    gui.quitBtn = gui.add("button", undefined, "Close");   
    gui.quitBtn.onClick = function() {     
        gui.close();     
    } 

    // Window Settings   
    gui.onResizing = function () { this.layout.resize(); };   
    gui.onShow = function () { gui.layout.resize(); };   
    gui.layout.layout(true);
    gui.center();       
    gui.show();
}

function helpWindow(){
  //Help Window
  helpW = new Window("dialog",scriptName+" Help",undefined,{resizeable:true,});
  helpW.orientation = "column";
  helpW.alignChildren = ["fill", "fill"];
  helpW.active = true;

  //Help Text
  helpW.help = helpW.add('panel{text:"Help"}');
  var helpText = helpW.help.add('statictext', undefined, undefined, {multiline: true});
  helpText.text = helpTextText;
  

  // Quit BTN   
  helpW.quitBtn = helpW.add("button", undefined, "Close");   
  helpW.quitBtn.onClick = function() {     
      helpW.close();     
  } 
 
   // Window Settings   
  helpW.onResizing = function () { this.layout.resize(); };   
  helpW.onShow = function () { helpW.layout.resize(); };   
  helpW.center();       
  helpW.show();
 }
