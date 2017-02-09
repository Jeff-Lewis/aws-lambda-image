"use strict";

const ImageReducer = require("../libs/ImageReducer");
const ImageData    = require("../libs/ImageData");
const test         = require("ava");
const pify         = require("pify");
const fs           = require("fs");
const fsP          = pify(fs);

test("Reduce PNG with pngquant", async t => {
    const fixture = await fsP.readFile(`${__dirname}/fixture/fixture.png`);
    const reducer = new ImageReducer();
    const image = new ImageData("fixture/fixture.png", "fixture", fixture);

    const reduced = await reducer.exec(image);
    t.is(reduced.data.length, 73724);
    t.is(fixture.length, 130324);
});

test("Reduce PNG with pngout", async t => {
    const fixture = await fsP.readFile(`${__dirname}/fixture/fixture.png`);
    const reducer = new ImageReducer({optimizer: "pngout"});
    const image = new ImageData("fixture/fixture.png", "fixture", fixture);

    const reduced = await reducer.exec(image);
    t.is(reduced.data.length, 100487);
    t.is(fixture.length, 130324);
});
