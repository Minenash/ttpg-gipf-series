import {GameObject, MultistateObject, refObject} from "@tabletop-playground/api";
import {addPageUI} from "../rule_controls";

((obj: GameObject) => {
    if (obj instanceof MultistateObject)
        addPageUI(obj as MultistateObject, new Map([
            ["Deutsch",    [1,2,3,5,6,7,8,9,10]],
            ["English",    [1,2,3,11,12,13,14,15,16]],
            ["Français",   [1,2,3,17,18,19,20,21,22]],
            ["Italiano",   [1,2,3,23,24,25,26,27,28]],
            ["Nederlands", [1,2,3,29,30,31,32,33,34]],
            ["Español",    [1,2,3,35,36,37,38,39,40]],
            ["Polski",     [1,2,3,41,42,43,44,45,46]]
        ]));
    else
        console.error("Not a Multistate object: " + obj.getName());

})(refObject);