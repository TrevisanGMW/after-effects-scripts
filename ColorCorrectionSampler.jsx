/*  
 Color Correction Sampler
 
 @December 2017  Guilherme Trevisan  - TrevisanGMW@gmail.com

Creates color pickers to help the process of color correction.

v1.1 -  GUI Added
v1 - Initial release

*/

// *********************** Script Main ***********************
var theComp = app.project.activeItem;
panelStarter();

// *********************** Functions ***********************

function panelStarter() {
var mainPanel = new Window("palette", "Color Correction Sampler", undefined);

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
                var tempFile = new File(theFolder + "/icon.png");
                if (tempFile.exists) {
                    var logo = mainPanel.add("image", undefined, new File(theFolder + "/icon.png"));
                }
            
            
                var checkBox = mainPanel.add("checkbox", undefined, "Use Nulls as Color Pickers?", {
                    name: "NullsOrPoints"
                });
                checkBox.value = true;
                
                var mainFunction = mainPanel.add("panel", undefined, "It's all about colors!!!");
                mainFunction.preferredSize = [100, 10];
                mainFunction.orientation = "column";
                var r1 = mainFunction.add("group", undefined, undefined, {
                    orientation: "row"
                });
            
             mainFunction.buttonHlp = mainFunction.add("button", undefined, "?");
                mainFunction.buttonHlp.alignment = "bottom";
                var theTitle = "What script? What is happening? What is this window? Where am I? HELLPPP!!!!!!!111!!11!";
                var helpStr = "This script creates two color pickers that can be used to help the process of color correction. If it's not working, ask Guilherme for help";
                mainFunction.buttonHlp.onClick = function() {
                    alert(helpStr, theTitle);
                }
            
                mainFunction.buttonOK = mainFunction.add("button", undefined, "Generate");
                mainFunction.buttonOK.alignment = "bottom";
                mainFunction.buttonOK.preferredSize = [100, 50];
                mainFunction.buttonOK.onClick = function() {
                    if (checkBox.value == false) {
                        nullsAsPicker = false;
                    } else {
                        nullsAsPicker = true;
                    }
                    this.parent.parent.close();
                    hasTargetComp();

                }
            
              mainFunction.buttonClose = mainFunction.add("button", undefined, "Cancel");
                mainFunction.buttonClose.alignment = "bottom";
                mainFunction.buttonClose.onClick = function() {
                    this.parent.parent.close();
                };


mainPanel.show();


}

function hasTargetComp(){
    app.beginUndoGroup("Color Correction Sampler"); // Start Undo
    
    if (theComp == null || (theComp instanceof CompItem) == false) 
        {
        alert ("You must select a comp to execute this script");
        } 
        else
        {
            executeScript();
        }
    
        app.endUndoGroup(); // End Undo
}

