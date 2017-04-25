import React from 'react'
import Markdown from 'app/ui/_lib/markdown'
import JSDocUsage from './usage'
import JSDocSyntax from './syntax'
import JSDocArguments from './arguments'
import JSDocProperties from './properties'
import JSDocReturns from './returns'
import JSDocExceptions from './exceptions'
import JSDocExamples from './examples'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {PagePropType} from 'app/types/page'
import {FeaturesPropType} from 'app/types/features'

// TODO: remove features
export default function JSDoc ({doc, features, selectedVersionTag}) {
  return <div className='jsdoc'>
    <h1>
      <span className='jsdoc-header'>
        {doc.title}
      </span>
    </h1>

    <section>
      <h2 id='description'>
        Description
        <a href='#description' className='doc-header_link'>#</a>
      </h2>

      <Markdown value={doc.content.get('description')} selectedVersionTag={selectedVersionTag} />
    </section>

    <JSDocUsage
      usage={doc.usage}
      usageTabs={doc.usageTabs}
    />

    <JSDocSyntax syntax={doc.syntax} />
    <JSDocArguments args={doc.args} selectedVersionTag={selectedVersionTag} />
    <JSDocProperties properties={doc.properties} selectedVersionTag={selectedVersionTag} />
    <JSDocReturns returns={doc.content.get('returns')} selectedVersionTag={selectedVersionTag} />
    <JSDocExceptions exceptions={doc.content.get('exceptions')} selectedVersionTag={selectedVersionTag} />
    <JSDocExamples examples={doc.content.get('examples')} />
  </div>
}

JSDoc.propTypes = {
  doc: PagePropType,
  features: FeaturesPropType,
  selectedVersionTag: React.PropTypes.any
}
