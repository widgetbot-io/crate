/**
 * Supports regex and strings
 *
 * Regex are performed on the whole URL - location.href
 * Strings are searched for only on the - location.origin
 */

/**
 * Types -
 *
 * all - rate limit all requests
 * block - percent of requests to block
 *          0.1 meaning rate limit only a few
 *          1 meaning rate limit all
 */
export default [
  {
    query: 'ruedesjoueurs.com',
    block: 0.5
  },
  // {
  //   query: 'localhost',
  //   block: 0.6
  // }
]