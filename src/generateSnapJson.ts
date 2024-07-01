import {GameObject, refObject} from "@tabletop-playground/api";

((obj: GameObject) => {
    // let snap = obj.getSnapPoint(0);
    // if (snap == undefined) return;
    // let point = {
    //     "X": snap.getLocalPosition().x,
    //     "Y": snap.getLocalPosition().y,
    //     "Z": snap.getLocalPosition().z,
    //     "Range": snap.getRange(),
    //     "SnapRotation": snap.getSnapRotation(),
    //     "Shape": snap.getShape(),
    //     "FlipValidity": snap.getFlipValidity()
    // }
    
    const theNewPointOrder = [
        45,
        50,16,12,40,13,17,
        21,55,20,49,44,39,8,35,9,41,46,51,
        56,25,59,24,54,19,15,11,7,34,4,31,5,36,10,14,18,22,
        26,60,28,61,27,58,23,53,48,43,38,33,3,30,1,29,2,32,6,37,42,47,52,57,
        62,63,64,65,66,67
    ];
    
    let out = "";
    for (let index of theNewPointOrder) {
        let snap = obj.getSnapPoint(index-1);
        if (snap == undefined) continue;
        out +=
            "\t{\n" +
            "\t\t\"X\": " + snap.getLocalPosition().x + ",\n" +
            "\t\t\"Y\": " + snap.getLocalPosition().y + ",\n" +
            "\t\t\"Z\": " + snap.getLocalPosition().z + ",\n" +
            "\t\t\"Range\": " + snap.getRange() + ",\n" +
            "\t\t\"SnapRotation\": " + snap.getSnapRotation() + ",\n" +
            "\t\t\"Shape\": " + snap.getShape() + ",\n" +
            "\t\t\"FlipValidity\": " + snap.getFlipValidity() + "\n" +
            "\t},\n"
    }
    console.log(out);
    
    // let p2 =
    //     "\t{\n" + 
    //     "\t\t\"X\": " + snap.getLocalPosition().x + ",\n" +
    //     "\t\t\"Y\": " + snap.getLocalPosition().y + ",\n" +
    //     "\t\t\"Z\": " + snap.getLocalPosition().z + ",\n" +
    //     "\t\t\"Range\": " + snap.getRange() + ",\n" +
    //     "\t\t\"SnapRotation\": " + snap.getSnapRotation() + ",\n" +
    //     "\t\t\"Shape\": " + snap.getShape() + ",\n" +
    //     "\t\t\"FlipValidity\": " + snap.getFlipValidity() + ",\n" +
    //     "\t},"
    //
    // console.log(p2);
    
})(refObject);