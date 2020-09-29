# RDF-Converter

A powerful CLI tool to convert between various RDF serializations.

Makes use of:

-   [rdf-serialize.js](https://github.com/rubensworks/rdf-serialize.js)
-   [rdf-parse.js](https://github.com/rubensworks/rdf-parse.js)
-   Possibly, in the future: [graphy.js](https://github.com/blake-regalia/graphy.js/)

```
rdf-converter --help
Usage: rdf-converter [options] [command]

Options:
  -h, --help                      display help for command

Commands:
  convert <source> <destination>  Converts between RDF serializations. Needs file extensions to determine serialization type.
  help [command]                  display help for command
```
