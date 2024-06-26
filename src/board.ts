import {
    Border, Button,
    Canvas, Color,
    GameObject, HorizontalAlignment, Label, LayoutBox,
    MultistateObject,
    refObject,
    Rotator, Text, TextJustification,
    UIElement,
    Vector, VerticalBox, Widget
} from "@tabletop-playground/api";

const BLACK = new Color(0,0,0,1);

// enum GIPF_MAPS {
//     "GIPF" = {},
//     "TZAAR" = {},
//     "ZERTZ" = {},
//     "DVONN" = {},
//     "PUNCT" = {},
//     "YINSH" = {},
//     "LYNGK" = {},
//     "Hybrid_Trystonian" = {},
// }
//
// enum GIPF_GAMES {
//     "GIPF" = { maps: [GIPF_MAPS.GIPF, GIPF_MAPS.Hybrid_Trystonian], options: []},
//     "TZAAR" = { maps: [GIPF_MAPS.TZAAR, GIPF_MAPS.Hybrid_Trystonian], options: ["None", "Randomized", "Symmetric"]},
//     "ZERTZ" = { maps: [GIPF_MAPS.ZERTZ], options: ["None"]},
//     "DVONN" = { maps: [GIPF_MAPS.DVONN], options: ["None", "Randomize Reds", "Randomize All"]},
//     "PUNCT" = { maps: [GIPF_MAPS.PUNCT], options: ["None"]},
//     "YINSH" = { maps: [GIPF_MAPS.YINSH, GIPF_MAPS.Hybrid_Trystonian], options: ["None", "Randomize Rings"]},
//     "LYNGK" = { maps: [GIPF_MAPS.LYNGK, GIPF_MAPS.Hybrid_Trystonian], options: ["None", "Randomized"]},
// }

((obj: GameObject) => {
    const universal = obj.getTemplateName() == "Universal Board";
    const scale = 1/8;
    const width = obj.getSize().y * 10 / scale;
    const height = obj.getSize().x * 10 / scale * (universal ? 1 : 0.42);

    const UI = new UIElement();
    UI.scale = scale;
    UI.width = width;
    UI.height = height;
    UI.useWidgetSize = false;
    UI.anchorX = 0.5;
    UI.anchorY = 0.5;
    UI.position = new Vector(universal ? 0 : 11.9,0,0.2);
    UI.rotation = new Rotator(0,0,0);

    const canvas = new Canvas();
    const colA = new VerticalBox();
    const colB = new VerticalBox();
    const colC = new VerticalBox();
    
    colA.addChild(new Text().setText("Game").setFontSize(80).setBold(true).setJustification(TextJustification.Center))
    colA.addChild(new Text().setText("").setFontSize(60))
    colB.addChild(new Text().setText("Board").setFontSize(80).setBold(true).setJustification(TextJustification.Center))
    colB.addChild(new Text().setText("").setFontSize(60))
    colC.addChild(new Text().setText("Starting Position").setFontSize(80).setBold(true).setJustification(TextJustification.Center))
    colC.addChild(new Text().setText("").setFontSize(60))
    
    colA.setChildDistance(2);
    colA.addChild(new Button().setText("GIPF").setFontSize(72))
    colA.addChild(new Button().setText("> TZAAR <").setFontSize(72).setItalic(true))
    colA.addChild(new Button().setText("ZERTZ").setFontSize(72))
    colA.addChild(new Button().setText("DVONN").setFontSize(72))
    colA.addChild(new Button().setText("PUNCT").setFontSize(72))
    colA.addChild(new Button().setText("YINSH").setFontSize(72))
    colA.addChild(new Button().setText("LYNGK").setFontSize(72))

    colB.setChildDistance(2);
    colB.addChild(new Button().setText("TZAAR").setFontSize(72))
    colB.addChild(new Button().setText("> Hybrid: Trystonian <").setFontSize(72).setItalic(true));

    colC.setChildDistance(2);
    colC.addChild(border(new Button().setText("[START]").setFontSize(72).setBold(true), new Color(1,1,1,1)));
    colC.addChild(new Text().setText("").setFontSize(40))
    
    colC.addChild(new Button().setText("Randomized").setFontSize(72));
    colC.addChild(new Button().setText("> Symmetric <").setFontSize(72).setItalic(true));
    

    canvas.addChild(col(colA), 0, 0, width/3, height);
    canvas.addChild(new Border().setColor(BLACK), width/3-32,0,64, height);
    canvas.addChild(col(colB), width/3, 0, width/3, height);
    canvas.addChild(new Border().setColor(BLACK), width/3*2-32,0,64, height);
    canvas.addChild(col(colC), width/3*2, 0, width/3, height);
    canvas.addChild(new Border().setColor(BLACK), 0,170, width, 32);
    
    UI.widget = new Border().setChild(new LayoutBox().setChild(canvas).setPadding(32,32,32,32)).setColor(BLACK);
    // UI.widget = canvas;

    obj.addUI(UI);
})(refObject);

function border(widget: Widget, color: Color = BLACK) {
    // return widget;
    return new Border().setColor(color).setChild(new LayoutBox().setChild(widget).setPadding(12, 12, 12, 12))
}

const BUTTON_GREY = new Color(0.03,0.03,0.03,1);
function col(widget: VerticalBox) {
    return new Border().setColor(new Color(0.03,0.03,0.03,1)).setChild(new LayoutBox().setChild(widget).setPadding(64, 64+64, 0, 0));
}