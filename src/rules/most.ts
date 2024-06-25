import {GameObject, MultistateObject, refObject} from "@tabletop-playground/api";
import {addPageUI} from "../rule_controls";

((obj: GameObject) => {
    if (obj instanceof MultistateObject)
        addPageUI(obj as MultistateObject, new Map([
            ["Deutsch",    [1,3,4,5,6]],
            ["English",    [1,7,8,9,10]],
            ["Français",   [1,11,12,13,14]],
            ["Italiano",   [1,15,16,17,18]],
            ["Nederlands", [1,19,20,21,22]],
            ["Español",    [1,23,24,25,26]],
            ["Polski",     [1,27,28,29,30]]
        ]));
    else
        console.error("Not a Multistate object: " + obj.getName());

})(refObject);