const { normalize, sortObjectArray } = require("./helpers.js")

describe("normalize", () => {
    it("will transfort array by id to byId and allIds", () => {
        const data = {
            1: {
                test: 1,
                data: "d",
            },
            2: {
                test: 2,
                data: "e",
            },
        }
        const result = normalize(data)
        expect(result[1]).toBeUndefined()
        expect(result.byId).toBe(data)
        expect(result.allIds).toStrictEqual(["1", "2"])
    })
})

describe("sortObjectArray", () => {
    const data = {
        1: {
            attribute: 1,
            array: [1],
            objectArray: { 1: 1 },
        },
        2: {
            attribute: 3,
            array: [1, 2, 3],
            objectArray: { 1: 1, 2: 2, 3: 3 },
        },
        3: {
            attribute: 2,
            array: [1, 2],
            objectArray: { 1: 1, 2: 2 },
        },
    }
    it("will sort an object array by attribute", () => {
        const result = sortObjectArray(data, "attribute")
        expect(result).toStrictEqual(["2", "3", "1"])
    })
    it("will sort an object array by array attribute´s length", () => {
        const result = sortObjectArray(data, "array", { byLength: true })
        expect(result).toStrictEqual(["2", "3", "1"])
    })
    it("will sort an object array by objectArray attribute´s length", () => {
        const result = sortObjectArray(data, "objectArray", { byLength: true })
        expect(result).toStrictEqual(["2", "3", "1"])
    })
})
