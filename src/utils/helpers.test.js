const {normalize} = require("./helpers.js")

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