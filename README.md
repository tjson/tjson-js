# tjson-js [![npm version][npm-version]][npm-link] [![Build Status][build-image]][build-link] [![Known Vulnerabilities][snyk-image]][snyk-link] [![MIT licensed][license-image]][license-link]

[npm-version]: https://badge.fury.io/js/tjson-js.svg
[npm-link]: https://www.npmjs.com/package/tjson-js
[build-image]: https://secure.travis-ci.org/tjson/tjson-js.svg?branch=master
[build-link]: https://travis-ci.org/tjson/tjson-js
[snyk-image]: https://snyk.io/test/github/tjson/tjson-js/eff2440caadd396f505b58271e29dacfad2132c9/badge.svg
[snyk-link]: https://snyk.io/test/github/tjson/tjson-js/eff2440caadd396f505b58271e29dacfad2132c9
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-link]: https://github.com/tjson/tjson-ruby/blob/master/LICENSE.txt

JavaScript-compatible implementation of [Tagged JSON (TJSON)][TJSON],
written in TypeScript.

[TJSON] is a microformat which supplements JSON with an extended set of
data types by supplying a type "tag" embedded in object member names:

```json
{
  "array-example:A<O>": [
    {
      "string-example:s": "foobar",
      "binary-example:d": "QklOQVJZ",
      "float-example:f": 0.42,
      "int-example:i": "42",
      "timestamp-example:t": "2016-11-06T22:27:34Z",
      "boolean-example:b": true
    }
  ],
  "set-example:S<i>": [1, 2, 3]
}
```

[TJSON]: https://www.tjson.org

## Help and Discussion

Have questions? Want to suggest a feature or change?

* [TJSON Gitter]: web-based chat
* [TJSON Google Group]: join via web or email ([tjson+subscribe@googlegroups.com])

[TJSON Gitter]: https://gitter.im/tjson/Lobby
[TJSON Google Group]: https://groups.google.com/forum/#!forum/tjson
[tjson+subscribe@googlegroups.com]: mailto:tjson+subscribe@googlegroups.com

## Requirements

tjson-js is presently targeting <b>ES2017</b>. This is because we soon plan on
making use of the [TC39 BigInt] type when it becomes available, and want to
make sure users of this library can handle modern ECMAScript versions.

Please make sure your JS runtime is ES2017 compliant, or use a transpiler
like [babel] support older versions of ECMAScript.

[babel]: https://babeljs.io/docs/plugins/preset-es2017/

## Installation

Via [npm](https://www.npmjs.com/):

```bash
npm install tjson-js
```

Via [Yarn](https://yarnpkg.com/):

```bash
yarn install tjson-js
```

Import TJSON into your project with:

```js
import TJSON from "tjson-js";
```

## API

### TJSON.parse()

The `TJSON.parse()` method parses a TJSON string, returning an [Object]
described by the string. This method is analogous to JavaScript's built-in
[JSON.parse()] method.

```
TJSON.parse(tjsonString[, decodeUTF8 = true])
```

[JSON.parse()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse

#### Parameters

* **tjsonString**: The string to parse, containing data serialized as [TJSON].

* **decodeUTF8**: instructs whether or not to first decode the TJSON string from
UTF-8 before parsing it. By default UTF-8 will be automatically decoded to the
engine's internal string representation (e.g. UCS-2). If you would like to skip
automatic encoding conversions (e.g. because they happen at the I/O boundary)
pass `false`.

#### Example

```js
TJSON.parse('{"some-string-data:s":"Hello, world!","some-time-ago:t":"2017-04-22T20:40:53.182Z"}');
// Object { some-string-data: "Hello, world!", some-time-ago: Sat Apr 22 2017 13:40:53 GMT-0700 (PDT) }
```

### TJSON.stringify()

The `TJSON.stringify()` method converts a JavaScript value to a TJSON string.
This method is analogous to JavaScript's built-in [JSON.stringify()] method.

```
TJSON.stringify(value[, space = 0[, encodeUTF8 = true]])
```

[JSON.stringify()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify

#### Parameters

* **value**: The value to convert to a TJSON string.

* **space**: a [String] or [Number] object that's to insert white space into the
output JSON string for readability purposes. For more information, please see
the [JSON.stringify()] documentation.

* **encodeUTF8**: instructs whether or not to encode the resulting document as
UTF-8. The TJSON specification requires all confirming documents are encoded
as UTF-8. If you would like to skip automatic encoding conversions (e.g.
because they happen at the I/O boundary) pass `false`.

## Type Conversions

The table below shows how TJSON tags map to JavaScript types:

| Tag | JavaScript Type | Notes                                         |
|-----|-----------------|-----------------------------------------------|
| `O` | [Object]        |                                               |
| `A` | [Array]         |                                               |
| `S` | [Set]           |                                               |
| `b` | [Boolean]       |                                               |
| `d` | [Uint8Array]    |                                               |
| `f` | [Number]        |                                               |
| `i` | [Number]        | Will switch to [TC39 BigInt] when available  |
| `u` | [Number]        | Will switch to [TC39 BigInt] when available  |
| `s` | [String]        |                                               |
| `t` | [Date]          |                                               |

[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Objects
[Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Indexed_collections_Arrays_and_typed_Arrays
[Set]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
[Boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type
[Uint8Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
[Number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type
[TC39 BigInt]: https://tc39.github.io/proposal-bigint/
[String]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type
[Date]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

## TJSON Spec Deviations

This is not (yet) a fully compliant TJSON parser. It contains the following
defects, which can also be found in [tjson.spec.ts's skipped examples][errata]:

* **64-bit integer range unsupported**: can't be supported in JavaScript until
  the [TC39 BigInt] type is available.
* **Repeated JSON object member names tolerated**: the spec mandates that
  the names of JSON object members must be unique. This implementation silently
  ignores them.
* **Set uniqueness not guaranteed**: the spec mandates that all members of sets
  must be unique. Unfortunately JavaScript's `Set` type and equality semantics
  allow members that are identical if compared by value.

[errata]: https://github.com/tjson/tjson-js/blob/master/test/tjson.spec.ts#L8

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/tjson/tjson-js

## License

Copyright (c) 2017 Tony Arcieri. Distributed under the MIT License. See
[LICENSE.txt](https://github.com/tjson/tjson-js/blob/master/LICENSE.txt)
for further details.
