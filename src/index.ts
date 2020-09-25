// export function foo(): string {
//     return "hi"
// }

import { program } from "commander"

import rdfSerialize from "rdf-serialize"
import rdfParse from "rdf-parse"

import { createReadStream, createWriteStream, promises } from "fs"

// import { mkdir } from "fs/promises"
const mkdir = promises.mkdir

import { basename } from "path"

program
    .command("convert <source> <destination>")
    .description("Converts between RDF serializations")
    .action(async (source, dest) => {
        console.log(`Converting from ${source} to ${dest}`)

        if (source.includes("http")) {
            throw new Error("We don't support remote resources yet")
        }

        const input = createReadStream(source)
        const quadStream = rdfParse.parse(input, {
            path: source,
        })

        // console.log("Parse stream created")

        mkdir(basename(dest), { recursive: true })

        // console.log("created dir")

        const outStream = createWriteStream(dest, "utf-8")
        const outQuads = rdfSerialize.serialize(quadStream, { path: dest })

        // console.log("out streams created")

        // outQuads.on("data", (quad) => {
        //     console.log("got quad")
        //     console.log(quad.toString())
        // })

        outQuads.pipe(outStream)

        // console.log("piping")

        await new Promise((resolve, reject) => {
            outQuads.on("end", () => {
                // console.log("out done")
                resolve()
            })
            outQuads.on("error", () => {
                reject()
            })
        })
        console.log("Done!")
    })

async function main() {
    try {
        await program.parseAsync()
    } catch (error) {
        console.error(error)
    }
}

main()
