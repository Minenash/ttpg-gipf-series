import {
    Border, Button,
    Canvas, Color, Container,
    GameObject, HorizontalAlignment, Label, LayoutBox,
    MultistateObject, Player,
    refObject,
    Rotator, Text, TextJustification,
    UIElement, UIZoomVisibility,
    Vector, VerticalBox, Widget, world
} from "@tabletop-playground/api";
import {BLACK, Board, BUTTON_GREY, Game, Games, getGame, GREEN, Placement, WHITE, DIRECT, Pieces} from "./data";

((obj: GameObject) => {
    
    const size = obj.getSize().clone();
    
    if (obj.getTemplateName() == "Universal Board") {
        addMainUI(obj, size, true);
        return;
    }
    
    
    const SIDE_UI = new UIElement();
    SIDE_UI.anchorX = 0;
    SIDE_UI.anchorY = 1;
    SIDE_UI.scale = 1;
    SIDE_UI.position = new Vector(-Math.max( obj.getSize().x/2, 20.5 ),obj.getSize().y/2,0.2);
    SIDE_UI.rotation = new Rotator(0,0,180);
    const menuButton = new Button().setText("Menu");
    menuButton.onClicked.add((p1: Button,p2: Player) => {
        if (obj.getUIs().length > 1)
            obj.removeUI(1);
        else
            addMainUI(obj, size);
    })
    SIDE_UI.widget = menuButton;
    obj.addUI(SIDE_UI);
    
    
})(refObject);

