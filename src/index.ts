import { program } from "commander"

import rdfSerialize from "rdf-serialize"
import rdfParse from "rdf-parse"

import { createReadStream, createWriteStream, promises } from "fs"

// this fixes a weird thing with importing in CJS mode
const mkdir = promises.mkdir

import { basename } from "path"

export async function convert(source: string, dest: string) {
    console.log(`Converting from ${source} to ${dest}`)

    if (source.includes("http")) {
        throw new Error("We don't support remote resources yet")
    }

    const input = createReadStream(source)
    const quadStream = rdfParse.parse(input, {
        path: source,
    })

    mkdir(basename(dest), { recursive: true })

    const outStream = createWriteStream(dest, "utf-8")
    const outQuads = rdfSerialize.serialize(quadStream, { path: dest })

    outQuads.pipe(outStream)

    await new Promise((resolve, reject) => {
        outQuads.on("end", () => {
            resolve()
        })
        outQuads.on("error", () => {
            reject()
        })
    })
    console.log("Done!")
}

program
    .command("convert <source> <destination>")
    .description(
        "Converts between RDF serializations. Needs file extensions to determine serialization type."
    )
    .action(convert)

async function main() {
    try {
        await program.parseAsync()
    } catch (error) {
        console.error(error)
    }
}

main()
