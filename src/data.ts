import {Color} from "@tabletop-playground/api";

export const PACKAGE_ID = "62667C674A0945E1AF56C079686DC3C6";

export const BLACK = new Color(0,0,0,1);
export const WHITE = new Color(1,1,1,1);
export const GREEN = new Color(0,0.5,0,1);
export const BUTTON_GREY = new Color(0.03,0.03,0.03,1);

export enum Pieces {
    DVONN_BLACK = "202EA7F648ED442598327AA29B671BC2",
    DVONN_RED = "73FAB08445286C592E430AAC9FEB6DFD",
    DVONN_WHITE = "892FF9D64F4A1827252CB0BDA5CDC947",
    GIPF_BLACK = "932B856849D4A7264F5F24B81B87185E",
    GIPF_WHITE = "79BCCCB04C001B89FE0FCA931BADF4AE",
    LYNGK_BLACK = "CDAB864E4E732C74E0E36EAC62E62791",
    LYNGK_BLUE = "693B1C4A4308A6D5CC25D79F184E5A8F",
    LYNGK_GREEN = "E81BC22349AAB9AD7E97538026162D38",
    LYNGK_WHITE = "298F8FCF443620492744139988F41CF1",
    LYNGK_JOKER = "C916A98C4EFD3008F0B5CE840B22AD73",
    LYNGK_RED = "CC4845B7490D3DDFF4F5F0B7E965B585",
    PUNCT_BLACK_ANGLE_LEFT = "6FA216FE450870A61393F2AFA3B75B40",
    PUNCT_BLACK_ANGLE_MID = "BB017CAB4DF4E883AE0C608F45399DF5",
    PUNCT_BLACK_ANGLE_RIGHT = "2ABFD7F04E20B52CDBD1998351AA86FA",
    PUNCT_BLACK_DOT = "3A8E332349BA6470EA0DA986AE23D6A0",
    PUNCT_BLACK_STRAIGHT_MID = "1B6375E14282CC620053F0B837A327DA",
    PUNCT_BLACK_STRAIGHT_OUTER = "DB168C324E6597ACE74B18B97B12DCB3",
    PUNCT_BLACK_TRIANGLE = "B97A0F2D45DC2BCD06F8CB8C2D6E859A",
    PUNCT_WHITE_ANGLE_LEFT = "0BD804AD4F3274AC23665989226C0EAE",
    PUNCT_WHITE_ANGLE_MID = "890DE1E649F179DDCD6CB0898DEBC7BB",
    PUNCT_WHITE_ANGLE_RIGHT = "5DC5E7A248A44A53B829F1B5EA54BEBF",
    PUNCT_WHITE_DOT = "A68DFF354C702C8AE00C76B3C5297D70",
    PUNCT_WHITE_STRAIGHT_MID = "47D4A47A44C6A9429C180181B991A299",
    PUNCT_WHITE_STRAIGHT_OUTER = "21517B5444CC74C2093B988710E35A52",
    PUNCT_WHITE_TRIANGLE = "BA7C7C0847C2EBEF16055D8C1EE229C0",
    TZAAR_BLACK_TOTT = "47EA3E2C434FA57A1152379741A6BA5C",
    TZAAR_BLACK_TZAAR = "79C1B89446F1855CF9FA3F85599E6F88",
    TZAAR_BLACK_TZARRA = "A71D1084410F7EB60A152B8740EDBCB3",
    TZAAR_WHITE_TOTT = "2848A73C4AED763031B2BEB2DD372F23",
    TZAAR_WHITE_TZAAR = "80B0C5D54AF3B3BF7FA2BB829C422147",
    TZAAR_WHITE_TZARRA = "20D7FA6C4155A5E80549C39B775704EB",
    YINSH_BLACK = "45619B844C5044990ED3499977D517A7",
    YINSH_WHITE = "6114CF314ACDC0F0DD82DDBD771CB59B",
    YINSH_MARKER = "F1F02F7A44F16D038E9EAEA7B501BDD1",
    YINSH_MARKER_HOLDER = "D0C341AA41C19D4F90C3108B760821F4",
    ZERTZ_RING = "3917C3B349A6C35D4B0B2C9A7EAFC039",
    ZERTZ_HOLDER = "1B2128A84BAB7448E0C7968F3A9122B4",
    ZERTZ_BLACK = "0BC633FC49EA767CE975C894B3A40991",
    ZERTZ_GREY = "560043E8458AA19333872094A32F4B6C",
    ZERTZ_WHITE = "BED6E47E4277FEB0F42C4BB4D33E39C9",
}

