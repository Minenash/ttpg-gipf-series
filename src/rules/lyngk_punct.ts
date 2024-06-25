import {GameObject, MultistateObject, refObject} from "@tabletop-playground/api";
import {addPageUI} from "../rule_controls";

((obj: GameObject) => {
    if (obj instanceof MultistateObject)
        addPageUI(obj as MultistateObject, new Map([
            ["Deutsch",    [1,3,4,5,6,7,8]],
            ["English",    [1,9,10,11,12,13,14]],
            ["Français",   [1,15,16,17,18,19,20]],
            ["Italiano",   [1,21,22,23,24,25,26]],
            ["Nederlands", [1,27,28,29,30,31,32]],
            ["Español",    [1,33,34,35,36,37,38]],
            ["Polski",     [1,39,40,41,42,43,44]]
        ]));
    else
        console.error("Not a Multistate object: " + obj.getName());

})(refObject);