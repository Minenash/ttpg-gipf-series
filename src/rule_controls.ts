import {
    Border,
    Button, Canvas, Color,
    GameObject, HorizontalAlignment,
    HorizontalBox, LayoutBox,
    MultistateObject, Player,
    refObject, Rotator, TextBox,
    UIElement,
    Vector, VerticalBox, Widget
} from "@tabletop-playground/api";

const BLACK = new Color(0,0,0,1);

export function addPageUI (obj: GameObject, pages: Map<string,{pages: number[], width: number}>) {
    if (!(obj instanceof MultistateObject)) {
        console.error("Not a Multistate object: " + obj.getName());
        return;
    }
    
    let curLangName = obj.getSavedData("curLangName").length > 0 ? obj.getSavedData("curLangName") : "English";
    let curLang = obj.getSavedData("curLang").length > 0 ? JSON.parse(obj.getSavedData("curLang")) : pages.get("English");
    const maxState = obj.getNumStates()-1;
    const initState = obj.getState();

    const setPage = (state: number) => {
        state = state > maxState ? maxState : state < 0 ? 0 : state;
        obj.setState(state);
    };
    
    const scale = 1/8;
    const width = obj.getSize().y * 10 / scale;
    const height = obj.getSize().x * 10 / scale * 1.1;
    
    const UI = new UIElement();
    UI.scale = scale;
    UI.width = width;
    UI.height = height;
    UI.useWidgetSize = false;
    UI.anchorX = 0.5;
    UI.anchorY = 0.5;
    UI.position = new Vector(0,0,0.2);
    UI.rotation = new Rotator(0,0,0);
    
    const canvas = new Canvas();
    let prev = new Button().setText("<").setFontSize(96).setEnabled( initState != 0 );
    let next = new Button().setText(">").setFontSize(96).setEnabled( initState != maxState );
    prev.onClicked.add( (p1: Button,p2: Player) => { setPage(obj.getState()-1); } )
    next.onClicked.add( (p1: Button,p2: Player) => { setPage(obj.getState()+1); } )
    canvas.addChild(border(prev), 0, height/2.3, 160, 400);
    canvas.addChild(border(next), width-160, height/2.3, 160, 400);

    const language = new Button().setText(curLangName).setFontSize(64);
    const languageBorder = border(language);
    
    const column = new VerticalBox();
    const languageSelect = border(column);
    languageSelect.setVisible(false);

    const button = (lang: string) => {
        const button = new Button().setText(lang).setFontSize(48);
        button.onClicked.add( (p1: Button,p2: Player) => {
            curLang = pages.get(lang);
            languageSelect.setVisible(false);
            if (curLang != undefined) {
                curLangName = lang;
                language.setText(curLangName);
                canvas.removeChild(languageBorder);
                canvas.addChild(languageBorder, 0, height-160, curLang.width*2, 160);
                obj.setState(curLang.pages[1]-1);
                obj.setSavedData(JSON.stringify(curLang), "curLang");
                obj.setSavedData(curLangName, "curLangName");
            }
        });
        return new LayoutBox().setPadding(0,0,12,8).setChild(button);
    }

    column.addChild( button("English") );
    column.addChild( button("Deutsch") );
    column.addChild( button("Français") );
    column.addChild( button("Italiano") );
    column.addChild( button("Nederlands") );
    column.addChild( button("Español") );
    column.addChild( button("Polski") );
    
    canvas.addChild(languageSelect, 0, height-(160*6.4)+27, 480, 160*5.4-27);
    
    language.onClicked.add( (p1: Button,p2: Player) => {
        languageSelect.setVisible(!languageSelect.isVisible());
    });
    canvas.addChild(languageBorder, 0, height-160, 360, 160);

    const updateUIAndVerifyPage = (p1: MultistateObject,newState: number,oldState: number) => {
        let page = newState +1;
        
        if (curLang != undefined && curLang.pages.indexOf(page) == -1) {
            if (newState > oldState) {
                for (let i = 0; i < curLang.pages.length; i++) {
                    if (curLang.pages[i] >= page) {
                        obj.setState(curLang.pages[i]-1);
                        return;
                    }
                }
            }
            else {
                for (let i = 0; i < curLang.pages.length; i++) {
                    if (curLang.pages[i] <= page) {
                        obj.setState(curLang.pages[i]-1);
                        return;
                    }
                }
            }
            
            // if (newState < oldState && oldState+1 == curLang.pages[1])
            //     obj.setState(0);
            // else
            //     obj.setState( curLang.pages[1]-1 );
            return;
        }
        prev.setEnabled( page != 1 );
        if (curLang != undefined)
            next.setEnabled( page != curLang.pages[curLang.pages.length-1] );
        else
            next.setEnabled( page-1 <= maxState );
    }
    
    updateUIAndVerifyPage(obj, initState, initState);
    obj.onStateChanged.add( updateUIAndVerifyPage );
    
    // UI.widget = new Border().setChild(canvas).setColor(new Color(1,0,0,1));
    UI.widget = canvas;
    
    obj.addUI(UI);
    
}

function border(widget: Widget) {
    return new Border().setColor(BLACK).setChild(new LayoutBox().setPadding(8,8,8,8).setChild(widget));
}