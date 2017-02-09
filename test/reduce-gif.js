"use strict";

const ImageReducer = require("../libs/ImageReducer");
const ImageData    = require("../libs/ImageData");
const test         = require("ava");
const pify         = require("pify");
const fs           = require("fs");
const fsP          = pify(fs);

test("Reduce GIF", async t => {
    const fixture = await fsP.readFile(`${__dirname}/fixture/fixture.gif`);
    const reducer = new ImageReducer();
    const image = new ImageData("fixture/fixture.gif", "fixture", fixture);

    const reduced = await reducer.exec(image);
    t.is(reduced.data.length, 28312);
    t.is(fixture.length, 28416);
});
