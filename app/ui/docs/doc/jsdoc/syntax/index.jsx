import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Code from 'app/ui/_lib/code'

export default function JSDocSyntax ({name, args, isFPFn}) {
  if (!args) {
    return null
  }

  return <section>
    <h2 id='syntax'>
      Syntax
      <a href='#syntax' className='doc-header_link'>#</a>
    </h2>

    <Code
      value={generateSyntaxString(name, args, isFPFn)}
      options={{
        readOnly: true,
        mode: 'javascript'
      }}
    />
  </section>
}

JSDocSyntax.propTypes = {
  name: React.PropTypes.string,
  args: ImmutablePropTypes.list,
  isFPFn: React.PropTypes.bool
}

function generateSyntaxString (name, args, isFPFn) {
  if (isFPFn) {
    return args
      .filter((arg) => !arg.isProperty)
      .reduce((acc, arg) => acc.concat(`(${arg.name})`), name)
  }

  return `${name}(${generateArgsString(args)})`
}

function generateArgsString (args) {
  if (!args) return ''

  return args
    .filter((arg) => !arg.isProperty)
    .reduce((acc, arg, index, array) => {
      const isLast = index === array.size - 1
      const {argumentsString, nesting} = addArgumentSyntax(
        acc.result, arg, acc.nesting, isLast
      )

      acc.result = argumentsString
      acc.nesting = nesting
      return acc
    }, {nesting: 0, result: ''})
    .result
}

function addArgumentSyntax (argumentsString, arg, nesting, isLast) {
  if (!arg.optional && nesting > 0) {
    argumentsString += ']'.repeat(nesting) + ', '
  } else if (argumentsString !== '') {
    argumentsString += ', '
  }

  if (arg.optional) {
    nesting += 1
    argumentsString += '['
  }

  if (arg.variable) {
    argumentsString += '...'
  }

  argumentsString += arg.name

  if (arg.defaultvalue !== undefined) {
    argumentsString += '=' + arg.defaultvalue
  }

  if (isLast) {
    argumentsString += ']'.repeat(nesting)
  }

  return {argumentsString, nesting}
}
