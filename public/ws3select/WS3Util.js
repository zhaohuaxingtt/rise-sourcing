/**
 * @license
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash category="math" include="pad,padEnd,padStart,parseInt,trim,trimEnd,trimStart,clone,cloneDeep,debounce,throttle,countBy,filter,eachRight,find,findLast,includes,groupBy,map,reduce,orderBy,sortBy,some,every,compact,concat,difference,differenceBy,differenceWith,dropWhile,findIndex,findLastIndex,indexOf,intersection,intersectionBy,intersectionWith,join,last,head,pull,pullAll,pullAt,reverse,slice,tail,initial,take,takeRight,takeWhile,union,unionBy,unionWith,uniq,uniqBy,uniqWith,without,xor,xorBy,xorWith,set,isEqual,isEqualWith,mapValues,assign,forEach,isEmpty,uniqueId,pick,pickBy"`
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
;(function() {
  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined

  /** Used as the semantic version number. */
  var VERSION = '4.17.5'

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200

  /** Error message constants. */
  var FUNC_ERROR_TEXT = 'Expected a function'

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED = '__lodash_hash_undefined__'

  /** Used as the maximum memoize cache size. */
  var MAX_MEMOIZE_SIZE = 500

  /** Used to compose bitmasks for cloning. */
  var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2

  /** Used to detect hot functions by number of calls within a span of milliseconds. */
  var HOT_COUNT = 800,
    HOT_SPAN = 16

  /** Used as references for various `Number` constants. */
  var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991,
    MAX_INTEGER = 1.7976931348623157e308,
    NAN = 0 / 0

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    asyncTag = '[object AsyncFunction]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    nullTag = '[object Null]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    proxyTag = '[object Proxy]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    undefinedTag = '[object Undefined]',
    weakMapTag = '[object WeakMap]'

  var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]'

  /** Used to match property names within property paths. */
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g

  /** Used to match leading and trailing whitespace. */
  var reTrim = /^\s+|\s+$/g,
    reTrimStart = /^\s+/,
    reTrimEnd = /\s+$/

  /** Used to match backslashes in property paths. */
  var reEscapeChar = /\\(\\)?/g

  /** Used to match `RegExp` flags from their coerced string values. */
  var reFlags = /\w*$/

  /** Used to detect bad signed hexadecimal string values. */
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i

  /** Used to detect binary string values. */
  var reIsBinary = /^0b[01]+$/i

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/

  /** Used to detect octal string values. */
  var reIsOctal = /^0o[0-7]+$/i

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/

  /** Used to compose unicode character classes. */
  var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange =
      rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f'

  /** Used to compose unicode capture groups. */
  var rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ = '\\u200d'

  /** Used to compose unicode regexes. */
  var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin =
      '(?:' +
      rsZWJ +
      '(?:' +
      [rsNonAstral, rsRegional, rsSurrPair].join('|') +
      ')' +
      rsOptVar +
      reOptMod +
      ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol =
      '(?:' +
      [
        rsNonAstral + rsCombo + '?',
        rsCombo,
        rsRegional,
        rsSurrPair,
        rsAstral
      ].join('|') +
      ')'

  /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
  var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g')

  /** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
  var reHasUnicode = RegExp(
    '[' + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + ']'
  )

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {}
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[
    int8Tag
  ] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[
    uint8Tag
  ] = typedArrayTags[uint8ClampedTag] = typedArrayTags[
    uint16Tag
  ] = typedArrayTags[uint32Tag] = true
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[
    arrayBufferTag
  ] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[
    dateTag
  ] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[
    mapTag
  ] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[
    regexpTag
  ] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[
    weakMapTag
  ] = false

  /** Used to identify `toStringTag` values supported by `_.clone`. */
  var cloneableTags = {}
  cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[
    arrayBufferTag
  ] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[
    dateTag
  ] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[
    int8Tag
  ] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[
    mapTag
  ] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[
    regexpTag
  ] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[
    symbolTag
  ] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[
    uint16Tag
  ] = cloneableTags[uint32Tag] = true
  cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[
    weakMapTag
  ] = false

  /** Built-in method references without a dependency on `root`. */
  var freeParseInt = parseInt

  /** Detect free variable `global` from Node.js. */
  var freeGlobal =
    typeof global == 'object' && global && global.Object === Object && global

  /** Detect free variable `self`. */
  var freeSelf =
    typeof self == 'object' && self && self.Object === Object && self

  /** Used as a reference to the global object. */
  var root = freeGlobal || freeSelf || Function('return this')()

  /** Detect free variable `exports`. */
  var freeExports =
    typeof exports == 'object' && exports && !exports.nodeType && exports

  /** Detect free variable `module`. */
  var freeModule =
    freeExports &&
    typeof module == 'object' &&
    module &&
    !module.nodeType &&
    module

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports && freeGlobal.process

  /** Used to access faster Node.js helpers. */
  var nodeUtil = (function() {
    try {
      return freeProcess && freeProcess.binding && freeProcess.binding('util')
    } catch (e) {}
  })()

  /* Node.js helper references. */
  var nodeIsMap = nodeUtil && nodeUtil.isMap,
    nodeIsSet = nodeUtil && nodeUtil.isSet,
    nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray

  /*--------------------------------------------------------------------------*/

  /**
   * A faster alternative to `Function#apply`, this function invokes `func`
   * with the `this` binding of `thisArg` and the arguments of `args`.
   *
   * @private
   * @param {Function} func The function to invoke.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} args The arguments to invoke `func` with.
   * @returns {*} Returns the result of `func`.
   */
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0:
        return func.call(thisArg)
      case 1:
        return func.call(thisArg, args[0])
      case 2:
        return func.call(thisArg, args[0], args[1])
      case 3:
        return func.call(thisArg, args[0], args[1], args[2])
    }
    return func.apply(thisArg, args)
  }

  /**
   * A specialized version of `baseAggregator` for arrays.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} setter The function to set `accumulator` values.
   * @param {Function} iteratee The iteratee to transform keys.
   * @param {Object} accumulator The initial aggregated object.
   * @returns {Function} Returns `accumulator`.
   */
  function arrayAggregator(array, setter, iteratee, accumulator) {
    var index = -1,
      length = array == null ? 0 : array.length

    while (++index < length) {
      var value = array[index]
      setter(accumulator, value, iteratee(value), array)
    }
    return accumulator
  }

  /**
   * A specialized version of `_.forEach` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEach(array, iteratee) {
    var index = -1,
      length = array == null ? 0 : array.length

    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break
      }
    }
    return array
  }

  /**
   * A specialized version of `_.forEachRight` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEachRight(array, iteratee) {
    var length = array == null ? 0 : array.length

    while (length--) {
      if (iteratee(array[length], length, array) === false) {
        break
      }
    }
    return array
  }

  /**
   * A specialized version of `_.every` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if all elements pass the predicate check,
   *  else `false`.
   */
  function arrayEvery(array, predicate) {
    var index = -1,
      length = array == null ? 0 : array.length

    while (++index < length) {
      if (!predicate(array[index], index, array)) {
        return false
      }
    }
    return true
  }

  /**
   * A specialized version of `_.filter` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */
  function arrayFilter(array, predicate) {
    var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = []

    while (++index < length) {
      var value = array[index]
      if (predicate(value, index, array)) {
        result[resIndex++] = value
      }
    }
    return result
  }

  /**
   * A specialized version of `_.includes` for arrays without support for
   * specifying an index to search from.
   *
   * @private
   * @param {Array} [array] The array to inspect.
   * @param {*} target The value to search for.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */
  function arrayIncludes(array, value) {
    var length = array == null ? 0 : array.length
    return !!length && baseIndexOf(array, value, 0) > -1
  }

  /**
   * This function is like `arrayIncludes` except that it accepts a comparator.
   *
   * @private
   * @param {Array} [array] The array to inspect.
   * @param {*} target The value to search for.
   * @param {Function} comparator The comparator invoked per element.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */
  function arrayIncludesWith(array, value, comparator) {
    var index = -1,
      length = array == null ? 0 : array.length

    while (++index < length) {
      if (comparator(value, array[index])) {
        return true
      }
    }
    return false
  }

  /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function arrayMap(array, iteratee) {
    var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length)

    while (++index < length) {
      result[index] = iteratee(array[index], index, array)
    }
    return result
  }

  /**
   * Appends the elements of `values` to `array`.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {Array} values The values to append.
   * @returns {Array} Returns `array`.
   */
  function arrayPush(array, values) {
    var index = -1,
      length = values.length,
      offset = array.length

    while (++index < length) {
      array[offset + index] = values[index]
    }
    return array
  }

  /**
   * A specialized version of `_.reduce` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @param {boolean} [initAccum] Specify using the first element of `array` as
   *  the initial value.
   * @returns {*} Returns the accumulated value.
   */
  function arrayReduce(array, iteratee, accumulator, initAccum) {
    var index = -1,
      length = array == null ? 0 : array.length

    if (initAccum && length) {
      accumulator = array[++index]
    }
    while (++index < length) {
      accumulator = iteratee(accumulator, array[index], index, array)
    }
    return accumulator
  }

  /**
   * A specialized version of `_.some` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if any element passes the predicate check,
   *  else `false`.
   */
  function arraySome(array, predicate) {
    var index = -1,
      length = array == null ? 0 : array.length

    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true
      }
    }
    return false
  }

  /**
   * Gets the size of an ASCII `string`.
   *
   * @private
   * @param {string} string The string inspect.
   * @returns {number} Returns the string size.
   */
  var asciiSize = baseProperty('length')

  /**
   * Converts an ASCII `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function asciiToArray(string) {
    return string.split('')
  }

  /**
   * The base implementation of `_.findIndex` and `_.findLastIndex` without
   * support for iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} predicate The function invoked per iteration.
   * @param {number} fromIndex The index to search from.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1)

    while (fromRight ? index-- : ++index < length) {
      if (predicate(array[index], index, array)) {
        return index
      }
    }
    return -1
  }

  /**
   * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseIndexOf(array, value, fromIndex) {
    return value === value
      ? strictIndexOf(array, value, fromIndex)
      : baseFindIndex(array, baseIsNaN, fromIndex)
  }

  /**
   * This function is like `baseIndexOf` except that it accepts a comparator.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @param {Function} comparator The comparator invoked per element.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseIndexOfWith(array, value, fromIndex, comparator) {
    var index = fromIndex - 1,
      length = array.length

    while (++index < length) {
      if (comparator(array[index], value)) {
        return index
      }
    }
    return -1
  }

  /**
   * The base implementation of `_.isNaN` without support for number objects.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
   */
  function baseIsNaN(value) {
    return value !== value
  }

  /**
   * The base implementation of `_.mean` and `_.meanBy` without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {number} Returns the mean.
   */
  function baseMean(array, iteratee) {
    var length = array == null ? 0 : array.length
    return length ? baseSum(array, iteratee) / length : NAN
  }

  /**
   * The base implementation of `_.property` without support for deep paths.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @returns {Function} Returns the new accessor function.
   */
  function baseProperty(key) {
    return function(object) {
      return object == null ? undefined : object[key]
    }
  }

  /**
   * The base implementation of `_.reduce` and `_.reduceRight`, without support
   * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} accumulator The initial value.
   * @param {boolean} initAccum Specify using the first or last element of
   *  `collection` as the initial value.
   * @param {Function} eachFunc The function to iterate over `collection`.
   * @returns {*} Returns the accumulated value.
   */
  function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
    eachFunc(collection, function(value, index, collection) {
      accumulator = initAccum
        ? ((initAccum = false), value)
        : iteratee(accumulator, value, index, collection)
    })
    return accumulator
  }

  /**
   * The base implementation of `_.sortBy` which uses `comparer` to define the
   * sort order of `array` and replaces criteria objects with their corresponding
   * values.
   *
   * @private
   * @param {Array} array The array to sort.
   * @param {Function} comparer The function to define sort order.
   * @returns {Array} Returns `array`.
   */
  function baseSortBy(array, comparer) {
    var length = array.length

    array.sort(comparer)
    while (length--) {
      array[length] = array[length].value
    }
    return array
  }

  /**
   * The base implementation of `_.sum` and `_.sumBy` without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {number} Returns the sum.
   */
  function baseSum(array, iteratee) {
    var result,
      index = -1,
      length = array.length

    while (++index < length) {
      var current = iteratee(array[index])
      if (current !== undefined) {
        result = result === undefined ? current : result + current
      }
    }
    return result
  }

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
      result = Array(n)

    while (++index < n) {
      result[index] = iteratee(index)
    }
    return result
  }

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function(value) {
      return func(value)
    }
  }

  /**
   * The base implementation of `_.values` and `_.valuesIn` which creates an
   * array of `object` property values corresponding to the property names
   * of `props`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} props The property names to get values for.
   * @returns {Object} Returns the array of property values.
   */
  function baseValues(object, props) {
    return arrayMap(props, function(key) {
      return object[key]
    })
  }

  /**
   * Checks if a `cache` value for `key` exists.
   *
   * @private
   * @param {Object} cache The cache to query.
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function cacheHas(cache, key) {
    return cache.has(key)
  }

  /**
   * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
   * that is not found in the character symbols.
   *
   * @private
   * @param {Array} strSymbols The string symbols to inspect.
   * @param {Array} chrSymbols The character symbols to find.
   * @returns {number} Returns the index of the first unmatched string symbol.
   */
  function charsStartIndex(strSymbols, chrSymbols) {
    var index = -1,
      length = strSymbols.length

    while (
      ++index < length &&
      baseIndexOf(chrSymbols, strSymbols[index], 0) > -1
    ) {}
    return index
  }

  /**
   * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
   * that is not found in the character symbols.
   *
   * @private
   * @param {Array} strSymbols The string symbols to inspect.
   * @param {Array} chrSymbols The character symbols to find.
   * @returns {number} Returns the index of the last unmatched string symbol.
   */
  function charsEndIndex(strSymbols, chrSymbols) {
    var index = strSymbols.length

    while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
    return index
  }

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key]
  }

  /**
   * Checks if `string` contains Unicode symbols.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {boolean} Returns `true` if a symbol is found, else `false`.
   */
  function hasUnicode(string) {
    return reHasUnicode.test(string)
  }

  /**
   * Converts `map` to its key-value pairs.
   *
   * @private
   * @param {Object} map The map to convert.
   * @returns {Array} Returns the key-value pairs.
   */
  function mapToArray(map) {
    var index = -1,
      result = Array(map.size)

    map.forEach(function(value, key) {
      result[++index] = [key, value]
    })
    return result
  }

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg))
    }
  }

  /**
   * Converts `set` to an array of its values.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the values.
   */
  function setToArray(set) {
    var index = -1,
      result = Array(set.size)

    set.forEach(function(value) {
      result[++index] = value
    })
    return result
  }

  /**
   * A specialized version of `_.indexOf` which performs strict equality
   * comparisons of values, i.e. `===`.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function strictIndexOf(array, value, fromIndex) {
    var index = fromIndex - 1,
      length = array.length

    while (++index < length) {
      if (array[index] === value) {
        return index
      }
    }
    return -1
  }

  /**
   * Gets the number of symbols in `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the string size.
   */
  function stringSize(string) {
    return hasUnicode(string) ? unicodeSize(string) : asciiSize(string)
  }

  /**
   * Converts `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function stringToArray(string) {
    return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string)
  }

  /**
   * Gets the size of a Unicode `string`.
   *
   * @private
   * @param {string} string The string inspect.
   * @returns {number} Returns the string size.
   */
  function unicodeSize(string) {
    var result = (reUnicode.lastIndex = 0)
    while (reUnicode.test(string)) {
      ++result
    }
    return result
  }

  /**
   * Converts a Unicode `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */
  function unicodeToArray(string) {
    return string.match(reUnicode) || []
  }

  /*--------------------------------------------------------------------------*/

  /** Used for built-in method references. */
  var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype

  /** Used to detect overreaching core-js shims. */
  var coreJsData = root['__core-js_shared__']

  /** Used to resolve the decompiled source of functions. */
  var funcToString = funcProto.toString

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty

  /** Used to generate unique IDs. */
  var idCounter = 0

  /** Used to detect methods masquerading as native. */
  var maskSrcKey = (function() {
    var uid = /[^.]+$/.exec(
      (coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO) || ''
    )
    return uid ? 'Symbol(src)_1.' + uid : ''
  })()

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto.toString

  /** Used to detect if a method is native. */
  var reIsNative = RegExp(
    '^' +
      funcToString
        .call(hasOwnProperty)
        .replace(reRegExpChar, '\\$&')
        .replace(
          /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
          '$1.*?'
        ) +
      '$'
  )

  /** Built-in value references. */
  var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined,
    getPrototype = overArg(Object.getPrototypeOf, Object),
    objectCreate = Object.create,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined,
    symToStringTag = Symbol ? Symbol.toStringTag : undefined

  var defineProperty = (function() {
    try {
      var func = getNative(Object, 'defineProperty')
      func({}, '', {})
      return func
    } catch (e) {}
  })()

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeCeil = Math.ceil,
    nativeFloor = Math.floor,
    nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeJoin = arrayProto.join,
    nativeKeys = overArg(Object.keys, Object),
    nativeMax = Math.max,
    nativeMin = Math.min,
    nativeNow = Date.now,
    nativeParseInt = root.parseInt,
    nativeReverse = arrayProto.reverse

  /* Built-in method references that are verified to be native. */
  var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create')

  /** Used to lookup unminified function names. */
  var realNames = {}

  /** Used to detect maps, sets, and weakmaps. */
  var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap)

  /** Used to convert symbols to primitives and strings. */
  var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined

  /*------------------------------------------------------------------------*/

  /**
   * Creates a `lodash` object which wraps `value` to enable implicit method
   * chain sequences. Methods that operate on and return arrays, collections,
   * and functions can be chained together. Methods that retrieve a single value
   * or may return a primitive value will automatically end the chain sequence
   * and return the unwrapped value. Otherwise, the value must be unwrapped
   * with `_#value`.
   *
   * Explicit chain sequences, which must be unwrapped with `_#value`, may be
   * enabled using `_.chain`.
   *
   * The execution of chained methods is lazy, that is, it's deferred until
   * `_#value` is implicitly or explicitly called.
   *
   * Lazy evaluation allows several methods to support shortcut fusion.
   * Shortcut fusion is an optimization to merge iteratee calls; this avoids
   * the creation of intermediate arrays and can greatly reduce the number of
   * iteratee executions. Sections of a chain sequence qualify for shortcut
   * fusion if the section is applied to an array and iteratees accept only
   * one argument. The heuristic for whether a section qualifies for shortcut
   * fusion is subject to change.
   *
   * Chaining is supported in custom builds as long as the `_#value` method is
   * directly or indirectly included in the build.
   *
   * In addition to lodash methods, wrappers have `Array` and `String` methods.
   *
   * The wrapper `Array` methods are:
   * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
   *
   * The wrapper `String` methods are:
   * `replace` and `split`
   *
   * The wrapper methods that support shortcut fusion are:
   * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
   * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
   * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
   *
   * The chainable wrapper methods are:
   * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
   * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
   * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
   * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
   * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
   * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
   * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
   * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
   * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
   * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
   * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
   * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
   * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
   * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
   * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
   * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
   * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
   * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
   * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
   * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
   * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
   * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
   * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
   * `zipObject`, `zipObjectDeep`, and `zipWith`
   *
   * The wrapper methods that are **not** chainable by default are:
   * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
   * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
   * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
   * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
   * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
   * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
   * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
   * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
   * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
   * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
   * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
   * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
   * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
   * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
   * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
   * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
   * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
   * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
   * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
   * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
   * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
   * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
   * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
   * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
   * `upperFirst`, `value`, and `words`
   *
   * @name _
   * @constructor
   * @category Seq
   * @param {*} value The value to wrap in a `lodash` instance.
   * @returns {Object} Returns the new `lodash` wrapper instance.
   * @example
   *
   * function square(n) {
   *   return n * n;
   * }
   *
   * var wrapped = _([1, 2, 3]);
   *
   * // Returns an unwrapped value.
   * wrapped.reduce(_.add);
   * // => 6
   *
   * // Returns a wrapped value.
   * var squares = wrapped.map(square);
   *
   * _.isArray(squares);
   * // => false
   *
   * _.isArray(squares.value());
   * // => true
   */
  function lodash() {
    // No operation performed.
  }

  /**
   * The base implementation of `_.create` without support for assigning
   * properties to the created object.
   *
   * @private
   * @param {Object} proto The object to inherit from.
   * @returns {Object} Returns the new object.
   */
  var baseCreate = (function() {
    function object() {}
    return function(proto) {
      if (!isObject(proto)) {
        return {}
      }
      if (objectCreate) {
        return objectCreate(proto)
      }
      object.prototype = proto
      var result = new object()
      object.prototype = undefined
      return result
    }
  })()

  /*------------------------------------------------------------------------*/

  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Hash(entries) {
    var index = -1,
      length = entries == null ? 0 : entries.length

    this.clear()
    while (++index < length) {
      var entry = entries[index]
      this.set(entry[0], entry[1])
    }
  }

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */
  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {}
    this.size = 0
  }

  /**
   * Removes `key` and its value from the hash.
   *
   * @private
   * @name delete
   * @memberOf Hash
   * @param {Object} hash The hash to modify.
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key]
    this.size -= result ? 1 : 0
    return result
  }

  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function hashGet(key) {
    var data = this.__data__
    if (nativeCreate) {
      var result = data[key]
      return result === HASH_UNDEFINED ? undefined : result
    }
    return hasOwnProperty.call(data, key) ? data[key] : undefined
  }

  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function hashHas(key) {
    var data = this.__data__
    return nativeCreate
      ? data[key] !== undefined
      : hasOwnProperty.call(data, key)
  }

  /**
   * Sets the hash `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */
  function hashSet(key, value) {
    var data = this.__data__
    this.size += this.has(key) ? 0 : 1
    data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value
    return this
  }

  // Add methods to `Hash`.
  Hash.prototype.clear = hashClear
  Hash.prototype['delete'] = hashDelete
  Hash.prototype.get = hashGet
  Hash.prototype.has = hashHas
  Hash.prototype.set = hashSet

  /*------------------------------------------------------------------------*/

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function ListCache(entries) {
    var index = -1,
      length = entries == null ? 0 : entries.length

    this.clear()
    while (++index < length) {
      var entry = entries[index]
      this.set(entry[0], entry[1])
    }
  }

  /**
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */
  function listCacheClear() {
    this.__data__ = []
    this.size = 0
  }

  /**
   * Removes `key` and its value from the list cache.
   *
   * @private
   * @name delete
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function listCacheDelete(key) {
    var data = this.__data__,
      index = assocIndexOf(data, key)

    if (index < 0) {
      return false
    }
    var lastIndex = data.length - 1
    if (index == lastIndex) {
      data.pop()
    } else {
      splice.call(data, index, 1)
    }
    --this.size
    return true
  }

  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function listCacheGet(key) {
    var data = this.__data__,
      index = assocIndexOf(data, key)

    return index < 0 ? undefined : data[index][1]
  }

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1
  }

  /**
   * Sets the list cache `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */
  function listCacheSet(key, value) {
    var data = this.__data__,
      index = assocIndexOf(data, key)

    if (index < 0) {
      ++this.size
      data.push([key, value])
    } else {
      data[index][1] = value
    }
    return this
  }

  // Add methods to `ListCache`.
  ListCache.prototype.clear = listCacheClear
  ListCache.prototype['delete'] = listCacheDelete
  ListCache.prototype.get = listCacheGet
  ListCache.prototype.has = listCacheHas
  ListCache.prototype.set = listCacheSet

  /*------------------------------------------------------------------------*/

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function MapCache(entries) {
    var index = -1,
      length = entries == null ? 0 : entries.length

    this.clear()
    while (++index < length) {
      var entry = entries[index]
      this.set(entry[0], entry[1])
    }
  }

  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */
  function mapCacheClear() {
    this.size = 0
    this.__data__ = {
      hash: new Hash(),
      map: new (Map || ListCache)(),
      string: new Hash()
    }
  }

  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function mapCacheDelete(key) {
    var result = getMapData(this, key)['delete'](key)
    this.size -= result ? 1 : 0
    return result
  }

  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function mapCacheGet(key) {
    return getMapData(this, key).get(key)
  }

  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function mapCacheHas(key) {
    return getMapData(this, key).has(key)
  }

  /**
   * Sets the map `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */
  function mapCacheSet(key, value) {
    var data = getMapData(this, key),
      size = data.size

    data.set(key, value)
    this.size += data.size == size ? 0 : 1
    return this
  }

  // Add methods to `MapCache`.
  MapCache.prototype.clear = mapCacheClear
  MapCache.prototype['delete'] = mapCacheDelete
  MapCache.prototype.get = mapCacheGet
  MapCache.prototype.has = mapCacheHas
  MapCache.prototype.set = mapCacheSet

  /*------------------------------------------------------------------------*/

  /**
   *
   * Creates an array cache object to store unique values.
   *
   * @private
   * @constructor
   * @param {Array} [values] The values to cache.
   */
  function SetCache(values) {
    var index = -1,
      length = values == null ? 0 : values.length

    this.__data__ = new MapCache()
    while (++index < length) {
      this.add(values[index])
    }
  }

  /**
   * Adds `value` to the array cache.
   *
   * @private
   * @name add
   * @memberOf SetCache
   * @alias push
   * @param {*} value The value to cache.
   * @returns {Object} Returns the cache instance.
   */
  function setCacheAdd(value) {
    this.__data__.set(value, HASH_UNDEFINED)
    return this
  }

  /**
   * Checks if `value` is in the array cache.
   *
   * @private
   * @name has
   * @memberOf SetCache
   * @param {*} value The value to search for.
   * @returns {number} Returns `true` if `value` is found, else `false`.
   */
  function setCacheHas(value) {
    return this.__data__.has(value)
  }

  // Add methods to `SetCache`.
  SetCache.prototype.add = SetCache.prototype.push = setCacheAdd
  SetCache.prototype.has = setCacheHas

  /*------------------------------------------------------------------------*/

  /**
   * Creates a stack cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Stack(entries) {
    var data = (this.__data__ = new ListCache(entries))
    this.size = data.size
  }

  /**
   * Removes all key-value entries from the stack.
   *
   * @private
   * @name clear
   * @memberOf Stack
   */
  function stackClear() {
    this.__data__ = new ListCache()
    this.size = 0
  }

  /**
   * Removes `key` and its value from the stack.
   *
   * @private
   * @name delete
   * @memberOf Stack
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function stackDelete(key) {
    var data = this.__data__,
      result = data['delete'](key)

    this.size = data.size
    return result
  }

  /**
   * Gets the stack value for `key`.
   *
   * @private
   * @name get
   * @memberOf Stack
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function stackGet(key) {
    return this.__data__.get(key)
  }

  /**
   * Checks if a stack value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Stack
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function stackHas(key) {
    return this.__data__.has(key)
  }

  /**
   * Sets the stack `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Stack
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the stack cache instance.
   */
  function stackSet(key, value) {
    var data = this.__data__
    if (data instanceof ListCache) {
      var pairs = data.__data__
      if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value])
        this.size = ++data.size
        return this
      }
      data = this.__data__ = new MapCache(pairs)
    }
    data.set(key, value)
    this.size = data.size
    return this
  }

  // Add methods to `Stack`.
  Stack.prototype.clear = stackClear
  Stack.prototype['delete'] = stackDelete
  Stack.prototype.get = stackGet
  Stack.prototype.has = stackHas
  Stack.prototype.set = stackSet

  /*------------------------------------------------------------------------*/

  /**
   * Creates an array of the enumerable property names of the array-like `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @param {boolean} inherited Specify returning inherited property names.
   * @returns {Array} Returns the array of property names.
   */
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length

    for (var key in value) {
      if (
        (inherited || hasOwnProperty.call(value, key)) &&
        !(
          skipIndexes &&
          // Safari 9 has enumerable `arguments.length` in strict mode.
          (key == 'length' ||
            // Node.js 0.10 has enumerable non-index properties on buffers.
            (isBuff && (key == 'offset' || key == 'parent')) ||
            // PhantomJS 2 has enumerable non-index properties on typed arrays.
            (isType &&
              (key == 'buffer' ||
                key == 'byteLength' ||
                key == 'byteOffset')) ||
            // Skip index properties.
            isIndex(key, length))
        )
      ) {
        result.push(key)
      }
    }
    return result
  }

  /**
   * Assigns `value` to `key` of `object` if the existing value is not equivalent
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignValue(object, key, value) {
    var objValue = object[key]
    if (
      !(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))
    ) {
      baseAssignValue(object, key, value)
    }
  }

  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function assocIndexOf(array, key) {
    var length = array.length
    while (length--) {
      if (eq(array[length][0], key)) {
        return length
      }
    }
    return -1
  }

  /**
   * Aggregates elements of `collection` on `accumulator` with keys transformed
   * by `iteratee` and values set by `setter`.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} setter The function to set `accumulator` values.
   * @param {Function} iteratee The iteratee to transform keys.
   * @param {Object} accumulator The initial aggregated object.
   * @returns {Function} Returns `accumulator`.
   */
  function baseAggregator(collection, setter, iteratee, accumulator) {
    baseEach(collection, function(value, key, collection) {
      setter(accumulator, value, iteratee(value), collection)
    })
    return accumulator
  }

  /**
   * The base implementation of `_.assign` without support for multiple sources
   * or `customizer` functions.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @returns {Object} Returns `object`.
   */
  function baseAssign(object, source) {
    return object && copyObject(source, keys(source), object)
  }

  /**
   * The base implementation of `_.assignIn` without support for multiple sources
   * or `customizer` functions.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @returns {Object} Returns `object`.
   */
  function baseAssignIn(object, source) {
    return object && copyObject(source, keysIn(source), object)
  }

  /**
   * The base implementation of `assignValue` and `assignMergeValue` without
   * value checks.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function baseAssignValue(object, key, value) {
    if (key == '__proto__' && defineProperty) {
      defineProperty(object, key, {
        configurable: true,
        enumerable: true,
        value: value,
        writable: true
      })
    } else {
      object[key] = value
    }
  }

  /**
   * The base implementation of `_.at` without support for individual paths.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {string[]} paths The property paths to pick.
   * @returns {Array} Returns the picked elements.
   */
  function baseAt(object, paths) {
    var index = -1,
      length = paths.length,
      result = Array(length),
      skip = object == null

    while (++index < length) {
      result[index] = skip ? undefined : get(object, paths[index])
    }
    return result
  }

  /**
   * The base implementation of `_.clone` and `_.cloneDeep` which tracks
   * traversed objects.
   *
   * @private
   * @param {*} value The value to clone.
   * @param {boolean} bitmask The bitmask flags.
   *  1 - Deep clone
   *  2 - Flatten inherited properties
   *  4 - Clone symbols
   * @param {Function} [customizer] The function to customize cloning.
   * @param {string} [key] The key of `value`.
   * @param {Object} [object] The parent object of `value`.
   * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
   * @returns {*} Returns the cloned value.
   */
  function baseClone(value, bitmask, customizer, key, object, stack) {
    var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG

    if (customizer) {
      result = object
        ? customizer(value, key, object, stack)
        : customizer(value)
    }
    if (result !== undefined) {
      return result
    }
    if (!isObject(value)) {
      return value
    }
    var isArr = isArray(value)
    if (isArr) {
      result = initCloneArray(value)
      if (!isDeep) {
        return copyArray(value, result)
      }
    } else {
      var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag

      if (isBuffer(value)) {
        return cloneBuffer(value, isDeep)
      }
      if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
        result = isFlat || isFunc ? {} : initCloneObject(value)
        if (!isDeep) {
          return isFlat
            ? copySymbolsIn(value, baseAssignIn(result, value))
            : copySymbols(value, baseAssign(result, value))
        }
      } else {
        if (!cloneableTags[tag]) {
          return object ? value : {}
        }
        result = initCloneByTag(value, tag, isDeep)
      }
    }
    // Check for circular references and return its corresponding clone.
    stack || (stack = new Stack())
    var stacked = stack.get(value)
    if (stacked) {
      return stacked
    }
    stack.set(value, result)

    if (isSet(value)) {
      value.forEach(function(subValue) {
        result.add(
          baseClone(subValue, bitmask, customizer, subValue, value, stack)
        )
      })

      return result
    }

    if (isMap(value)) {
      value.forEach(function(subValue, key) {
        result.set(
          key,
          baseClone(subValue, bitmask, customizer, key, value, stack)
        )
      })

      return result
    }

    var keysFunc = isFull
      ? isFlat
        ? getAllKeysIn
        : getAllKeys
      : isFlat
      ? keysIn
      : keys

    var props = isArr ? undefined : keysFunc(value)
    arrayEach(props || value, function(subValue, key) {
      if (props) {
        key = subValue
        subValue = value[key]
      }
      // Recursively populate clone (susceptible to call stack limits).
      assignValue(
        result,
        key,
        baseClone(subValue, bitmask, customizer, key, value, stack)
      )
    })
    return result
  }

  /**
   * The base implementation of methods like `_.difference` without support
   * for excluding multiple arrays or iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Array} values The values to exclude.
   * @param {Function} [iteratee] The iteratee invoked per element.
   * @param {Function} [comparator] The comparator invoked per element.
   * @returns {Array} Returns the new array of filtered values.
   */
  function baseDifference(array, values, iteratee, comparator) {
    var index = -1,
      includes = arrayIncludes,
      isCommon = true,
      length = array.length,
      result = [],
      valuesLength = values.length

    if (!length) {
      return result
    }
    if (iteratee) {
      values = arrayMap(values, baseUnary(iteratee))
    }
    if (comparator) {
      includes = arrayIncludesWith
      isCommon = false
    } else if (values.length >= LARGE_ARRAY_SIZE) {
      includes = cacheHas
      isCommon = false
      values = new SetCache(values)
    }
    outer: while (++index < length) {
      var value = array[index],
        computed = iteratee == null ? value : iteratee(value)

      value = comparator || value !== 0 ? value : 0
      if (isCommon && computed === computed) {
        var valuesIndex = valuesLength
        while (valuesIndex--) {
          if (values[valuesIndex] === computed) {
            continue outer
          }
        }
        result.push(value)
      } else if (!includes(values, computed, comparator)) {
        result.push(value)
      }
    }
    return result
  }

  /**
   * The base implementation of `_.forEach` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array|Object} Returns `collection`.
   */
  var baseEach = createBaseEach(baseForOwn)

  /**
   * The base implementation of `_.forEachRight` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array|Object} Returns `collection`.
   */
  var baseEachRight = createBaseEach(baseForOwnRight, true)

  /**
   * The base implementation of `_.every` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if all elements pass the predicate check,
   *  else `false`
   */
  function baseEvery(collection, predicate) {
    var result = true
    baseEach(collection, function(value, index, collection) {
      result = !!predicate(value, index, collection)
      return result
    })
    return result
  }

  /**
   * The base implementation of methods like `_.max` and `_.min` which accepts a
   * `comparator` to determine the extremum value.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The iteratee invoked per iteration.
   * @param {Function} comparator The comparator used to compare values.
   * @returns {*} Returns the extremum value.
   */
  function baseExtremum(array, iteratee, comparator) {
    var index = -1,
      length = array.length

    while (++index < length) {
      var value = array[index],
        current = iteratee(value)

      if (
        current != null &&
        (computed === undefined
          ? current === current && !isSymbol(current)
          : comparator(current, computed))
      ) {
        var computed = current,
          result = value
      }
    }
    return result
  }

  /**
   * The base implementation of `_.filter` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */
  function baseFilter(collection, predicate) {
    var result = []
    baseEach(collection, function(value, index, collection) {
      if (predicate(value, index, collection)) {
        result.push(value)
      }
    })
    return result
  }

  /**
   * The base implementation of `_.flatten` with support for restricting flattening.
   *
   * @private
   * @param {Array} array The array to flatten.
   * @param {number} depth The maximum recursion depth.
   * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
   * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
   * @param {Array} [result=[]] The initial result value.
   * @returns {Array} Returns the new flattened array.
   */
  function baseFlatten(array, depth, predicate, isStrict, result) {
    var index = -1,
      length = array.length

    predicate || (predicate = isFlattenable)
    result || (result = [])

    while (++index < length) {
      var value = array[index]
      if (depth > 0 && predicate(value)) {
        if (depth > 1) {
          // Recursively flatten arrays (susceptible to call stack limits).
          baseFlatten(value, depth - 1, predicate, isStrict, result)
        } else {
          arrayPush(result, value)
        }
      } else if (!isStrict) {
        result[result.length] = value
      }
    }
    return result
  }

  /**
   * The base implementation of `baseForOwn` which iterates over `object`
   * properties returned by `keysFunc` and invokes `iteratee` for each property.
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */
  var baseFor = createBaseFor()

  /**
   * This function is like `baseFor` except that it iterates over properties
   * in the opposite order.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */
  var baseForRight = createBaseFor(true)

  /**
   * The base implementation of `_.forOwn` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Object} Returns `object`.
   */
  function baseForOwn(object, iteratee) {
    return object && baseFor(object, iteratee, keys)
  }

  /**
   * The base implementation of `_.forOwnRight` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Object} Returns `object`.
   */
  function baseForOwnRight(object, iteratee) {
    return object && baseForRight(object, iteratee, keys)
  }

  /**
   * The base implementation of `_.get` without support for default values.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @returns {*} Returns the resolved value.
   */
  function baseGet(object, path) {
    path = castPath(path, object)

    var index = 0,
      length = path.length

    while (object != null && index < length) {
      object = object[toKey(path[index++])]
    }
    return index && index == length ? object : undefined
  }

  /**
   * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
   * `keysFunc` and `symbolsFunc` to get the enumerable property names and
   * symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @param {Function} symbolsFunc The function to get the symbols of `object`.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object)
    return isArray(object) ? result : arrayPush(result, symbolsFunc(object))
  }

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag
    }
    return symToStringTag && symToStringTag in Object(value)
      ? getRawTag(value)
      : objectToString(value)
  }

  /**
   * The base implementation of `_.gt` which doesn't coerce arguments.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if `value` is greater than `other`,
   *  else `false`.
   */
  function baseGt(value, other) {
    return value > other
  }

  /**
   * The base implementation of `_.hasIn` without support for deep paths.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {Array|string} key The key to check.
   * @returns {boolean} Returns `true` if `key` exists, else `false`.
   */
  function baseHasIn(object, key) {
    return object != null && key in Object(object)
  }

  /**
   * The base implementation of methods like `_.intersection`, without support
   * for iteratee shorthands, that accepts an array of arrays to inspect.
   *
   * @private
   * @param {Array} arrays The arrays to inspect.
   * @param {Function} [iteratee] The iteratee invoked per element.
   * @param {Function} [comparator] The comparator invoked per element.
   * @returns {Array} Returns the new array of shared values.
   */
  function baseIntersection(arrays, iteratee, comparator) {
    var includes = comparator ? arrayIncludesWith : arrayIncludes,
      length = arrays[0].length,
      othLength = arrays.length,
      othIndex = othLength,
      caches = Array(othLength),
      maxLength = Infinity,
      result = []

    while (othIndex--) {
      var array = arrays[othIndex]
      if (othIndex && iteratee) {
        array = arrayMap(array, baseUnary(iteratee))
      }
      maxLength = nativeMin(array.length, maxLength)
      caches[othIndex] =
        !comparator && (iteratee || (length >= 120 && array.length >= 120))
          ? new SetCache(othIndex && array)
          : undefined
    }
    array = arrays[0]

    var index = -1,
      seen = caches[0]

    outer: while (++index < length && result.length < maxLength) {
      var value = array[index],
        computed = iteratee ? iteratee(value) : value

      value = comparator || value !== 0 ? value : 0
      if (
        !(seen
          ? cacheHas(seen, computed)
          : includes(result, computed, comparator))
      ) {
        othIndex = othLength
        while (--othIndex) {
          var cache = caches[othIndex]
          if (
            !(cache
              ? cacheHas(cache, computed)
              : includes(arrays[othIndex], computed, comparator))
          ) {
            continue outer
          }
        }
        if (seen) {
          seen.push(computed)
        }
        result.push(value)
      }
    }
    return result
  }

  /**
   * The base implementation of `_.isArguments`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   */
  function baseIsArguments(value) {
    return isObjectLike(value) && baseGetTag(value) == argsTag
  }

  /**
   * The base implementation of `_.isEqual` which supports partial comparisons
   * and tracks traversed objects.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @param {boolean} bitmask The bitmask flags.
   *  1 - Unordered comparison
   *  2 - Partial comparison
   * @param {Function} [customizer] The function to customize comparisons.
   * @param {Object} [stack] Tracks traversed `value` and `other` objects.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   */
  function baseIsEqual(value, other, bitmask, customizer, stack) {
    if (value === other) {
      return true
    }
    if (
      value == null ||
      other == null ||
      (!isObjectLike(value) && !isObjectLike(other))
    ) {
      return value !== value && other !== other
    }
    return baseIsEqualDeep(
      value,
      other,
      bitmask,
      customizer,
      baseIsEqual,
      stack
    )
  }

  /**
   * A specialized version of `baseIsEqual` for arrays and objects which performs
   * deep comparisons and tracks traversed objects enabling objects with circular
   * references to be compared.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} [stack] Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function baseIsEqualDeep(
    object,
    other,
    bitmask,
    customizer,
    equalFunc,
    stack
  ) {
    var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other)

    objTag = objTag == argsTag ? objectTag : objTag
    othTag = othTag == argsTag ? objectTag : othTag

    var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag

    if (isSameTag && isBuffer(object)) {
      if (!isBuffer(other)) {
        return false
      }
      objIsArr = true
      objIsObj = false
    }
    if (isSameTag && !objIsObj) {
      stack || (stack = new Stack())
      return objIsArr || isTypedArray(object)
        ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
        : equalByTag(
            object,
            other,
            objTag,
            bitmask,
            customizer,
            equalFunc,
            stack
          )
    }
    if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
      var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__')

      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other

        stack || (stack = new Stack())
        return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack)
      }
    }
    if (!isSameTag) {
      return false
    }
    stack || (stack = new Stack())
    return equalObjects(object, other, bitmask, customizer, equalFunc, stack)
  }

  /**
   * The base implementation of `_.isMap` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a map, else `false`.
   */
  function baseIsMap(value) {
    return isObjectLike(value) && getTag(value) == mapTag
  }

  /**
   * The base implementation of `_.isMatch` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The object to inspect.
   * @param {Object} source The object of property values to match.
   * @param {Array} matchData The property names, values, and compare flags to match.
   * @param {Function} [customizer] The function to customize comparisons.
   * @returns {boolean} Returns `true` if `object` is a match, else `false`.
   */
  function baseIsMatch(object, source, matchData, customizer) {
    var index = matchData.length,
      length = index,
      noCustomizer = !customizer

    if (object == null) {
      return !length
    }
    object = Object(object)
    while (index--) {
      var data = matchData[index]
      if (
        noCustomizer && data[2]
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
      ) {
        return false
      }
    }
    while (++index < length) {
      data = matchData[index]
      var key = data[0],
        objValue = object[key],
        srcValue = data[1]

      if (noCustomizer && data[2]) {
        if (objValue === undefined && !(key in object)) {
          return false
        }
      } else {
        var stack = new Stack()
        if (customizer) {
          var result = customizer(
            objValue,
            srcValue,
            key,
            object,
            source,
            stack
          )
        }
        if (
          !(result === undefined
            ? baseIsEqual(
                srcValue,
                objValue,
                COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG,
                customizer,
                stack
              )
            : result)
        ) {
          return false
        }
      }
    }
    return true
  }

  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */
  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false
    }
    var pattern = isFunction(value) ? reIsNative : reIsHostCtor
    return pattern.test(toSource(value))
  }

  /**
   * The base implementation of `_.isSet` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a set, else `false`.
   */
  function baseIsSet(value) {
    return isObjectLike(value) && getTag(value) == setTag
  }

  /**
   * The base implementation of `_.isTypedArray` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   */
  function baseIsTypedArray(value) {
    return (
      isObjectLike(value) &&
      isLength(value.length) &&
      !!typedArrayTags[baseGetTag(value)]
    )
  }

  /**
   * The base implementation of `_.iteratee`.
   *
   * @private
   * @param {*} [value=_.identity] The value to convert to an iteratee.
   * @returns {Function} Returns the iteratee.
   */
  function baseIteratee(value) {
    // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
    // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
    if (typeof value == 'function') {
      return value
    }
    if (value == null) {
      return identity
    }
    if (typeof value == 'object') {
      return isArray(value)
        ? baseMatchesProperty(value[0], value[1])
        : baseMatches(value)
    }
    return property(value)
  }

  /**
   * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeys(object) {
    if (!isPrototype(object)) {
      return nativeKeys(object)
    }
    var result = []
    for (var key in Object(object)) {
      if (hasOwnProperty.call(object, key) && key != 'constructor') {
        result.push(key)
      }
    }
    return result
  }

  /**
   * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeysIn(object) {
    if (!isObject(object)) {
      return nativeKeysIn(object)
    }
    var isProto = isPrototype(object),
      result = []

    for (var key in object) {
      if (
        !(
          key == 'constructor' &&
          (isProto || !hasOwnProperty.call(object, key))
        )
      ) {
        result.push(key)
      }
    }
    return result
  }

  /**
   * The base implementation of `_.lt` which doesn't coerce arguments.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if `value` is less than `other`,
   *  else `false`.
   */
  function baseLt(value, other) {
    return value < other
  }

  /**
   * The base implementation of `_.map` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function baseMap(collection, iteratee) {
    var index = -1,
      result = isArrayLike(collection) ? Array(collection.length) : []

    baseEach(collection, function(value, key, collection) {
      result[++index] = iteratee(value, key, collection)
    })
    return result
  }

  /**
   * The base implementation of `_.matches` which doesn't clone `source`.
   *
   * @private
   * @param {Object} source The object of property values to match.
   * @returns {Function} Returns the new spec function.
   */
  function baseMatches(source) {
    var matchData = getMatchData(source)
    if (matchData.length == 1 && matchData[0][2]) {
      return matchesStrictComparable(matchData[0][0], matchData[0][1])
    }
    return function(object) {
      return object === source || baseIsMatch(object, source, matchData)
    }
  }

  /**
   * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
   *
   * @private
   * @param {string} path The path of the property to get.
   * @param {*} srcValue The value to match.
   * @returns {Function} Returns the new spec function.
   */
  function baseMatchesProperty(path, srcValue) {
    if (isKey(path) && isStrictComparable(srcValue)) {
      return matchesStrictComparable(toKey(path), srcValue)
    }
    return function(object) {
      var objValue = get(object, path)
      return objValue === undefined && objValue === srcValue
        ? hasIn(object, path)
        : baseIsEqual(
            srcValue,
            objValue,
            COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG
          )
    }
  }

  /**
   * The base implementation of `_.orderBy` without param guards.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
   * @param {string[]} orders The sort orders of `iteratees`.
   * @returns {Array} Returns the new sorted array.
   */
  function baseOrderBy(collection, iteratees, orders) {
    var index = -1
    iteratees = arrayMap(
      iteratees.length ? iteratees : [identity],
      baseUnary(getIteratee())
    )

    var result = baseMap(collection, function(value, key, collection) {
      var criteria = arrayMap(iteratees, function(iteratee) {
        return iteratee(value)
      })
      return { criteria: criteria, index: ++index, value: value }
    })

    return baseSortBy(result, function(object, other) {
      return compareMultiple(object, other, orders)
    })
  }

  /**
   * The base implementation of `_.pick` without support for individual
   * property identifiers.
   *
   * @private
   * @param {Object} object The source object.
   * @param {string[]} paths The property paths to pick.
   * @returns {Object} Returns the new object.
   */
  function basePick(object, paths) {
    return basePickBy(object, paths, function(value, path) {
      return hasIn(object, path)
    })
  }

  /**
   * The base implementation of  `_.pickBy` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The source object.
   * @param {string[]} paths The property paths to pick.
   * @param {Function} predicate The function invoked per property.
   * @returns {Object} Returns the new object.
   */
  function basePickBy(object, paths, predicate) {
    var index = -1,
      length = paths.length,
      result = {}

    while (++index < length) {
      var path = paths[index],
        value = baseGet(object, path)

      if (predicate(value, path)) {
        baseSet(result, castPath(path, object), value)
      }
    }
    return result
  }

  /**
   * A specialized version of `baseProperty` which supports deep paths.
   *
   * @private
   * @param {Array|string} path The path of the property to get.
   * @returns {Function} Returns the new accessor function.
   */
  function basePropertyDeep(path) {
    return function(object) {
      return baseGet(object, path)
    }
  }

  /**
   * The base implementation of `_.pullAllBy` without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {Array} values The values to remove.
   * @param {Function} [iteratee] The iteratee invoked per element.
   * @param {Function} [comparator] The comparator invoked per element.
   * @returns {Array} Returns `array`.
   */
  function basePullAll(array, values, iteratee, comparator) {
    var indexOf = comparator ? baseIndexOfWith : baseIndexOf,
      index = -1,
      length = values.length,
      seen = array

    if (array === values) {
      values = copyArray(values)
    }
    if (iteratee) {
      seen = arrayMap(array, baseUnary(iteratee))
    }
    while (++index < length) {
      var fromIndex = 0,
        value = values[index],
        computed = iteratee ? iteratee(value) : value

      while (
        (fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1
      ) {
        if (seen !== array) {
          splice.call(seen, fromIndex, 1)
        }
        splice.call(array, fromIndex, 1)
      }
    }
    return array
  }

  /**
   * The base implementation of `_.pullAt` without support for individual
   * indexes or capturing the removed elements.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {number[]} indexes The indexes of elements to remove.
   * @returns {Array} Returns `array`.
   */
  function basePullAt(array, indexes) {
    var length = array ? indexes.length : 0,
      lastIndex = length - 1

    while (length--) {
      var index = indexes[length]
      if (length == lastIndex || index !== previous) {
        var previous = index
        if (isIndex(index)) {
          splice.call(array, index, 1)
        } else {
          baseUnset(array, index)
        }
      }
    }
    return array
  }

  /**
   * The base implementation of `_.repeat` which doesn't coerce arguments.
   *
   * @private
   * @param {string} string The string to repeat.
   * @param {number} n The number of times to repeat the string.
   * @returns {string} Returns the repeated string.
   */
  function baseRepeat(string, n) {
    var result = ''
    if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
      return result
    }
    // Leverage the exponentiation by squaring algorithm for a faster repeat.
    // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
    do {
      if (n % 2) {
        result += string
      }
      n = nativeFloor(n / 2)
      if (n) {
        string += string
      }
    } while (n)

    return result
  }

  /**
   * The base implementation of `_.rest` which doesn't validate or coerce arguments.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @returns {Function} Returns the new function.
   */
  function baseRest(func, start) {
    return setToString(overRest(func, start, identity), func + '')
  }

  /**
   * The base implementation of `_.set`.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {Array|string} path The path of the property to set.
   * @param {*} value The value to set.
   * @param {Function} [customizer] The function to customize path creation.
   * @returns {Object} Returns `object`.
   */
  function baseSet(object, path, value, customizer) {
    if (!isObject(object)) {
      return object
    }
    path = castPath(path, object)

    var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object

    while (nested != null && ++index < length) {
      var key = toKey(path[index]),
        newValue = value

      if (index != lastIndex) {
        var objValue = nested[key]
        newValue = customizer ? customizer(objValue, key, nested) : undefined
        if (newValue === undefined) {
          newValue = isObject(objValue)
            ? objValue
            : isIndex(path[index + 1])
            ? []
            : {}
        }
      }
      assignValue(nested, key, newValue)
      nested = nested[key]
    }
    return object
  }

  /**
   * The base implementation of `setToString` without support for hot loop shorting.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  var baseSetToString = !defineProperty
    ? identity
    : function(func, string) {
        return defineProperty(func, 'toString', {
          configurable: true,
          enumerable: false,
          value: constant(string),
          writable: true
        })
      }

  /**
   * The base implementation of `_.slice` without an iteratee call guard.
   *
   * @private
   * @param {Array} array The array to slice.
   * @param {number} [start=0] The start position.
   * @param {number} [end=array.length] The end position.
   * @returns {Array} Returns the slice of `array`.
   */
  function baseSlice(array, start, end) {
    var index = -1,
      length = array.length

    if (start < 0) {
      start = -start > length ? 0 : length + start
    }
    end = end > length ? length : end
    if (end < 0) {
      end += length
    }
    length = start > end ? 0 : (end - start) >>> 0
    start >>>= 0

    var result = Array(length)
    while (++index < length) {
      result[index] = array[index + start]
    }
    return result
  }

  /**
   * The base implementation of `_.some` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if any element passes the predicate check,
   *  else `false`.
   */
  function baseSome(collection, predicate) {
    var result

    baseEach(collection, function(value, index, collection) {
      result = predicate(value, index, collection)
      return !result
    })
    return !!result
  }

  /**
   * The base implementation of `_.toNumber` which doesn't ensure correct
   * conversions of binary, hexadecimal, or octal string values.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {number} Returns the number.
   */
  function baseToNumber(value) {
    if (typeof value == 'number') {
      return value
    }
    if (isSymbol(value)) {
      return NAN
    }
    return +value
  }

  /**
   * The base implementation of `_.toString` which doesn't convert nullish
   * values to empty strings.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */
  function baseToString(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == 'string') {
      return value
    }
    if (isArray(value)) {
      // Recursively convert values (susceptible to call stack limits).
      return arrayMap(value, baseToString) + ''
    }
    if (isSymbol(value)) {
      return symbolToString ? symbolToString.call(value) : ''
    }
    var result = value + ''
    return result == '0' && 1 / value == -INFINITY ? '-0' : result
  }

  /**
   * The base implementation of `_.uniqBy` without support for iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} [iteratee] The iteratee invoked per element.
   * @param {Function} [comparator] The comparator invoked per element.
   * @returns {Array} Returns the new duplicate free array.
   */
  function baseUniq(array, iteratee, comparator) {
    var index = -1,
      includes = arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result

    if (comparator) {
      isCommon = false
      includes = arrayIncludesWith
    } else if (length >= LARGE_ARRAY_SIZE) {
      var set = iteratee ? null : createSet(array)
      if (set) {
        return setToArray(set)
      }
      isCommon = false
      includes = cacheHas
      seen = new SetCache()
    } else {
      seen = iteratee ? [] : result
    }
    outer: while (++index < length) {
      var value = array[index],
        computed = iteratee ? iteratee(value) : value

      value = comparator || value !== 0 ? value : 0
      if (isCommon && computed === computed) {
        var seenIndex = seen.length
        while (seenIndex--) {
          if (seen[seenIndex] === computed) {
            continue outer
          }
        }
        if (iteratee) {
          seen.push(computed)
        }
        result.push(value)
      } else if (!includes(seen, computed, comparator)) {
        if (seen !== result) {
          seen.push(computed)
        }
        result.push(value)
      }
    }
    return result
  }

  /**
   * The base implementation of `_.unset`.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {Array|string} path The property path to unset.
   * @returns {boolean} Returns `true` if the property is deleted, else `false`.
   */
  function baseUnset(object, path) {
    path = castPath(path, object)
    object = parent(object, path)
    return object == null || delete object[toKey(last(path))]
  }

  /**
   * The base implementation of methods like `_.dropWhile` and `_.takeWhile`
   * without support for iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to query.
   * @param {Function} predicate The function invoked per iteration.
   * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Array} Returns the slice of `array`.
   */
  function baseWhile(array, predicate, isDrop, fromRight) {
    var length = array.length,
      index = fromRight ? length : -1

    while (
      (fromRight ? index-- : ++index < length) &&
      predicate(array[index], index, array)
    ) {}

    return isDrop
      ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length)
      : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index)
  }

  /**
   * The base implementation of methods like `_.xor`, without support for
   * iteratee shorthands, that accepts an array of arrays to inspect.
   *
   * @private
   * @param {Array} arrays The arrays to inspect.
   * @param {Function} [iteratee] The iteratee invoked per element.
   * @param {Function} [comparator] The comparator invoked per element.
   * @returns {Array} Returns the new array of values.
   */
  function baseXor(arrays, iteratee, comparator) {
    var length = arrays.length
    if (length < 2) {
      return length ? baseUniq(arrays[0]) : []
    }
    var index = -1,
      result = Array(length)

    while (++index < length) {
      var array = arrays[index],
        othIndex = -1

      while (++othIndex < length) {
        if (othIndex != index) {
          result[index] = baseDifference(
            result[index] || array,
            arrays[othIndex],
            iteratee,
            comparator
          )
        }
      }
    }
    return baseUniq(baseFlatten(result, 1), iteratee, comparator)
  }

  /**
   * Casts `value` to an empty array if it's not an array like object.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {Array|Object} Returns the cast array-like object.
   */
  function castArrayLikeObject(value) {
    return isArrayLikeObject(value) ? value : []
  }

  /**
   * Casts `value` to a path array if it's not one.
   *
   * @private
   * @param {*} value The value to inspect.
   * @param {Object} [object] The object to query keys on.
   * @returns {Array} Returns the cast property path array.
   */
  function castPath(value, object) {
    if (isArray(value)) {
      return value
    }
    return isKey(value, object) ? [value] : stringToPath(toString(value))
  }

  /**
   * Casts `array` to a slice if it's needed.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {number} start The start position.
   * @param {number} [end=array.length] The end position.
   * @returns {Array} Returns the cast slice.
   */
  function castSlice(array, start, end) {
    var length = array.length
    end = end === undefined ? length : end
    return !start && end >= length ? array : baseSlice(array, start, end)
  }

  /**
   * Creates a clone of  `buffer`.
   *
   * @private
   * @param {Buffer} buffer The buffer to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Buffer} Returns the cloned buffer.
   */
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice()
    }
    var length = buffer.length,
      result = allocUnsafe
        ? allocUnsafe(length)
        : new buffer.constructor(length)

    buffer.copy(result)
    return result
  }

  /**
   * Creates a clone of `arrayBuffer`.
   *
   * @private
   * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
   * @returns {ArrayBuffer} Returns the cloned array buffer.
   */
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength)
    new Uint8Array(result).set(new Uint8Array(arrayBuffer))
    return result
  }

  /**
   * Creates a clone of `dataView`.
   *
   * @private
   * @param {Object} dataView The data view to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned data view.
   */
  function cloneDataView(dataView, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer
    return new dataView.constructor(
      buffer,
      dataView.byteOffset,
      dataView.byteLength
    )
  }

  /**
   * Creates a clone of `regexp`.
   *
   * @private
   * @param {Object} regexp The regexp to clone.
   * @returns {Object} Returns the cloned regexp.
   */
  function cloneRegExp(regexp) {
    var result = new regexp.constructor(regexp.source, reFlags.exec(regexp))
    result.lastIndex = regexp.lastIndex
    return result
  }

  /**
   * Creates a clone of the `symbol` object.
   *
   * @private
   * @param {Object} symbol The symbol object to clone.
   * @returns {Object} Returns the cloned symbol object.
   */
  function cloneSymbol(symbol) {
    return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {}
  }

  /**
   * Creates a clone of `typedArray`.
   *
   * @private
   * @param {Object} typedArray The typed array to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned typed array.
   */
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep
      ? cloneArrayBuffer(typedArray.buffer)
      : typedArray.buffer
    return new typedArray.constructor(
      buffer,
      typedArray.byteOffset,
      typedArray.length
    )
  }

  /**
   * Compares values to sort them in ascending order.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {number} Returns the sort order indicator for `value`.
   */
  function compareAscending(value, other) {
    if (value !== other) {
      var valIsDefined = value !== undefined,
        valIsNull = value === null,
        valIsReflexive = value === value,
        valIsSymbol = isSymbol(value)

      var othIsDefined = other !== undefined,
        othIsNull = other === null,
        othIsReflexive = other === other,
        othIsSymbol = isSymbol(other)

      if (
        (!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
        (valIsSymbol &&
          othIsDefined &&
          othIsReflexive &&
          !othIsNull &&
          !othIsSymbol) ||
        (valIsNull && othIsDefined && othIsReflexive) ||
        (!valIsDefined && othIsReflexive) ||
        !valIsReflexive
      ) {
        return 1
      }
      if (
        (!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
        (othIsSymbol &&
          valIsDefined &&
          valIsReflexive &&
          !valIsNull &&
          !valIsSymbol) ||
        (othIsNull && valIsDefined && valIsReflexive) ||
        (!othIsDefined && valIsReflexive) ||
        !othIsReflexive
      ) {
        return -1
      }
    }
    return 0
  }

  /**
   * Used by `_.orderBy` to compare multiple properties of a value to another
   * and stable sort them.
   *
   * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
   * specify an order of "desc" for descending or "asc" for ascending sort order
   * of corresponding values.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {boolean[]|string[]} orders The order to sort by for each property.
   * @returns {number} Returns the sort order indicator for `object`.
   */
  function compareMultiple(object, other, orders) {
    var index = -1,
      objCriteria = object.criteria,
      othCriteria = other.criteria,
      length = objCriteria.length,
      ordersLength = orders.length

    while (++index < length) {
      var result = compareAscending(objCriteria[index], othCriteria[index])
      if (result) {
        if (index >= ordersLength) {
          return result
        }
        var order = orders[index]
        return result * (order == 'desc' ? -1 : 1)
      }
    }
    // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
    // that causes it, under certain circumstances, to provide the same value for
    // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
    // for more details.
    //
    // This also ensures a stable sort in V8 and other engines.
    // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
    return object.index - other.index
  }

  /**
   * Copies the values of `source` to `array`.
   *
   * @private
   * @param {Array} source The array to copy values from.
   * @param {Array} [array=[]] The array to copy values to.
   * @returns {Array} Returns `array`.
   */
  function copyArray(source, array) {
    var index = -1,
      length = source.length

    array || (array = Array(length))
    while (++index < length) {
      array[index] = source[index]
    }
    return array
  }

  /**
   * Copies properties of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy properties from.
   * @param {Array} props The property identifiers to copy.
   * @param {Object} [object={}] The object to copy properties to.
   * @param {Function} [customizer] The function to customize copied values.
   * @returns {Object} Returns `object`.
   */
  function copyObject(source, props, object, customizer) {
    var isNew = !object
    object || (object = {})

    var index = -1,
      length = props.length

    while (++index < length) {
      var key = props[index]

      var newValue = customizer
        ? customizer(object[key], source[key], key, object, source)
        : undefined

      if (newValue === undefined) {
        newValue = source[key]
      }
      if (isNew) {
        baseAssignValue(object, key, newValue)
      } else {
        assignValue(object, key, newValue)
      }
    }
    return object
  }

  /**
   * Copies own symbols of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy symbols from.
   * @param {Object} [object={}] The object to copy symbols to.
   * @returns {Object} Returns `object`.
   */
  function copySymbols(source, object) {
    return copyObject(source, getSymbols(source), object)
  }

  /**
   * Copies own and inherited symbols of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy symbols from.
   * @param {Object} [object={}] The object to copy symbols to.
   * @returns {Object} Returns `object`.
   */
  function copySymbolsIn(source, object) {
    return copyObject(source, getSymbolsIn(source), object)
  }

  /**
   * Creates a function like `_.groupBy`.
   *
   * @private
   * @param {Function} setter The function to set accumulator values.
   * @param {Function} [initializer] The accumulator object initializer.
   * @returns {Function} Returns the new aggregator function.
   */
  function createAggregator(setter, initializer) {
    return function(collection, iteratee) {
      var func = isArray(collection) ? arrayAggregator : baseAggregator,
        accumulator = initializer ? initializer() : {}

      return func(collection, setter, getIteratee(iteratee, 2), accumulator)
    }
  }

  /**
   * Creates a function like `_.assign`.
   *
   * @private
   * @param {Function} assigner The function to assign values.
   * @returns {Function} Returns the new assigner function.
   */
  function createAssigner(assigner) {
    return baseRest(function(object, sources) {
      var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined

      customizer =
        assigner.length > 3 && typeof customizer == 'function'
          ? (length--, customizer)
          : undefined

      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        customizer = length < 3 ? undefined : customizer
        length = 1
      }
      object = Object(object)
      while (++index < length) {
        var source = sources[index]
        if (source) {
          assigner(object, source, index, customizer)
        }
      }
      return object
    })
  }

  /**
   * Creates a `baseEach` or `baseEachRight` function.
   *
   * @private
   * @param {Function} eachFunc The function to iterate over a collection.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseEach(eachFunc, fromRight) {
    return function(collection, iteratee) {
      if (collection == null) {
        return collection
      }
      if (!isArrayLike(collection)) {
        return eachFunc(collection, iteratee)
      }
      var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection)

      while (fromRight ? index-- : ++index < length) {
        if (iteratee(iterable[index], index, iterable) === false) {
          break
        }
      }
      return collection
    }
  }

  /**
   * Creates a base function for methods like `_.forIn` and `_.forOwn`.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseFor(fromRight) {
    return function(object, iteratee, keysFunc) {
      var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length

      while (length--) {
        var key = props[fromRight ? length : ++index]
        if (iteratee(iterable[key], key, iterable) === false) {
          break
        }
      }
      return object
    }
  }

  /**
   * Creates a `_.find` or `_.findLast` function.
   *
   * @private
   * @param {Function} findIndexFunc The function to find the collection index.
   * @returns {Function} Returns the new find function.
   */
  function createFind(findIndexFunc) {
    return function(collection, predicate, fromIndex) {
      var iterable = Object(collection)
      if (!isArrayLike(collection)) {
        var iteratee = getIteratee(predicate, 3)
        collection = keys(collection)
        predicate = function(key) {
          return iteratee(iterable[key], key, iterable)
        }
      }
      var index = findIndexFunc(collection, predicate, fromIndex)
      return index > -1
        ? iterable[iteratee ? collection[index] : index]
        : undefined
    }
  }

  /**
   * Creates a function that performs a mathematical operation on two values.
   *
   * @private
   * @param {Function} operator The function to perform the operation.
   * @param {number} [defaultValue] The value used for `undefined` arguments.
   * @returns {Function} Returns the new mathematical operation function.
   */
  function createMathOperation(operator, defaultValue) {
    return function(value, other) {
      var result
      if (value === undefined && other === undefined) {
        return defaultValue
      }
      if (value !== undefined) {
        result = value
      }
      if (other !== undefined) {
        if (result === undefined) {
          return other
        }
        if (typeof value == 'string' || typeof other == 'string') {
          value = baseToString(value)
          other = baseToString(other)
        } else {
          value = baseToNumber(value)
          other = baseToNumber(other)
        }
        result = operator(value, other)
      }
      return result
    }
  }

  /**
   * Creates the padding for `string` based on `length`. The `chars` string
   * is truncated if the number of characters exceeds `length`.
   *
   * @private
   * @param {number} length The padding length.
   * @param {string} [chars=' '] The string used as padding.
   * @returns {string} Returns the padding for `string`.
   */
  function createPadding(length, chars) {
    chars = chars === undefined ? ' ' : baseToString(chars)

    var charsLength = chars.length
    if (charsLength < 2) {
      return charsLength ? baseRepeat(chars, length) : chars
    }
    var result = baseRepeat(chars, nativeCeil(length / stringSize(chars)))
    return hasUnicode(chars)
      ? castSlice(stringToArray(result), 0, length).join('')
      : result.slice(0, length)
  }

  /**
   * Creates a function like `_.round`.
   *
   * @private
   * @param {string} methodName The name of the `Math` method to use when rounding.
   * @returns {Function} Returns the new round function.
   */
  function createRound(methodName) {
    var func = Math[methodName]
    return function(number, precision) {
      number = toNumber(number)
      precision = precision == null ? 0 : nativeMin(toInteger(precision), 292)
      if (precision) {
        // Shift with exponential notation to avoid floating-point issues.
        // See [MDN](https://mdn.io/round#Examples) for more details.
        var pair = (toString(number) + 'e').split('e'),
          value = func(pair[0] + 'e' + (+pair[1] + precision))

        pair = (toString(value) + 'e').split('e')
        return +(pair[0] + 'e' + (+pair[1] - precision))
      }
      return func(number)
    }
  }

  /**
   * Creates a set object of `values`.
   *
   * @private
   * @param {Array} values The values to add to the set.
   * @returns {Object} Returns the new set.
   */
  var createSet = !(Set && 1 / setToArray(new Set([, -0]))[1] == INFINITY)
    ? noop
    : function(values) {
        return new Set(values)
      }

  /**
   * A specialized version of `baseIsEqualDeep` for arrays with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Array} array The array to compare.
   * @param {Array} other The other array to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `array` and `other` objects.
   * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
   */
  function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length

    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
      return false
    }
    // Assume cyclic values are equal.
    var stacked = stack.get(array)
    if (stacked && stack.get(other)) {
      return stacked == other
    }
    var index = -1,
      result = true,
      seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined

    stack.set(array, other)
    stack.set(other, array)

    // Ignore non-index properties.
    while (++index < arrLength) {
      var arrValue = array[index],
        othValue = other[index]

      if (customizer) {
        var compared = isPartial
          ? customizer(othValue, arrValue, index, other, array, stack)
          : customizer(arrValue, othValue, index, array, other, stack)
      }
      if (compared !== undefined) {
        if (compared) {
          continue
        }
        result = false
        break
      }
      // Recursively compare arrays (susceptible to call stack limits).
      if (seen) {
        if (
          !arraySome(other, function(othValue, othIndex) {
            if (
              !cacheHas(seen, othIndex) &&
              (arrValue === othValue ||
                equalFunc(arrValue, othValue, bitmask, customizer, stack))
            ) {
              return seen.push(othIndex)
            }
          })
        ) {
          result = false
          break
        }
      } else if (
        !(
          arrValue === othValue ||
          equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )
      ) {
        result = false
        break
      }
    }
    stack['delete'](array)
    stack['delete'](other)
    return result
  }

  /**
   * A specialized version of `baseIsEqualDeep` for comparing objects of
   * the same `toStringTag`.
   *
   * **Note:** This function only supports comparing values with tags of
   * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {string} tag The `toStringTag` of the objects to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function equalByTag(
    object,
    other,
    tag,
    bitmask,
    customizer,
    equalFunc,
    stack
  ) {
    switch (tag) {
      case dataViewTag:
        if (
          object.byteLength != other.byteLength ||
          object.byteOffset != other.byteOffset
        ) {
          return false
        }
        object = object.buffer
        other = other.buffer

      case arrayBufferTag:
        if (
          object.byteLength != other.byteLength ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))
        ) {
          return false
        }
        return true

      case boolTag:
      case dateTag:
      case numberTag:
        // Coerce booleans to `1` or `0` and dates to milliseconds.
        // Invalid dates are coerced to `NaN`.
        return eq(+object, +other)

      case errorTag:
        return object.name == other.name && object.message == other.message

      case regexpTag:
      case stringTag:
        // Coerce regexes to strings and treat strings, primitives and objects,
        // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
        // for more details.
        return object == other + ''

      case mapTag:
        var convert = mapToArray

      case setTag:
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG
        convert || (convert = setToArray)

        if (object.size != other.size && !isPartial) {
          return false
        }
        // Assume cyclic values are equal.
        var stacked = stack.get(object)
        if (stacked) {
          return stacked == other
        }
        bitmask |= COMPARE_UNORDERED_FLAG

        // Recursively compare objects (susceptible to call stack limits).
        stack.set(object, other)
        var result = equalArrays(
          convert(object),
          convert(other),
          bitmask,
          customizer,
          equalFunc,
          stack
        )
        stack['delete'](object)
        return result

      case symbolTag:
        if (symbolValueOf) {
          return symbolValueOf.call(object) == symbolValueOf.call(other)
        }
    }
    return false
  }

  /**
   * A specialized version of `baseIsEqualDeep` for objects with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
   * @param {Function} customizer The function to customize comparisons.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Object} stack Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length

    if (objLength != othLength && !isPartial) {
      return false
    }
    var index = objLength
    while (index--) {
      var key = objProps[index]
      if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
        return false
      }
    }
    // Assume cyclic values are equal.
    var stacked = stack.get(object)
    if (stacked && stack.get(other)) {
      return stacked == other
    }
    var result = true
    stack.set(object, other)
    stack.set(other, object)

    var skipCtor = isPartial
    while (++index < objLength) {
      key = objProps[index]
      var objValue = object[key],
        othValue = other[key]

      if (customizer) {
        var compared = isPartial
          ? customizer(othValue, objValue, key, other, object, stack)
          : customizer(objValue, othValue, key, object, other, stack)
      }
      // Recursively compare objects (susceptible to call stack limits).
      if (
        !(compared === undefined
          ? objValue === othValue ||
            equalFunc(objValue, othValue, bitmask, customizer, stack)
          : compared)
      ) {
        result = false
        break
      }
      skipCtor || (skipCtor = key == 'constructor')
    }
    if (result && !skipCtor) {
      var objCtor = object.constructor,
        othCtor = other.constructor

      // Non `Object` object instances with different constructors are not equal.
      if (
        objCtor != othCtor &&
        'constructor' in object && 'constructor' in other &&
        !(
          typeof objCtor == 'function' &&
          objCtor instanceof objCtor &&
          typeof othCtor == 'function' &&
          othCtor instanceof othCtor
        )
      ) {
        result = false
      }
    }
    stack['delete'](object)
    stack['delete'](other)
    return result
  }

  /**
   * A specialized version of `baseRest` which flattens the rest array.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @returns {Function} Returns the new function.
   */
  function flatRest(func) {
    return setToString(overRest(func, undefined, flatten), func + '')
  }

  /**
   * Creates an array of own enumerable property names and symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function getAllKeys(object) {
    return baseGetAllKeys(object, keys, getSymbols)
  }

  /**
   * Creates an array of own and inherited enumerable property names and
   * symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function getAllKeysIn(object) {
    return baseGetAllKeys(object, keysIn, getSymbolsIn)
  }

  /**
   * Gets the appropriate "iteratee" function. If `_.iteratee` is customized,
   * this function returns the custom method, otherwise it returns `baseIteratee`.
   * If arguments are provided, the chosen function is invoked with them and
   * its result is returned.
   *
   * @private
   * @param {*} [value] The value to convert to an iteratee.
   * @param {number} [arity] The arity of the created iteratee.
   * @returns {Function} Returns the chosen function or its result.
   */
  function getIteratee() {
    var result = lodash.iteratee || iteratee
    result = result === iteratee ? baseIteratee : result
    return arguments.length ? result(arguments[0], arguments[1]) : result
  }

  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */
  function getMapData(map, key) {
    var data = map.__data__
    return isKeyable(key)
      ? data[typeof key == 'string' ? 'string' : 'hash']
      : data.map
  }

  /**
   * Gets the property names, values, and compare flags of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the match data of `object`.
   */
  function getMatchData(object) {
    var result = keys(object),
      length = result.length

    while (length--) {
      var key = result[length],
        value = object[key]

      result[length] = [key, value, isStrictComparable(value)]
    }
    return result
  }

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */
  function getNative(object, key) {
    var value = getValue(object, key)
    return baseIsNative(value) ? value : undefined
  }

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag]

    try {
      value[symToStringTag] = undefined
      var unmasked = true
    } catch (e) {}

    var result = nativeObjectToString.call(value)
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag
      } else {
        delete value[symToStringTag]
      }
    }
    return result
  }

  /**
   * Creates an array of the own enumerable symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of symbols.
   */
  var getSymbols = !nativeGetSymbols
    ? stubArray
    : function(object) {
        if (object == null) {
          return []
        }
        object = Object(object)
        return arrayFilter(nativeGetSymbols(object), function(symbol) {
          return propertyIsEnumerable.call(object, symbol)
        })
      }

  /**
   * Creates an array of the own and inherited enumerable symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of symbols.
   */
  var getSymbolsIn = !nativeGetSymbols
    ? stubArray
    : function(object) {
        var result = []
        while (object) {
          arrayPush(result, getSymbols(object))
          object = getPrototype(object)
        }
        return result
      }

  /**
   * Gets the `toStringTag` of `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  var getTag = baseGetTag

  // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
  if (
    (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map()) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set()) != setTag) ||
    (WeakMap && getTag(new WeakMap()) != weakMapTag)
  ) {
    getTag = function(value) {
      var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : ''

      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag
          case mapCtorString:
            return mapTag
          case promiseCtorString:
            return promiseTag
          case setCtorString:
            return setTag
          case weakMapCtorString:
            return weakMapTag
        }
      }
      return result
    }
  }

  /**
   * Checks if `path` exists on `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @param {Function} hasFunc The function to check properties.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   */
  function hasPath(object, path, hasFunc) {
    path = castPath(path, object)

    var index = -1,
      length = path.length,
      result = false

    while (++index < length) {
      var key = toKey(path[index])
      if (!(result = object != null && hasFunc(object, key))) {
        break
      }
      object = object[key]
    }
    if (result || ++index != length) {
      return result
    }
    length = object == null ? 0 : object.length
    return (
      !!length &&
      isLength(length) &&
      isIndex(key, length) &&
      (isArray(object) || isArguments(object))
    )
  }

  /**
   * Initializes an array clone.
   *
   * @private
   * @param {Array} array The array to clone.
   * @returns {Array} Returns the initialized clone.
   */
  function initCloneArray(array) {
    var length = array.length,
      result = new array.constructor(length)

    // Add properties assigned by `RegExp#exec`.
    if (
      length &&
      typeof array[0] == 'string' &&
      hasOwnProperty.call(array, 'index')
    ) {
      result.index = array.index
      result.input = array.input
    }
    return result
  }

  /**
   * Initializes an object clone.
   *
   * @private
   * @param {Object} object The object to clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneObject(object) {
    return typeof object.constructor == 'function' && !isPrototype(object)
      ? baseCreate(getPrototype(object))
      : {}
  }

  /**
   * Initializes an object clone based on its `toStringTag`.
   *
   * **Note:** This function only supports cloning values with tags of
   * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
   *
   * @private
   * @param {Object} object The object to clone.
   * @param {string} tag The `toStringTag` of the object to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneByTag(object, tag, isDeep) {
    var Ctor = object.constructor
    switch (tag) {
      case arrayBufferTag:
        return cloneArrayBuffer(object)

      case boolTag:
      case dateTag:
        return new Ctor(+object)

      case dataViewTag:
        return cloneDataView(object, isDeep)

      case float32Tag:
      case float64Tag:
      case int8Tag:
      case int16Tag:
      case int32Tag:
      case uint8Tag:
      case uint8ClampedTag:
      case uint16Tag:
      case uint32Tag:
        return cloneTypedArray(object, isDeep)

      case mapTag:
        return new Ctor()

      case numberTag:
      case stringTag:
        return new Ctor(object)

      case regexpTag:
        return cloneRegExp(object)

      case setTag:
        return new Ctor()

      case symbolTag:
        return cloneSymbol(object)
    }
  }

  /**
   * Checks if `value` is a flattenable `arguments` object or array.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
   */
  function isFlattenable(value) {
    return (
      isArray(value) ||
      isArguments(value) ||
      !!(spreadableSymbol && value && value[spreadableSymbol])
    )
  }

  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */
  function isIndex(value, length) {
    var type = typeof value
    length = length == null ? MAX_SAFE_INTEGER : length

    return (
      !!length &&
      (type == 'number' || (type != 'symbol' && reIsUint.test(value))) &&
      value > -1 && value % 1 == 0 && value < length
    )
  }

  /**
   * Checks if the given arguments are from an iteratee call.
   *
   * @private
   * @param {*} value The potential iteratee value argument.
   * @param {*} index The potential iteratee index or key argument.
   * @param {*} object The potential iteratee object argument.
   * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
   *  else `false`.
   */
  function isIterateeCall(value, index, object) {
    if (!isObject(object)) {
      return false
    }
    var type = typeof index
    if (
      type == 'number'
        ? isArrayLike(object) && isIndex(index, object.length)
        : type == 'string' && index in object
    ) {
      return eq(object[index], value)
    }
    return false
  }

  /**
   * Checks if `value` is a property name and not a property path.
   *
   * @private
   * @param {*} value The value to check.
   * @param {Object} [object] The object to query keys on.
   * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
   */
  function isKey(value, object) {
    if (isArray(value)) {
      return false
    }
    var type = typeof value
    if (
      type == 'number' ||
      type == 'symbol' ||
      type == 'boolean' ||
      value == null ||
      isSymbol(value)
    ) {
      return true
    }
    return (
      reIsPlainProp.test(value) ||
      !reIsDeepProp.test(value) ||
      (object != null && value in Object(object))
    )
  }

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */
  function isKeyable(value) {
    var type = typeof value
    return type == 'string' ||
      type == 'number' ||
      type == 'symbol' ||
      type == 'boolean'
      ? value !== '__proto__'
      : value === null
  }

  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func
  }

  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */
  function isPrototype(value) {
    var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto

    return value === proto
  }

  /**
   * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` if suitable for strict
   *  equality comparisons, else `false`.
   */
  function isStrictComparable(value) {
    return value === value && !isObject(value)
  }

  /**
   * A specialized version of `matchesProperty` for source values suitable
   * for strict equality comparisons, i.e. `===`.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @param {*} srcValue The value to match.
   * @returns {Function} Returns the new spec function.
   */
  function matchesStrictComparable(key, srcValue) {
    return function(object) {
      if (object == null) {
        return false
      }
      return (
        object[key] === srcValue &&
        (srcValue !== undefined || key in Object(object))
      )
    }
  }

  /**
   * A specialized version of `_.memoize` which clears the memoized function's
   * cache when it exceeds `MAX_MEMOIZE_SIZE`.
   *
   * @private
   * @param {Function} func The function to have its output memoized.
   * @returns {Function} Returns the new memoized function.
   */
  function memoizeCapped(func) {
    var result = memoize(func, function(key) {
      if (cache.size === MAX_MEMOIZE_SIZE) {
        cache.clear()
      }
      return key
    })

    var cache = result.cache
    return result
  }

  /**
   * This function is like
   * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * except that it includes inherited enumerable properties.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function nativeKeysIn(object) {
    var result = []
    if (object != null) {
      for (var key in Object(object)) {
        result.push(key)
      }
    }
    return result
  }

  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */
  function objectToString(value) {
    return nativeObjectToString.call(value)
  }

  /**
   * A specialized version of `baseRest` which transforms the rest array.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @param {Function} transform The rest array transform.
   * @returns {Function} Returns the new function.
   */
  function overRest(func, start, transform) {
    start = nativeMax(start === undefined ? func.length - 1 : start, 0)
    return function() {
      var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length)

      while (++index < length) {
        array[index] = args[start + index]
      }
      index = -1
      var otherArgs = Array(start + 1)
      while (++index < start) {
        otherArgs[index] = args[index]
      }
      otherArgs[start] = transform(array)
      return apply(func, this, otherArgs)
    }
  }

  /**
   * Gets the parent value at `path` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} path The path to get the parent value of.
   * @returns {*} Returns the parent value.
   */
  function parent(object, path) {
    return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1))
  }

  /**
   * Sets the `toString` method of `func` to return `string`.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  var setToString = shortOut(baseSetToString)

  /**
   * Creates a function that'll short out and invoke `identity` instead
   * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
   * milliseconds.
   *
   * @private
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new shortable function.
   */
  function shortOut(func) {
    var count = 0,
      lastCalled = 0

    return function() {
      var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled)

      lastCalled = stamp
      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return arguments[0]
        }
      } else {
        count = 0
      }
      return func.apply(undefined, arguments)
    }
  }

  /**
   * Converts `string` to a property path array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the property path array.
   */
  var stringToPath = memoizeCapped(function(string) {
    var result = []
    if (string.charCodeAt(0) === 46 /* . */) {
      result.push('')
    }
    string.replace(rePropName, function(match, number, quote, subString) {
      result.push(
        quote ? subString.replace(reEscapeChar, '$1') : number || match
      )
    })
    return result
  })

  /**
   * Converts `value` to a string key if it's not a string or symbol.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {string|symbol} Returns the key.
   */
  function toKey(value) {
    if (typeof value == 'string' || isSymbol(value)) {
      return value
    }
    var result = value + ''
    return result == '0' && 1 / value == -INFINITY ? '-0' : result
  }

  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to convert.
   * @returns {string} Returns the source code.
   */
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func)
      } catch (e) {}
      try {
        return func + ''
      } catch (e) {}
    }
    return ''
  }

  /*------------------------------------------------------------------------*/

  /**
   * Creates an array with all falsey values removed. The values `false`, `null`,
   * `0`, `""`, `undefined`, and `NaN` are falsey.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to compact.
   * @returns {Array} Returns the new array of filtered values.
   * @example
   *
   * _.compact([0, 1, false, 2, '', 3]);
   * // => [1, 2, 3]
   */
  function compact(array) {
    var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = []

    while (++index < length) {
      var value = array[index]
      if (value) {
        result[resIndex++] = value
      }
    }
    return result
  }

  /**
   * Creates a new array concatenating `array` with any additional arrays
   * and/or values.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {Array} array The array to concatenate.
   * @param {...*} [values] The values to concatenate.
   * @returns {Array} Returns the new concatenated array.
   * @example
   *
   * var array = [1];
   * var other = _.concat(array, 2, [3], [[4]]);
   *
   * console.log(other);
   * // => [1, 2, 3, [4]]
   *
   * console.log(array);
   * // => [1]
   */
  function concat() {
    var length = arguments.length
    if (!length) {
      return []
    }
    var args = Array(length - 1),
      array = arguments[0],
      index = length

    while (index--) {
      args[index - 1] = arguments[index]
    }
    return arrayPush(
      isArray(array) ? copyArray(array) : [array],
      baseFlatten(args, 1)
    )
  }

  /**
   * Creates an array of `array` values not included in the other given arrays
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons. The order and references of result values are
   * determined by the first array.
   *
   * **Note:** Unlike `_.pullAll`, this method returns a new array.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to inspect.
   * @param {...Array} [values] The values to exclude.
   * @returns {Array} Returns the new array of filtered values.
   * @see _.without, _.xor
   * @example
   *
   * _.difference([2, 1], [2, 3]);
   * // => [1]
   */
  var difference = baseRest(function(array, values) {
    return isArrayLikeObject(array)
      ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true))
      : []
  })

  /**
   * This method is like `_.difference` except that it accepts `iteratee` which
   * is invoked for each element of `array` and `values` to generate the criterion
   * by which they're compared. The order and references of result values are
   * determined by the first array. The iteratee is invoked with one argument:
   * (value).
   *
   * **Note:** Unlike `_.pullAllBy`, this method returns a new array.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {Array} array The array to inspect.
   * @param {...Array} [values] The values to exclude.
   * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
   * @returns {Array} Returns the new array of filtered values.
   * @example
   *
   * _.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
   * // => [1.2]
   *
   * // The `_.property` iteratee shorthand.
   * _.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
   * // => [{ 'x': 2 }]
   */
  var differenceBy = baseRest(function(array, values) {
    var iteratee = last(values)
    if (isArrayLikeObject(iteratee)) {
      iteratee = undefined
    }
    return isArrayLikeObject(array)
      ? baseDifference(
          array,
          baseFlatten(values, 1, isArrayLikeObject, true),
          getIteratee(iteratee, 2)
        )
      : []
  })

  /**
   * This method is like `_.difference` except that it accepts `comparator`
   * which is invoked to compare elements of `array` to `values`. The order and
   * references of result values are determined by the first array. The comparator
   * is invoked with two arguments: (arrVal, othVal).
   *
   * **Note:** Unlike `_.pullAllWith`, this method returns a new array.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {Array} array The array to inspect.
   * @param {...Array} [values] The values to exclude.
   * @param {Function} [comparator] The comparator invoked per element.
   * @returns {Array} Returns the new array of filtered values.
   * @example
   *
   * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
   *
   * _.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
   * // => [{ 'x': 2, 'y': 1 }]
   */
  var differenceWith = baseRest(function(array, values) {
    var comparator = last(values)
    if (isArrayLikeObject(comparator)) {
      comparator = undefined
    }
    return isArrayLikeObject(array)
      ? baseDifference(
          array,
          baseFlatten(values, 1, isArrayLikeObject, true),
          undefined,
          comparator
        )
      : []
  })

  /**
   * Creates a slice of `array` excluding elements dropped from the beginning.
   * Elements are dropped until `predicate` returns falsey. The predicate is
   * invoked with three arguments: (value, index, array).
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Array
   * @param {Array} array The array to query.
   * @param {Function} [predicate=_.identity] The function invoked per iteration.
   * @returns {Array} Returns the slice of `array`.
   * @example
   *
   * var users = [
   *   { 'user': 'barney',  'active': false },
   *   { 'user': 'fred',    'active': false },
   *   { 'user': 'pebbles', 'active': true }
   * ];
   *
   * _.dropWhile(users, function(o) { return !o.active; });
   * // => objects for ['pebbles']
   *
   * // The `_.matches` iteratee shorthand.
   * _.dropWhile(users, { 'user': 'barney', 'active': false });
   * // => objects for ['fred', 'pebbles']
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.dropWhile(users, ['active', false]);
   * // => objects for ['pebbles']
   *
   * // The `_.property` iteratee shorthand.
   * _.dropWhile(users, 'active');
   * // => objects for ['barney', 'fred', 'pebbles']
   */
  function dropWhile(array, predicate) {
    return array && array.length
      ? baseWhile(array, getIteratee(predicate, 3), true)
      : []
  }

  /**
   * This method is like `_.find` except that it returns the index of the first
   * element `predicate` returns truthy for instead of the element itself.
   *
   * @static
   * @memberOf _
   * @since 1.1.0
   * @category Array
   * @param {Array} array The array to inspect.
   * @param {Function} [predicate=_.identity] The function invoked per iteration.
   * @param {number} [fromIndex=0] The index to search from.
   * @returns {number} Returns the index of the found element, else `-1`.
   * @example
   *
   * var users = [
   *   { 'user': 'barney',  'active': false },
   *   { 'user': 'fred',    'active': false },
   *   { 'user': 'pebbles', 'active': true }
   * ];
   *
   * _.findIndex(users, function(o) { return o.user == 'barney'; });
   * // => 0
   *
   * // The `_.matches` iteratee shorthand.
   * _.findIndex(users, { 'user': 'fred', 'active': false });
   * // => 1
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.findIndex(users, ['active', false]);
   * // => 0
   *
   * // The `_.property` iteratee shorthand.
   * _.findIndex(users, 'active');
   * // => 2
   */
  function findIndex(array, predicate, fromIndex) {
    var length = array == null ? 0 : array.length
    if (!length) {
      return -1
    }
    var index = fromIndex == null ? 0 : toInteger(fromIndex)
    if (index < 0) {
      index = nativeMax(length + index, 0)
    }
    return baseFindIndex(array, getIteratee(predicate, 3), index)
  }

  /**
   * This method is like `_.findIndex` except that it iterates over elements
   * of `collection` from right to left.
   *
   * @static
   * @memberOf _
   * @since 2.0.0
   * @category Array
   * @param {Array} array The array to inspect.
   * @param {Function} [predicate=_.identity] The function invoked per iteration.
   * @param {number} [fromIndex=array.length-1] The index to search from.
   * @returns {number} Returns the index of the found element, else `-1`.
   * @example
   *
   * var users = [
   *   { 'user': 'barney',  'active': true },
   *   { 'user': 'fred',    'active': false },
   *   { 'user': 'pebbles', 'active': false }
   * ];
   *
   * _.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
   * // => 2
   *
   * // The `_.matches` iteratee shorthand.
   * _.findLastIndex(users, { 'user': 'barney', 'active': true });
   * // => 0
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.findLastIndex(users, ['active', false]);
   * // => 2
   *
   * // The `_.property` iteratee shorthand.
   * _.findLastIndex(users, 'active');
   * // => 0
   */
  function findLastIndex(array, predicate, fromIndex) {
    var length = array == null ? 0 : array.length
    if (!length) {
      return -1
    }
    var index = length - 1
    if (fromIndex !== undefined) {
      index = toInteger(fromIndex)
      index =
        fromIndex < 0
          ? nativeMax(length + index, 0)
          : nativeMin(index, length - 1)
    }
    return baseFindIndex(array, getIteratee(predicate, 3), index, true)
  }

  /**
   * Flattens `array` a single level deep.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to flatten.
   * @returns {Array} Returns the new flattened array.
   * @example
   *
   * _.flatten([1, [2, [3, [4]], 5]]);
   * // => [1, 2, [3, [4]], 5]
   */
  function flatten(array) {
    var length = array == null ? 0 : array.length
    return length ? baseFlatten(array, 1) : []
  }

  /**
   * Gets the first element of `array`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @alias first
   * @category Array
   * @param {Array} array The array to query.
   * @returns {*} Returns the first element of `array`.
   * @example
   *
   * _.head([1, 2, 3]);
   * // => 1
   *
   * _.head([]);
   * // => undefined
   */
  function head(array) {
    return array && array.length ? array[0] : undefined
  }

  /**
   * Gets the index at which the first occurrence of `value` is found in `array`
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons. If `fromIndex` is negative, it's used as the
   * offset from the end of `array`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} [fromIndex=0] The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   * @example
   *
   * _.indexOf([1, 2, 1, 2], 2);
   * // => 1
   *
   * // Search from the `fromIndex`.
   * _.indexOf([1, 2, 1, 2], 2, 2);
   * // => 3
   */
  function indexOf(array, value, fromIndex) {
    var length = array == null ? 0 : array.length
    if (!length) {
      return -1
    }
    var index = fromIndex == null ? 0 : toInteger(fromIndex)
    if (index < 0) {
      index = nativeMax(length + index, 0)
    }
    return baseIndexOf(array, value, index)
  }

  /**
   * Gets all but the last element of `array`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to query.
   * @returns {Array} Returns the slice of `array`.
   * @example
   *
   * _.initial([1, 2, 3]);
   * // => [1, 2]
   */
  function initial(array) {
    var length = array == null ? 0 : array.length
    return length ? baseSlice(array, 0, -1) : []
  }

  /**
   * Creates an array of unique values that are included in all given arrays
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons. The order and references of result values are
   * determined by the first array.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {...Array} [arrays] The arrays to inspect.
   * @returns {Array} Returns the new array of intersecting values.
   * @example
   *
   * _.intersection([2, 1], [2, 3]);
   * // => [2]
   */
  var intersection = baseRest(function(arrays) {
    var mapped = arrayMap(arrays, castArrayLikeObject)
    return mapped.length && mapped[0] === arrays[0]
      ? baseIntersection(mapped)
      : []
  })

  /**
   * This method is like `_.intersection` except that it accepts `iteratee`
   * which is invoked for each element of each `arrays` to generate the criterion
   * by which they're compared. The order and references of result values are
   * determined by the first array. The iteratee is invoked with one argument:
   * (value).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {...Array} [arrays] The arrays to inspect.
   * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
   * @returns {Array} Returns the new array of intersecting values.
   * @example
   *
   * _.intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor);
   * // => [2.1]
   *
   * // The `_.property` iteratee shorthand.
   * _.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
   * // => [{ 'x': 1 }]
   */
  var intersectionBy = baseRest(function(arrays) {
    var iteratee = last(arrays),
      mapped = arrayMap(arrays, castArrayLikeObject)

    if (iteratee === last(mapped)) {
      iteratee = undefined
    } else {
      mapped.pop()
    }
    return mapped.length && mapped[0] === arrays[0]
      ? baseIntersection(mapped, getIteratee(iteratee, 2))
      : []
  })

  /**
   * This method is like `_.intersection` except that it accepts `comparator`
   * which is invoked to compare elements of `arrays`. The order and references
   * of result values are determined by the first array. The comparator is
   * invoked with two arguments: (arrVal, othVal).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {...Array} [arrays] The arrays to inspect.
   * @param {Function} [comparator] The comparator invoked per element.
   * @returns {Array} Returns the new array of intersecting values.
   * @example
   *
   * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
   * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
   *
   * _.intersectionWith(objects, others, _.isEqual);
   * // => [{ 'x': 1, 'y': 2 }]
   */
  var intersectionWith = baseRest(function(arrays) {
    var comparator = last(arrays),
      mapped = arrayMap(arrays, castArrayLikeObject)

    comparator = typeof comparator == 'function' ? comparator : undefined
    if (comparator) {
      mapped.pop()
    }
    return mapped.length && mapped[0] === arrays[0]
      ? baseIntersection(mapped, undefined, comparator)
      : []
  })

  /**
   * Converts all elements in `array` into a string separated by `separator`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {Array} array The array to convert.
   * @param {string} [separator=','] The element separator.
   * @returns {string} Returns the joined string.
   * @example
   *
   * _.join(['a', 'b', 'c'], '~');
   * // => 'a~b~c'
   */
  function join(array, separator) {
    return array == null ? '' : nativeJoin.call(array, separator)
  }

  /**
   * Gets the last element of `array`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to query.
   * @returns {*} Returns the last element of `array`.
   * @example
   *
   * _.last([1, 2, 3]);
   * // => 3
   */
  function last(array) {
    var length = array == null ? 0 : array.length
    return length ? array[length - 1] : undefined
  }

  /**
   * Removes all given values from `array` using
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * **Note:** Unlike `_.without`, this method mutates `array`. Use `_.remove`
   * to remove elements from an array by predicate.
   *
   * @static
   * @memberOf _
   * @since 2.0.0
   * @category Array
   * @param {Array} array The array to modify.
   * @param {...*} [values] The values to remove.
   * @returns {Array} Returns `array`.
   * @example
   *
   * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
   *
   * _.pull(array, 'a', 'c');
   * console.log(array);
   * // => ['b', 'b']
   */
  var pull = baseRest(pullAll)

  /**
   * This method is like `_.pull` except that it accepts an array of values to remove.
   *
   * **Note:** Unlike `_.difference`, this method mutates `array`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {Array} array The array to modify.
   * @param {Array} values The values to remove.
   * @returns {Array} Returns `array`.
   * @example
   *
   * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
   *
   * _.pullAll(array, ['a', 'c']);
   * console.log(array);
   * // => ['b', 'b']
   */
  function pullAll(array, values) {
    return array && array.length && values && values.length
      ? basePullAll(array, values)
      : array
  }

  /**
   * Removes elements from `array` corresponding to `indexes` and returns an
   * array of removed elements.
   *
   * **Note:** Unlike `_.at`, this method mutates `array`.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Array
   * @param {Array} array The array to modify.
   * @param {...(number|number[])} [indexes] The indexes of elements to remove.
   * @returns {Array} Returns the new array of removed elements.
   * @example
   *
   * var array = ['a', 'b', 'c', 'd'];
   * var pulled = _.pullAt(array, [1, 3]);
   *
   * console.log(array);
   * // => ['a', 'c']
   *
   * console.log(pulled);
   * // => ['b', 'd']
   */
  var pullAt = flatRest(function(array, indexes) {
    var length = array == null ? 0 : array.length,
      result = baseAt(array, indexes)

    basePullAt(
      array,
      arrayMap(indexes, function(index) {
        return isIndex(index, length) ? +index : index
      }).sort(compareAscending)
    )

    return result
  })

  /**
   * Reverses `array` so that the first element becomes the last, the second
   * element becomes the second to last, and so on.
   *
   * **Note:** This method mutates `array` and is based on
   * [`Array#reverse`](https://mdn.io/Array/reverse).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {Array} array The array to modify.
   * @returns {Array} Returns `array`.
   * @example
   *
   * var array = [1, 2, 3];
   *
   * _.reverse(array);
   * // => [3, 2, 1]
   *
   * console.log(array);
   * // => [3, 2, 1]
   */
  function reverse(array) {
    return array == null ? array : nativeReverse.call(array)
  }

  /**
   * Creates a slice of `array` from `start` up to, but not including, `end`.
   *
   * **Note:** This method is used instead of
   * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
   * returned.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Array
   * @param {Array} array The array to slice.
   * @param {number} [start=0] The start position.
   * @param {number} [end=array.length] The end position.
   * @returns {Array} Returns the slice of `array`.
   */
  function slice(array, start, end) {
    var length = array == null ? 0 : array.length
    if (!length) {
      return []
    }
    if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
      start = 0
      end = length
    } else {
      start = start == null ? 0 : toInteger(start)
      end = end === undefined ? length : toInteger(end)
    }
    return baseSlice(array, start, end)
  }

  /**
   * Gets all but the first element of `array`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {Array} array The array to query.
   * @returns {Array} Returns the slice of `array`.
   * @example
   *
   * _.tail([1, 2, 3]);
   * // => [2, 3]
   */
  function tail(array) {
    var length = array == null ? 0 : array.length
    return length ? baseSlice(array, 1, length) : []
  }

  /**
   * Creates a slice of `array` with `n` elements taken from the beginning.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to query.
   * @param {number} [n=1] The number of elements to take.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {Array} Returns the slice of `array`.
   * @example
   *
   * _.take([1, 2, 3]);
   * // => [1]
   *
   * _.take([1, 2, 3], 2);
   * // => [1, 2]
   *
   * _.take([1, 2, 3], 5);
   * // => [1, 2, 3]
   *
   * _.take([1, 2, 3], 0);
   * // => []
   */
  function take(array, n, guard) {
    if (!(array && array.length)) {
      return []
    }
    n = guard || n === undefined ? 1 : toInteger(n)
    return baseSlice(array, 0, n < 0 ? 0 : n)
  }

  /**
   * Creates a slice of `array` with `n` elements taken from the end.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Array
   * @param {Array} array The array to query.
   * @param {number} [n=1] The number of elements to take.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {Array} Returns the slice of `array`.
   * @example
   *
   * _.takeRight([1, 2, 3]);
   * // => [3]
   *
   * _.takeRight([1, 2, 3], 2);
   * // => [2, 3]
   *
   * _.takeRight([1, 2, 3], 5);
   * // => [1, 2, 3]
   *
   * _.takeRight([1, 2, 3], 0);
   * // => []
   */
  function takeRight(array, n, guard) {
    var length = array == null ? 0 : array.length
    if (!length) {
      return []
    }
    n = guard || n === undefined ? 1 : toInteger(n)
    n = length - n
    return baseSlice(array, n < 0 ? 0 : n, length)
  }

  /**
   * Creates a slice of `array` with elements taken from the beginning. Elements
   * are taken until `predicate` returns falsey. The predicate is invoked with
   * three arguments: (value, index, array).
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Array
   * @param {Array} array The array to query.
   * @param {Function} [predicate=_.identity] The function invoked per iteration.
   * @returns {Array} Returns the slice of `array`.
   * @example
   *
   * var users = [
   *   { 'user': 'barney',  'active': false },
   *   { 'user': 'fred',    'active': false },
   *   { 'user': 'pebbles', 'active': true }
   * ];
   *
   * _.takeWhile(users, function(o) { return !o.active; });
   * // => objects for ['barney', 'fred']
   *
   * // The `_.matches` iteratee shorthand.
   * _.takeWhile(users, { 'user': 'barney', 'active': false });
   * // => objects for ['barney']
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.takeWhile(users, ['active', false]);
   * // => objects for ['barney', 'fred']
   *
   * // The `_.property` iteratee shorthand.
   * _.takeWhile(users, 'active');
   * // => []
   */
  function takeWhile(array, predicate) {
    return array && array.length
      ? baseWhile(array, getIteratee(predicate, 3))
      : []
  }

  /**
   * Creates an array of unique values, in order, from all given arrays using
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {...Array} [arrays] The arrays to inspect.
   * @returns {Array} Returns the new array of combined values.
   * @example
   *
   * _.union([2], [1, 2]);
   * // => [2, 1]
   */
  var union = baseRest(function(arrays) {
    return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true))
  })

  /**
   * This method is like `_.union` except that it accepts `iteratee` which is
   * invoked for each element of each `arrays` to generate the criterion by
   * which uniqueness is computed. Result values are chosen from the first
   * array in which the value occurs. The iteratee is invoked with one argument:
   * (value).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {...Array} [arrays] The arrays to inspect.
   * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
   * @returns {Array} Returns the new array of combined values.
   * @example
   *
   * _.unionBy([2.1], [1.2, 2.3], Math.floor);
   * // => [2.1, 1.2]
   *
   * // The `_.property` iteratee shorthand.
   * _.unionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
   * // => [{ 'x': 1 }, { 'x': 2 }]
   */
  var unionBy = baseRest(function(arrays) {
    var iteratee = last(arrays)
    if (isArrayLikeObject(iteratee)) {
      iteratee = undefined
    }
    return baseUniq(
      baseFlatten(arrays, 1, isArrayLikeObject, true),
      getIteratee(iteratee, 2)
    )
  })

  /**
   * This method is like `_.union` except that it accepts `comparator` which
   * is invoked to compare elements of `arrays`. Result values are chosen from
   * the first array in which the value occurs. The comparator is invoked
   * with two arguments: (arrVal, othVal).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {...Array} [arrays] The arrays to inspect.
   * @param {Function} [comparator] The comparator invoked per element.
   * @returns {Array} Returns the new array of combined values.
   * @example
   *
   * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
   * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
   *
   * _.unionWith(objects, others, _.isEqual);
   * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
   */
  var unionWith = baseRest(function(arrays) {
    var comparator = last(arrays)
    comparator = typeof comparator == 'function' ? comparator : undefined
    return baseUniq(
      baseFlatten(arrays, 1, isArrayLikeObject, true),
      undefined,
      comparator
    )
  })

  /**
   * Creates a duplicate-free version of an array, using
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons, in which only the first occurrence of each element
   * is kept. The order of result values is determined by the order they occur
   * in the array.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to inspect.
   * @returns {Array} Returns the new duplicate free array.
   * @example
   *
   * _.uniq([2, 1, 2]);
   * // => [2, 1]
   */
  function uniq(array) {
    return array && array.length ? baseUniq(array) : []
  }

  /**
   * This method is like `_.uniq` except that it accepts `iteratee` which is
   * invoked for each element in `array` to generate the criterion by which
   * uniqueness is computed. The order of result values is determined by the
   * order they occur in the array. The iteratee is invoked with one argument:
   * (value).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {Array} array The array to inspect.
   * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
   * @returns {Array} Returns the new duplicate free array.
   * @example
   *
   * _.uniqBy([2.1, 1.2, 2.3], Math.floor);
   * // => [2.1, 1.2]
   *
   * // The `_.property` iteratee shorthand.
   * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
   * // => [{ 'x': 1 }, { 'x': 2 }]
   */
  function uniqBy(array, iteratee) {
    return array && array.length
      ? baseUniq(array, getIteratee(iteratee, 2))
      : []
  }

  /**
   * This method is like `_.uniq` except that it accepts `comparator` which
   * is invoked to compare elements of `array`. The order of result values is
   * determined by the order they occur in the array.The comparator is invoked
   * with two arguments: (arrVal, othVal).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {Array} array The array to inspect.
   * @param {Function} [comparator] The comparator invoked per element.
   * @returns {Array} Returns the new duplicate free array.
   * @example
   *
   * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];
   *
   * _.uniqWith(objects, _.isEqual);
   * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
   */
  function uniqWith(array, comparator) {
    comparator = typeof comparator == 'function' ? comparator : undefined
    return array && array.length ? baseUniq(array, undefined, comparator) : []
  }

  /**
   * Creates an array excluding all given values using
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * **Note:** Unlike `_.pull`, this method returns a new array.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to inspect.
   * @param {...*} [values] The values to exclude.
   * @returns {Array} Returns the new array of filtered values.
   * @see _.difference, _.xor
   * @example
   *
   * _.without([2, 1, 2, 3], 1, 2);
   * // => [3]
   */
  var without = baseRest(function(array, values) {
    return isArrayLikeObject(array) ? baseDifference(array, values) : []
  })

  /**
   * Creates an array of unique values that is the
   * [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
   * of the given arrays. The order of result values is determined by the order
   * they occur in the arrays.
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Array
   * @param {...Array} [arrays] The arrays to inspect.
   * @returns {Array} Returns the new array of filtered values.
   * @see _.difference, _.without
   * @example
   *
   * _.xor([2, 1], [2, 3]);
   * // => [1, 3]
   */
  var xor = baseRest(function(arrays) {
    return baseXor(arrayFilter(arrays, isArrayLikeObject))
  })

  /**
   * This method is like `_.xor` except that it accepts `iteratee` which is
   * invoked for each element of each `arrays` to generate the criterion by
   * which by which they're compared. The order of result values is determined
   * by the order they occur in the arrays. The iteratee is invoked with one
   * argument: (value).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {...Array} [arrays] The arrays to inspect.
   * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
   * @returns {Array} Returns the new array of filtered values.
   * @example
   *
   * _.xorBy([2.1, 1.2], [2.3, 3.4], Math.floor);
   * // => [1.2, 3.4]
   *
   * // The `_.property` iteratee shorthand.
   * _.xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
   * // => [{ 'x': 2 }]
   */
  var xorBy = baseRest(function(arrays) {
    var iteratee = last(arrays)
    if (isArrayLikeObject(iteratee)) {
      iteratee = undefined
    }
    return baseXor(
      arrayFilter(arrays, isArrayLikeObject),
      getIteratee(iteratee, 2)
    )
  })

  /**
   * This method is like `_.xor` except that it accepts `comparator` which is
   * invoked to compare elements of `arrays`. The order of result values is
   * determined by the order they occur in the arrays. The comparator is invoked
   * with two arguments: (arrVal, othVal).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Array
   * @param {...Array} [arrays] The arrays to inspect.
   * @param {Function} [comparator] The comparator invoked per element.
   * @returns {Array} Returns the new array of filtered values.
   * @example
   *
   * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
   * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
   *
   * _.xorWith(objects, others, _.isEqual);
   * // => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
   */
  var xorWith = baseRest(function(arrays) {
    var comparator = last(arrays)
    comparator = typeof comparator == 'function' ? comparator : undefined
    return baseXor(
      arrayFilter(arrays, isArrayLikeObject),
      undefined,
      comparator
    )
  })

  /*------------------------------------------------------------------------*/

  /**
   * Creates an object composed of keys generated from the results of running
   * each element of `collection` thru `iteratee`. The corresponding value of
   * each key is the number of times the key was returned by `iteratee`. The
   * iteratee is invoked with one argument: (value).
   *
   * @static
   * @memberOf _
   * @since 0.5.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
   * @returns {Object} Returns the composed aggregate object.
   * @example
   *
   * _.countBy([6.1, 4.2, 6.3], Math.floor);
   * // => { '4': 1, '6': 2 }
   *
   * // The `_.property` iteratee shorthand.
   * _.countBy(['one', 'two', 'three'], 'length');
   * // => { '3': 2, '5': 1 }
   */
  var countBy = createAggregator(function(result, value, key) {
    if (hasOwnProperty.call(result, key)) {
      ++result[key]
    } else {
      baseAssignValue(result, key, 1)
    }
  })

  /**
   * Checks if `predicate` returns truthy for **all** elements of `collection`.
   * Iteration is stopped once `predicate` returns falsey. The predicate is
   * invoked with three arguments: (value, index|key, collection).
   *
   * **Note:** This method returns `true` for
   * [empty collections](https://en.wikipedia.org/wiki/Empty_set) because
   * [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
   * elements of empty collections.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [predicate=_.identity] The function invoked per iteration.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {boolean} Returns `true` if all elements pass the predicate check,
   *  else `false`.
   * @example
   *
   * _.every([true, 1, null, 'yes'], Boolean);
   * // => false
   *
   * var users = [
   *   { 'user': 'barney', 'age': 36, 'active': false },
   *   { 'user': 'fred',   'age': 40, 'active': false }
   * ];
   *
   * // The `_.matches` iteratee shorthand.
   * _.every(users, { 'user': 'barney', 'active': false });
   * // => false
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.every(users, ['active', false]);
   * // => true
   *
   * // The `_.property` iteratee shorthand.
   * _.every(users, 'active');
   * // => false
   */
  function every(collection, predicate, guard) {
    var func = isArray(collection) ? arrayEvery : baseEvery
    if (guard && isIterateeCall(collection, predicate, guard)) {
      predicate = undefined
    }
    return func(collection, getIteratee(predicate, 3))
  }

  /**
   * Iterates over elements of `collection`, returning an array of all elements
   * `predicate` returns truthy for. The predicate is invoked with three
   * arguments: (value, index|key, collection).
   *
   * **Note:** Unlike `_.remove`, this method returns a new array.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [predicate=_.identity] The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   * @see _.reject
   * @example
   *
   * var users = [
   *   { 'user': 'barney', 'age': 36, 'active': true },
   *   { 'user': 'fred',   'age': 40, 'active': false }
   * ];
   *
   * _.filter(users, function(o) { return !o.active; });
   * // => objects for ['fred']
   *
   * // The `_.matches` iteratee shorthand.
   * _.filter(users, { 'age': 36, 'active': true });
   * // => objects for ['barney']
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.filter(users, ['active', false]);
   * // => objects for ['fred']
   *
   * // The `_.property` iteratee shorthand.
   * _.filter(users, 'active');
   * // => objects for ['barney']
   */
  function filter(collection, predicate) {
    var func = isArray(collection) ? arrayFilter : baseFilter
    return func(collection, getIteratee(predicate, 3))
  }

  /**
   * Iterates over elements of `collection`, returning the first element
   * `predicate` returns truthy for. The predicate is invoked with three
   * arguments: (value, index|key, collection).
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to inspect.
   * @param {Function} [predicate=_.identity] The function invoked per iteration.
   * @param {number} [fromIndex=0] The index to search from.
   * @returns {*} Returns the matched element, else `undefined`.
   * @example
   *
   * var users = [
   *   { 'user': 'barney',  'age': 36, 'active': true },
   *   { 'user': 'fred',    'age': 40, 'active': false },
   *   { 'user': 'pebbles', 'age': 1,  'active': true }
   * ];
   *
   * _.find(users, function(o) { return o.age < 40; });
   * // => object for 'barney'
   *
   * // The `_.matches` iteratee shorthand.
   * _.find(users, { 'age': 1, 'active': true });
   * // => object for 'pebbles'
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.find(users, ['active', false]);
   * // => object for 'fred'
   *
   * // The `_.property` iteratee shorthand.
   * _.find(users, 'active');
   * // => object for 'barney'
   */
  var find = createFind(findIndex)

  /**
   * This method is like `_.find` except that it iterates over elements of
   * `collection` from right to left.
   *
   * @static
   * @memberOf _
   * @since 2.0.0
   * @category Collection
   * @param {Array|Object} collection The collection to inspect.
   * @param {Function} [predicate=_.identity] The function invoked per iteration.
   * @param {number} [fromIndex=collection.length-1] The index to search from.
   * @returns {*} Returns the matched element, else `undefined`.
   * @example
   *
   * _.findLast([1, 2, 3, 4], function(n) {
   *   return n % 2 == 1;
   * });
   * // => 3
   */
  var findLast = createFind(findLastIndex)

  /**
   * Iterates over elements of `collection` and invokes `iteratee` for each element.
   * The iteratee is invoked with three arguments: (value, index|key, collection).
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * **Note:** As with other "Collections" methods, objects with a "length"
   * property are iterated like arrays. To avoid this behavior use `_.forIn`
   * or `_.forOwn` for object iteration.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @alias each
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @returns {Array|Object} Returns `collection`.
   * @see _.forEachRight
   * @example
   *
   * _.forEach([1, 2], function(value) {
   *   console.log(value);
   * });
   * // => Logs `1` then `2`.
   *
   * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
   *   console.log(key);
   * });
   * // => Logs 'a' then 'b' (iteration order is not guaranteed).
   */
  function forEach(collection, iteratee) {
    var func = isArray(collection) ? arrayEach : baseEach
    return func(collection, getIteratee(iteratee, 3))
  }

  /**
   * This method is like `_.forEach` except that it iterates over elements of
   * `collection` from right to left.
   *
   * @static
   * @memberOf _
   * @since 2.0.0
   * @alias eachRight
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @returns {Array|Object} Returns `collection`.
   * @see _.forEach
   * @example
   *
   * _.forEachRight([1, 2], function(value) {
   *   console.log(value);
   * });
   * // => Logs `2` then `1`.
   */
  function forEachRight(collection, iteratee) {
    var func = isArray(collection) ? arrayEachRight : baseEachRight
    return func(collection, getIteratee(iteratee, 3))
  }

  /**
   * Creates an object composed of keys generated from the results of running
   * each element of `collection` thru `iteratee`. The order of grouped values
   * is determined by the order they occur in `collection`. The corresponding
   * value of each key is an array of elements responsible for generating the
   * key. The iteratee is invoked with one argument: (value).
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
   * @returns {Object} Returns the composed aggregate object.
   * @example
   *
   * _.groupBy([6.1, 4.2, 6.3], Math.floor);
   * // => { '4': [4.2], '6': [6.1, 6.3] }
   *
   * // The `_.property` iteratee shorthand.
   * _.groupBy(['one', 'two', 'three'], 'length');
   * // => { '3': ['one', 'two'], '5': ['three'] }
   */
  var groupBy = createAggregator(function(result, value, key) {
    if (hasOwnProperty.call(result, key)) {
      result[key].push(value)
    } else {
      baseAssignValue(result, key, [value])
    }
  })

  /**
   * Checks if `value` is in `collection`. If `collection` is a string, it's
   * checked for a substring of `value`, otherwise
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * is used for equality comparisons. If `fromIndex` is negative, it's used as
   * the offset from the end of `collection`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object|string} collection The collection to inspect.
   * @param {*} value The value to search for.
   * @param {number} [fromIndex=0] The index to search from.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
   * @returns {boolean} Returns `true` if `value` is found, else `false`.
   * @example
   *
   * _.includes([1, 2, 3], 1);
   * // => true
   *
   * _.includes([1, 2, 3], 1, 2);
   * // => false
   *
   * _.includes({ 'a': 1, 'b': 2 }, 1);
   * // => true
   *
   * _.includes('abcd', 'bc');
   * // => true
   */
  function includes(collection, value, fromIndex, guard) {
    collection = isArrayLike(collection) ? collection : values(collection)
    fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0

    var length = collection.length
    if (fromIndex < 0) {
      fromIndex = nativeMax(length + fromIndex, 0)
    }
    return isString(collection)
      ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1
      : !!length && baseIndexOf(collection, value, fromIndex) > -1
  }

  /**
   * Creates an array of values by running each element in `collection` thru
   * `iteratee`. The iteratee is invoked with three arguments:
   * (value, index|key, collection).
   *
   * Many lodash methods are guarded to work as iteratees for methods like
   * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
   *
   * The guarded methods are:
   * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
   * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
   * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
   * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   * @example
   *
   * function square(n) {
   *   return n * n;
   * }
   *
   * _.map([4, 8], square);
   * // => [16, 64]
   *
   * _.map({ 'a': 4, 'b': 8 }, square);
   * // => [16, 64] (iteration order is not guaranteed)
   *
   * var users = [
   *   { 'user': 'barney' },
   *   { 'user': 'fred' }
   * ];
   *
   * // The `_.property` iteratee shorthand.
   * _.map(users, 'user');
   * // => ['barney', 'fred']
   */
  function map(collection, iteratee) {
    var func = isArray(collection) ? arrayMap : baseMap
    return func(collection, getIteratee(iteratee, 3))
  }

  /**
   * This method is like `_.sortBy` except that it allows specifying the sort
   * orders of the iteratees to sort by. If `orders` is unspecified, all values
   * are sorted in ascending order. Otherwise, specify an order of "desc" for
   * descending or "asc" for ascending sort order of corresponding values.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Array[]|Function[]|Object[]|string[]} [iteratees=[_.identity]]
   *  The iteratees to sort by.
   * @param {string[]} [orders] The sort orders of `iteratees`.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
   * @returns {Array} Returns the new sorted array.
   * @example
   *
   * var users = [
   *   { 'user': 'fred',   'age': 48 },
   *   { 'user': 'barney', 'age': 34 },
   *   { 'user': 'fred',   'age': 40 },
   *   { 'user': 'barney', 'age': 36 }
   * ];
   *
   * // Sort by `user` in ascending order and by `age` in descending order.
   * _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
   * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
   */
  function orderBy(collection, iteratees, orders, guard) {
    if (collection == null) {
      return []
    }
    if (!isArray(iteratees)) {
      iteratees = iteratees == null ? [] : [iteratees]
    }
    orders = guard ? undefined : orders
    if (!isArray(orders)) {
      orders = orders == null ? [] : [orders]
    }
    return baseOrderBy(collection, iteratees, orders)
  }

  /**
   * Reduces `collection` to a value which is the accumulated result of running
   * each element in `collection` thru `iteratee`, where each successive
   * invocation is supplied the return value of the previous. If `accumulator`
   * is not given, the first element of `collection` is used as the initial
   * value. The iteratee is invoked with four arguments:
   * (accumulator, value, index|key, collection).
   *
   * Many lodash methods are guarded to work as iteratees for methods like
   * `_.reduce`, `_.reduceRight`, and `_.transform`.
   *
   * The guarded methods are:
   * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
   * and `sortBy`
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @returns {*} Returns the accumulated value.
   * @see _.reduceRight
   * @example
   *
   * _.reduce([1, 2], function(sum, n) {
   *   return sum + n;
   * }, 0);
   * // => 3
   *
   * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
   *   (result[value] || (result[value] = [])).push(key);
   *   return result;
   * }, {});
   * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
   */
  function reduce(collection, iteratee, accumulator) {
    var func = isArray(collection) ? arrayReduce : baseReduce,
      initAccum = arguments.length < 3

    return func(
      collection,
      getIteratee(iteratee, 4),
      accumulator,
      initAccum,
      baseEach
    )
  }

  /**
   * Checks if `predicate` returns truthy for **any** element of `collection`.
   * Iteration is stopped once `predicate` returns truthy. The predicate is
   * invoked with three arguments: (value, index|key, collection).
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [predicate=_.identity] The function invoked per iteration.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {boolean} Returns `true` if any element passes the predicate check,
   *  else `false`.
   * @example
   *
   * _.some([null, 0, 'yes', false], Boolean);
   * // => true
   *
   * var users = [
   *   { 'user': 'barney', 'active': true },
   *   { 'user': 'fred',   'active': false }
   * ];
   *
   * // The `_.matches` iteratee shorthand.
   * _.some(users, { 'user': 'barney', 'active': false });
   * // => false
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.some(users, ['active', false]);
   * // => true
   *
   * // The `_.property` iteratee shorthand.
   * _.some(users, 'active');
   * // => true
   */
  function some(collection, predicate, guard) {
    var func = isArray(collection) ? arraySome : baseSome
    if (guard && isIterateeCall(collection, predicate, guard)) {
      predicate = undefined
    }
    return func(collection, getIteratee(predicate, 3))
  }

  /**
   * Creates an array of elements, sorted in ascending order by the results of
   * running each element in a collection thru each iteratee. This method
   * performs a stable sort, that is, it preserves the original sort order of
   * equal elements. The iteratees are invoked with one argument: (value).
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {...(Function|Function[])} [iteratees=[_.identity]]
   *  The iteratees to sort by.
   * @returns {Array} Returns the new sorted array.
   * @example
   *
   * var users = [
   *   { 'user': 'fred',   'age': 48 },
   *   { 'user': 'barney', 'age': 36 },
   *   { 'user': 'fred',   'age': 40 },
   *   { 'user': 'barney', 'age': 34 }
   * ];
   *
   * _.sortBy(users, [function(o) { return o.user; }]);
   * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
   *
   * _.sortBy(users, ['user', 'age']);
   * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
   */
  var sortBy = baseRest(function(collection, iteratees) {
    if (collection == null) {
      return []
    }
    var length = iteratees.length
    if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
      iteratees = []
    } else if (
      length > 2 &&
      isIterateeCall(iteratees[0], iteratees[1], iteratees[2])
    ) {
      iteratees = [iteratees[0]]
    }
    return baseOrderBy(collection, baseFlatten(iteratees, 1), [])
  })

  /*------------------------------------------------------------------------*/

  /**
   * Gets the timestamp of the number of milliseconds that have elapsed since
   * the Unix epoch (1 January 1970 00:00:00 UTC).
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Date
   * @returns {number} Returns the timestamp.
   * @example
   *
   * _.defer(function(stamp) {
   *   console.log(_.now() - stamp);
   * }, _.now());
   * // => Logs the number of milliseconds it took for the deferred invocation.
   */
  var now = function() {
    return root.Date.now()
  }

  /*------------------------------------------------------------------------*/

  /**
   * Creates a debounced function that delays invoking `func` until after `wait`
   * milliseconds have elapsed since the last time the debounced function was
   * invoked. The debounced function comes with a `cancel` method to cancel
   * delayed `func` invocations and a `flush` method to immediately invoke them.
   * Provide `options` to indicate whether `func` should be invoked on the
   * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
   * with the last arguments provided to the debounced function. Subsequent
   * calls to the debounced function return the result of the last `func`
   * invocation.
   *
   * **Note:** If `leading` and `trailing` options are `true`, `func` is
   * invoked on the trailing edge of the timeout only if the debounced function
   * is invoked more than once during the `wait` timeout.
   *
   * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
   * until to the next tick, similar to `setTimeout` with a timeout of `0`.
   *
   * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
   * for details over the differences between `_.debounce` and `_.throttle`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to debounce.
   * @param {number} [wait=0] The number of milliseconds to delay.
   * @param {Object} [options={}] The options object.
   * @param {boolean} [options.leading=false]
   *  Specify invoking on the leading edge of the timeout.
   * @param {number} [options.maxWait]
   *  The maximum time `func` is allowed to be delayed before it's invoked.
   * @param {boolean} [options.trailing=true]
   *  Specify invoking on the trailing edge of the timeout.
   * @returns {Function} Returns the new debounced function.
   * @example
   *
   * // Avoid costly calculations while the window size is in flux.
   * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
   *
   * // Invoke `sendMail` when clicked, debouncing subsequent calls.
   * jQuery(element).on('click', _.debounce(sendMail, 300, {
   *   'leading': true,
   *   'trailing': false
   * }));
   *
   * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
   * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
   * var source = new EventSource('/stream');
   * jQuery(source).on('message', debounced);
   *
   * // Cancel the trailing debounced invocation.
   * jQuery(window).on('popstate', debounced.cancel);
   */
  function debounce(func, wait, options) {
    var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true

    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT)
    }
    wait = toNumber(wait) || 0
    if (isObject(options)) {
      leading = !!options.leading
      maxing = 'maxWait' in options
      maxWait = maxing
        ? nativeMax(toNumber(options.maxWait) || 0, wait)
        : maxWait
      trailing = 'trailing' in options ? !!options.trailing : trailing
    }

    function invokeFunc(time) {
      var args = lastArgs,
        thisArg = lastThis

      lastArgs = lastThis = undefined
      lastInvokeTime = time
      result = func.apply(thisArg, args)
      return result
    }

    function leadingEdge(time) {
      // Reset any `maxWait` timer.
      lastInvokeTime = time
      // Start the timer for the trailing edge.
      timerId = setTimeout(timerExpired, wait)
      // Invoke the leading edge.
      return leading ? invokeFunc(time) : result
    }

    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall

      return maxing
        ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
        : timeWaiting
    }

    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime

      // Either this is the first call, activity has stopped and we're at the
      // trailing edge, the system time has gone backwards and we're treating
      // it as the trailing edge, or we've hit the `maxWait` limit.
      return (
        lastCallTime === undefined ||
        timeSinceLastCall >= wait ||
        timeSinceLastCall < 0 ||
        (maxing && timeSinceLastInvoke >= maxWait)
      )
    }

    function timerExpired() {
      var time = now()
      if (shouldInvoke(time)) {
        return trailingEdge(time)
      }
      // Restart the timer.
      timerId = setTimeout(timerExpired, remainingWait(time))
    }

    function trailingEdge(time) {
      timerId = undefined

      // Only invoke if we have `lastArgs` which means `func` has been
      // debounced at least once.
      if (trailing && lastArgs) {
        return invokeFunc(time)
      }
      lastArgs = lastThis = undefined
      return result
    }

    function cancel() {
      if (timerId !== undefined) {
        clearTimeout(timerId)
      }
      lastInvokeTime = 0
      lastArgs = lastCallTime = lastThis = timerId = undefined
    }

    function flush() {
      return timerId === undefined ? result : trailingEdge(now())
    }

    function debounced() {
      var time = now(),
        isInvoking = shouldInvoke(time)

      lastArgs = arguments
      lastThis = this
      lastCallTime = time

      if (isInvoking) {
        if (timerId === undefined) {
          return leadingEdge(lastCallTime)
        }
        if (maxing) {
          // Handle invocations in a tight loop.
          timerId = setTimeout(timerExpired, wait)
          return invokeFunc(lastCallTime)
        }
      }
      if (timerId === undefined) {
        timerId = setTimeout(timerExpired, wait)
      }
      return result
    }
    debounced.cancel = cancel
    debounced.flush = flush
    return debounced
  }

  /**
   * Creates a function that memoizes the result of `func`. If `resolver` is
   * provided, it determines the cache key for storing the result based on the
   * arguments provided to the memoized function. By default, the first argument
   * provided to the memoized function is used as the map cache key. The `func`
   * is invoked with the `this` binding of the memoized function.
   *
   * **Note:** The cache is exposed as the `cache` property on the memoized
   * function. Its creation may be customized by replacing the `_.memoize.Cache`
   * constructor with one whose instances implement the
   * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
   * method interface of `clear`, `delete`, `get`, `has`, and `set`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to have its output memoized.
   * @param {Function} [resolver] The function to resolve the cache key.
   * @returns {Function} Returns the new memoized function.
   * @example
   *
   * var object = { 'a': 1, 'b': 2 };
   * var other = { 'c': 3, 'd': 4 };
   *
   * var values = _.memoize(_.values);
   * values(object);
   * // => [1, 2]
   *
   * values(other);
   * // => [3, 4]
   *
   * object.a = 2;
   * values(object);
   * // => [1, 2]
   *
   * // Modify the result cache.
   * values.cache.set(object, ['a', 'b']);
   * values(object);
   * // => ['a', 'b']
   *
   * // Replace `_.memoize.Cache`.
   * _.memoize.Cache = WeakMap;
   */
  function memoize(func, resolver) {
    if (
      typeof func != 'function' ||
      (resolver != null && typeof resolver != 'function')
    ) {
      throw new TypeError(FUNC_ERROR_TEXT)
    }
    var memoized = function() {
      var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache

      if (cache.has(key)) {
        return cache.get(key)
      }
      var result = func.apply(this, args)
      memoized.cache = cache.set(key, result) || cache
      return result
    }
    memoized.cache = new (memoize.Cache || MapCache)()
    return memoized
  }

  // Expose `MapCache`.
  memoize.Cache = MapCache

  /**
   * Creates a throttled function that only invokes `func` at most once per
   * every `wait` milliseconds. The throttled function comes with a `cancel`
   * method to cancel delayed `func` invocations and a `flush` method to
   * immediately invoke them. Provide `options` to indicate whether `func`
   * should be invoked on the leading and/or trailing edge of the `wait`
   * timeout. The `func` is invoked with the last arguments provided to the
   * throttled function. Subsequent calls to the throttled function return the
   * result of the last `func` invocation.
   *
   * **Note:** If `leading` and `trailing` options are `true`, `func` is
   * invoked on the trailing edge of the timeout only if the throttled function
   * is invoked more than once during the `wait` timeout.
   *
   * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
   * until to the next tick, similar to `setTimeout` with a timeout of `0`.
   *
   * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
   * for details over the differences between `_.throttle` and `_.debounce`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to throttle.
   * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
   * @param {Object} [options={}] The options object.
   * @param {boolean} [options.leading=true]
   *  Specify invoking on the leading edge of the timeout.
   * @param {boolean} [options.trailing=true]
   *  Specify invoking on the trailing edge of the timeout.
   * @returns {Function} Returns the new throttled function.
   * @example
   *
   * // Avoid excessively updating the position while scrolling.
   * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
   *
   * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
   * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
   * jQuery(element).on('click', throttled);
   *
   * // Cancel the trailing throttled invocation.
   * jQuery(window).on('popstate', throttled.cancel);
   */
  function throttle(func, wait, options) {
    var leading = true,
      trailing = true

    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT)
    }
    if (isObject(options)) {
      leading = 'leading' in options ? !!options.leading : leading
      trailing = 'trailing' in options ? !!options.trailing : trailing
    }
    return debounce(func, wait, {
      leading: leading,
      maxWait: wait,
      trailing: trailing
    })
  }

  /*------------------------------------------------------------------------*/

  /**
   * Creates a shallow clone of `value`.
   *
   * **Note:** This method is loosely based on the
   * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
   * and supports cloning arrays, array buffers, booleans, date objects, maps,
   * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
   * arrays. The own enumerable properties of `arguments` objects are cloned
   * as plain objects. An empty object is returned for uncloneable values such
   * as error objects, functions, DOM nodes, and WeakMaps.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to clone.
   * @returns {*} Returns the cloned value.
   * @see _.cloneDeep
   * @example
   *
   * var objects = [{ 'a': 1 }, { 'b': 2 }];
   *
   * var shallow = _.clone(objects);
   * console.log(shallow[0] === objects[0]);
   * // => true
   */
  function clone(value) {
    return baseClone(value, CLONE_SYMBOLS_FLAG)
  }

  /**
   * This method is like `_.clone` except that it recursively clones `value`.
   *
   * @static
   * @memberOf _
   * @since 1.0.0
   * @category Lang
   * @param {*} value The value to recursively clone.
   * @returns {*} Returns the deep cloned value.
   * @see _.clone
   * @example
   *
   * var objects = [{ 'a': 1 }, { 'b': 2 }];
   *
   * var deep = _.cloneDeep(objects);
   * console.log(deep[0] === objects[0]);
   * // => false
   */
  function cloneDeep(value) {
    return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG)
  }

  /**
   * Performs a
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * comparison between two values to determine if they are equivalent.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.eq(object, object);
   * // => true
   *
   * _.eq(object, other);
   * // => false
   *
   * _.eq('a', 'a');
   * // => true
   *
   * _.eq('a', Object('a'));
   * // => false
   *
   * _.eq(NaN, NaN);
   * // => true
   */
  function eq(value, other) {
    return value === other || (value !== value && other !== other)
  }

  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   *  else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  var isArguments = baseIsArguments(
    (function() {
      return arguments
    })()
  )
    ? baseIsArguments
    : function(value) {
        return (
          isObjectLike(value) &&
          hasOwnProperty.call(value, 'callee') &&
          !propertyIsEnumerable.call(value, 'callee')
        )
      }

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */
  var isArray = Array.isArray

  /**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */
  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value)
  }

  /**
   * This method is like `_.isArrayLike` except that it also checks if `value`
   * is an object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array-like object,
   *  else `false`.
   * @example
   *
   * _.isArrayLikeObject([1, 2, 3]);
   * // => true
   *
   * _.isArrayLikeObject(document.body.children);
   * // => true
   *
   * _.isArrayLikeObject('abc');
   * // => false
   *
   * _.isArrayLikeObject(_.noop);
   * // => false
   */
  function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value)
  }

  /**
   * Checks if `value` is a buffer.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
   * @example
   *
   * _.isBuffer(new Buffer(2));
   * // => true
   *
   * _.isBuffer(new Uint8Array(2));
   * // => false
   */
  var isBuffer = nativeIsBuffer || stubFalse

  /**
   * Checks if `value` is an empty object, collection, map, or set.
   *
   * Objects are considered empty if they have no own enumerable string keyed
   * properties.
   *
   * Array-like values such as `arguments` objects, arrays, buffers, strings, or
   * jQuery-like collections are considered empty if they have a `length` of `0`.
   * Similarly, maps and sets are considered empty if they have a `size` of `0`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is empty, else `false`.
   * @example
   *
   * _.isEmpty(null);
   * // => true
   *
   * _.isEmpty(true);
   * // => true
   *
   * _.isEmpty(1);
   * // => true
   *
   * _.isEmpty([1, 2, 3]);
   * // => false
   *
   * _.isEmpty({ 'a': 1 });
   * // => false
   */
  function isEmpty(value) {
    if (value == null) {
      return true
    }
    if (
      isArrayLike(value) &&
      (isArray(value) ||
        typeof value == 'string' ||
        typeof value.splice == 'function' ||
        isBuffer(value) ||
        isTypedArray(value) ||
        isArguments(value))
    ) {
      return !value.length
    }
    var tag = getTag(value)
    if (tag == mapTag || tag == setTag) {
      return !value.size
    }
    if (isPrototype(value)) {
      return !baseKeys(value).length
    }
    for (var key in value) {
      if (hasOwnProperty.call(value, key)) {
        return false
      }
    }
    return true
  }

  /**
   * Performs a deep comparison between two values to determine if they are
   * equivalent.
   *
   * **Note:** This method supports comparing arrays, array buffers, booleans,
   * date objects, error objects, maps, numbers, `Object` objects, regexes,
   * sets, strings, symbols, and typed arrays. `Object` objects are compared
   * by their own, not inherited, enumerable properties. Functions and DOM
   * nodes are compared by strict equality, i.e. `===`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.isEqual(object, other);
   * // => true
   *
   * object === other;
   * // => false
   */
  function isEqual(value, other) {
    return baseIsEqual(value, other)
  }

  /**
   * This method is like `_.isEqual` except that it accepts `customizer` which
   * is invoked to compare values. If `customizer` returns `undefined`, comparisons
   * are handled by the method instead. The `customizer` is invoked with up to
   * six arguments: (objValue, othValue [, index|key, object, other, stack]).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @param {Function} [customizer] The function to customize comparisons.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * function isGreeting(value) {
   *   return /^h(?:i|ello)$/.test(value);
   * }
   *
   * function customizer(objValue, othValue) {
   *   if (isGreeting(objValue) && isGreeting(othValue)) {
   *     return true;
   *   }
   * }
   *
   * var array = ['hello', 'goodbye'];
   * var other = ['hi', 'goodbye'];
   *
   * _.isEqualWith(array, other, customizer);
   * // => true
   */
  function isEqualWith(value, other, customizer) {
    customizer = typeof customizer == 'function' ? customizer : undefined
    var result = customizer ? customizer(value, other) : undefined
    return result === undefined
      ? baseIsEqual(value, other, undefined, customizer)
      : !!result
  }

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction(value) {
    if (!isObject(value)) {
      return false
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = baseGetTag(value)
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag
  }

  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This method is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */
  function isLength(value) {
    return (
      typeof value == 'number' &&
      value > -1 &&
      value % 1 == 0 &&
      value <= MAX_SAFE_INTEGER
    )
  }

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    var type = typeof value
    return value != null && (type == 'object' || type == 'function')
  }

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return value != null && typeof value == 'object'
  }

  /**
   * Checks if `value` is classified as a `Map` object.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a map, else `false`.
   * @example
   *
   * _.isMap(new Map);
   * // => true
   *
   * _.isMap(new WeakMap);
   * // => false
   */
  var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap

  /**
   * Checks if `value` is classified as a `Set` object.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a set, else `false`.
   * @example
   *
   * _.isSet(new Set);
   * // => true
   *
   * _.isSet(new WeakSet);
   * // => false
   */
  var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet

  /**
   * Checks if `value` is classified as a `String` primitive or object.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a string, else `false`.
   * @example
   *
   * _.isString('abc');
   * // => true
   *
   * _.isString(1);
   * // => false
   */
  function isString(value) {
    return (
      typeof value == 'string' ||
      (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag)
    )
  }

  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */
  function isSymbol(value) {
    return (
      typeof value == 'symbol' ||
      (isObjectLike(value) && baseGetTag(value) == symbolTag)
    )
  }

  /**
   * Checks if `value` is classified as a typed array.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   * @example
   *
   * _.isTypedArray(new Uint8Array);
   * // => true
   *
   * _.isTypedArray([]);
   * // => false
   */
  var isTypedArray = nodeIsTypedArray
    ? baseUnary(nodeIsTypedArray)
    : baseIsTypedArray

  /**
   * Converts `value` to a finite number.
   *
   * @static
   * @memberOf _
   * @since 4.12.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {number} Returns the converted number.
   * @example
   *
   * _.toFinite(3.2);
   * // => 3.2
   *
   * _.toFinite(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toFinite(Infinity);
   * // => 1.7976931348623157e+308
   *
   * _.toFinite('3.2');
   * // => 3.2
   */
  function toFinite(value) {
    if (!value) {
      return value === 0 ? value : 0
    }
    value = toNumber(value)
    if (value === INFINITY || value === -INFINITY) {
      var sign = value < 0 ? -1 : 1
      return sign * MAX_INTEGER
    }
    return value === value ? value : 0
  }

  /**
   * Converts `value` to an integer.
   *
   * **Note:** This method is loosely based on
   * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {number} Returns the converted integer.
   * @example
   *
   * _.toInteger(3.2);
   * // => 3
   *
   * _.toInteger(Number.MIN_VALUE);
   * // => 0
   *
   * _.toInteger(Infinity);
   * // => 1.7976931348623157e+308
   *
   * _.toInteger('3.2');
   * // => 3
   */
  function toInteger(value) {
    var result = toFinite(value),
      remainder = result % 1

    return result === result ? (remainder ? result - remainder : result) : 0
  }

  /**
   * Converts `value` to a number.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {number} Returns the number.
   * @example
   *
   * _.toNumber(3.2);
   * // => 3.2
   *
   * _.toNumber(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toNumber(Infinity);
   * // => Infinity
   *
   * _.toNumber('3.2');
   * // => 3.2
   */
  function toNumber(value) {
    if (typeof value == 'number') {
      return value
    }
    if (isSymbol(value)) {
      return NAN
    }
    if (isObject(value)) {
      var other = typeof value.valueOf == 'function' ? value.valueOf() : value
      value = isObject(other) ? other + '' : other
    }
    if (typeof value != 'string') {
      return value === 0 ? value : +value
    }
    value = value.replace(reTrim, '')
    var isBinary = reIsBinary.test(value)
    return isBinary || reIsOctal.test(value)
      ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
      : reIsBadHex.test(value)
      ? NAN
      : +value
  }

  /**
   * Converts `value` to a string. An empty string is returned for `null`
   * and `undefined` values. The sign of `-0` is preserved.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   * @example
   *
   * _.toString(null);
   * // => ''
   *
   * _.toString(-0);
   * // => '-0'
   *
   * _.toString([1, 2, 3]);
   * // => '1,2,3'
   */
  function toString(value) {
    return value == null ? '' : baseToString(value)
  }

  /*------------------------------------------------------------------------*/

  /**
   * Assigns own enumerable string keyed properties of source objects to the
   * destination object. Source objects are applied from left to right.
   * Subsequent sources overwrite property assignments of previous sources.
   *
   * **Note:** This method mutates `object` and is loosely based on
   * [`Object.assign`](https://mdn.io/Object/assign).
   *
   * @static
   * @memberOf _
   * @since 0.10.0
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @returns {Object} Returns `object`.
   * @see _.assignIn
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   * }
   *
   * function Bar() {
   *   this.c = 3;
   * }
   *
   * Foo.prototype.b = 2;
   * Bar.prototype.d = 4;
   *
   * _.assign({ 'a': 0 }, new Foo, new Bar);
   * // => { 'a': 1, 'c': 3 }
   */
  var assign = createAssigner(function(object, source) {
    if (isPrototype(source) || isArrayLike(source)) {
      copyObject(source, keys(source), object)
      return
    }
    for (var key in source) {
      if (hasOwnProperty.call(source, key)) {
        assignValue(object, key, source[key])
      }
    }
  })

  /**
   * Gets the value at `path` of `object`. If the resolved value is
   * `undefined`, the `defaultValue` is returned in its place.
   *
   * @static
   * @memberOf _
   * @since 3.7.0
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @param {*} [defaultValue] The value returned for `undefined` resolved values.
   * @returns {*} Returns the resolved value.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c': 3 } }] };
   *
   * _.get(object, 'a[0].b.c');
   * // => 3
   *
   * _.get(object, ['a', '0', 'b', 'c']);
   * // => 3
   *
   * _.get(object, 'a.b.c', 'default');
   * // => 'default'
   */
  function get(object, path, defaultValue) {
    var result = object == null ? undefined : baseGet(object, path)
    return result === undefined ? defaultValue : result
  }

  /**
   * Checks if `path` is a direct or inherited property of `object`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   * @example
   *
   * var object = _.create({ 'a': _.create({ 'b': 2 }) });
   *
   * _.hasIn(object, 'a');
   * // => true
   *
   * _.hasIn(object, 'a.b');
   * // => true
   *
   * _.hasIn(object, ['a', 'b']);
   * // => true
   *
   * _.hasIn(object, 'b');
   * // => false
   */
  function hasIn(object, path) {
    return object != null && hasPath(object, path, baseHasIn)
  }

  /**
   * Creates an array of the own enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects. See the
   * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * for more details.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keys(new Foo);
   * // => ['a', 'b'] (iteration order is not guaranteed)
   *
   * _.keys('hi');
   * // => ['0', '1']
   */
  function keys(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object)
  }

  /**
   * Creates an array of the own and inherited enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keysIn(new Foo);
   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
   */
  function keysIn(object) {
    return isArrayLike(object)
      ? arrayLikeKeys(object, true)
      : baseKeysIn(object)
  }

  /**
   * Creates an object with the same keys as `object` and values generated
   * by running each own enumerable string keyed property of `object` thru
   * `iteratee`. The iteratee is invoked with three arguments:
   * (value, key, object).
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Object
   * @param {Object} object The object to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @returns {Object} Returns the new mapped object.
   * @see _.mapKeys
   * @example
   *
   * var users = {
   *   'fred':    { 'user': 'fred',    'age': 40 },
   *   'pebbles': { 'user': 'pebbles', 'age': 1 }
   * };
   *
   * _.mapValues(users, function(o) { return o.age; });
   * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
   *
   * // The `_.property` iteratee shorthand.
   * _.mapValues(users, 'age');
   * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
   */
  function mapValues(object, iteratee) {
    var result = {}
    iteratee = getIteratee(iteratee, 3)

    baseForOwn(object, function(value, key, object) {
      baseAssignValue(result, key, iteratee(value, key, object))
    })
    return result
  }

  /**
   * Creates an object composed of the picked `object` properties.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The source object.
   * @param {...(string|string[])} [paths] The property paths to pick.
   * @returns {Object} Returns the new object.
   * @example
   *
   * var object = { 'a': 1, 'b': '2', 'c': 3 };
   *
   * _.pick(object, ['a', 'c']);
   * // => { 'a': 1, 'c': 3 }
   */
  var pick = flatRest(function(object, paths) {
    return object == null ? {} : basePick(object, paths)
  })

  /**
   * Creates an object composed of the `object` properties `predicate` returns
   * truthy for. The predicate is invoked with two arguments: (value, key).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Object
   * @param {Object} object The source object.
   * @param {Function} [predicate=_.identity] The function invoked per property.
   * @returns {Object} Returns the new object.
   * @example
   *
   * var object = { 'a': 1, 'b': '2', 'c': 3 };
   *
   * _.pickBy(object, _.isNumber);
   * // => { 'a': 1, 'c': 3 }
   */
  function pickBy(object, predicate) {
    if (object == null) {
      return {}
    }
    var props = arrayMap(getAllKeysIn(object), function(prop) {
      return [prop]
    })
    predicate = getIteratee(predicate)
    return basePickBy(object, props, function(value, path) {
      return predicate(value, path[0])
    })
  }

  /**
   * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
   * it's created. Arrays are created for missing index properties while objects
   * are created for all other missing properties. Use `_.setWith` to customize
   * `path` creation.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 3.7.0
   * @category Object
   * @param {Object} object The object to modify.
   * @param {Array|string} path The path of the property to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns `object`.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c': 3 } }] };
   *
   * _.set(object, 'a[0].b.c', 4);
   * console.log(object.a[0].b.c);
   * // => 4
   *
   * _.set(object, ['x', '0', 'y', 'z'], 5);
   * console.log(object.x[0].y.z);
   * // => 5
   */
  function set(object, path, value) {
    return object == null ? object : baseSet(object, path, value)
  }

  /**
   * Creates an array of the own enumerable string keyed property values of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property values.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.values(new Foo);
   * // => [1, 2] (iteration order is not guaranteed)
   *
   * _.values('hi');
   * // => ['h', 'i']
   */
  function values(object) {
    return object == null ? [] : baseValues(object, keys(object))
  }

  /*------------------------------------------------------------------------*/

  /**
   * Pads `string` on the left and right sides if it's shorter than `length`.
   * Padding characters are truncated if they can't be evenly divided by `length`.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category String
   * @param {string} [string=''] The string to pad.
   * @param {number} [length=0] The padding length.
   * @param {string} [chars=' '] The string used as padding.
   * @returns {string} Returns the padded string.
   * @example
   *
   * _.pad('abc', 8);
   * // => '  abc   '
   *
   * _.pad('abc', 8, '_-');
   * // => '_-abc_-_'
   *
   * _.pad('abc', 3);
   * // => 'abc'
   */
  function pad(string, length, chars) {
    string = toString(string)
    length = toInteger(length)

    var strLength = length ? stringSize(string) : 0
    if (!length || strLength >= length) {
      return string
    }
    var mid = (length - strLength) / 2
    return (
      createPadding(nativeFloor(mid), chars) +
      string +
      createPadding(nativeCeil(mid), chars)
    )
  }

  /**
   * Pads `string` on the right side if it's shorter than `length`. Padding
   * characters are truncated if they exceed `length`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category String
   * @param {string} [string=''] The string to pad.
   * @param {number} [length=0] The padding length.
   * @param {string} [chars=' '] The string used as padding.
   * @returns {string} Returns the padded string.
   * @example
   *
   * _.padEnd('abc', 6);
   * // => 'abc   '
   *
   * _.padEnd('abc', 6, '_-');
   * // => 'abc_-_'
   *
   * _.padEnd('abc', 3);
   * // => 'abc'
   */
  function padEnd(string, length, chars) {
    string = toString(string)
    length = toInteger(length)

    var strLength = length ? stringSize(string) : 0
    return length && strLength < length
      ? string + createPadding(length - strLength, chars)
      : string
  }

  /**
   * Pads `string` on the left side if it's shorter than `length`. Padding
   * characters are truncated if they exceed `length`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category String
   * @param {string} [string=''] The string to pad.
   * @param {number} [length=0] The padding length.
   * @param {string} [chars=' '] The string used as padding.
   * @returns {string} Returns the padded string.
   * @example
   *
   * _.padStart('abc', 6);
   * // => '   abc'
   *
   * _.padStart('abc', 6, '_-');
   * // => '_-_abc'
   *
   * _.padStart('abc', 3);
   * // => 'abc'
   */
  function padStart(string, length, chars) {
    string = toString(string)
    length = toInteger(length)

    var strLength = length ? stringSize(string) : 0
    return length && strLength < length
      ? createPadding(length - strLength, chars) + string
      : string
  }

  /**
   * Converts `string` to an integer of the specified radix. If `radix` is
   * `undefined` or `0`, a `radix` of `10` is used unless `value` is a
   * hexadecimal, in which case a `radix` of `16` is used.
   *
   * **Note:** This method aligns with the
   * [ES5 implementation](https://es5.github.io/#x15.1.2.2) of `parseInt`.
   *
   * @static
   * @memberOf _
   * @since 1.1.0
   * @category String
   * @param {string} string The string to convert.
   * @param {number} [radix=10] The radix to interpret `value` by.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {number} Returns the converted integer.
   * @example
   *
   * _.parseInt('08');
   * // => 8
   *
   * _.map(['6', '08', '10'], _.parseInt);
   * // => [6, 8, 10]
   */
  function parseInt(string, radix, guard) {
    if (guard || radix == null) {
      radix = 0
    } else if (radix) {
      radix = +radix
    }
    return nativeParseInt(toString(string).replace(reTrimStart, ''), radix || 0)
  }

  /**
   * Removes leading and trailing whitespace or specified characters from `string`.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category String
   * @param {string} [string=''] The string to trim.
   * @param {string} [chars=whitespace] The characters to trim.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {string} Returns the trimmed string.
   * @example
   *
   * _.trim('  abc  ');
   * // => 'abc'
   *
   * _.trim('-_-abc-_-', '_-');
   * // => 'abc'
   *
   * _.map(['  foo  ', '  bar  '], _.trim);
   * // => ['foo', 'bar']
   */
  function trim(string, chars, guard) {
    string = toString(string)
    if (string && (guard || chars === undefined)) {
      return string.replace(reTrim, '')
    }
    if (!string || !(chars = baseToString(chars))) {
      return string
    }
    var strSymbols = stringToArray(string),
      chrSymbols = stringToArray(chars),
      start = charsStartIndex(strSymbols, chrSymbols),
      end = charsEndIndex(strSymbols, chrSymbols) + 1

    return castSlice(strSymbols, start, end).join('')
  }

  /**
   * Removes trailing whitespace or specified characters from `string`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category String
   * @param {string} [string=''] The string to trim.
   * @param {string} [chars=whitespace] The characters to trim.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {string} Returns the trimmed string.
   * @example
   *
   * _.trimEnd('  abc  ');
   * // => '  abc'
   *
   * _.trimEnd('-_-abc-_-', '_-');
   * // => '-_-abc'
   */
  function trimEnd(string, chars, guard) {
    string = toString(string)
    if (string && (guard || chars === undefined)) {
      return string.replace(reTrimEnd, '')
    }
    if (!string || !(chars = baseToString(chars))) {
      return string
    }
    var strSymbols = stringToArray(string),
      end = charsEndIndex(strSymbols, stringToArray(chars)) + 1

    return castSlice(strSymbols, 0, end).join('')
  }

  /**
   * Removes leading whitespace or specified characters from `string`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category String
   * @param {string} [string=''] The string to trim.
   * @param {string} [chars=whitespace] The characters to trim.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {string} Returns the trimmed string.
   * @example
   *
   * _.trimStart('  abc  ');
   * // => 'abc  '
   *
   * _.trimStart('-_-abc-_-', '_-');
   * // => 'abc-_-'
   */
  function trimStart(string, chars, guard) {
    string = toString(string)
    if (string && (guard || chars === undefined)) {
      return string.replace(reTrimStart, '')
    }
    if (!string || !(chars = baseToString(chars))) {
      return string
    }
    var strSymbols = stringToArray(string),
      start = charsStartIndex(strSymbols, stringToArray(chars))

    return castSlice(strSymbols, start).join('')
  }

  /*------------------------------------------------------------------------*/

  /**
   * Creates a function that returns `value`.
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Util
   * @param {*} value The value to return from the new function.
   * @returns {Function} Returns the new constant function.
   * @example
   *
   * var objects = _.times(2, _.constant({ 'a': 1 }));
   *
   * console.log(objects);
   * // => [{ 'a': 1 }, { 'a': 1 }]
   *
   * console.log(objects[0] === objects[1]);
   * // => true
   */
  function constant(value) {
    return function() {
      return value
    }
  }

  /**
   * This method returns the first argument it receives.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {*} value Any value.
   * @returns {*} Returns `value`.
   * @example
   *
   * var object = { 'a': 1 };
   *
   * console.log(_.identity(object) === object);
   * // => true
   */
  function identity(value) {
    return value
  }

  /**
   * Creates a function that invokes `func` with the arguments of the created
   * function. If `func` is a property name, the created function returns the
   * property value for a given element. If `func` is an array or object, the
   * created function returns `true` for elements that contain the equivalent
   * source properties, otherwise it returns `false`.
   *
   * @static
   * @since 4.0.0
   * @memberOf _
   * @category Util
   * @param {*} [func=_.identity] The value to convert to a callback.
   * @returns {Function} Returns the callback.
   * @example
   *
   * var users = [
   *   { 'user': 'barney', 'age': 36, 'active': true },
   *   { 'user': 'fred',   'age': 40, 'active': false }
   * ];
   *
   * // The `_.matches` iteratee shorthand.
   * _.filter(users, _.iteratee({ 'user': 'barney', 'active': true }));
   * // => [{ 'user': 'barney', 'age': 36, 'active': true }]
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.filter(users, _.iteratee(['user', 'fred']));
   * // => [{ 'user': 'fred', 'age': 40 }]
   *
   * // The `_.property` iteratee shorthand.
   * _.map(users, _.iteratee('user'));
   * // => ['barney', 'fred']
   *
   * // Create custom iteratee shorthands.
   * _.iteratee = _.wrap(_.iteratee, function(iteratee, func) {
   *   return !_.isRegExp(func) ? iteratee(func) : function(string) {
   *     return func.test(string);
   *   };
   * });
   *
   * _.filter(['abc', 'def'], /ef/);
   * // => ['def']
   */
  function iteratee(func) {
    return baseIteratee(
      typeof func == 'function' ? func : baseClone(func, CLONE_DEEP_FLAG)
    )
  }

  /**
   * This method returns `undefined`.
   *
   * @static
   * @memberOf _
   * @since 2.3.0
   * @category Util
   * @example
   *
   * _.times(2, _.noop);
   * // => [undefined, undefined]
   */
  function noop() {
    // No operation performed.
  }

  /**
   * Creates a function that returns the value at `path` of a given object.
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Util
   * @param {Array|string} path The path of the property to get.
   * @returns {Function} Returns the new accessor function.
   * @example
   *
   * var objects = [
   *   { 'a': { 'b': 2 } },
   *   { 'a': { 'b': 1 } }
   * ];
   *
   * _.map(objects, _.property('a.b'));
   * // => [2, 1]
   *
   * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
   * // => [1, 2]
   */
  function property(path) {
    return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path)
  }

  /**
   * This method returns a new empty array.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {Array} Returns the new empty array.
   * @example
   *
   * var arrays = _.times(2, _.stubArray);
   *
   * console.log(arrays);
   * // => [[], []]
   *
   * console.log(arrays[0] === arrays[1]);
   * // => false
   */
  function stubArray() {
    return []
  }

  /**
   * This method returns `false`.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {boolean} Returns `false`.
   * @example
   *
   * _.times(2, _.stubFalse);
   * // => [false, false]
   */
  function stubFalse() {
    return false
  }

  /**
   * Generates a unique ID. If `prefix` is given, the ID is appended to it.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {string} [prefix=''] The value to prefix the ID with.
   * @returns {string} Returns the unique ID.
   * @example
   *
   * _.uniqueId('contact_');
   * // => 'contact_104'
   *
   * _.uniqueId();
   * // => '105'
   */
  function uniqueId(prefix) {
    var id = ++idCounter
    return toString(prefix) + id
  }

  /*------------------------------------------------------------------------*/

  /**
   * Adds two numbers.
   *
   * @static
   * @memberOf _
   * @since 3.4.0
   * @category Math
   * @param {number} augend The first number in an addition.
   * @param {number} addend The second number in an addition.
   * @returns {number} Returns the total.
   * @example
   *
   * _.add(6, 4);
   * // => 10
   */
  var add = createMathOperation(function(augend, addend) {
    return augend + addend
  }, 0)

  /**
   * Computes `number` rounded up to `precision`.
   *
   * @static
   * @memberOf _
   * @since 3.10.0
   * @category Math
   * @param {number} number The number to round up.
   * @param {number} [precision=0] The precision to round up to.
   * @returns {number} Returns the rounded up number.
   * @example
   *
   * _.ceil(4.006);
   * // => 5
   *
   * _.ceil(6.004, 2);
   * // => 6.01
   *
   * _.ceil(6040, -2);
   * // => 6100
   */
  var ceil = createRound('ceil')

  /**
   * Divide two numbers.
   *
   * @static
   * @memberOf _
   * @since 4.7.0
   * @category Math
   * @param {number} dividend The first number in a division.
   * @param {number} divisor The second number in a division.
   * @returns {number} Returns the quotient.
   * @example
   *
   * _.divide(6, 4);
   * // => 1.5
   */
  var divide = createMathOperation(function(dividend, divisor) {
    return dividend / divisor
  }, 1)

  /**
   * Computes `number` rounded down to `precision`.
   *
   * @static
   * @memberOf _
   * @since 3.10.0
   * @category Math
   * @param {number} number The number to round down.
   * @param {number} [precision=0] The precision to round down to.
   * @returns {number} Returns the rounded down number.
   * @example
   *
   * _.floor(4.006);
   * // => 4
   *
   * _.floor(0.046, 2);
   * // => 0.04
   *
   * _.floor(4060, -2);
   * // => 4000
   */
  var floor = createRound('floor')

  /**
   * Computes the maximum value of `array`. If `array` is empty or falsey,
   * `undefined` is returned.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Math
   * @param {Array} array The array to iterate over.
   * @returns {*} Returns the maximum value.
   * @example
   *
   * _.max([4, 2, 8, 6]);
   * // => 8
   *
   * _.max([]);
   * // => undefined
   */
  function max(array) {
    return array && array.length
      ? baseExtremum(array, identity, baseGt)
      : undefined
  }

  /**
   * This method is like `_.max` except that it accepts `iteratee` which is
   * invoked for each element in `array` to generate the criterion by which
   * the value is ranked. The iteratee is invoked with one argument: (value).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Math
   * @param {Array} array The array to iterate over.
   * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
   * @returns {*} Returns the maximum value.
   * @example
   *
   * var objects = [{ 'n': 1 }, { 'n': 2 }];
   *
   * _.maxBy(objects, function(o) { return o.n; });
   * // => { 'n': 2 }
   *
   * // The `_.property` iteratee shorthand.
   * _.maxBy(objects, 'n');
   * // => { 'n': 2 }
   */
  function maxBy(array, iteratee) {
    return array && array.length
      ? baseExtremum(array, getIteratee(iteratee, 2), baseGt)
      : undefined
  }

  /**
   * Computes the mean of the values in `array`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Math
   * @param {Array} array The array to iterate over.
   * @returns {number} Returns the mean.
   * @example
   *
   * _.mean([4, 2, 8, 6]);
   * // => 5
   */
  function mean(array) {
    return baseMean(array, identity)
  }

  /**
   * This method is like `_.mean` except that it accepts `iteratee` which is
   * invoked for each element in `array` to generate the value to be averaged.
   * The iteratee is invoked with one argument: (value).
   *
   * @static
   * @memberOf _
   * @since 4.7.0
   * @category Math
   * @param {Array} array The array to iterate over.
   * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
   * @returns {number} Returns the mean.
   * @example
   *
   * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
   *
   * _.meanBy(objects, function(o) { return o.n; });
   * // => 5
   *
   * // The `_.property` iteratee shorthand.
   * _.meanBy(objects, 'n');
   * // => 5
   */
  function meanBy(array, iteratee) {
    return baseMean(array, getIteratee(iteratee, 2))
  }

  /**
   * Computes the minimum value of `array`. If `array` is empty or falsey,
   * `undefined` is returned.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Math
   * @param {Array} array The array to iterate over.
   * @returns {*} Returns the minimum value.
   * @example
   *
   * _.min([4, 2, 8, 6]);
   * // => 2
   *
   * _.min([]);
   * // => undefined
   */
  function min(array) {
    return array && array.length
      ? baseExtremum(array, identity, baseLt)
      : undefined
  }

  /**
   * This method is like `_.min` except that it accepts `iteratee` which is
   * invoked for each element in `array` to generate the criterion by which
   * the value is ranked. The iteratee is invoked with one argument: (value).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Math
   * @param {Array} array The array to iterate over.
   * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
   * @returns {*} Returns the minimum value.
   * @example
   *
   * var objects = [{ 'n': 1 }, { 'n': 2 }];
   *
   * _.minBy(objects, function(o) { return o.n; });
   * // => { 'n': 1 }
   *
   * // The `_.property` iteratee shorthand.
   * _.minBy(objects, 'n');
   * // => { 'n': 1 }
   */
  function minBy(array, iteratee) {
    return array && array.length
      ? baseExtremum(array, getIteratee(iteratee, 2), baseLt)
      : undefined
  }

  /**
   * Multiply two numbers.
   *
   * @static
   * @memberOf _
   * @since 4.7.0
   * @category Math
   * @param {number} multiplier The first number in a multiplication.
   * @param {number} multiplicand The second number in a multiplication.
   * @returns {number} Returns the product.
   * @example
   *
   * _.multiply(6, 4);
   * // => 24
   */
  var multiply = createMathOperation(function(multiplier, multiplicand) {
    return multiplier * multiplicand
  }, 1)

  /**
   * Computes `number` rounded to `precision`.
   *
   * @static
   * @memberOf _
   * @since 3.10.0
   * @category Math
   * @param {number} number The number to round.
   * @param {number} [precision=0] The precision to round to.
   * @returns {number} Returns the rounded number.
   * @example
   *
   * _.round(4.006);
   * // => 4
   *
   * _.round(4.006, 2);
   * // => 4.01
   *
   * _.round(4060, -2);
   * // => 4100
   */
  var round = createRound('round')

  /**
   * Subtract two numbers.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Math
   * @param {number} minuend The first number in a subtraction.
   * @param {number} subtrahend The second number in a subtraction.
   * @returns {number} Returns the difference.
   * @example
   *
   * _.subtract(6, 4);
   * // => 2
   */
  var subtract = createMathOperation(function(minuend, subtrahend) {
    return minuend - subtrahend
  }, 0)

  /**
   * Computes the sum of the values in `array`.
   *
   * @static
   * @memberOf _
   * @since 3.4.0
   * @category Math
   * @param {Array} array The array to iterate over.
   * @returns {number} Returns the sum.
   * @example
   *
   * _.sum([4, 2, 8, 6]);
   * // => 20
   */
  function sum(array) {
    return array && array.length ? baseSum(array, identity) : 0
  }

  /**
   * This method is like `_.sum` except that it accepts `iteratee` which is
   * invoked for each element in `array` to generate the value to be summed.
   * The iteratee is invoked with one argument: (value).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Math
   * @param {Array} array The array to iterate over.
   * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
   * @returns {number} Returns the sum.
   * @example
   *
   * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
   *
   * _.sumBy(objects, function(o) { return o.n; });
   * // => 20
   *
   * // The `_.property` iteratee shorthand.
   * _.sumBy(objects, 'n');
   * // => 20
   */
  function sumBy(array, iteratee) {
    return array && array.length ? baseSum(array, getIteratee(iteratee, 2)) : 0
  }

  /*------------------------------------------------------------------------*/

  // Add methods that return wrapped values in chain sequences.
  lodash.assign = assign
  lodash.compact = compact
  lodash.concat = concat
  lodash.constant = constant
  lodash.countBy = countBy
  lodash.debounce = debounce
  lodash.difference = difference
  lodash.differenceBy = differenceBy
  lodash.differenceWith = differenceWith
  lodash.dropWhile = dropWhile
  lodash.filter = filter
  lodash.flatten = flatten
  lodash.groupBy = groupBy
  lodash.initial = initial
  lodash.intersection = intersection
  lodash.intersectionBy = intersectionBy
  lodash.intersectionWith = intersectionWith
  lodash.iteratee = iteratee
  lodash.keys = keys
  lodash.keysIn = keysIn
  lodash.map = map
  lodash.mapValues = mapValues
  lodash.memoize = memoize
  lodash.orderBy = orderBy
  lodash.pick = pick
  lodash.pickBy = pickBy
  lodash.property = property
  lodash.pull = pull
  lodash.pullAll = pullAll
  lodash.pullAt = pullAt
  lodash.reverse = reverse
  lodash.set = set
  lodash.slice = slice
  lodash.sortBy = sortBy
  lodash.tail = tail
  lodash.take = take
  lodash.takeRight = takeRight
  lodash.takeWhile = takeWhile
  lodash.throttle = throttle
  lodash.union = union
  lodash.unionBy = unionBy
  lodash.unionWith = unionWith
  lodash.uniq = uniq
  lodash.uniqBy = uniqBy
  lodash.uniqWith = uniqWith
  lodash.values = values
  lodash.without = without
  lodash.xor = xor
  lodash.xorBy = xorBy
  lodash.xorWith = xorWith

  /*------------------------------------------------------------------------*/

  // Add methods that return unwrapped values in chain sequences.
  lodash.add = add
  lodash.ceil = ceil
  lodash.clone = clone
  lodash.cloneDeep = cloneDeep
  lodash.divide = divide
  lodash.eq = eq
  lodash.every = every
  lodash.find = find
  lodash.findIndex = findIndex
  lodash.findLast = findLast
  lodash.findLastIndex = findLastIndex
  lodash.floor = floor
  lodash.forEach = forEach
  lodash.forEachRight = forEachRight
  lodash.get = get
  lodash.hasIn = hasIn
  lodash.head = head
  lodash.identity = identity
  lodash.includes = includes
  lodash.indexOf = indexOf
  lodash.isArguments = isArguments
  lodash.isArray = isArray
  lodash.isArrayLike = isArrayLike
  lodash.isArrayLikeObject = isArrayLikeObject
  lodash.isBuffer = isBuffer
  lodash.isEmpty = isEmpty
  lodash.isEqual = isEqual
  lodash.isEqualWith = isEqualWith
  lodash.isFunction = isFunction
  lodash.isLength = isLength
  lodash.isMap = isMap
  lodash.isObject = isObject
  lodash.isObjectLike = isObjectLike
  lodash.isSet = isSet
  lodash.isString = isString
  lodash.isSymbol = isSymbol
  lodash.isTypedArray = isTypedArray
  lodash.join = join
  lodash.last = last
  lodash.max = max
  lodash.maxBy = maxBy
  lodash.mean = mean
  lodash.meanBy = meanBy
  lodash.min = min
  lodash.minBy = minBy
  lodash.stubArray = stubArray
  lodash.stubFalse = stubFalse
  lodash.multiply = multiply
  lodash.noop = noop
  lodash.now = now
  lodash.pad = pad
  lodash.padEnd = padEnd
  lodash.padStart = padStart
  lodash.parseInt = parseInt
  lodash.reduce = reduce
  lodash.round = round
  lodash.some = some
  lodash.subtract = subtract
  lodash.sum = sum
  lodash.sumBy = sumBy
  lodash.toFinite = toFinite
  lodash.toInteger = toInteger
  lodash.toNumber = toNumber
  lodash.toString = toString
  lodash.trim = trim
  lodash.trimEnd = trimEnd
  lodash.trimStart = trimStart
  lodash.uniqueId = uniqueId

  // Add aliases.
  lodash.each = forEach
  lodash.eachRight = forEachRight
  lodash.first = head

  /*------------------------------------------------------------------------*/

  /**
   * The semantic version number.
   *
   * @static
   * @memberOf _
   * @type {string}
   */
  lodash.VERSION = VERSION

  /*--------------------------------------------------------------------------*/

  // Some AMD build optimizers, like r.js, check for condition patterns like:
  if (
    typeof define == 'function' &&
    typeof define.amd == 'object' &&
    define.amd
  ) {
    // Expose Lodash on the global object to prevent errors when Lodash is
    // loaded by a script tag in the presence of an AMD loader.
    // See http://requirejs.org/docs/errors.html#mismatch for more details.
    // Use `_.noConflict` to remove Lodash from the global object.
    root.lodash = lodash

    // Define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module.
    define(function() {
      return lodash
    })
  }
  // Check for `exports` after `define` in case a build optimizer adds it.
  else if (freeModule) {
    // Export for Node.js.
    ;(freeModule.exports = lodash).lodash = lodash
    // Export for CommonJS support.
    freeExports.lodash = lodash
  } else {
    // Export to the global object.
    root.lodash = lodash
  }
}.call(this))

