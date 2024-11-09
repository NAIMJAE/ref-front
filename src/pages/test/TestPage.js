import React, { useEffect, useRef, useState } from 'react'
import MainLayout from '../../layout/MainLayout'
import '../../styles/testPage.scss'
import CodeViewer from '../../component/test/CodeViewer'

const TestPage = () => {

  return (
    <MainLayout>
        <div id='testPage'>

        <CodeViewer></CodeViewer>

        </div>
    </MainLayout>
  )
}

export default TestPage