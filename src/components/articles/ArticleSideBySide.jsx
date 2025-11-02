import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Article from "/src/components/wrappers/Article.jsx"
import ActivityList from "/src/components/generic/ActivityList.jsx"
import {useParser} from "/src/helpers/parser.js"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {useWindow} from "/src/providers/WindowProvider.jsx"
import "./ArticleSideBySide.scss"

function ArticleSideBySide({ data }) {
    const parser = useParser()
    const {selectedLanguageId} = useLanguage()
    const {isMobileLayout} = useWindow()
    
    const parsedData = parser.parseArticleData(data)
    const items = parsedData.items

    const hasProgressItem = parser.hasAnyItemWithValue(items)
    const hasInfoItem = parser.hasAnyItemWithLocaleFieldNamed(items, 'info')
    const maxItems = isMobileLayout() ? 4 : 12

    // Split items into two groups for side-by-side display
    const midPoint = Math.ceil(items.length / 2)
    const leftItems = items.slice(0, midPoint)
    const rightItems = items.slice(midPoint)

    const leftListItems = parser.formatForActivityList(leftItems)
    const rightListItems = parser.formatForActivityList(rightItems)

    return(
        <Article className={`article-side-by-side`} title="">
            <Row className="gy-3">
                <Col md={6}>
                    <div className="side-section">
                        <div className="section-title-with-line mb-3">
                            <h5 className="section-title">Soft Skills</h5>
                            <div className="title-line"></div>
                        </div>
                        <ActivityList items={leftListItems}
                                      storageId={data.id + '_left_expandable'}
                                      maxItems={maxItems}
                                      colClass="col-12"/>
                    </div>
                </Col>
                <Col md={6}>
                    <div className="side-section">
                        <div className="section-title-with-line mb-3">
                            <h5 className="section-title">Languages</h5>
                            <div className="title-line"></div>
                        </div>
                        <ActivityList items={rightListItems}
                                      storageId={data.id + '_right_expandable'}
                                      maxItems={maxItems}
                                      colClass="col-12"/>
                    </div>
                </Col>
            </Row>
        </Article>
    )
}

export default ArticleSideBySide