// Placement Types
export type DIRECT = {snaps: number[], piece: string, count?: number, noDrop?: boolean, snap?: boolean};
export type RANDOM = {min: number, max: number, exclude?: number[], include?: number[], pieces: {piece: string, count: number}[]};
export type PlacementInfo = {name: Placement, zMult?: number, holders?: [number,number], directs?: DIRECT[], random?: RANDOM};

export class Placement {
    readonly display: string;
    constructor(display: string) {
        this.display = display;
    }
    
    static GIPF_MANUAL =  new Placement("");
    static TZAAR_MANUAL = new Placement("Manual Setup");
    static DVONN_MANUAL = new Placement("Manual Setup");
    static PUNCT_MANUAL = new Placement("");
    static YINSH_MANUAL = new Placement("Manual Setup");
    static LYNGK_MANUAL = new Placement("Manual Setup");
    static LYNGK_RANDOM = new Placement("Randomize");
    static TZAAR_RANDOM = new Placement("Randomize");
    static TZAAR_STANDARD= new Placement("Standard");
    static ZERTZ_NORMAL = new Placement("Normal (37 rings)");
    static ZERTZ_EXTENDED_40 = new Placement("Extended (40 rings)");
    static ZERTZ_EXTENDED_43 = new Placement("Extended (43 rings)");
    static ZERTZ_EXTENDED_44 = new Placement("Extended (44 rings)");
    static ZERTZ_EXTENDED_48 = new Placement("Tournament (48 rings)");
    static YINSH_RANDOM =  new Placement("Randomize Rings");
    static DVONN_RANDOM_RED = new Placement("Randomize Reds");
    static DVONN_RANDOM_ALL = new Placement("Randomize All");
}

export class Board {
    readonly name: string;
    readonly guid: string;
    readonly placements: PlacementInfo[];
    
    constructor(name: string, guid: string, placements: PlacementInfo[]) {
        this.name = name;
        this.guid = guid;
        this.placements = placements;
    }
    
    getPlacementInfo(placement: Placement) {
        for (const info of this.placements)
            if (info.name == placement)
                return info;
        return undefined;
    }
    