function addMainUI(obj: GameObject, size: Vector, universal = false) {
    
    let selectedGame = getGame("GIPF");
    let selectedBoard = selectedGame.boards[0];
    let selectedPlacement = selectedGame.placements[0];

    const savedSelectedStr = obj.getSavedData("selected");
    if (savedSelectedStr.length > 0) {
        const savedSelected = JSON.parse(savedSelectedStr) as {game: string, board: number, placement: number};
        selectedGame = getGame(savedSelected.game);
        
        if (savedSelected.board != -1 && savedSelected.board < selectedGame.boards.length)
            selectedBoard = selectedGame.boards[savedSelected.board];
        else
            selectedBoard = selectedGame.boards[0];
        
        if (savedSelected.placement != -1 && savedSelected.placement < selectedGame.placements.length)
            selectedPlacement = selectedGame.placements[savedSelected.placement];
        else
            selectedPlacement = selectedGame.placements[0];
    }
    const scale = 1/8;
    const height = Math.max(size.y * 10 / scale * 0.5, 1500);
    const width = Math.max(size.x * 10 / scale, 410/scale);
    
    const UI = new UIElement();
    UI.scale = scale;
    UI.width = width;
    UI.height = height;
    UI.useWidgetSize = false;
    UI.anchorX = 0.5;
    UI.anchorY = 0;
    UI.position = new Vector(0,size.y/2,0.2);
    UI.rotation = new Rotator(0,0,-90);
    UI.zoomVisibility = UIZoomVisibility.Both;

    const canvas = new Canvas();
    const colA = new VerticalBox();
    const colB = new VerticalBox();
    const colC = new VerticalBox();

    colA.addChild(new Text().setText("Game").setFontSize(80).setBold(true).setJustification(TextJustification.Center))
    colA.addChild(new Text().setText("").setFontSize(60))
    colB.addChild(new Text().setText("Board").setFontSize(80).setBold(true).setJustification(TextJustification.Center))
    colB.addChild(new Text().setText("").setFontSize(60))
    colC.addChild(new Text().setText("Starting Placement").setFontSize(76).setBold(true).setJustification(TextJustification.Center))
    colC.addChild(new Text().setText("").setFontSize(60))

    const colGames = new VerticalBox();
    const colBoards = new VerticalBox();
    const colOptions = new VerticalBox();

    colGames.setChildDistance(20);
    colBoards.setChildDistance(20);
    colOptions.setChildDistance(20);
    const startButton = new Button().setText("[START]").setFontSize(72).setBold(true);
    
    startButton.onClicked.add((p1: Button,p2: Player) => {
        if (selectedBoard.guid.length > 0) {
            const pos = obj.getPosition();
            const rot = obj.getRotation();
            const pieceIDs = obj.getSavedData("remove_pieces");
            if (pieceIDs.length > 1) {
                for (const pieceID of JSON.parse(pieceIDs) as string[]) {
                    let piece = world.getObjectById(pieceID);
                    if (piece != undefined)
                        piece.destroy();
                }
            }
            
            obj.destroy();
            const newBoard = world.createObjectFromTemplate(selectedBoard.guid, pos.add([0,0,0.1]));
            if (newBoard == undefined) return;
            
            newBoard.setRotation(rot);
            newBoard.setScript("board.js", "62667C674A0945E1AF56C079686DC3C6");
            newBoard.setSavedData(JSON.stringify({game: selectedGame.name, board: selectedGame.boards.indexOf(selectedBoard), placement: selectedGame.placements.indexOf(selectedPlacement)}), "selected")
            let newPieceIDs: string[] = [];
            
            const info = selectedBoard.getPlacementInfo(selectedPlacement);
            if (info == undefined) return;
            
            const zMult = info.zMult ?? 1;
            let totalSnapI = 0;
            for (const placement of info.directs ?? []) {
                for (const index of placement.snaps) {
                    totalSnapI++;
                    const snap = newBoard.getSnapPoint(index-1);
                    if (snap == undefined) continue;

                    let pos = snap.getGlobalPosition().add([0,0, newBoard.getSize().z/2 + (placement.count == 1 && !(placement.noDrop ?? false)? 0.5 : 0)]);
                    for (let i = 0; i < (placement.count ?? 1); i++) {
                        setTimeout( () => {
                            const newPiece = world.createObjectFromTemplate(placement.piece, pos);
                            if (newPiece != undefined) {
                                if (placement.snap ?? false)
                                    newPiece.snap();
                                pos = pos.add([0, 0, newPiece.getSize().z * zMult]);
                                newPieceIDs.push(newPiece.getId());
                                newBoard?.setSavedData(JSON.stringify(newPieceIDs), "remove_pieces")
                            }
                        }, (totalSnapI * 15) + (i * 100));
                    }
                }
            }
            if (info.random != undefined) {
                let exclusions: number[] = info.random.exclude ?? [];
                let inclusions: number[] = info.random.include ?? [];
                let min = info.random.min;
                let max = info.random.max;
                let poses: Vector[] = newBoard.getAllSnapPoints()
                    .filter((_, i) => inclusions.includes(i) || (i >= min && i <= max && !exclusions.includes(i)))
                    .map(sn => sn.getGlobalPosition().add([0,0,newBoard.getSize().z]) );
                
               
                let totalI = 0;
                for (const a of info.random.pieces) {
                    for (let i = 0; i < a.count && poses.length > 0; i++) {
                        const index = Math.floor((Math.random() * poses.length));
                        const pos = poses[index];
                        poses = poses.filter( p => p != pos );
                        
                        setTimeout( () => {
                            const newPiece = world.createObjectFromTemplate(a.piece, pos.add([0,0,0.5]));
                            if (newPiece != undefined) {
                                newPieceIDs.push(newPiece.getId());
                                newBoard?.setSavedData(JSON.stringify(newPieceIDs), "remove_pieces");
                            }
                        }, ++totalI * 15);
                    }
                }
                
            }
            
            if (selectedGame.name == "YINSH" && info.holders != undefined) {
                const snapA = newBoard.getSnapPoint(info.holders[1]-1);
                if (snapA != undefined) {
                    const pieceA = world.createObjectFromTemplate(Pieces.YINSH_MARKER_HOLDER, snapA.getGlobalPosition().add([0,0,newBoard.getSize().z/2]));
                    if (pieceA instanceof Container) {
                        pieceA.setName("White Markers");
                        pieceA.setType(1);
                        const marker = world.createObjectFromTemplate(Pieces.YINSH_MARKER, pieceA.getPosition().add([0,0,pieceA.getSize().z]));
                        if (marker != undefined)
                            pieceA.addObjects([marker], 0, true);
                        newPieceIDs.push(pieceA.getId());
                        pieceA.onRemoved.add((container, removedObject) => {
                            newPieceIDs.push(removedObject.getId());
                            newBoard.setSavedData(JSON.stringify(newPieceIDs), "remove_pieces");
                        })
                    }
                }
                const snapB = newBoard.getSnapPoint(info.holders[0]-1);
                if (snapB != undefined) {
                    const pos = snapB.getGlobalPosition().add([0,0,newBoard.getSize().z/2]);
                    let pieceB = world.createObjectFromTemplate(Pieces.YINSH_MARKER_HOLDER, pos);
                    if (pieceB instanceof Container) {
                        const parsed = JSON.parse( pieceB.toJSONString() );
                        parsed.takeRotation = 'Flipped';
                        const json = JSON.stringify(parsed);
                        pieceB.destroy();
                        pieceB = world.createObjectFromJSON(json, pos);
                        if (pieceB instanceof Container) {
                            pieceB.setName("White Markers");
                            pieceB.setType(1);
                            pieceB.setRotation([180,0,0]);
                            const marker = world.createObjectFromTemplate(Pieces.YINSH_MARKER, pieceB.getPosition().add([0,0,pieceB.getSize().z]));
                            if (marker != undefined)
                                pieceB.addObjects([marker], 0, true);
                            newPieceIDs.push(pieceB.getId());
                            pieceB.onRemoved.add((container, removedObject) => {
                                newPieceIDs.push(removedObject.getId());
                                newBoard.setSavedData(JSON.stringify(newPieceIDs), "remove_pieces");
                            })
                        }
                    }
                }
                newBoard.setSavedData(JSON.stringify(newPieceIDs), "remove_pieces");
            }
            
        }

    }  );
    colC.addChild(border(startButton, WHITE));
    colC.addChild(new Text().setText("").setFontSize(40))

    const changeGame = (game: Game) => {
        selectedGame = game;
        let selectedY = 0;
        for (const child of colGames.getAllChildren()) {
            if (child instanceof Button)
                child.setTextColor( child.getText() == game.name ? GREEN : WHITE);
        }

        colBoards.removeAllChildren();
        for (const board of selectedGame.boards ) {
            let button = new Button().setText(board.name).setFontSize(72);
            button.onClicked.add((p1: Button,p2: Player) => { changeBoard(board); });
            colBoards.addChild(button);
        }
        changeBoard(selectedBoard);

        colOptions.removeAllChildren();
        for (const placement of selectedGame.placements ) {
            let button = new Button().setText(placement.display).setFontSize(72);
            button.onClicked.add((p1: Button,p2: Player) => { changePlacement(placement); });
            colOptions.addChild(button);
        }
        changePlacement(selectedPlacement);

    };
    const changeBoard = (board: Board) => {
        if (selectedGame.boards.indexOf(board) == -1)
            selectedBoard = selectedGame.boards[0];
        else
            selectedBoard = board;
        for (const child of colBoards.getAllChildren()) {
            if (child instanceof Button)
                child.setTextColor( child.getText() == selectedBoard.name ? GREEN : WHITE);
        }
    };
    const changePlacement = (placement: Placement) => {
        if (selectedGame.placements.indexOf(placement) == -1)
            selectedPlacement = selectedGame.placements[0];
        else
            selectedPlacement = placement;
        for (const child of colOptions.getAllChildren()) {
            if (child instanceof Button)
                child.setTextColor( child.getText() == selectedPlacement.display ? GREEN : WHITE);
        }
    };

    for (const game of Games ) {
        let button = new Button().setText(game.name).setFontSize(72);
        button.onClicked.add((p1: Button,p2: Player) => { changeGame(game); });
        if (game == selectedGame)
            button.setTextColor(GREEN);
        colGames.addChild(button);
    }

    changeGame(selectedGame);

    colA.addChild(colGames);
    colB.addChild(colBoards);
    colC.addChild(colOptions);

    canvas.addChild(col(colA), 0, 0, width * 0.3, height);
    canvas.addChild(new Border().setColor(BLACK), (width * 0.3)-32,0,64, height);
    canvas.addChild(col(colB), width * 0.3, 0, width * 0.325, height);
    canvas.addChild(new Border().setColor(BLACK), (width * 0.3)+(width * 0.325)-32,0,64, height);
    canvas.addChild(col(colC), (width * 0.3)+(width * 0.325), 0, width * 0.375, height);
    canvas.addChild(new Border().setColor(BLACK), 0,170, width, 32);

    UI.widget = new Border().setChild(new LayoutBox().setChild(canvas).setPadding(32,32,32,32)).setColor(BLACK);
    // UI.widget = canvas;
    
    obj.addUI(UI);
}

function border(widget: Widget, color: Color = BLACK) {
    // return widget;
    return new Border().setColor(color).setChild(new LayoutBox().setChild(widget).setPadding(12, 12, 12, 12))
}

function col(widget: VerticalBox) {
    return new Border().setColor(BUTTON_GREY).setChild(new LayoutBox().setChild(widget).setPadding(64, 64+64, 0, 0));
}