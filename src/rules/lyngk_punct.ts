import {GameObject, MultistateObject, refObject} from "@tabletop-playground/api";
import {addPageUI} from "../rule_controls";

((obj: GameObject) => {
    addPageUI(obj as MultistateObject, new Map([
        ["Deutsch",    {pages: [1, 3, 4, 5, 6, 7, 8], width: 200}],
        ["English",    {pages: [1, 9,10,11,12,13,14], width: 180}],
        ["Français",   {pages: [1,15,16,17,18,19,20], width: 200}],
        ["Italiano",   {pages: [1,21,22,23,24,25,26], width: 180}],
        ["Nederlands", {pages: [1,27,28,29,30,31,32], width: 260}],
        ["Español",    {pages: [1,33,34,35,36,37,38], width: 190}],
        ["Polski",     {pages: [1,39,40,41,42,43,44], width: 150}]
    ]));
})(refObject);