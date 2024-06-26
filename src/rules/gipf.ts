import {GameObject, MultistateObject, refObject} from "@tabletop-playground/api";
import {addPageUI} from "../rule_controls";

((obj: GameObject) => {
    addPageUI(obj as MultistateObject, new Map([
        ["Deutsch",    {pages: [1,2,3, 5, 6, 7, 8, 9,10], width: 200}],
        ["English",    {pages: [1,2,3,11,12,13,14,15,16], width: 180}],
        ["Français",   {pages: [1,2,3,17,18,19,20,21,22], width: 200}],
        ["Italiano",   {pages: [1,2,3,23,24,25,26,27,28], width: 180}],
        ["Nederlands", {pages: [1,2,3,29,30,31,32,33,34], width: 260}],
        ["Español",    {pages: [1,2,3,35,36,37,38,39,40], width: 190}],
        ["Polski",     {pages: [1,2,3,41,42,43,44,45,46], width: 150}]
    ]));
})(refObject);