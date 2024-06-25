import {
    Border,
    Button, Color,
    GameObject, HorizontalAlignment,
    HorizontalBox,
    MultistateObject, Player,
    refObject, TextBox,
    UIElement,
    Vector, VerticalBox
} from "@tabletop-playground/api";

const BLACK = new Color(0,0,0,1);

export function addPageUI (obj: MultistateObject, pages: Map<string,number[]>) {
    let curLang = pages.get("English");
    const maxState = obj.getNumStates()-1;
    const initPage = obj.getState() + 1;

    const setPage = (state: number) => {
        state = state > maxState ? maxState : state < 0 ? 0 : state;
        obj.setState(state);
    };

    const barUI = new UIElement();
    barUI.scale = 1/4;
    barUI.anchorX = 0.5;
    barUI.anchorY = 1;
    barUI.position = new Vector(obj.getSize().y * -0.805, 0, 0.15 );

    let pageTextBox = new TextBox().setText(initPage.toString()).setFontSize(24).setMaxLength(3);
    let prev = new Button().setText("<").setFontSize(24).setEnabled( initPage != 1 );
    let next = new Button().setText(">").setFontSize(24).setEnabled( initPage != (maxState+1) );
    prev.onClicked.add( (p1: Button,p2: Player) => { setPage(obj.getState()-1); } )
    next.onClicked.add( (p1: Button,p2: Player) => { setPage(obj.getState()+1); } )
    pageTextBox.setInputType(4);//Whole positive numbers
    pageTextBox.onTextCommitted.add( (p1: TextBox,p2: Player,p3: string,p4: boolean) => {
        if (p2 != undefined)
            setPage(Number.parseInt(p3)-1);
    })


    const row = new HorizontalBox();
    row.setHorizontalAlignment(HorizontalAlignment.Center);
    row.addChild(prev);
    row.addChild(pageTextBox);
    row.addChild(next);
    barUI.widget = new Border().setChild(row).setColor(BLACK);
    obj.addUI(barUI);


    const language = new Button().setText("English").setFontSize(24);

    const languages = new UIElement();
    languages.scale = 1/4;
    languages.anchorX = 0;
    languages.anchorY = 1;
    languages.position = new Vector(obj.getSize().y * -0.71, obj.getSize().x * -0.33, 0.2 );
    const column = new VerticalBox();
    column.setVisible(false);

    const button = (lang: string) => {
        const button = new Button().setText(lang).setFontSize(24);
        button.onClicked.add( (p1: Button,p2: Player) => {
            language.setText(lang);
            curLang = pages.get(lang);
            column.setVisible(false);
        });
        return new Border().setColor(BLACK).setChild(button);
    }

    column.addChild( button("English") );
    column.addChild( button("Deutsch") );
    column.addChild( button("Français") );
    column.addChild( button("Italiano") );
    column.addChild( button("Nederlands") );
    column.addChild( button("Español") );
    column.addChild( button("Polski") );
    languages.widget = new Border().setColor(BLACK).setChild(column);
    obj.addUI(languages);

    const barUI2 = new UIElement();
    barUI2.scale = 1/4;
    barUI2.anchorX = 0;
    barUI2.anchorY = 1;
    barUI2.position = new Vector(obj.getSize().y * -0.805, obj.getSize().x * -0.33, 0.2 );

    language.onClicked.add( (p1: Button,p2: Player) => {
        column.setVisible(!column.isVisible());
        obj.updateUI(languages);
    });
    barUI2.widget = new Border().setColor(BLACK).setChild(language);
    obj.addUI(barUI2);

    obj.onStateChanged.add( (p1: MultistateObject,newState: number,oldState: number) => {
        let page = newState +1;
        if (curLang != undefined && curLang.indexOf(page) == -1) {
            if (newState > oldState)
                obj.setState( (curLang.find( (v) => v >= page) ?? curLang[curLang.length-1]) - 1 );
            else
                obj.setState( (curLang.findLast( (v) => v <= page) ?? 1) - 1);
            return;
        }
        pageTextBox.setText( page.toString() );
        prev.setEnabled( page != 1 );
        if (curLang != undefined)
            next.setEnabled( page != curLang[curLang.length-1] );
    } );
}