function executeScript(){


var sampleRadius =  "sampleRadius = [thisComp.layer('Color Sampler - Sample').effect('Sample Area Size')('Slider'),thisComp.layer('Color Sampler - Sample').effect('Sample Area Size')('Slider')];\n";
var sampleRadiusOne =  "sampleRadius = [thisComp.layer('Color Sampler - Sample').effect('Sample Area Size')('Slider'),thisComp.layer('Color Sampler - Sample').effect('Sample Area Size')('Slider')];\n";
var sampleRadiusTwo =  "sampleRadius = [thisComp.layer('Color Sampler - Sample').effect('Sample Area Size')('Slider'),thisComp.layer('Color Sampler - Sample').effect('Sample Area Size')('Slider')];\n";

 // Define Sampler Expressions
var samplerOneExpressionDefault =
"// Color Picker One \n"+
"targetLayer = thisComp.layer('Color Sampler - Sample');\n" +
"samplePoint = targetLayer.effect('Color Picker One')('Point');\n" +
sampleRadius +
"sampledColor_8bpc = 255 * targetLayer.sampleImage(samplePoint, sampleRadius,postEffect = true, t = time);\n" +
"R = Math.round(sampledColor_8bpc[0]);\n" +
"G = Math.round(sampledColor_8bpc[1]);\n" +
"B = Math.round(sampledColor_8bpc[2]);\n" +
"A = Math.round(sampledColor_8bpc[3]);\n" +
"outputString = ' R: ' +R+ ' G: ' +G+ ' B: ' +B+ ' A: ' +A\n";

var samplerTwoExpressionDefault =
"// Color Picker Two \n"+
"targetLayerTwo = thisComp.layer('Color Sampler - Sample');\n" +
"samplePointTwo = targetLayerTwo.effect('Color Picker Two')('Point');\n" +
sampleRadius +
"sampledColorTwo_8bpc = 255 * targetLayerTwo.sampleImage(samplePointTwo, sampleRadius,postEffect = true, t = time);\n" +
"RTwo = Math.round(sampledColorTwo_8bpc[0]);\n" +
"GTwo = Math.round(sampledColorTwo_8bpc[1]);\n" +
"BTwo = Math.round(sampledColorTwo_8bpc[2]);\n" +
"ATwo = Math.round(sampledColorTwo_8bpc[3]);\n" +
"outputStringTwo = ' R: ' +RTwo+ ' G: ' +GTwo+ ' B: ' +BTwo+ ' A: ' +ATwo";

var followColorPickerOne =
"// Follow Color Picker\n" +
"compWidthHalf = thisComp.width/2;\n" + 
"compHeightHalf = thisComp.height/2;\n" + 
"offsetXsubdivision = 5;\n" + 
"offsetYsubdivision = 7;\n\n" + 
"targetLayer = thisComp.layer('Color Sampler - Sample');\n" + 
"samplePoint = targetLayer.effect('Color Picker One')('Point');\n\n" + 
"if (samplePoint[0] > compWidthHalf ) {\n" + 
"var widthOffset = ((compWidthHalf/offsetXsubdivision ) * -1);\n" + 
"}\n" + 
"else\n" + 
"{\n" + 
"var widthOffset = (compWidthHalf/offsetXsubdivision );\n" + 
"}\n\n" +
"if (samplePoint[1] > compHeightHalf) {\n" + 
"var heightOffset = ((compHeightHalf /offsetYsubdivision ) * -1 + (compHeightHalf /17));\n" + 
"}\n" + 
"else\n" + 
"{\n" + 
"var heightOffset = (compHeightHalf /offsetYsubdivision );\n" + 
"}\n" + 
"var xP = thisComp.layer('Color Sampler - Sample').effect('Color Picker One')('Point')[0] + widthOffset;\n" + 
"var yP = thisComp.layer('Color Sampler - Sample').effect('Color Picker One')('Point')[1] + heightOffset;\n" + 
"[xP,yP];"

var followColorPickerTwo =
"// Follow Color Picker\n" +
"compWidthHalf = thisComp.width/2;\n" + 
"compHeightHalf = thisComp.height/2;\n" + 
"offsetXsubdivision = 5;\n" + 
"offsetYsubdivision = 7;\n\n" + 
"targetLayer = thisComp.layer('Color Sampler - Sample');\n" + 
"samplePoint = targetLayer.effect('Color Picker Two')('Point');\n\n" + 
"if (samplePoint[0] > compWidthHalf ) {\n" + 
"var widthOffset = ((compWidthHalf/offsetXsubdivision ) * -1);\n" + 
"}\n" + 
"else\n" + 
"{\n" + 
"var widthOffset = (compWidthHalf/offsetXsubdivision );\n" + 
"}\n\n" +
"if (samplePoint[1] > compHeightHalf) {\n" + 
"var heightOffset = ((compHeightHalf /offsetYsubdivision ) * -1 + (compHeightHalf /17));\n" + 
"}\n" + 
"else\n" + 
"{\n" + 
"var heightOffset = (compHeightHalf /offsetYsubdivision );\n" + 
"}\n" + 
"var xP = thisComp.layer('Color Sampler - Sample').effect('Color Picker Two')('Point')[0] + widthOffset;\n" + 
"var yP = thisComp.layer('Color Sampler - Sample').effect('Color Picker Two')('Point')[1] + heightOffset;\n" + 
"[xP,yP];"

var samplerOneColorInverter =
"// Color Picker One \n"+
"targetLayer = thisComp.layer('Color Sampler - Sample');\n" +
"samplePoint = targetLayer.effect('Color Picker One')('Point');\n" +
sampleRadius +
"sampledColor_8bpc = targetLayer.sampleImage(samplePoint, sampleRadius,postEffect = true, t = time);\n" +
"R = sampledColor_8bpc[0];\n" +
"G = sampledColor_8bpc[1];\n" +
"B = sampledColor_8bpc[2];\n" +
"A = sampledColor_8bpc[3];\n" +
"[R,G,B,A]";

var samplerTwoColorInverter =
"// Color Picker One \n"+
"targetLayer = thisComp.layer('Color Sampler - Sample');\n" +
"samplePoint = targetLayer.effect('Color Picker Two')('Point');\n" +
sampleRadius +
"sampledColor_8bpc = targetLayer.sampleImage(samplePoint, sampleRadius,postEffect = true, t = time);\n" +
"R = sampledColor_8bpc[0];\n" +
"G = sampledColor_8bpc[1];\n" +
"B = sampledColor_8bpc[2];\n" +
"A = sampledColor_8bpc[3];\n" +
"[R,G,B,A]";


var colorPickerFollowsNullOne =
"thisComp.layer('Color Sampler - Picker A').transform.position;";

var colorPickerFollowsNullTwo =
"thisComp.layer('Color Sampler - Picker B').transform.position;";




// Create Sampler
var samplerColorPicker = theComp.layers.addSolid([255,255,255], "Color Sampler - Sample", theComp.width, theComp.height, theComp.pixelAspect, theComp.duration);
       samplerColorPicker.adjustmentLayer  = true; 
       samplerColorPicker.name = "Color Sampler - Sample"
       samplerColorPicker.guideLayer = true;
var colorPickerOne = samplerColorPicker.Effects.addProperty("Point Control");
       colorPickerOne.name = "Color Picker One"
       if (nullsAsPicker == true) 
       {
           colorPickerOne.property("Point").expression = colorPickerFollowsNullOne;
       }
        else
        {
            colorPickerOne.property("Point").setValue([(theComp.width/4),(theComp.height/4)]);
        }
       
var colorPickerTwo = samplerColorPicker.Effects.addProperty("Point Control");
       colorPickerTwo.name = "Color Picker Two"
       // - add option to ignore nulls
        if (nullsAsPicker == true) 
       {
           colorPickerTwo.property("Point").expression = colorPickerFollowsNullTwo;
       }
        else
        {
            colorPickerTwo.property("Point").setValue([(theComp.width/4),(theComp.height/4*3)]); 
        }
       
var sampleAreaSizeSlider = samplerColorPicker.Effects.addProperty("ADBE Slider Control");
       sampleAreaSizeSlider.name = "Sample Area Size"
       sampleAreaSizeSlider.slider.setValue(1);

 //Create Sampler Text Output
    var samplerOutputTwo = theComp.layers.addText("Color Sampler - Output B");
          samplerOutputTwo.text.sourceText.expression = samplerTwoExpressionDefault;
          samplerOutputTwo.transform.position.expression = followColorPickerTwo;
          samplerOutputTwo.guideLayer = true;
   var fillSampledColorTwo = samplerOutputTwo.Effects.addProperty("ADBE Fill");
          fillSampledColorTwo.name = "Fill Sampled Color";
          fillSampledColorTwo.color.expression = samplerTwoColorInverter;
   var colorInverterTwo = samplerOutputTwo.Effects.addProperty("Invert");
          colorInverterTwo.name = "Invert Sampled Color";

   var samplerOutputOne = theComp.layers.addText("Color Sampler - Output A");
          samplerOutputOne.text.sourceText.expression = samplerOneExpressionDefault;
          samplerOutputOne.transform.position.expression = followColorPickerOne;
          samplerOutputOne.guideLayer = true;
   var fillSampledColorOne = samplerOutputOne.Effects.addProperty("ADBE Fill");
          fillSampledColorOne.name = "Fill Sampled Color";
          fillSampledColorOne.color.expression = samplerOneColorInverter;
   var colorInverterOne = samplerOutputOne.Effects.addProperty("Invert");
          colorInverterOne.name = "Invert Sampled Color";

    //Rearrange sampler.
    samplerColorPicker.moveToBeginning();

if (nullsAsPicker == true) 
{
var colorPickerControllerTwo = theComp.layers.addNull();
       colorPickerControllerTwo.property("Anchor Point").setValue([50,50]);  
       colorPickerControllerTwo.transform.position.setValue([(theComp.width/4),(theComp.height/4)*3]);
       colorPickerControllerTwo.source.name = "Color Sampler - Picker B";
       colorPickerControllerTwo.name = "Color Sampler - Picker B";
       colorPickerControllerTwo.guideLayer = true;
       

var colorPickerControllerOne = theComp.layers.addNull();
       colorPickerControllerOne.property("Anchor Point").setValue([50,50]);  
       colorPickerControllerOne.transform.position.setValue([(theComp.width/4),(theComp.height/4)]);
       colorPickerControllerOne.source.name = "Color Sampler - Picker A";
       colorPickerControllerOne.name = "Color Sampler - Picker A";
       colorPickerControllerOne.guideLayer = true;
       //colorPickerTwo.property("Point").setValue([(theComp.width/4),(theComp.height/4*3)]);
}


}
// End of File