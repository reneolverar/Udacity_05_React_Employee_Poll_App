const {
    normalize,
    sortByAttribute,
    sortByAnsweredAndCreated,
} = require("./helpers.js")

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
            questions: [1],
            answers: { 1: 1 },
        },
        2: {
            attribute: 3,
            questions: [1, 2, 3],
            answers: { 1: 1, 2: 2, 3: 3 },
        },
        3: {
            attribute: 2,
            questions: [1, 2],
            answers: { 1: 1, 2: 2 },
        },
    }
    it("will sort an object array by attribute", () => {
        const result = sortByAttribute(data, "attribute")
        expect(result).toStrictEqual(["2", "3", "1"])
    })
    it("will sort an object array by array attribute´s length", () => {
        const result = sortByAnsweredAndCreated(data)
        expect(result).toStrictEqual(["2", "3", "1"])
    })
    it("will sort an object array by objectArray attribute´s length", () => {
        const result = sortByAnsweredAndCreated(data)
        expect(result).toStrictEqual(["2", "3", "1"])
    })
})
