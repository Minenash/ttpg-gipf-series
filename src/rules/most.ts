import {GameObject, MultistateObject, refObject} from "@tabletop-playground/api";
import {addPageUI} from "../rule_controls";

((obj: GameObject) => {
    addPageUI(obj, new Map([
        ["Deutsch",    {pages: [1, 3, 4, 5, 6], width: 200}],
        ["English",    {pages: [1, 7, 8, 9,10], width: 180}],
        ["Français",   {pages: [1,11,12,13,14], width: 200}],
        ["Italiano",   {pages: [1,15,16,17,18], width: 180}],
        ["Nederlands", {pages: [1,19,20,21,22], width: 260}],
        ["Español",    {pages: [1,23,24,25,26], width: 190}],
        ["Polski",     {pages: [1,27,28,29,30], width: 150}]
    ]));

})(refObject);