import faker from 'faker'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import SourceRender from 'react-source-render'
import * as SUIR from 'semantic-ui-react'

import { updateForKeys } from 'docs/src/hoc'

const babelConfig = {
  presets: [
    [
      'env',
      {
        targets: {
          browsers: ['last 4 versions', 'not dead'],
        },
      },
    ],
    ['stage-1', { decoratorsLegacy: true }],
  ],
}

//     if (module === 'COMMON') {
//       const componentPath = examplePath
//         .split(__PATH_SEP__)
//         .splice(0, 2)
//         .join(__PATH_SEP__)
//       COMMON = require(`docs/src/examples/${componentPath}/common`)
//     } else if (module === 'WIREFRAME') {
//       WIREFRAME = require('docs/src/examples/behaviors/Visibility/Wireframe').default

const externals = {
  faker,
  lodash: _,
  react: React,
  'semantic-ui-react': SUIR,
}

const resolver = (importPath, { examplePath }) => {
  if (externals[importPath]) return externals[importPath]

  throw new Error('UNHANDLED IMPORT')
}

const ComponentExampleRenderSource = ({ examplePath, onError, onSuccess, sourceCode }) => (
  <SourceRender
    babelConfig={babelConfig}
    examplePath={examplePath}
    onError={onError}
    onSuccess={onSuccess}
    resolver={resolver}
    source={sourceCode}
  />
)

ComponentExampleRenderSource.propTypes = {
  examplePath: PropTypes.string.isRequired,
  onError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  sourceCode: PropTypes.string.isRequired,
}

export default updateForKeys(['sourceCode'])(ComponentExampleRenderSource)