    static GIPF = new Board("GIPF", "ECA9906B4715B8DC91CEAE80CBE45DF4", [
        {name: Placement.GIPF_MANUAL, directs: [{piece: Pieces.GIPF_BLACK, count: 6, snaps: [62,63,64]},{piece: Pieces.GIPF_WHITE, count: 6, snaps: [65,66,67]}]}
    ]);
    static TZAAR = new Board("TZAAR", "9F0654254D73BD5C8A983FA05BED66F0", [
        {name: Placement.TZAAR_MANUAL, directs: [
            {piece: Pieces.TZAAR_BLACK_TOTT,   count: 5, snaps: [62,64,66]},
            {piece: Pieces.TZAAR_WHITE_TOTT,   count: 5, snaps: [71,69,67]},
            {piece: Pieces.TZAAR_BLACK_TZARRA, count: 5, snaps: [63]},
            {piece: Pieces.TZAAR_BLACK_TZARRA, count: 4, snaps: [65]},
            {piece: Pieces.TZAAR_WHITE_TZARRA, count: 5, snaps: [70]},
            {piece: Pieces.TZAAR_WHITE_TZARRA, count: 4, snaps: [68]},
            {piece: Pieces.TZAAR_BLACK_TZAAR,  count: 6, snaps: [61]},
            {piece: Pieces.TZAAR_WHITE_TZAAR,  count: 6, snaps: [72]},
        ]},
        {name: Placement.TZAAR_RANDOM, random: {min: 0, max: 59, pieces: [
            {piece: Pieces.TZAAR_BLACK_TOTT, count: 15}, {piece: Pieces.TZAAR_BLACK_TZARRA, count: 9}, {piece: Pieces.TZAAR_BLACK_TZAAR, count: 6},
            {piece: Pieces.TZAAR_WHITE_TOTT, count: 15}, {piece: Pieces.TZAAR_WHITE_TZARRA, count: 9}, {piece: Pieces.TZAAR_WHITE_TZAAR, count: 6},
        ]}},
        {name: Placement.TZAAR_STANDARD, directs: [
            {piece: Pieces.TZAAR_BLACK_TOTT, snaps: [40,41,42,43,48,49,50,51,56,57,58,59]},
            {piece: Pieces.TZAAR_WHITE_TOTT, snaps: [44,45,46,47,52,53,54,55,60,37,38,39]},
            {piece: Pieces.TZAAR_BLACK_TZARRA, snaps: [21,22,23,27,28,29,33,34,35]},
            {piece: Pieces.TZAAR_WHITE_TZARRA, snaps: [24,25,26,30,31,32,36,19,20]},
            {piece: Pieces.TZAAR_BLACK_TZAAR, snaps: [8,9,12,13,16,17]},
            {piece: Pieces.TZAAR_WHITE_TZAAR, snaps: [10,11,14,15,18,7]},
            {piece: Pieces.TZAAR_BLACK_TOTT, snaps: [1,3,5]},
            {piece: Pieces.TZAAR_WHITE_TOTT, snaps: [2,4,6]},
        ]},
        
    ]);
    private static ZERTZ_MARBLES: DIRECT[] = [
        {piece: Pieces.ZERTZ_BLACK, count: 1, noDrop: true, snaps: [86,85,84,83,82,81,80,79,78,77]},
        {piece: Pieces.ZERTZ_GREY,  count: 1, noDrop: true, snaps: [76,75,74,73,72,71,70,69]},
        {piece: Pieces.ZERTZ_WHITE, count: 1, noDrop: true, snaps: [68,67,66,65,64,63]},
    ];
    private static ZERTZ_PLACMENTS(holder = true): PlacementInfo[] { return [
        {name: Placement.ZERTZ_NORMAL, directs: [
            {piece: Pieces.ZERTZ_RING, count: 1, snaps: [ ...Array(37).keys() ].map( i => i+1)},
            ...!holder ? [] : [{piece: Pieces.ZERTZ_HOLDER, count: 1, noDrop: true, snap: true, snaps: [62]}],
            ...Board.ZERTZ_MARBLES
        ]},
        {name: Placement.ZERTZ_EXTENDED_40, directs: [
            {piece: Pieces.ZERTZ_RING, count: 1, snaps: [ ...Array(37).keys() ].map( i => i+1)},
            ...!holder ? [] : [{piece: Pieces.ZERTZ_HOLDER, count: 1, noDrop: true, snap: true, snaps: [62]}],
            {piece: Pieces.ZERTZ_RING, count: 1, snaps: [54,55,56]},
            ...Board.ZERTZ_MARBLES
        ]},
        {name: Placement.ZERTZ_EXTENDED_43, directs: [
            {piece: Pieces.ZERTZ_RING, count: 1, snaps: [ ...Array(37).keys() ].map( i => i+1)},
            ...!holder ? [] : [{piece: Pieces.ZERTZ_HOLDER, count: 1, noDrop: true, snap: true, snaps: [62]}],
            {piece: Pieces.ZERTZ_RING, count: 1, snaps: [46,47,48]},
            {piece: Pieces.ZERTZ_RING, count: 1, snaps: [54,55,56]},
            ...Board.ZERTZ_MARBLES
        ]},
        {name: Placement.ZERTZ_EXTENDED_44, directs: [
            {piece: Pieces.ZERTZ_RING, count: 1, snaps: [ ...Array(37).keys() ].map( i => i+1)},
            ...!holder ? [] : [{piece: Pieces.ZERTZ_HOLDER, count: 1, noDrop: true, snap: true, snaps: [62]}],
            {piece: Pieces.ZERTZ_RING, count: 1, snaps: [50,51,52,53,54,55,56]},
            ...Board.ZERTZ_MARBLES
        ]},
        {name: Placement.ZERTZ_EXTENDED_48, directs: [
            {piece: Pieces.ZERTZ_RING, count: 1, snaps: [ ...Array(37).keys() ].map( i => i+1)},
            ...!holder ? [] : [{piece: Pieces.ZERTZ_HOLDER, count: 1, noDrop: true, snap: true, snaps: [62]}],
            {piece: Pieces.ZERTZ_RING, count: 1, snaps: [46,47,48,49,50,51,52,53,54,55,56]},
            ...Board.ZERTZ_MARBLES
        ]},
    ];
    }
    static ZERTZ_HEX = new Board("Hexagonal Board", "2F752C634E9791CFB9322883E49C5912", Board.ZERTZ_PLACMENTS());
    static ZERTZ_PLAIN = new Board("Plain Board", "C4F2D0834D4102637C8F1398F37C1F78", Board.ZERTZ_PLACMENTS());
    static ZERTZ_NO_BOARD = new Board("No Board", "ACB6CA7846F1AB45729A02997E7CCEC2", Board.ZERTZ_PLACMENTS(false));
    