;(function(context, definition) {
  'use strict'
  if (typeof define === 'function' && define.amd) {
    define(definition)
  } else {
    context.SystemInfo = definition()
  }
})(this, function() {
  'use strict'
  var win = window || {}
  var nav = navigator || {}
  var ua = nav.userAgent
  var self = {}
  var match = {
    Trident: ua.indexOf('Trident') !== -1 || ua.indexOf('NET CLR') !== -1,
    Presto: ua.indexOf('Presto') !== -1,
    WebKit: ua.indexOf('AppleWebKit') !== -1,
    Gecko: ua.indexOf('Gecko/') !== -1,
    Safari: ua.indexOf('Safari') !== -1 || ua.indexOf('iPhone') !== -1,
    Chrome: ua.indexOf('Chrome') !== -1 || ua.indexOf('CriOS') !== -1,
    IE: ua.indexOf('MSIE') !== -1 || ua.indexOf('Trident') !== -1,
    Edge: ua.indexOf('Edge') !== -1,
    Firefox: ua.indexOf('Firefox') !== -1 || ua.indexOf('FxiOS') !== -1,
    'Firefox Focus': ua.indexOf('Focus') !== -1,
    Chromium: ua.indexOf('Chromium') !== -1,
    Opera: ua.indexOf('Opera') !== -1 || ua.indexOf('OPR') !== -1,
    Vivaldi: ua.indexOf('Vivaldi') !== -1,
    Yandex: ua.indexOf('YaBrowser') !== -1,
    Kindle: ua.indexOf('Kindle') !== -1 || ua.indexOf('Silk/') !== -1,
    '360': ua.indexOf('360EE') !== -1 || ua.indexOf('360SE') !== -1,
    UC: ua.indexOf('UC') !== -1 || ua.indexOf(' UBrowser') !== -1,
    QQBrowser: ua.indexOf('QQBrowser') !== -1,
    QQ: ua.indexOf('QQ/') !== -1,
    Baidu: ua.indexOf('Baidu') !== -1 || ua.indexOf('BIDUBrowser') !== -1,
    Maxthon: ua.indexOf('Maxthon') !== -1,
    Sogou: ua.indexOf('MetaSr') !== -1 || ua.indexOf('Sogou') !== -1,
    LBBROWSER: ua.indexOf('LBBROWSER') !== -1,
    '2345Explorer': ua.indexOf('2345Explorer') !== -1,
    TheWorld: ua.indexOf('TheWorld') !== -1,
    XiaoMi: ua.indexOf('MiuiBrowser') !== -1,
    Quark: ua.indexOf('Quark') !== -1,
    Qiyu: ua.indexOf('Qiyu') !== -1,
    Wechat: ua.indexOf('MicroMessenger') !== -1,
    Taobao: ua.indexOf('AliApp(TB') !== -1,
    Alipay: ua.indexOf('AliApp(AP') !== -1,
    Weibo: ua.indexOf('Weibo') !== -1,
    Douban: ua.indexOf('com.douban.frodo') !== -1,
    Suning: ua.indexOf('SNEBUY-APP') !== -1,
    iQiYi: ua.indexOf('IqiyiApp') !== -1,
    Windows: ua.indexOf('Windows') !== -1,
    Linux: ua.indexOf('Linux') !== -1 || ua.indexOf('X11') !== -1,
    'Mac OS': ua.indexOf('Macintosh') !== -1,
    Android: ua.indexOf('Android') !== -1 || ua.indexOf('Adr') !== -1,
    Ubuntu: ua.indexOf('Ubuntu') !== -1,
    FreeBSD: ua.indexOf('FreeBSD') !== -1,
    Debian: ua.indexOf('Debian') !== -1,
    'Windows Phone':
      ua.indexOf('IEMobile') !== -1 || ua.indexOf('Windows Phone') !== -1,
    BlackBerry: ua.indexOf('BlackBerry') !== -1 || ua.indexOf('RIM') !== -1,
    MeeGo: ua.indexOf('MeeGo') !== -1,
    Symbian: ua.indexOf('Symbian') !== -1,
    iOS: ua.indexOf('like Mac OS X') !== -1,
    'Chrome OS': ua.indexOf('CrOS') !== -1,
    WebOS: ua.indexOf('hpwOS') !== -1,
    Mobile:
      ua.indexOf('Android') !== -1 ||
      ua.indexOf('Adr') !== -1 ||
      ua.indexOf('Mobile') !== -1 ||
      ua.indexOf('Ios') !== -1 ||
      ua.indexOf('like Mac OS X') !== -1 ||
      ua.indexOf('iPhone') !== -1 ||
      ua.indexOf('iPad') !== -1 ||
      ua.indexOf('iPod') !== -1 ||
      ua.indexOf('Tablet') !== -1
  }
  if (match['Mobile']) {
    // match['Mobile'] = !(ua.indexOf('iPad') !== -1);
  } else if (win.showModalDialog && win.chrome) {
    match['360'] = true
  }
  var hash = {
    engine: ['WebKit', 'Trident', 'Gecko', 'Presto'],
    browser: [
      'Safari',
      'Chrome',
      'Edge',
      'IE',
      'Firefox',
      'Firefox Focus',
      'Chromium',
      'Opera',
      'Vivaldi',
      'Yandex',
      'Kindle',
      '360',
      'UC',
      'QQBrowser',
      'QQ',
      'Baidu',
      'Maxthon',
      'Sogou',
      'LBBROWSER',
      '2345Explorer',
      'TheWorld',
      'XiaoMi',
      'Quark',
      'Qiyu',
      'Wechat',
      'Taobao',
      'Alipay',
      'Weibo',
      'Douban',
      'Suning',
      'iQiYi'
    ],
    os: [
      'Windows',
      'Linux',
      'Mac OS',
      'Android',
      'Ubuntu',
      'FreeBSD',
      'Debian',
      'iOS',
      'Windows Phone',
      'BlackBerry',
      'MeeGo',
      'Symbian',
      'Chrome OS',
      'WebOS'
    ],
    device: ['Mobile']
  }
  self.device = 'PC'
  if (window.isForceMobile) {
    self.device = 'Mobile'
  }
  self.language = (function() {
    var g = nav.browserLanguage || nav.language
    var arr = g.split('-')
    if (arr[1]) {
      arr[1] = arr[1].toUpperCase()
    }
    return arr.join('_')
  })()
  for (var s in hash) {
    for (var i = 0; i < hash[s].length; i++) {
      var value = hash[s][i]
      if (match[value]) {
        self[s] = value
      }
    }
  }
  var osVersion = {
    Windows: function() {
      var v = ua.replace(/^.*Windows NT ([\d.]+);.*$/, '$1')
      var hash = {
        '6.4': '10',
        '6.3': '8.1',
        '6.2': '8',
        '6.1': '7',
        '6.0': 'Vista',
        '5.2': 'XP',
        '5.1': 'XP',
        '5.0': '2000'
      }
      return hash[v] || v
    },
    Android: function() {
      return ua.replace(/^.*Android ([\d.]+);.*$/, '$1')
    },
    iOS: function() {
      return ua.replace(/^.*OS ([\d_]+) like.*$/, '$1').replace(/_/g, '.')
    },
    Debian: function() {
      return ua.replace(/^.*Debian\/([\d.]+).*$/, '$1')
    },
    'Windows Phone': function() {
      return ua.replace(/^.*Windows Phone( OS)? ([\d.]+);.*$/, '$2')
    },
    'Mac OS': function() {
      return ua.replace(/^.*Mac OS X ([\d_]+).*$/, '$1').replace(/_/g, '.')
    },
    WebOS: function() {
      return ua.replace(/^.*hpwOS\/([\d.]+);.*$/, '$1')
    }
  }
  self.osVersion = ''
  if (osVersion[self.os]) {
    self.osVersion = osVersion[self.os]()
    if (self.osVersion == ua) {
      self.osVersion = ''
    }
  }
  var version = {
    Safari: function() {
      return ua.replace(/^.*Version\/([\d.]+).*$/, '$1')
    },
    Chrome: function() {
      return ua
        .replace(/^.*Chrome\/([\d.]+).*$/, '$1')
        .replace(/^.*CriOS\/([\d.]+).*$/, '$1')
    },
    IE: function() {
      return ua
        .replace(/^.*MSIE ([\d.]+).*$/, '$1')
        .replace(/^.*rv:([\d.]+).*$/, '$1')
    },
    Edge: function() {
      return ua.replace(/^.*Edge\/([\d.]+).*$/, '$1')
    },
    Firefox: function() {
      return ua
        .replace(/^.*Firefox\/([\d.]+).*$/, '$1')
        .replace(/^.*FxiOS\/([\d.]+).*$/, '$1')
    },
    'Firefox Focus': function() {
      return ua.replace(/^.*Focus\/([\d.]+).*$/, '$1')
    },
    Chromium: function() {
      return ua.replace(/^.*Chromium\/([\d.]+).*$/, '$1')
    },
    Opera: function() {
      return ua
        .replace(/^.*Opera\/([\d.]+).*$/, '$1')
        .replace(/^.*OPR\/([\d.]+).*$/, '$1')
    },
    Vivaldi: function() {
      return ua.replace(/^.*Vivaldi\/([\d.]+).*$/, '$1')
    },
    Yandex: function() {
      return ua.replace(/^.*YaBrowser\/([\d.]+).*$/, '$1')
    },
    Kindle: function() {
      return ua.replace(/^.*Version\/([\d.]+).*$/, '$1')
    },
    Maxthon: function() {
      return ua.replace(/^.*Maxthon\/([\d.]+).*$/, '$1')
    },
    QQBrowser: function() {
      return ua.replace(/^.*QQBrowser\/([\d.]+).*$/, '$1')
    },
    QQ: function() {
      return ua.replace(/^.*QQ\/([\d.]+).*$/, '$1')
    },
    Baidu: function() {
      return ua.replace(/^.*BIDUBrowser[\s\/]([\d.]+).*$/, '$1')
    },
    UC: function() {
      return ua.replace(/^.*UC?Browser\/([\d.]+).*$/, '$1')
    },
    Sogou: function() {
      return ua
        .replace(/^.*SE ([\d.X]+).*$/, '$1')
        .replace(/^.*SogouMobileBrowser\/([\d.]+).*$/, '$1')
    },
    '2345Explorer': function() {
      return ua.replace(/^.*2345Explorer\/([\d.]+).*$/, '$1')
    },
    TheWorld: function() {
      return ua.replace(/^.*TheWorld ([\d.]+).*$/, '$1')
    },
    XiaoMi: function() {
      return ua.replace(/^.*MiuiBrowser\/([\d.]+).*$/, '$1')
    },
    Quark: function() {
      return ua.replace(/^.*Quark\/([\d.]+).*$/, '$1')
    },
    Qiyu: function() {
      return ua.replace(/^.*Qiyu\/([\d.]+).*$/, '$1')
    },
    Wechat: function() {
      return ua.replace(/^.*MicroMessenger\/([\d.]+).*$/, '$1')
    },
    Taobao: function() {
      return ua.replace(/^.*AliApp\(TB\/([\d.]+).*$/, '$1')
    },
    Alipay: function() {
      return ua.replace(/^.*AliApp\(AP\/([\d.]+).*$/, '$1')
    },
    Weibo: function() {
      return ua.replace(/^.*weibo__([\d.]+).*$/, '$1')
    },
    Douban: function() {
      return ua.replace(/^.*com.douban.frodo\/([\d.]+).*$/, '$1')
    },
    Suning: function() {
      return ua.replace(/^.*SNEBUY-APP([\d.]+).*$/, '$1')
    },
    iQiYi: function() {
      return ua.replace(/^.*IqiyiVersion\/([\d.]+).*$/, '$1')
    }
  }
  self.version = ''
  if (version[self.browser]) {
    self.version = version[self.browser]()
    if (self.version == ua) {
      self.version = ''
    }
  }
  return {
    device: self.device,
    os: self.os,
    osVersion: self.osVersion,
    browser: self.browser,
    version: self.version,
    language: self.language
  }
})

;(function(context, definition) {
  'use strict'
  if (typeof define === 'function' && define.amd) {
    define(definition)
  } else {
    context.DateUtil = definition()
  }
})(this, function() {
  'use strict'
  var fecha = {}
  var token = /d{1,4}|M{1,4}|yy(?:yy)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g
  var twoDigits = /\d\d?/
  var threeDigits = /\d{3}/
  var fourDigits = /\d{4}/
  var word = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i
  var noop = function() {}
  var shorten = function(arr, sLen) {
    var newArr = []
    for (var i = 0, len = arr.length; i < len; i++) {
      newArr.push(arr[i].substr(0, sLen))
    }
    return newArr
  }
  var monthUpdate = function(arrName) {
    return function(d, v, i18n) {
      var index = i18n[arrName].indexOf(
        v.charAt(0).toUpperCase() + v.substr(1).toLowerCase()
      )
      if (~index) {
        d.month = index
      }
    }
  }
  var pad = function(val, len) {
    val = String(val)
    len = len || 2
    while (val.length < len) {
      val = '0' + val
    }
    return val
  }
  var dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
  var monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  var monthNamesShort = shorten(monthNames, 3)
  var dayNamesShort = shorten(dayNames, 3)
  var formatFlags = {
    D: function(dateObj) {
      return dateObj.getDay()
    },
    DD: function(dateObj) {
      return pad(dateObj.getDay())
    },
    Do: function(dateObj, i18n) {
      return i18n.DoFn(dateObj.getDate())
    },
    d: function(dateObj) {
      return dateObj.getDate()
    },
    dd: function(dateObj) {
      return pad(dateObj.getDate())
    },
    ddd: function(dateObj, i18n) {
      return i18n.dayNamesShort[dateObj.getDay()]
    },
    dddd: function(dateObj, i18n) {
      return i18n.dayNames[dateObj.getDay()]
    },
    M: function(dateObj) {
      return dateObj.getMonth() + 1
    },
    MM: function(dateObj) {
      return pad(dateObj.getMonth() + 1)
    },
    MMM: function(dateObj, i18n) {
      return i18n.monthNamesShort[dateObj.getMonth()]
    },
    MMMM: function(dateObj, i18n) {
      return i18n.monthNames[dateObj.getMonth()]
    },
    yy: function(dateObj) {
      return String(dateObj.getFullYear()).substr(2)
    },
    yyyy: function(dateObj) {
      return dateObj.getFullYear()
    },
    h: function(dateObj) {
      return dateObj.getHours() % 12 || 12
    },
    hh: function(dateObj) {
      return pad(dateObj.getHours() % 12 || 12)
    },
    H: function(dateObj) {
      return dateObj.getHours()
    },
    HH: function(dateObj) {
      return pad(dateObj.getHours())
    },
    m: function(dateObj) {
      return dateObj.getMinutes()
    },
    mm: function(dateObj) {
      return pad(dateObj.getMinutes())
    },
    s: function(dateObj) {
      return dateObj.getSeconds()
    },
    ss: function(dateObj) {
      return pad(dateObj.getSeconds())
    },
    S: function(dateObj) {
      return Math.round(dateObj.getMilliseconds() / 100)
    },
    SS: function(dateObj) {
      return pad(Math.round(dateObj.getMilliseconds() / 10), 2)
    },
    SSS: function(dateObj) {
      return pad(dateObj.getMilliseconds(), 3)
    },
    a: function(dateObj, i18n) {
      return dateObj.getHours() < 12 ? i18n.amPm[0] : i18n.amPm[1]
    },
    A: function(dateObj, i18n) {
      return dateObj.getHours() < 12
        ? i18n.amPm[0].toUpperCase()
        : i18n.amPm[1].toUpperCase()
    },
    ZZ: function(dateObj) {
      var o = dateObj.getTimezoneOffset()
      return (
        (o > 0 ? '-' : '+') +
        pad(Math.floor(Math.abs(o) / 60) * 100 + (Math.abs(o) % 60), 4)
      )
    }
  }
  var parseFlags = {
    d: [
      twoDigits,
      function(d, v) {
        d.day = v
      }
    ],
    M: [
      twoDigits,
      function(d, v) {
        d.month = v - 1
      }
    ],
    yy: [
      twoDigits,
      function(d, v) {
        var da = new Date(),
          cent = +('' + da.getFullYear()).substr(0, 2)
        d.year = '' + (v > 68 ? cent - 1 : cent) + v
      }
    ],
    h: [
      twoDigits,
      function(d, v) {
        d.hour = v
      }
    ],
    m: [
      twoDigits,
      function(d, v) {
        d.minute = v
      }
    ],
    s: [
      twoDigits,
      function(d, v) {
        d.second = v
      }
    ],
    yyyy: [
      fourDigits,
      function(d, v) {
        d.year = v
      }
    ],
    S: [
      /\d/,
      function(d, v) {
        d.millisecond = v * 100
      }
    ],
    SS: [
      /\d{2}/,
      function(d, v) {
        d.millisecond = v * 10
      }
    ],
    SSS: [
      threeDigits,
      function(d, v) {
        d.millisecond = v
      }
    ],
    D: [twoDigits, noop],
    ddd: [word, noop],
    MMM: [word, monthUpdate('monthNamesShort')],
    MMMM: [word, monthUpdate('monthNames')],
    a: [
      word,
      function(d, v, i18n) {
        var val = v.toLowerCase()
        if (val === i18n.amPm[0]) {
          d.isPm = false
        } else if (val === i18n.amPm[1]) {
          d.isPm = true
        }
      }
    ],
    ZZ: [
      /[\+\-]\d\d:?\d\d/,
      function(d, v) {
        var parts = (v + '').match(/([\+\-]|\d\d)/gi),
          minutes
        if (parts) {
          minutes = +(parts[1] * 60) + parseInt(parts[2], 10)
          d.timezoneOffset = parts[0] === '+' ? minutes : -minutes
        }
      }
    ]
  }
  parseFlags.DD = parseFlags.D
  parseFlags.dddd = parseFlags.ddd
  parseFlags.Do = parseFlags.dd = parseFlags.d
  parseFlags.mm = parseFlags.m
  parseFlags.hh = parseFlags.H = parseFlags.HH = parseFlags.h
  parseFlags.MM = parseFlags.M
  parseFlags.ss = parseFlags.s
  parseFlags.A = parseFlags.a
  fecha.i18n = {
    dayNamesShort: dayNamesShort,
    dayNames: dayNames,
    monthNamesShort: monthNamesShort,
    monthNames: monthNames,
    amPm: ['am', 'pm'],
    DoFn: function DoFn(D) {
      return (
        D +
        ['th', 'st', 'nd', 'rd'][
          D % 10 > 3 ? 0 : ((D - (D % 10) !== 10) * D) % 10
        ]
      )
    }
  }
  fecha.masks = {
    default: 'ddd MMM dd yyyy HH:mm:ss',
    shortDate: 'M/D/yy',
    mediumDate: 'MMM d, yyyy',
    longDate: 'MMMM d, yyyy',
    fullDate: 'dddd, MMMM d, yyyy',
    shortTime: 'HH:mm',
    mediumTime: 'HH:mm:ss',
    longTime: 'HH:mm:ss.SSS'
  }
  fecha.format = function(dateObj, mask, i18nSettings) {
    var i18n = i18nSettings || fecha.i18n
    if (typeof dateObj === 'number') {
      dateObj = new Date(dateObj)
    }
    if (
      Object.prototype.toString.call(dateObj) !== '[object Date]' ||
      isNaN(dateObj.getTime())
    ) {
      throw 'Invalid Date in fecha.format'
    }
    mask = fecha.masks[mask] || mask || fecha.masks['default']
    return mask.replace(token, function($0) {
      return $0 in formatFlags
        ? formatFlags[$0](dateObj, i18n)
        : $0.slice(1, $0.length - 1)
    })
  }
  fecha.parse = function(dateStr, format, i18nSettings) {
    var i18n = i18nSettings || fecha.i18n
    if (typeof format !== 'string') {
      throw 'Invalid format in fecha.parse'
    }
    format = fecha.masks[format] || format
    if (dateStr.length > 1000) {
      return null
    }
    var isValid = true
    var dateInfo = {}
    format.replace(token, function($0) {
      if (parseFlags[$0]) {
        var info = parseFlags[$0]
        var index = dateStr.search(info[0])
        if (!~index) {
          isValid = false
        } else {
          dateStr.replace(info[0], function(result) {
            info[1](dateInfo, result, i18n)
            dateStr = dateStr.substr(index + result.length)
            return result
          })
        }
      }
      return parseFlags[$0] ? '' : $0.slice(1, $0.length - 1)
    })
    if (!isValid) {
      return null
    }
    var today = new Date()
    if (
      dateInfo.isPm === true &&
      dateInfo.hour != null &&
      +dateInfo.hour !== 12
    ) {
      dateInfo.hour = +dateInfo.hour + 12
    } else if (dateInfo.isPm === false && +dateInfo.hour === 12) {
      dateInfo.hour = 0
    }
    var date
    if (dateInfo.timezoneOffset != null) {
      dateInfo.minute = +(dateInfo.minute || 0) - +dateInfo.timezoneOffset
      date = new Date(
        Date.UTC(
          dateInfo.year || today.getFullYear(),
          dateInfo.month || 0,
          dateInfo.day || 1,
          dateInfo.hour || 0,
          dateInfo.minute || 0,
          dateInfo.second || 0,
          dateInfo.millisecond || 0
        )
      )
    } else {
      date = new Date(
        dateInfo.year || today.getFullYear(),
        dateInfo.month || 0,
        dateInfo.day || 1,
        dateInfo.hour || 0,
        dateInfo.minute || 0,
        dateInfo.second || 0,
        dateInfo.millisecond || 0
      )
    }
    return date
  }
  return fecha
})

;(function(context, definition) {
  'use strict'
  if (typeof define === 'function' && define.amd) {
    define([
      'Vue',
      'SystemInfo',
      'DateUtil',
      'VueI18n',
      'VueResource'
    ], definition)
  } else {
    context.VueUtil = definition(
      context.Vue,
      context.SystemInfo,
      context.DateUtil
    )
    delete context.SystemInfo
    delete context.DateUtil
    delete context.VueResource
    delete context.VueI18n
  }
})(this, function(Vue, SystemInfo, DateUtil) {
  'use strict'
  var version = '1.6.14'
  var _toString = Object.prototype.toString
  var _map = Array.prototype.map
  var _filter = Array.prototype.filter
  var isNull = function(v) {
    return v === null
  }
  var isUndefined = function(v) {
    return typeof v === 'undefined'
  }
  var isRegExp = function(v) {
    return '[object RegExp]' === Object.prototype.toString.call(v)
  }
  var isDef = function(v) {
    return v !== undefined && v !== null
  }
  var objType = function(obj) {
    return _toString.call(obj).slice(8, -1)
  }
  var isString = function(obj) {
    return objType(obj) === 'String'
  }
  var isNumber = function(obj) {
    return objType(obj) === 'Number' && obj === obj
  }
  var isNumberStr = function(num) {
    if (typeof num === 'number') {
      return num - num === 0
    }
    if (typeof num === 'string' && num.trim() !== '') {
      return Number.isFinite ? Number.isFinite(+num) : isFinite(+num)
    }
    return false
  }
  var newArray = function(start, end) {
    var result = []

    for (var i = start; i <= end; i++) {
      result.push(i)
    }

    return result
  }
  var isBoolean = function(obj) {
    return objType(obj) === 'Boolean'
  }
  var isFile = function(obj) {
    return objType(obj) === 'File'
  }
  var isObject = function(obj) {
    return objType(obj) === 'Object'
  }
  var isArray = function(obj) {
    return objType(obj) === 'Array'
  }
  var isFunction = function(obj) {
    return objType(obj) === 'Function'
  }
  var isDate = function(obj) {
    return objType(obj) === 'Date'
  }
  var isDateObject = function(val) {
    return val instanceof Date
  }
  var isNodeList = function(obj) {
    return objType(obj) === 'NodeList'
  }
  var isElement = function(obj) {
    return objType(obj).indexOf('Element') !== -1
  }
  var isVNode = function(node) {
    return isObject(node) && node.hasOwnProperty('componentOptions')
  }
  var isVueComponent = function(node) {
    return isObject(node) && node.hasOwnProperty('$root')
  }
  var toString = function(val) {
    return !isDef(val)
      ? ''
      : typeof val === 'object'
      ? JSON.stringify(val)
      : String(val)
  }
  var toDate = function(date) {
    return !isDef(date) || isNaN(new Date(date).getTime())
      ? null
      : new Date(date)
  }
  var formatNumber = function(number, dec, dsep, tsep) {
    isDef(number) && (number = number * 1)
    if (!isNumber(number)) return null
    isDef(dec) && (dec = dec * 1)
    if (!isNumber(dec)) dec = 2
    number = number.toFixed(dec)
    if (!isString(dsep)) dsep = '.'
    if (!isString(tsep)) tsep = ','
    var parts = number.split('.')
    var fnums = parts[0]
    var decimals = parts[1] ? dsep + parts[1] : ''
    return fnums.replace(/(\d)(?=(?:\d{3})+$)/g, '$1' + tsep) + decimals
  }
  var formatDate = function(date, format) {
    date = toDate(date)
    if (!isDef(date)) return null

    if (format == 'timestamp') {
      return date.getTime()
    }
    return DateUtil.format(date, format || 'yyyy-MM-dd')
  }
  var range = function a(n) {
    // see https://stackoverflow.com/questions/3746725/create-a-javascript-array-containing-1-n
    return Array.apply(null, {
      length: n
    }).map(function(_, n) {
      return n
    })
  }

  var modifyDate = function(date, y, m, d) {
    return new Date(
      y,
      m,
      d,
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    )
  }

  var modifyTime = function(date, h, m, s) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      h,
      m,
      s,
      date.getMilliseconds()
    )
  }

  var modifyWithTimeString = function(date, time) {
    if (date == null || !time) {
      return date
    }

    time = parseDate(time, 'HH:mm:ss')
    return modifyTime(
      date,
      time.getHours(),
      time.getMinutes(),
      time.getSeconds()
    )
  }

  var clearTime = function(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
  }

  var clearMilliseconds = function(date) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      0
    )
  }

  var limitTimeRange = function(date, ranges) {
    var format =
      arguments.length > 2 && arguments[2] !== undefined
        ? arguments[2]
        : 'HH:mm:ss'
    if (ranges.length === 0) return date

    var normalizeDate = function(date) {
      return DateUtil.parse(DateUtil.format(date, format), format)
    }

    var ndate = normalizeDate(date)
    var nranges = ranges.map(function(range) {
      return range.map(normalizeDate)
    })
    if (
      nranges.some(function(nrange) {
        return ndate >= nrange[0] && ndate <= nrange[1]
      })
    )
      return date
    var minDate = nranges[0][0]
    var maxDate = nranges[0][0]
    nranges.forEach(function(nrange) {
      minDate = new Date(Math.min(nrange[0], minDate))
      maxDate = new Date(Math.max(nrange[1], minDate))
    })
    var ret = ndate < minDate ? minDate : maxDate // preserve Year/Month/Date

    return modifyDate(ret, date.getFullYear(), date.getMonth(), date.getDate())
  }
  var parseDate = function(string, format) {
    // 对应timepicker选中值不会改变问题  string=1730 format=HHmm 结果20190101 08:05
    // var str = formatDate(string, format);
    // if (!isDef(str)) str = string;
    var str

    if (typeof string === 'number' && format === 'timestamp') {
      return new Date(string)
    }

    if (typeof string != 'string') {
      str = formatDate(string, format)
    } else if (!format && string.indexOf('GMT') > -1) {
      return new Date(string)
    }

    if (!isDef(str)) str = string
    return DateUtil.parse(str, format || 'yyyy-MM-dd')
  }
  var getDayCountOfMonth = function(year, month) {
    isDef(year) && (year = year * 1)
    isDef(month) && (month = month * 1)
    if (!isNumber(year) || !isNumber(month)) return null
    if (month === 3 || month === 5 || month === 8 || month === 10) {
      return 30
    }
    if (month === 1) {
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return 29
      } else {
        return 28
      }
    }
    return 31
  }
  var getDayCountOfYear = function(year) {
    var isLeapYear = year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)
    return isLeapYear ? 366 : 365
  }
  var getFirstDayOfMonth = function(date) {
    var temp = toDate(date)
    if (!isDate(temp)) return null
    temp.setDate(1)
    return temp.getDay()
  }
  var getStartDateOfMonth = function(year, month) {
    var result = new Date(year, month, 1)
    var day = result.getDay()

    if (day === 0) {
      return prevDate(result, 7)
    } else {
      return prevDate(result, day)
    }
  }

  var prevDate = function(date) {
    var amount =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - amount
    )
  }

  var nextDate = function(date) {
    var amount =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + amount
    )
  }

  var timeWithinRange = function(date, selectableRange, format) {
    var limitedDate = limitTimeRange(date, selectableRange, format)
    return limitedDate.getTime() === date.getTime()
  }

  var changeYearMonthAndClampDate = function(date, year, month) {
    var monthDate = Math.min(date.getDate(), getDayCountOfMonth(year, month))
    return modifyDate(date, year, month, monthDate)
  }

  var prevMonth = function(date) {
    var year = date.getFullYear()
    var month = date.getMonth()
    return month === 0
      ? changeYearMonthAndClampDate(date, year - 1, 11)
      : changeYearMonthAndClampDate(date, year, month - 1)
  }

  var nextMonth = function(date) {
    var year = date.getFullYear()
    var month = date.getMonth()
    return month === 11
      ? changeYearMonthAndClampDate(date, year + 1, 0)
      : changeYearMonthAndClampDate(date, year, month + 1)
  }

  var prevYear = function(date) {
    var amount =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1
    var year = date.getFullYear()
    var month = date.getMonth()
    return changeYearMonthAndClampDate(date, year - amount, month)
  }

  var nextYear = function(date) {
    var amount =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1
    var year = date.getFullYear()
    var month = date.getMonth()
    return changeYearMonthAndClampDate(date, year + amount, month)
  }
  var getWeekNumber = function(date) {
    date = toDate(date)
    if (!isDate(date)) return null
    date.setHours(0, 0, 0, 0)
    date.setTime(date.getTime() + (6 - date.getDay()) * 86400000)
    var firstDate = new Date(date.getFullYear(), 0, 1)
    return Math.ceil((date.getTime() - firstDate.getTime()) / 86400000 / 7)
  }

  var getRangeHours = function(ranges) {
    var hours = []
    var disabledHours = []
    ;(ranges || []).forEach(function(range) {
      var value = range.map(function(date) {
        return date.getHours()
      })
      disabledHours = disabledHours.concat(newArray(value[0], value[1]))
    })

    if (disabledHours.length) {
      for (var i = 0; i < 24; i++) {
        hours[i] = disabledHours.indexOf(i) === -1
      }
    } else {
      for (var _i = 0; _i < 24; _i++) {
        hours[_i] = false
      }
    }

    return hours
  }

  var setRangeData = function(arr, start, end, value) {
    for (var i = start; i < end; i++) {
      arr[i] = value
    }
  }

  var getRangeMinutes = function(ranges, hour) {
    var minutes = new Array(60)

    if (ranges.length > 0) {
      ranges.forEach(function(range) {
        var start = range[0]
        var end = range[1]
        var startHour = start.getHours()
        var startMinute = start.getMinutes()
        var endHour = end.getHours()
        var endMinute = end.getMinutes()

        if (startHour === hour && endHour !== hour) {
          setRangeData(minutes, startMinute, 60, true)
        } else if (startHour === hour && endHour === hour) {
          setRangeData(minutes, startMinute, endMinute + 1, true)
        } else if (startHour !== hour && endHour === hour) {
          setRangeData(minutes, 0, endMinute + 1, true)
        } else if (startHour < hour && endHour > hour) {
          setRangeData(minutes, 0, 60, true)
        }
      })
    } else {
      setRangeData(minutes, 0, 60, true)
    }

    return minutes
  }
  var addDate = function(src, num, type) {
    src = toDate(src)
    isDef(num) && (num = num * 1)
    if (!isDate(src) || !isNumber(num)) return null
    if (
      type !== 'week' &&
      type !== 'day' &&
      type !== 'month' &&
      type !== 'year'
    )
      type = 'day'
    var result = new Date()
    switch (type.toLowerCase()) {
      case 'week':
        var week = 7
        result.setTime(src.getTime() + 86400000 * num * (week || 1))
        break
      case 'day':
        result.setTime(src.getTime() + 86400000 * num * (week || 1))
        break
      case 'month':
        var year = src.getFullYear()
        var month = src.getMonth()
        var date = src.getDate()
        var addMonth = 1
        if (num < 0) {
          addMonth = -1
          num = -num
        }
        while (num--) {
          if (addMonth > 0) {
            year = month === 11 ? year + addMonth : year
            month = month === 11 ? 0 : month + addMonth
          } else {
            year = month === 0 ? year + addMonth : year
            month = month === 0 ? 11 : month + addMonth
          }
        }
        var newMonthDayCount = getDayCountOfMonth(year, month)
        if (newMonthDayCount < date) {
          src.setDate(newMonthDayCount)
        }
        src.setMonth(month)
        src.setFullYear(year)
        result.setTime(src.getTime())
        break
      case 'year':
        src.setFullYear(src.getFullYear() + num)
        result.setTime(src.getTime())
        break
    }
    return result
  }

  var extractDateFormat = function(format) {
    return format
      .replace(/\W?m{1,2}|\W?ZZ/g, '')
      .replace(/\W?h{1,2}|\W?s{1,3}|\W?a/gi, '')
      .trim()
  }

  var extractTimeFormat = function(format) {
    return format
      .replace(/\W?D{1,2}|\W?Do|\W?d{1,4}|\W?M{1,4}|\W?y{2,4}/g, '')
      .trim()
  }

  var loop = function(arr, fn) {
    if (isDef(arr) && isNumber(arr.length) && isFunction(fn)) {
      for (var i = 0, j = arr.length; i < j; i++) {
        if (fn(arr[i], i) === false) break
      }
    }
  }
  var ownPropertyLoop = function(obj, fn) {
    isDef(obj) && loop(Object.keys(obj), fn)
  }
  var map = function(arr, fn) {
    if (isArray(arr) && isFunction(fn)) {
      return _map.call(arr, fn)
    }
    return []
  }
  var filter = function(arr, fn) {
    if (isArray(arr) && isFunction(fn)) {
      return _filter.call(arr, fn)
    }
    return []
  }
  var trim = function(str) {
    if (!isString(str)) return str
    return str.replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
  }
  var deepCopy = function(obj, parent) {
    if (!isDef(parent)) parent = null
    var result = {}
    if (isArray(obj)) result = []
    var _parent = parent
    while (_parent) {
      if (_parent.originalParent === obj) {
        return _parent.currentParent
      }
      _parent = _parent.parent
    }
    ownPropertyLoop(obj, function(key) {
      var temp = obj[key]
      if (temp && typeof temp === 'object') {
        result[key] = deepCopy(temp, {
          originalParent: obj,
          currentParent: result,
          parent: parent
        })
      } else {
        result[key] = temp
      }
    })
    return result
  }
  var destructuring = function(destination, sources) {
    if (destination && sources) {
      var rest = VueUtil.assign.apply(
        this,
        [{}].concat(VueUtil.slice(arguments, 1))
      )
      var restKeys = Object.keys(rest)
      VueUtil.loop(Object.keys(destination), function(key) {
        if (restKeys.indexOf(key) > -1) {
          destination[key] = rest[key]
        }
      })
    }
    return destination
  }
  var merge = function(target) {
    loop(arguments, function(source, index) {
      if (index === 0) return
      ownPropertyLoop(source, function(prop) {
        if (isObject(target[prop]) && isObject(source[prop])) {
          target[prop] = merge({}, target[prop], source[prop])
        } else {
          isDef(source[prop]) && (target[prop] = source[prop])
        }
      })
    })
    return target
  }
  var mergeArray = function(target) {
    if (!isArray(target)) target = []
    loop(arguments, function(array, index) {
      if (index === 0 || !isDef(array)) return
      if (!isArray(array)) {
        target.push(array)
      } else {
        loop(array, function(item) {
          if (isArray(item)) item = mergeArray([], item)
          target.push(item)
        })
      }
    })
    return target
  }

  function arrayIndexOfVal(obj, val) {
    if (obj.indexOf) {
      return obj.indexOf(val)
    }
    for (var index = 0, len = obj.length; index < len; index++) {
      if (val === obj[index]) {
        return index
      }
    }
  }

  var arrayFindIndex = function(arr, pred) {
    for (var i = 0; i !== arr.length; ++i) {
      if (pred(arr[i])) {
        return i
      }
    }

    return -1
  }

  var arrayFind = function(arr, pred) {
    var idx = arrayFindIndex(arr, pred)
    return idx !== -1 ? arr[idx] : undefined
  } // coerce truthy value to array

  function findTreeItem(
    parent,
    obj,
    iterate,
    context,
    path,
    node,
    parseChildren,
    opts
  ) {
    if (obj) {
      var item, index, len, paths, nodes, match
      for (index = 0, len = obj.length; index < len; index++) {
        item = obj[index]
        paths = path.concat(['' + index])
        nodes = node.concat([item])
        if (iterate.call(context, item, index, obj, paths, parent, nodes)) {
          return {
            index: index,
            item: item,
            path: paths,
            items: obj,
            parent: parent,
            nodes: nodes
          }
        }
        if (parseChildren && item) {
          match = findTreeItem(
            item,
            item[parseChildren],
            iterate,
            context,
            paths.concat([parseChildren]),
            nodes,
            parseChildren,
            opts
          )
          if (match) {
            return match
          }
        }
      }
    }
  }

  function eachTreeItem(
    parent,
    obj,
    iterate,
    context,
    path,
    node,
    parseChildren,
    opts
  ) {
    var paths, nodes
    VueUtil.forEach(obj, function(item, index) {
      paths = path.concat(['' + index])
      nodes = node.concat([item])
      iterate.call(context, item, index, obj, paths, parent, nodes)
      if (item && parseChildren) {
        paths.push(parseChildren)
        eachTreeItem(
          item,
          item[parseChildren],
          iterate,
          context,
          paths,
          nodes,
          parseChildren,
          opts
        )
      }
    })
  }

  function helperCreateTreeFunc(handle) {
    return function(obj, iterate, options, context) {
      var opts = options || {}
      var optChildren = opts.children || 'children'
      return handle(null, obj, iterate, context, [], [], optChildren, opts)
    }
  }

  function mapTreeItem(
    parent,
    obj,
    iterate,
    context,
    path,
    node,
    parseChildren,
    opts
  ) {
    var paths, nodes, rest
    var mapChildren = opts.mapChildren || parseChildren
    return VueUtil.map(obj, function(item, index) {
      paths = path.concat(['' + index])
      nodes = node.concat([item])
      rest = iterate.call(context, item, index, obj, paths, parent, nodes)
      if (rest && item && parseChildren && item[parseChildren]) {
        rest[mapChildren] = mapTreeItem(
          item,
          item[parseChildren],
          iterate,
          context,
          paths,
          nodes,
          parseChildren,
          opts
        )
      }
      return rest
    })
  }

  function searchTreeItem(
    parentAllow,
    parent,
    obj,
    iterate,
    context,
    path,
    node,
    parseChildren,
    opts
  ) {
    var paths, nodes, rest, isAllow, hasChild
    var rests = []
    var hasOriginal = opts.original
    var mapChildren = opts.mapChildren || parseChildren
    VueUtil.forEach(obj, function(item, index) {
      paths = path.concat(['' + index])
      nodes = node.concat([item])
      isAllow =
        parentAllow ||
        iterate.call(context, item, index, obj, paths, parent, nodes)
      hasChild = parseChildren && item[parseChildren]
      if (isAllow || hasChild) {
        rest = hasOriginal ? item : VueUtil.assign({}, item)
      }
      if (isAllow || hasChild) {
        rest[mapChildren] = searchTreeItem(
          isAllow,
          item,
          item[parseChildren],
          iterate,
          context,
          paths,
          nodes,
          parseChildren,
          opts
        )
        if (isAllow || rest[mapChildren].length) {
          rests.push(rest)
        }
      } else if (isAllow) {
        rests.push(rest)
      }
    })
    return rests
  }

  function unTreeList(result, array, opts) {
    var children
    var optChildren = opts.children
    var optData = opts.data
    VueUtil.forEach(array, function(item) {
      children = item[optChildren]
      if (optData) {
        item = item[optData]
      }
      result.push(item)
      if (children) {
        unTreeList(result, children, opts)
      }
    })
    return result
  }

  function toTreeArray(array, options) {
    return unTreeList(
      [],
      array,
      VueUtil.assign(
        {},
        {
          parentKey: 'parentId',
          key: 'id',
          children: 'children'
        },
        options
      )
    )
  }

  function strictTree(array, optChildren) {
    VueUtil.each(array, function(item) {
      if (item.children && !item.children.length) {
        VueUtil.remove(item, optChildren)
      }
    })
  }

  /**
   * 将一个带层级的数据列表转成树结构
   *
   * @param {Array} array 数组
   * @param {Object} options {strict: false, parentKey: 'parentId', key: 'id', children: 'children', data: 'data'}
   * @return {Array}
   */
  function toArrayTree(array, options) {
    var opts = VueUtil.assign(
      {},
      {
        parentKey: 'parentId',
        key: 'id',
        children: 'children'
      },
      options
    )

    var optStrict = opts.strict
    var optKey = opts.key
    var optParentKey = opts.parentKey
    var optChildren = opts.children
    var optSortKey = opts.sortKey
    var optReverse = opts.reverse
    var optData = opts.data
    var result = []
    var treeMap = {}
    var idList, id, treeData, parentId

    if (optSortKey) {
      array = VueUtil.sortBy(VueUtil.clone(array), optSortKey)
      if (optReverse) {
        array = array.reverse()
      }
    }

    idList = VueUtil.map(array, function(item) {
      return item[optKey]
    })

    VueUtil.each(array, function(item) {
      id = item[optKey]

      if (optData) {
        treeData = {}
        treeData[optData] = item
      } else {
        treeData = item
      }

      parentId = item[optParentKey]
      treeMap[id] = treeMap[id] || []
      treeMap[parentId] = treeMap[parentId] || []
      treeMap[parentId].push(treeData)
      treeData[optKey] = id
      treeData[optParentKey] = parentId
      treeData[optChildren] = treeMap[id]

      if (!optStrict || (optStrict && !parentId)) {
        if (!VueUtil.includes(idList, parentId)) {
          result.push(treeData)
        }
      }
    })

    if (optStrict) {
      strictTree(array, optChildren)
    }

    return result
  }

  var findTree = helperCreateTreeFunc(findTreeItem)
  var eachTree = helperCreateTreeFunc(eachTreeItem)
  var mapTree = helperCreateTreeFunc(mapTreeItem)
  var searchTree = helperCreateTreeFunc(function(
    parent,
    obj,
    iterate,
    context,
    path,
    nodes,
    parseChildren,
    opts
  ) {
    return searchTreeItem(
      0,
      parent,
      obj,
      iterate,
      context,
      path,
      nodes,
      parseChildren,
      opts
    )
  })

  function filterTree(obj, iterate, options, context) {
    var result = []
    if (obj && iterate) {
      eachTree(
        obj,
        function(item, index, items, path, parent, nodes) {
          if (iterate.call(context, item, index, items, path, parent, nodes)) {
            result.push(item)
          }
        },
        options
      )
    }
    return result
  }

  var coerceTruthyValueToArray = function(val) {
    if (Array.isArray(val)) {
      return val
    } else if (val) {
      return [val]
    } else {
      return []
    }
  }
  var createUuid = function() {
    var s4 = function() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
    }
    return (
      s4() +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      s4() +
      s4()
    )
  }
  var on = function(el, event, handler, options) {
    if (el && event && handler) {
      if (!isDef(options)) options = { passive: false }
      el.addEventListener(event, handler, options)
    }
  }
  var off = function(el, event, handler, options) {
    if (el && event) {
      if (!isDef(options)) options = { passive: false }
      el.removeEventListener(event, handler, options)
    }
  }
  var once = function(el, event, handler, options) {
    var listener = function() {
      isFunction(handler) && handler.apply(this, arguments)
      off(el, event, listener, options)
    }
    on(el, event, listener, options)
  }
  var removeNode = function(node) {
    node && node.parentElement && node.parentElement.removeChild(node)
  }
  var insertNodeAt = function(fatherNode, node, position) {
    isDef(position) && (position = position * 1)
    if (!isNumber(position)) position = 0
    var refNode =
      position === 0
        ? fatherNode.firstElementChild
        : fatherNode.children[position - 1].nextElementSibling
    fatherNode.insertBefore(node, refNode)
  }
  var scrollBarWidth = function() {
    if (!isNumber(document.__scrollBarWidth__)) {
      var inner = document.createElement('div')
      inner.style.width = '100%'
      var outer = document.createElement('div')
      outer.style.visibility = 'hidden'
      outer.style.width = '100px'
      outer.style.overflow = 'scroll'
      outer.appendChild(inner)
      document.body.appendChild(outer)
      document.__scrollBarWidth__ = outer.offsetWidth - inner.offsetWidth
      removeNode(inner)
      removeNode(outer)
    }
    return document.__scrollBarWidth__
  }
  var hasClass = function(el, clazz) {
    if (!isElement(el) || !isString(clazz)) return false
    return el.classList.contains(clazz)
  }
  var addClass = function(el, clazz) {
    if (isElement(el) && isString(clazz)) el.classList.add(clazz)
  }
  var removeClass = function(el, clazz) {
    if (isElement(el) && isString(clazz)) el.classList.remove(clazz)
  }
  var getStyle = function(el, styleName) {
    if (!isElement(el) || !isString(styleName)) return null
    if (styleName === 'float') {
      styleName = 'cssFloat'
    }
    return el.style[styleName] || getComputedStyle(el, null)[styleName]
  }
  var setStyle = function(el, styleName, value) {
    if (!isElement(el) || !isString(styleName)) return
    el.style[styleName] = value
  }
  var getCookie = function(name) {
    var arr = document.cookie.replace(/\s/g, '').split(';')
    for (var i = 0, j = arr.length; i < j; i++) {
      var tempArr = arr[i].split('=')
      if (tempArr[0] === name) return decodeURIComponent(tempArr[1])
    }
    return null
  }
  var setCookie = function(name, value, days) {
    isDef(days) && (days = days * 1)
    if (!isNumber(days)) days = 1
    var date = addDate(new Date(), days)
    document.cookie =
      name + '=' + encodeURIComponent(value) + ';expires=' + date
  }
  var removeCookie = function(name) {
    var val = getCookie(name)
    setCookie(name, val, -1)
  }
  var performance = function(delay, callback, throttleflg) {
    if (!isFunction(callback)) {
      callback = delay
      delay = null
    }
    if (!isFunction(callback)) return function() {}
    var defaultTimer = Object.create(null)
    var setTimer = requestAnimationFrame
    var clearTimer = cancelAnimationFrame
    if (isNumber(delay)) {
      setTimer = setTimeout
      clearTimer = clearTimeout
    }
    return function() {
      var self = this
      var timer = null
      if (!isDef(self)) {
        timer = defaultTimer
      } else {
        if (!isDef(self[callback])) self[callback] = Object.create(null)
        timer = self[callback]
      }
      var args = arguments
      if (throttleflg) {
        if (isDef(timer.__timer__)) return false
      } else {
        clearTimer(timer.__timer__)
      }
      timer.__timer__ = setTimer(function() {
        callback.apply(self, args)
        clearTimer(timer.__timer__)
        timer.__timer__ = null
      }, delay)
    }
  }
  var throttle = function(delay, callback) {
    return performance(delay, callback, true)
  }
  var debounce = function(delay, callback) {
    return performance(delay, callback)
  }
  var resizeListener = function(el, fn, removeFlg) {
    if (!isFunction(fn)) {
      fn = el
      el = document.body
    }
    if (!isArray(el.__resizeListeners__)) {
      var resetTrigger = function(el) {
        var trigger = el.__resizeTrigger__
        var expand = trigger.firstElementChild
        var contract = trigger.lastElementChild
        var expandChild = expand.firstElementChild
        contract.scrollLeft = contract.scrollWidth
        contract.scrollTop = contract.scrollHeight
        expandChild.style.width = expand.offsetWidth + 'px'
        expandChild.style.height = expand.offsetHeight + 'px'
        expand.scrollLeft = expand.scrollWidth
        expand.scrollTop = expand.scrollHeight
      }
      var resizeListeners = function(el, event) {
        if (
          el.offsetWidth !== el.__resizeLast__.width ||
          el.offsetHeight !== el.__resizeLast__.height
        ) {
          el.__resizeLast__.width = el.offsetWidth
          el.__resizeLast__.height = el.offsetHeight
          loop(el.__resizeListeners__, function(resizeListener) {
            resizeListener.call(el, event)
          })
        }
      }
      var scrollListener = debounce(function(event) {
        resetTrigger(el)
        resizeListeners(el, event)
      })
      var resizeStart = function(event) {
        if (event.animationName === 'resizeanim') {
          resetTrigger(el)
        }
      }
      if (getStyle(el, 'position') === 'static') {
        // 对应win10 ie11 遮罩层无法正常遮罩的问题
        el != document.body && setStyle(el, 'position', 'relative')
        // setStyle(el, 'position', 'relative');
      }
      var resizeTrigger = (el.__resizeTrigger__ = document.createElement('div'))
      resizeTrigger.className = 'resize-triggers'
      resizeTrigger.innerHTML =
        '<div class="expand-trigger"><div></div></div><div class="contract-trigger"></div>'
      on(resizeTrigger, 'animationstart', resizeStart)
      el.__resizeLast__ = {}
      el.__resizeListeners__ = []
      el.appendChild(resizeTrigger)
      on(el, 'scroll', scrollListener, true)
    }
    if (removeFlg) {
      var index = el.__resizeListeners__.indexOf(fn)
      index !== -1 && el.__resizeListeners__.splice(index, 1)
    } else {
      isFunction(fn) && el.__resizeListeners__.push(fn)
    }
  }
  var addResizeListener = function(el, fn) {
    resizeListener(el, fn)
  }
  var removeResizeListener = function(el, fn) {
    resizeListener(el, fn, true)
  }
  var addHoverListener = function(el, inFn, outFn) {
    if (!isFunction(inFn)) return
    on(el, 'mouseenter', inFn)
    if (!isFunction(outFn)) outFn = inFn
    on(el, 'mouseleave', outFn)
  }
  var removeHoverListener = function(el, inFn, outFn) {
    if (!isFunction(inFn)) return
    off(el, 'mouseenter', inFn)
    if (!isFunction(outFn)) outFn = inFn
    off(el, 'mouseleave', outFn)
  }
  var addTouchStart = function(el, fn) {
    on(el, 'mousedown', fn)
    on(el, 'touchstart', fn)
  }
  var removeTouchStart = function(el, fn) {
    off(el, 'mousedown', fn)
    off(el, 'touchstart', fn)
  }
  var addTouchMove = function(el, fn) {
    on(el, 'mousemove', fn)
    on(el, 'touchmove', fn)
  }
  var removeTouchMove = function(el, fn) {
    off(el, 'mousemove', fn)
    off(el, 'touchmove', fn)
  }
  var addTouchEnd = function(el, fn) {
    on(el, 'mouseup', fn)
    on(el, 'touchend', fn)
  }
  var removeTouchEnd = function(el, fn) {
    off(el, 'mouseup', fn)
    off(el, 'touchend', fn)
  }
  var screenfull = function() {
    var fn = (function() {
      var fnMap = [
        [
          'requestFullscreen',
          'exitFullscreen',
          'fullscreenElement',
          'fullscreenEnabled',
          'fullscreenchange',
          'fullscreenerror'
        ],
        [
          'webkitRequestFullscreen',
          'webkitExitFullscreen',
          'webkitFullscreenElement',
          'webkitFullscreenEnabled',
          'webkitfullscreenchange',
          'webkitfullscreenerror'
        ],
        [
          'webkitRequestFullScreen',
          'webkitCancelFullScreen',
          'webkitCurrentFullScreenElement',
          'webkitCancelFullScreen',
          'webkitfullscreenchange',
          'webkitfullscreenerror'
        ],
        [
          'mozRequestFullScreen',
          'mozCancelFullScreen',
          'mozFullScreenElement',
          'mozFullScreenEnabled',
          'mozfullscreenchange',
          'mozfullscreenerror'
        ],
        [
          'msRequestFullscreen',
          'msExitFullscreen',
          'msFullscreenElement',
          'msFullscreenEnabled',
          'MSFullscreenChange',
          'MSFullscreenError'
        ]
      ]
      var ret = {}
      for (var i = 0, l = fnMap.length; i < l; i++) {
        var val = fnMap[i]
        if (val[1] in document) {
          for (i = 0; i < val.length; i++) {
            ret[fnMap[0][i]] = val[i]
          }
          return ret
        }
      }
      return null
    })()
    if (!isDef(fn)) {
      Vue.notify.warning({ message: Vue.t('vue.screenfull.canot') })
      return false
    }
    var screenfull = {
      request: function(elem) {
        var request = fn.requestFullscreen
        elem = elem || document.documentElement
        if (/5\.1[.\d]* Safari/.test(navigator.userAgent)) {
          elem[request]()
        } else {
          elem[request](
            typeof Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in Element
              ? Element.ALLOW_KEYBOARD_INPUT
              : {}
          )
        }
      },
      exit: function() {
        document[fn.exitFullscreen]()
      },
      toggle: function(elem) {
        if (this.isFullscreen) {
          this.exit()
        } else {
          this.request(elem)
        }
      },
      onchange: function(callback) {
        on(document, fn.fullscreenchange, callback)
      },
      onerror: function(callback) {
        on(document, fn.fullscreenerror, callback)
      },
      raw: fn
    }
    Object.defineProperties(screenfull, {
      isFullscreen: {
        get: function() {
          return Boolean(document[fn.fullscreenElement])
        }
      },
      element: {
        enumerable: true,
        get: function() {
          return document[fn.fullscreenElement]
        }
      },
      enabled: {
        enumerable: true,
        get: function() {
          return Boolean(document[fn.fullscreenEnabled])
        }
      }
    })
    if (!isDef(screenfull.enabled)) {
      Vue.notify.warning({ message: Vue.t('vue.screenfull.canot') })
      return false
    }
    screenfull.toggle()
  }
  var getSystemInfo = function() {
    return SystemInfo
  }
  var setLang = function(lang) {
    if (Vue.i18n) {
      if (isString(lang)) Vue.i18n.locale = lang
    } else {
      if (isString(lang)) Vue.config.lang = lang
    }
  }
  var setLocale = function(lang, langObjs) {
    if (Vue.i18n) {
      Vue.i18n.setLocaleMessage(
        lang,
        merge({}, Vue.i18n.getLocaleMessage(lang), langObjs)
      )
    } else {
      Vue.locale && Vue.locale(lang, merge({}, Vue.locale(lang), langObjs))
    }
  }
  var popupManager = {
    instances: {},
    zIndex: 2000,
    getInstance: function(id) {
      return popupManager.instances[id]
    },
    register: function(id, instance) {
      if (id && instance) {
        popupManager.instances[id] = instance
      }
    },
    deregister: function(id) {
      if (id) {
        popupManager.instances[id] = null
        delete popupManager.instances[id]
      }
    },
    setZindex: function(value) {
      return (popupManager.zIndex = value)
    },
    nextZIndex: function() {
      return popupManager.zIndex++
    },
    modalStack: [],
    openModal: function(id, zIndex) {
      if (!isDef(id) || !isDef(zIndex)) return
      var modalStack = this.modalStack
      for (var i = 0, j = modalStack.length; i < j; i++) {
        var item = modalStack[i]
        if (item.id === id) return
      }
      this.modalStack.push({
        id: id,
        zIndex: zIndex
      })
    },
    closeModal: function(id) {
      var modalStack = this.modalStack
      if (modalStack.length > 0) {
        var topItem = modalStack[modalStack.length - 1]
        if (topItem.id === id) {
          modalStack.pop()
        } else {
          for (var i = modalStack.length - 1; i >= 0; i--) {
            if (modalStack[i].id === id) {
              modalStack.splice(i, 1)
              break
            }
          }
        }
      }
    }
  }
  var emitter = {
    methods: {
      dispatch: function(componentName, eventName, params) {
        var parent = this.$parent || this.$root
        var name = parent.$options.name
        while (parent && (!isDef(name) || name !== componentName)) {
          parent = parent.$parent
          if (parent) {
            name = parent.$options.name
          }
        }
        if (parent) {
          parent.$emit.apply(parent, mergeArray([eventName], params))
        }
      },
      broadcast: function(componentName, eventName, params) {
        var broadcast = function(componentName, eventName, params) {
          loop(this.$children, function(child) {
            var name = child.$options.name
            if (name === componentName) {
              child.$emit.apply(child, mergeArray([eventName], params))
            } else {
              broadcast.apply(
                child,
                mergeArray([componentName, eventName], [params])
              )
            }
          })
        }
        broadcast.call(this, componentName, eventName, params)
      }
    }
  }
  var menumixin = {
    computed: {
      indexPath: function() {
        var path = [this.index]
        var parent = this.$parent
        while (parent.$options.name !== 'VueMenu') {
          if (parent.index || parent.index == 0) {
            path.unshift(parent.index)
          }
          parent = parent.$parent
        }
        return path
      },
      rootMenu: function() {
        var parent = this.$parent
        while (parent && parent.$options.name !== 'VueMenu') {
          parent = parent.$parent
        }
        return parent
      },
      parentMenu: function() {
        var parent = this.$parent
        while (
          parent &&
          ['VueMenu', 'VueSubmenu'].indexOf(parent.$options.name) === -1
        ) {
          parent = parent.$parent
        }
        return parent
      },
      paddingStyle: function() {
        if (this.rootMenu.mode !== 'vertical') return {}
        var padding = 20
        var parent = this.$parent

        if (this.rootMenu.collapse) {
          return {
            paddingLeft: '20px',
            paddingRight: '20px'
          }
        } else {
          while (parent && parent.$options.name !== 'VueMenu') {
            if (parent.$options.name === 'VueSubmenu') {
              padding += 10
            }
            parent = parent.$parent
          }

          return {
            paddingLeft: padding + 'px'
          }
        }
      }
    }
  }
  var collapseTransition = {
    functional: true,
    render: function(createElement, obj) {
      var vueComponent = obj.parent
      var children = obj.children
      var data = {
        on: {
          beforeEnter: function(el) {
            addClass(el, 'collapse-transition')
            if (!isDef(el.dataset)) el.dataset = {}
            el.dataset.oldPaddingTop = el.style.paddingTop
            el.dataset.oldPaddingBottom = el.style.paddingBottom
            el.style.height = '0'
            el.style.paddingTop = 0
            el.style.paddingBottom = 0
            if (isFunction(vueComponent.collapseBeforeEnter)) {
              vueComponent.collapseBeforeEnter()
            }
          },
          enter: function(el) {
            el.dataset.oldOverflow = el.style.overflow
            if (el.scrollHeight !== 0) {
              el.style.height = el.scrollHeight + 'px'
              el.style.paddingTop = el.dataset.oldPaddingTop
              el.style.paddingBottom = el.dataset.oldPaddingBottom
            } else {
              el.style.height = ''
              el.style.paddingTop = el.dataset.oldPaddingTop
              el.style.paddingBottom = el.dataset.oldPaddingBottom
            }
            el.style.overflow = 'hidden'
            if (isFunction(vueComponent.collapseEnter)) {
              vueComponent.collapseEnter()
            }
          },
          afterEnter: function(el) {
            removeClass(el, 'collapse-transition')
            el.style.height = ''
            el.style.overflow = el.dataset.oldOverflow
            if (isFunction(vueComponent.collapseAfterEnter)) {
              vueComponent.collapseAfterEnter()
            }
          },
          beforeLeave: function(el) {
            if (!isDef(el.dataset)) el.dataset = {}
            el.dataset.oldPaddingTop = el.style.paddingTop
            el.dataset.oldPaddingBottom = el.style.paddingBottom
            el.dataset.oldOverflow = el.style.overflow
            el.style.height = el.scrollHeight + 'px'
            el.style.overflow = 'hidden'
            if (isFunction(vueComponent.collapseBeforeLeave)) {
              vueComponent.collapseBeforeLeave()
            }
          },
          leave: function(el) {
            if (el.scrollHeight !== 0) {
              addClass(el, 'collapse-transition')
              el.style.height = 0
              el.style.paddingTop = 0
              el.style.paddingBottom = 0
            }
            if (isFunction(vueComponent.collapseLeave)) {
              vueComponent.collapseLeave()
            }
          },
          afterLeave: function(el) {
            removeClass(el, 'collapse-transition')
            el.style.height = ''
            el.style.overflow = el.dataset.oldOverflow
            el.style.paddingTop = el.dataset.oldPaddingTop
            el.style.paddingBottom = el.dataset.oldPaddingBottom
            if (isFunction(vueComponent.collapseAfterLeave)) {
              vueComponent.collapseAfterLeave()
            }
          }
        }
      }
      return createElement('transition', data, children)
    }
  }
  var clickoutside = function(fn) {
    var startClick
    var nodes = document.__clickoutsideNodes__
    var CTX = '__clickoutsideContext__'
    if (!isArray(nodes)) {
      nodes = document.__clickoutsideNodes__ = []
      var clickOutSideFn = function(mouseup, mousedown) {
        mouseup = mouseup || {}
        mousedown = mousedown || {}
        loop(nodes, function(node) {
          var vnode = node[CTX].vnode
          var binding = node[CTX].binding
          if (
            !vnode ||
            !vnode.context ||
            !mouseup.target ||
            !mousedown.target ||
            node.contains(mouseup.target) ||
            node.contains(mousedown.target) ||
            node === mouseup.target ||
            (vnode.context.popperElm &&
              (vnode.context.popperElm.contains(mouseup.target) ||
                vnode.context.popperElm.contains(mousedown.target)))
          ) {
            var validFn = node[CTX].fn
            if (typeof validFn == 'function') {
              if (!validFn(vnode, mouseup, mousedown)) return
            } else {
              return
            }
          }

          if (
            isDef(binding.expression) &&
            isFunction(vnode.context[binding.expression])
          ) {
            vnode.context[binding.expression]()
          } else {
            isFunction(binding.value) && binding.value()
          }
        })
      }
      on(document, 'mousedown', function(e) {
        startClick = e
      })
      on(document, 'mouseup', function(e) {
        clickOutSideFn(e, startClick)
      })
    }
    return {
      bind: function(el, binding, vnode) {
        el[CTX] = {
          id: createUuid(),
          vnode: vnode,
          fn: fn,
          binding: binding
        }
        nodes.push(el)
      },
      update: function(el, binding, vnode) {
        el[CTX].binding = binding
        el[CTX].vnode = vnode
      },
      unbind: function(el) {
        var id = el[CTX].id
        loop(nodes, function(node, i) {
          if (node[CTX].id === id) {
            nodes.splice(i, 1)
            delete el[CTX]
            return false
          }
        })
      }
    }
  }

  var scrollingMethods = []
  document.addEventListener(
    'scroll',
    lodash.debounce(
      function(e) {
        if (
          VueUtil.getSystemInfo().device == 'Mobile' &&
          VueUtil.getSystemInfo().isLoadMobileJs
        )
          return
        var className = e.target.className || ''
        if (
          className.indexOf('contract-trigger') > -1 ||
          className.indexOf('expand-trigger') > -1
        )
          return

        scrollingMethods.forEach(function(obj) {
          if (e.target !== obj.el && e.target.contains(obj.el)) {
            if (typeof obj.method == 'function') {
              var method = obj.method
              method()
            }
          }
        })
      },
      200,
      {
        leading: true,
        trailing: true
      }
    ),
    true
  )

  var scrolling = {
    bind: function(el, binding) {
      var bindingObj = {
        el: el
      }
      el.__scrollingNodes__ = bindingObj
      bindingObj.method = binding.value
      if (scrollingMethods.indexOf(bindingObj) == -1) {
        scrollingMethods.push(bindingObj)
      }
    },
    unbind: function(el) {
      var bindingObj = el.__scrollingNodes__
      var index = scrollingMethods.indexOf(bindingObj)
      if (index > -1) {
        scrollingMethods.splice(index, 1)
      }
    }
  }

  var repeatClick = {
    bind: function bind(el, binding, vnode) {
      var interval = null
      var startTime

      var handler = function() {
        return vnode.context[binding.expression].apply()
      }

      var clear = function() {
        if (Date.now() - startTime < 100) {
          handler()
        }

        clearInterval(interval)
        interval = null
      }

      on(el, 'mousedown', function(e) {
        if (e.button !== 0) return
        startTime = Date.now()
        once(document, 'mouseup', clear)
        clearInterval(interval)
        interval = setInterval(handler, 100)
      })
    }
  }
  var getScrollParent = function(el) {
    var parent = el.parentNode
    if (!isDef(parent)) {
      return el
    }
    if (parent === document) {
      if (document.body.scrollTop) {
        return document.body
      } else {
        return document.documentElement
      }
    }
    if (
      (['scroll', 'auto'].indexOf(getStyle(parent, 'overflowX')) !== -1 &&
        parent.scrollWidth > parent.clientWidth) ||
      (['scroll', 'auto'].indexOf(getStyle(parent, 'overflowY')) !== -1 &&
        parent.scrollHeight > parent.clientHeight) ||
      hasClass(parent, 'vue-scrollbar__wrap')
    ) {
      return parent
    }
    return getScrollParent(el.parentNode)
  }
  var config = new Vue({
    data: function() {
      return {
        notifyStack: false,
        produceModel: false
      }
    },
    watch: {
      produceModel: function(val) {
        Vue.config.productionTip = !val
        Vue.config.devtools = !val
        Vue.config.silent = val
      }
    }
  })

  var keyCode = function keyCode(searchInput) {
    // Keyboard Events
    if (searchInput && typeof searchInput === 'object') {
      var hasKeyCode =
        searchInput.which || searchInput.keyCode || searchInput.charCode

      if (hasKeyCode) {
        searchInput = hasKeyCode
      }
    }

    var search = String(searchInput) // check codes

    var foundNamedKeyCodes = codes[search.toLowerCase()]

    if (foundNamedKeyCodes) {
      return foundNamedKeyCodes
    } // check aliases

    var foundNamedKeyAliases = aliases[search.toLowerCase()]

    if (foundNamedKeyAliases) {
      return foundNamedKeyAliases
    } // weird character?

    if (search.length === 1) {
      return search.charCodeAt(0)
    }

    return undefined
  }

  var codes = {
    backspace: 8,
    tab: 9,
    enter: 13,
    shift: 16,
    ctrl: 17,
    alt: 18,
    'pause/break': 19,
    'caps lock': 20,
    esc: 27,
    space: 32,
    'page up': 33,
    'page down': 34,
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    // 'add': 43,
    insert: 45,
    delete: 46,
    command: 91,
    'left command': 91,
    'right command': 93,
    'numpad *': 106,
    // 'numpad +': 107,
    'numpad +': 43,
    'numpad add': 43,
    // as a trick
    'numpad -': 109,
    'numpad .': 110,
    'numpad /': 111,
    'num lock': 144,
    'scroll lock': 145,
    'my computer': 182,
    'my calculator': 183,
    ';': 186,
    '=': 187,
    ',': 188,
    '-': 189,
    '.': 190,
    '/': 191,
    '`': 192,
    '[': 219,
    '\\': 220,
    ']': 221,
    "'": 222 // Helper aliases
  }
  var aliases = {
    windows: 91,
    '⇧': 16,
    '⌥': 18,
    '⌃': 17,
    '⌘': 91,
    ctl: 17,
    control: 17,
    option: 18,
    pause: 19,
    break: 19,
    caps: 20,
    return: 13,
    escape: 27,
    spc: 32,
    pgup: 33,
    pgdn: 34,
    ins: 45,
    del: 46,
    cmd: 91
    /*!
     * Programatically add the following
     */
    // lower case chars
  }

  for (var i = 97; i < 123; i++) {
    codes[String.fromCharCode(i)] = i - 32
  } // numbers

  for (var _i = 48; _i < 58; _i++) {
    codes[_i - 48] = _i
  } // function keys

  for (var _i2 = 1; _i2 < 13; _i2++) {
    codes['f' + _i2] = _i2 + 111
  } // numpad keys

  for (var _i3 = 0; _i3 < 10; _i3++) {
    codes['numpad ' + _i3] = _i3 + 96
  }

  var noop = function noop() {}

  var getKeyMap = function getKeyMap(key, bind) {
    var result = {}
    var keyup = bind.keyup
    var keydown = bind.keydown
    key
      .replace('numpad +', 'numpad add')
      .split('+')
      .forEach(function(keyName) {
        switch (keyName.toLowerCase()) {
          case 'ctrl':
          case 'alt':
          case 'shift':
          case 'meta':
            result[keyName] = true
            break

          default:
            result.keyCode = keyCode(keyName)
        }
      })
    result.callback = {
      keydown: keydown || (keyup ? noop : bind),
      keyup: keyup || noop
    }
    return result
  }

  function isElementTopLayer(el) {
    var elPos = el.getBoundingClientRect()
    var x = Math.ceil(elPos.left)
    var y = Math.ceil(elPos.top)

    var offset = 3 //为了防止点击不到，加上3像素
    var topElementXY = document.elementFromPoint(x + offset, y + offset)
    if (topElementXY == el || el.contains(topElementXY)) {
      return true
    }
    return false
  }

  var hotkeyHandlers = {
    click: function(e, el) {
      if (isElementTopLayer(el)) {
        setTimeout(function() {
          el.click()
        }, 0)
      }
    },

    focus: function(e, el) {
      if (isElementTopLayer(el)) {
        setTimeout(function() {
          var vueObj = el.__vue__
          if (vueObj) {
            if (vueObj.focus) {
              vueObj.focus()
              return
            } else if (vueObj.$refs.input) {
              vueObj.$refs.input.focus && vueObj.$refs.input.focus()
              return
            }
          }
          el.focus()
        }, 0)
      }
    }
  }
  function bindEvent(el, binding, vnode) {
    var key = binding.arg
    var handler = binding.value || 'click'

    if (typeof handler === 'string') {
      handler = hotkeyHandlers[handler]
    }
    if (!handler) return

    el._keymap = getKeyMap(key, handler)
    var allow = binding.modifiers.allow || false

    el._keyHandler = function(e) {
      var hotkey = el._keymap
      var callback =
        hotkey.keyCode === e.keyCode &&
        !!hotkey.ctrl === e.ctrlKey &&
        !!hotkey.alt === e.altKey &&
        !!hotkey.shift === e.shiftKey &&
        !!hotkey.meta === e.metaKey &&
        hotkey.callback[e.type]

      if (callback && !allow) {
        e.preventDefault()

        //ie11 f1 problem
        if ('onhelp' in window && e.keyCode == 112) {
          window.onhelp = function() {
            return false
          }
        }
      }

      if (!callback || callback === noop) return

      // 获取最顶层aside,dialog
      var topContainer = Array.prototype.filter.call(
        document.querySelectorAll('.vue-dialog, .vue-aside'),
        function(container) {
          return isElementTopLayer(container)
        }
      )

      // 判断当前元素是不是在顶层容器里
      if (
        topContainer.length > 0 &&
        !topContainer[topContainer.length - 1].contains(el)
      ) {
        var parentAside = getParentAside(el.__vue__)
        if (
          !parentAside ||
          !parentAside.$el.contains(topContainer[topContainer.length - 1])
        ) {
          return
        }
      }

      var currentElm = el
      while (!currentElm.__vue__ && currentElm.parentElement) {
        currentElm = currentElm.parentElement
      }

      if (!currentElm.__vue__ || currentElm.__vue__._inactive) {
        return
      }

      if (callback.prototype) {
        callback.call(vnode.context, e, el)
      } else {
        callback(e, el)
      }
    }

    document.addEventListener('keydown', el._keyHandler)
    document.addEventListener('keyup', el._keyHandler)
  }

  function unbindEvent(el) {
    document.removeEventListener('keydown', el._keyHandler)
    document.removeEventListener('keyup', el._keyHandler)
  }

  function getParentAside(vm) {
    if (!vm.$parent || !vm.$parent.$options.name) {
      return null
    } else if (
      vm.$parent.$options.name === 'VueAside' ||
      vm.$parent.$options.name === 'VueDialog'
    ) {
      return vm.$parent
    } else {
      return getParentAside(vm.$parent)
    }
  }

  Vue.directive('hotkey', {
    bind: function(el, binding, vnode) {
      bindEvent.call(this, el, binding, vnode)
    },
    componentUpdated: function(el, binding) {
      if (binding.value !== binding.oldValue) {
        unbindEvent.call(this, arguments)
        bindEvent.apply(this, el, binding)
      }
    },
    unbind: unbindEvent
  })

  var clipboard = (function() {
    var doc = window.document
    var $elem = doc.createElement('textarea')

    function handleText(content) {
      var styles = $elem.style
      $elem.id = '$VueCopy'
      styles.width = '48px'
      styles.height = '24px'
      styles.position = 'fixed'
      styles.zIndex = '0'
      styles.left = '-500px'
      styles.top = '-500px'
      $elem.value =
        content === null || content === undefined ? '' : '' + content

      if (!$elem.parentNode) {
        doc.body.appendChild($elem)
      }
    }

    function copyText() {
      $elem.focus()
      $elem.select()
      $elem.setSelectionRange(0, $elem.value.length)
      return doc.execCommand('Copy')
    }
    /**
     * 复制内容到剪贴板
     *
     * @param {String} content Text 内容
     */

    function clipboard(content) {
      var result = false

      try {
        handleText(content)
        result = copyText()
      } catch (e) {}

      return result
    }

    clipboard.copy = clipboard
    return clipboard
  })()

  function pluckProperty(name) {
    return function(obj, key) {
      return key === name
    }
  }

  var remove = function(obj, iterate, context) {
    if (obj) {
      if (!isNull(iterate)) {
        var removeKeys = []
        var rest = []
        if (!isFunction(iterate)) {
          iterate = pluckProperty(iterate)
        }
        VueUtil.each(obj, function(item, index, rest) {
          if (iterate.call(context, item, index, rest)) {
            removeKeys.push(index)
          }
        })
        if (isArray(obj)) {
          VueUtil.eachRight(removeKeys, function(item, key) {
            rest.push(obj[item])
            obj.splice(item, 1)
          })
        } else {
          rest = {}
          VueUtil.each(removeKeys, function(key) {
            rest[key] = obj[key]
            delete obj[key]
          })
        }
        return rest
      }
      return {}
    }
    return obj
  }

  var ElementPrototype = window.Element.prototype
  if (typeof ElementPrototype.matches !== 'function') {
    ElementPrototype.matches =
      ElementPrototype.msMatchesSelector ||
      ElementPrototype.mozMatchesSelector ||
      ElementPrototype.webkitMatchesSelector
  }

  var closest = function(element, selector) {
    while (element && element.nodeType === 1) {
      if (element.matches(selector)) {
        return element
      }
      element = element.parentNode
    }

    return null
  }

  var formatDateTime = function(date, format) {
    var format = format || 'yyyy-MM-dd HH:mm:ss'
    return formatDate(date, format)
  }

  var VueUtil = {
    isNull: isNull,
    isUndefined: isUndefined,
    isRegExp: isRegExp,
    isDef: isDef,
    isString: isString,
    isNumber: isNumber,
    isNumberStr: isNumberStr,
    isBoolean: isBoolean,
    isFile: isFile,
    isObject: isObject,
    isArray: isArray,
    isFunction: isFunction,
    isDate: isDate,
    isDateObject: isDateObject,
    isNodeList: isNodeList,
    isElement: isElement,
    isVNode: isVNode,
    isVueComponent: isVueComponent,
    toString: toString,
    toDate: toDate,
    formatNumber: formatNumber,
    formatDate: formatDate,
    formatDateTime: formatDateTime,
    range: range,
    modifyDate: modifyDate,
    modifyTime: modifyTime,
    modifyWithTimeString: modifyWithTimeString,
    clearTime: clearTime,
    clearMilliseconds: clearMilliseconds,
    limitTimeRange: limitTimeRange,
    parseDate: parseDate,
    prevDate: prevDate,
    nextDate: nextDate,
    timeWithinRange: timeWithinRange,
    changeYearMonthAndClampDate: changeYearMonthAndClampDate,
    prevMonth: prevMonth,
    nextMonth: nextMonth,
    prevYear: prevYear,
    nextYear: nextYear,
    getDayCountOfMonth: getDayCountOfMonth,
    getDayCountOfYear: getDayCountOfYear,
    getFirstDayOfMonth: getFirstDayOfMonth,
    getStartDateOfMonth: getStartDateOfMonth,
    getWeekNumber: getWeekNumber,
    getRangeHours: getRangeHours,
    setRangeData: setRangeData,
    getRangeMinutes: getRangeMinutes,
    addDate: addDate,
    extractDateFormat: extractDateFormat,
    extractTimeFormat: extractTimeFormat,
    loop: loop,
    ownPropertyLoop: ownPropertyLoop,
    map: map,
    filter: filter,
    trim: trim,
    deepCopy: deepCopy,
    destructuring: destructuring,
    merge: merge,
    mergeArray: mergeArray,
    arrayIndexOfVal: arrayIndexOfVal,
    arrayFindIndex: arrayFindIndex,
    arrayFind: arrayFind,
    findTree: findTree,
    eachTree: eachTree,
    filterTree: filterTree,
    searchTree: searchTree,
    mapTree: mapTree,
    toTreeArray: toTreeArray,
    toArrayTree: toArrayTree,
    coerceTruthyValueToArray: coerceTruthyValueToArray,
    createUuid: createUuid,
    on: on,
    off: off,
    once: once,
    removeNode: removeNode,
    insertNodeAt: insertNodeAt,
    scrollBarWidth: scrollBarWidth,
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    getStyle: getStyle,
    setStyle: setStyle,
    getCookie: getCookie,
    setCookie: setCookie,
    removeCookie: removeCookie,
    throttle: throttle,
    debounce: debounce,
    addResizeListener: addResizeListener,
    removeResizeListener: removeResizeListener,
    addHoverListener: addHoverListener,
    removeHoverListener: removeHoverListener,
    addTouchStart: addTouchStart,
    addTouchMove: addTouchMove,
    addTouchEnd: addTouchEnd,
    removeTouchStart: removeTouchStart,
    removeTouchMove: removeTouchMove,
    removeTouchEnd: removeTouchEnd,
    screenfull: screenfull,
    getSystemInfo: getSystemInfo,
    setLang: setLang,
    setLocale: setLocale,
    config: config,
    nextZIndex: popupManager.nextZIndex,
    setZIndex: popupManager.setZindex,
    version: version,
    isIE: SystemInfo.browser.toLowerCase() === 'ie',
    isFirefox: SystemInfo.browser.toLowerCase() === 'firefox',
    isChrome: SystemInfo.browser.toLowerCase() === 'chrome',
    isEdge: SystemInfo.browser.toLowerCase() === 'edge',
    isSafari: SystemInfo.browser.toLowerCase() === 'safari',
    remove: remove,
    closest: closest,
    component: {
      menumixin: menumixin,
      emitter: emitter,
      collapseTransition: collapseTransition,
      clickoutside: clickoutside,
      scrolling: scrolling,
      repeatClick: repeatClick,
      popupManager: popupManager,
      getScrollParent: getScrollParent
    },
    hotkeyHandlers: hotkeyHandlers,
    clipboard: clipboard
  }

  Object.keys(lodash).forEach(function(funcName) {
    if (
      typeof lodash[funcName] == 'function' &&
      VueUtil[funcName] === undefined
    ) {
      VueUtil[funcName] = lodash[funcName]
    }
  })
  VueUtil._throttle = lodash.throttle
  VueUtil._debounce = lodash.debounce
  VueUtil._filter = lodash.filter

  Vue.prototype.$vu = VueUtil
  return VueUtil
})
