"use strict";

const ImageReducer = require("../libs/ImageReducer");
const ImageData    = require("../libs/ImageData");
const test         = require("ava");
const pify         = require("pify");
const fs           = require("fs");
const fsP          = pify(fs);

test("Reduce JPEG with MozJpeg", async t => {
    const fixture = await fsP.readFile(`${__dirname}/fixture/fixture.jpg`);
    const reducer = new ImageReducer({quality: 75});
    const image = new ImageData("fixture/fixture.jpg", "fixture", fixture);

    const reduced = await reducer.exec(image);
    t.is(reduced.data.length, 40469);
    t.is(fixture.length, 97811);
});

test("Reduce JPEG with JpegOptim", async t => {
    const fixture = await fsP.readFile(`${__dirname}/fixture/fixture.jpg`);
    const reducer = new ImageReducer({quality: 75, optimizer: "jpegoptim"});
    const image = new ImageData("fixture/fixture.jpg", "fixture", fixture);

    const reduced = await reducer.exec(image);
    t.is(reduced.data.length, 49548);
    t.is(fixture.length, 97811);
});