    static DVONN = new Board("DVONN", "A4CDCA1E45FD39FB34A9CD9663734F8E", [
        {name: Placement.DVONN_MANUAL, zMult: 0.9, directs: [
            {piece: Pieces.DVONN_BLACK, count: 6, snaps: [50,51,52]},
            {piece: Pieces.DVONN_BLACK, count: 5, snaps: [53]},
            {piece: Pieces.DVONN_WHITE, count: 6, snaps: [54,55,56]},
            {piece: Pieces.DVONN_WHITE, count: 5, snaps: [57]},
            {piece: Pieces.DVONN_RED, count: 1, snaps: [16,15,14]},
        ]},
        {name: Placement.DVONN_RANDOM_RED, zMult: 0.9,
            random: {min: 0, max: 48, exclude: [9,19], pieces: [ {piece: Pieces.DVONN_RED, count: 3} ]},
            directs: [
                {piece: Pieces.DVONN_BLACK, count: 6, snaps: [50,51,52]},
                {piece: Pieces.DVONN_BLACK, count: 5, snaps: [53]},
                {piece: Pieces.DVONN_WHITE, count: 6, snaps: [54,55,56]},
                {piece: Pieces.DVONN_WHITE, count: 5, snaps: [57]},
            ]},
        {name: Placement.DVONN_RANDOM_ALL, random: {min: 0, max: 48, pieces: [
            {piece: Pieces.DVONN_RED, count: 3},
            {piece: Pieces.DVONN_BLACK, count: 23},
            {piece: Pieces.DVONN_WHITE, count: 23}
        ]}},
    ]);
    static PUNCT = new Board("PUNCT", "9FA1C476439B470619B21AAF355F1E35", [
        {name: Placement.PUNCT_MANUAL, directs: [
                {piece: Pieces.PUNCT_BLACK_TRIANGLE,       count: 6, snaps: [212], snap: true},
                {piece: Pieces.PUNCT_BLACK_STRAIGHT_OUTER, count: 4, snaps: [218], snap: true},
                {piece: Pieces.PUNCT_BLACK_STRAIGHT_MID,   count: 2, snaps: [222], snap: true},
                {piece: Pieces.PUNCT_BLACK_ANGLE_MID,      count: 2, snaps: [224], snap: true},
                {piece: Pieces.PUNCT_BLACK_ANGLE_LEFT,     count: 2, snaps: [226], snap: true},
                {piece: Pieces.PUNCT_BLACK_ANGLE_RIGHT,    count: 2, snaps: [233], snap: true},
                {piece: Pieces.PUNCT_BLACK_DOT,            count: 1, snaps: [236], snap: true},
                {piece: Pieces.PUNCT_WHITE_TRIANGLE,       count: 6, snaps: [213], snap: true},
                {piece: Pieces.PUNCT_WHITE_STRAIGHT_OUTER, count: 4, snaps: [219], snap: true},
                {piece: Pieces.PUNCT_WHITE_STRAIGHT_MID,   count: 2, snaps: [223], snap: true},
                {piece: Pieces.PUNCT_WHITE_ANGLE_MID,      count: 2, snaps: [225], snap: true},
                {piece: Pieces.PUNCT_WHITE_ANGLE_LEFT,     count: 2, snaps: [227], snap: true},
                {piece: Pieces.PUNCT_WHITE_ANGLE_RIGHT,    count: 2, snaps: [234], snap: true},
                {piece: Pieces.PUNCT_WHITE_DOT,            count: 1, snaps: [235], snap: true},
            ]},
    ]);
    static YINSH = new Board("YINSH", "107410C545F82BAF1D9BA8AA3D9E613D", [
        {name: Placement.YINSH_MANUAL, holders: [89,93], directs: [
                {piece: Pieces.YINSH_BLACK, snaps: [13,51,7,46,2]},
                {piece: Pieces.YINSH_WHITE, snaps: [29,76,35,81,40]},
        ]},
        {name: Placement.YINSH_RANDOM, random: {min: 0, max: 84, pieces: [
            {piece: Pieces.YINSH_BLACK, count: 5},
            {piece: Pieces.YINSH_WHITE, count: 5},
        ]}},
    ]);
    static LYNGK = new Board("LYNGK", "7B9AD006436ACD9AF1451FA5D00038D5", [
        {name: Placement.LYNGK_MANUAL, directs: [
            {piece: Pieces.LYNGK_JOKER, count: 3, snaps: [12]},
            {piece: Pieces.LYNGK_WHITE, count: 5, snaps: [48]}, {piece: Pieces.LYNGK_WHITE, count: 4, snaps: [53]},
            {piece: Pieces.LYNGK_RED,   count: 5, snaps: [49]}, {piece: Pieces.LYNGK_RED  , count: 4, snaps: [54]},
            {piece: Pieces.LYNGK_BLUE,  count: 5, snaps: [50]}, {piece: Pieces.LYNGK_BLUE,  count: 4, snaps: [55]},
            {piece: Pieces.LYNGK_GREEN, count: 5, snaps: [51]}, {piece: Pieces.LYNGK_GREEN, count: 4, snaps: [56]},
            {piece: Pieces.LYNGK_BLACK, count: 5, snaps: [52]}, {piece: Pieces.LYNGK_BLACK, count: 4, snaps: [57]},
        ]},
        {name: Placement.LYNGK_RANDOM, random: {min: 0, max: 42, pieces: [
            {piece: Pieces.LYNGK_JOKER, count: 3},
            {piece: Pieces.LYNGK_WHITE, count: 9},
            {piece: Pieces.LYNGK_RED,   count: 9},
            {piece: Pieces.LYNGK_BLUE,  count: 9},
            {piece: Pieces.LYNGK_GREEN, count: 9},
            {piece: Pieces.LYNGK_BLACK, count: 9},
        ]}},
    ]);
    static Hybrid_Trystonian = new Board("Hybrid, Trystonian", "2E60FB2444DBB257CEC5739A14134BF5", [
        {name: Placement.GIPF_MANUAL, directs: [
            {piece: Pieces.GIPF_BLACK, count: 5, snaps: [85,84]},
            {piece: Pieces.GIPF_BLACK, count: 4, snaps: [83,82]},
            {piece: Pieces.GIPF_WHITE, count: 5, snaps: [70,71]},
            {piece: Pieces.GIPF_WHITE, count: 4, snaps: [72,73]}
        ]},
        {name: Placement.TZAAR_MANUAL, directs: [
            {piece: Pieces.TZAAR_BLACK_TOTT,   count: 5, snaps: [97,99,101]},
            {piece: Pieces.TZAAR_WHITE_TOTT,   count: 5, snaps: [106,104,102]},
            {piece: Pieces.TZAAR_BLACK_TZARRA, count: 5, snaps: [98]},
            {piece: Pieces.TZAAR_BLACK_TZARRA, count: 4, snaps: [100]},
            {piece: Pieces.TZAAR_WHITE_TZARRA, count: 5, snaps: [105]},
            {piece: Pieces.TZAAR_WHITE_TZARRA, count: 4, snaps: [103]},
            {piece: Pieces.TZAAR_BLACK_TZAAR,  count: 6, snaps: [96]},
            {piece: Pieces.TZAAR_WHITE_TZAAR,  count: 6, snaps: [107]},
        ]},
        {name: Placement.TZAAR_RANDOM, random: {min: 1, max: 60, pieces: [
            {piece: Pieces.TZAAR_BLACK_TOTT, count: 15}, {piece: Pieces.TZAAR_BLACK_TZARRA, count: 9}, {piece: Pieces.TZAAR_BLACK_TZAAR, count: 6},
            {piece: Pieces.TZAAR_WHITE_TOTT, count: 15}, {piece: Pieces.TZAAR_WHITE_TZARRA, count: 9}, {piece: Pieces.TZAAR_WHITE_TZAAR, count: 6},
        ]}},
        {name: Placement.TZAAR_STANDARD, directs: [
            {piece: Pieces.TZAAR_BLACK_TOTT, snaps: [41,42,43,44,49,50,51,52,57,58,59,60]},
            {piece: Pieces.TZAAR_WHITE_TOTT, snaps: [45,46,47,48,53,54,55,56,61,38,39,40]},
            {piece: Pieces.TZAAR_BLACK_TZARRA, snaps: [22,23,24,28,29,30,34,35,36]},
            {piece: Pieces.TZAAR_WHITE_TZARRA, snaps: [25,26,27,31,32,33,37,20,21]},
            {piece: Pieces.TZAAR_BLACK_TZAAR, snaps: [9,10,13,14,17,18]},
            {piece: Pieces.TZAAR_WHITE_TZAAR, snaps: [11,12,15,16,19,8]},
            {piece: Pieces.TZAAR_BLACK_TOTT, snaps: [2,4,6]},
            {piece: Pieces.TZAAR_WHITE_TOTT, snaps: [3,5,7]},
        ]},
        {name: Placement.YINSH_MANUAL, holders: [92,95], directs: [
            {piece: Pieces.YINSH_BLACK, snaps: [57,56,55,54,53]},
            {piece: Pieces.YINSH_WHITE, snaps: [45,44,43,42,41]},
        ]},
        {name: Placement.YINSH_RANDOM, random: {min: 0, max: 84, pieces: [
            {piece: Pieces.YINSH_BLACK, count: 5},
            {piece: Pieces.YINSH_WHITE, count: 5},
        ]}},
        {name: Placement.LYNGK_MANUAL, directs: [
            {piece: Pieces.LYNGK_JOKER, count: 3, snaps: [1]},
            {piece: Pieces.LYNGK_WHITE, count: 5, snaps: [96]},  {piece: Pieces.LYNGK_WHITE, count: 4, snaps: [103]},
            {piece: Pieces.LYNGK_RED,   count: 5, snaps: [97]},  {piece: Pieces.LYNGK_RED  , count: 4, snaps: [104]},
            {piece: Pieces.LYNGK_BLUE,  count: 5, snaps: [98]},  {piece: Pieces.LYNGK_BLUE,  count: 4, snaps: [105]},
            {piece: Pieces.LYNGK_GREEN, count: 5, snaps: [99]},  {piece: Pieces.LYNGK_GREEN, count: 4, snaps: [106]},
            {piece: Pieces.LYNGK_BLACK, count: 5, snaps: [100]}, {piece: Pieces.LYNGK_BLACK, count: 4, snaps: [107]},
        ]},
        {name: Placement.LYNGK_RANDOM, random: {min: 0, max: 36, include: [38,42,46,50,54,58], pieces: [
            {piece: Pieces.LYNGK_JOKER, count: 3},
            {piece: Pieces.LYNGK_WHITE, count: 9},
            {piece: Pieces.LYNGK_RED,   count: 9},
            {piece: Pieces.LYNGK_BLUE,  count: 9},
            {piece: Pieces.LYNGK_GREEN, count: 9},
            {piece: Pieces.LYNGK_BLACK, count: 9},
        ]}},
    ]);
} 

