import {
	compose,
	concat,
	curry,
	filter,
	isEmpty,
	join,
	length,
	map,
	not,
	nth,
	reduce,
	repeat,
	replace,
	split,
	take,
	takeWhile,
	transpose,
	trim
} from 'rambda'

const clear = compose(
	reduce(
		compose(
			replace(/.?[\b]/, ''),
			concat
		),
		''
	),
	split('')
)

const backspaces = compose(join(''), repeat('\b'))

const collisions = compose(
	length,
	takeWhile(v => nth(0, v) === nth(1, v)),
	transpose,
	map(split(''))
)

const diff = curry((replace, origin) => {
  const c = collisions([replace, origin])
  return backspaces(origin.length - c) + replace.slice(c)
})

const diffAll = compose(
  join(''),
  reduce((a, v) => [
    ...a,
    compose(
      diff(v),
      clear,
      join('')
    )(a)
  ], [])
)

export default (node, { speed = 50, separator }) => {
	const children = compose(
		filter(compose(not, isEmpty)),
		map(trim),
		split(separator),
		join(''),
		map(({ textContent }) => textContent),
		filter(({ nodeType }) => nodeType === Node.TEXT_NODE),
		Array.from
	)(node.childNodes)
	
	const text = diffAll(children)
	const duration = text.length * speed
	
	return {
		duration,
		tick: t => {
			const i = ~~(text.length * t)
			node.textContent = clear(take(i, text))
		}
	}
}