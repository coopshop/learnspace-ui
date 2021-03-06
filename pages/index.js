import React from 'react'
import Head from 'next/head'

import UnAuthenticatedLayout from '../core/components/Layout/UnAuthenticatedLayout'
import withData from '../core/withData'

const IndexPage = () => (
  <div>
    <Head>
      <title>หน้าแรก | LEARNSPACE</title>
    </Head>
    <UnAuthenticatedLayout>
      <h1>Hello</h1>
    </UnAuthenticatedLayout>
  </div>
)

export default withData(IndexPage)
