app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES);
app.newProject();

var compW = 1920;
var compH = 1080;
var compD = 15;
var compA = 1;
var compFPS = 25;

var rStr = prompt("Input radius of hexagon from 100-200", "100");
var R = parseInt(rStr, 10);
if (isNaN(R)) R = 100;
if (R < 100) R = 100;
if (R > 200) R = 200;

var hexComp = app.project.items.addComp("hexagons", compW, compH, compA, compD, compFPS);

var W = R * 0.2;
var G = W;

var hexWidth = Math.sqrt(3) * R;
var hexHeight = 2 * R;

var horizontalSpacing = hexWidth + G;
var verticalSpacing = hexHeight * 0.75 + G;

var cols = Math.floor(compW / horizontalSpacing) + 2;
var rows = Math.floor(compH / verticalSpacing) + 2;

var totalGridWidth = (cols - 1) * horizontalSpacing;
var totalGridHeight = (rows - 1) * verticalSpacing;
var startX = (compW - totalGridWidth) / 2;
var startY = (compH - totalGridHeight) / 2;

var hexCount = 0;

for (var row = 0; row < rows; row++) {
    for (var col = 0; col < cols; col++) {
        hexCount++;

        var xPos = startX + col * horizontalSpacing;
        var yPos = startY + row * verticalSpacing;

        if (row % 2 == 1) {
            xPos += horizontalSpacing / 2;
        }

        if (xPos + R < -horizontalSpacing || xPos - R > compW + horizontalSpacing ||
            yPos + R < -verticalSpacing || yPos - R > compH + verticalSpacing) {
            hexCount--;
            continue;
        }

        var hexLayer = hexComp.layers.addShape();
        hexLayer.name = "hex 1-" + hexCount;
        hexLayer.property("ADBE Transform Group").property("ADBE Position").setValue([xPos, yPos]);

        var shapeGroup = hexLayer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");

        var polystar = shapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Star");
        polystar.property("ADBE Vector Star Type").setValue(2);
        polystar.property("ADBE Vector Star Points").setValue(6);
        polystar.property("ADBE Vector Star Position").setValue([0, 0]);
        polystar.property("ADBE Vector Star Outer Radius").setValue(R - W / 2);
        polystar.property("ADBE Vector Star Outer Roundess").setValue(0);
        polystar.property("ADBE Vector Star Rotation").setValue(30 + (hexCount * 60));

        var stroke = shapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Stroke");

        var range = 50 / 255;
        var baseR = 100 / 255;
        var baseG = 0;
        var baseB = 200 / 255;

        var randR = Math.max(0, Math.min(1, baseR + (Math.random() * 2 - 1) * range));
        var randB = Math.max(0, Math.min(1, baseB + (Math.random() * 2 - 1) * range));

        stroke.property("ADBE Vector Stroke Color").setValue([randR, baseG, randB]);
        stroke.property("ADBE Vector Stroke Width").setValue(W);

        var scale = hexLayer.property("ADBE Transform Group").property("ADBE Scale");
        scale.expression = "var s = 90+20*Math.sin(time*0.5);\n[s, s];";
    }
}

var finalComp = app.project.items.addComp("Final Composition", compW, compH, compA, compD, compFPS);
var precompLayer = finalComp.layers.add(hexComp);

var ballAction = precompLayer.property("ADBE Effect Parade").addProperty("CC Ball Action");
ballAction.property("Scatter").setValue(5);
ballAction.property("Twist Angle").setValue(360);
ballAction.property("Rotation").expression = "time * 100;";

finalComp.openInViewer();