export type Game = {name: string, boards: Board[], placements: Placement[]};
export const Games: Game[] = [
    {name: "GIPF",  boards: [Board.GIPF,  Board.Hybrid_Trystonian], placements: [Placement.GIPF_MANUAL]},
    {name: "TZAAR", boards: [Board.TZAAR, Board.Hybrid_Trystonian], placements: [Placement.TZAAR_MANUAL, Placement.TZAAR_RANDOM, Placement.TZAAR_STANDARD]},
    {name: "ZERTZ", boards: [Board.ZERTZ_HEX, Board.ZERTZ_PLAIN, Board.ZERTZ_NO_BOARD], placements: [Placement.ZERTZ_NORMAL, Placement.ZERTZ_EXTENDED_40, Placement.ZERTZ_EXTENDED_43, Placement.ZERTZ_EXTENDED_44, Placement.ZERTZ_EXTENDED_48]},
    {name: "DVONN", boards: [Board.DVONN],                          placements: [Placement.DVONN_MANUAL, Placement.DVONN_RANDOM_RED, Placement.DVONN_RANDOM_ALL]},
    {name: "PUNCT", boards: [Board.PUNCT],                          placements: [Placement.PUNCT_MANUAL]},
    {name: "YINSH", boards: [Board.YINSH, Board.Hybrid_Trystonian], placements: [Placement.YINSH_MANUAL, Placement.YINSH_RANDOM]},
    {name: "LYNGK", boards: [Board.LYNGK, Board.Hybrid_Trystonian], placements: [Placement.LYNGK_MANUAL, Placement.LYNGK_RANDOM]},
]

export function getGame(name: string) {
    for (const game of Games)
        if (game.name == name)
            return game;
    return Games[0];
}