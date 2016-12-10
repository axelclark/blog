import React from 'react'
import { Link } from 'react-router'
import sortBy from 'lodash/sortBy'
import moment from 'moment'
import DocumentTitle from 'react-document-title'
import { prefixLink } from 'gatsby-helpers'
import access from 'safe-access'
import { config } from 'config'
import SiteSidebar from '../components/SiteSidebar'
import PageLink from '../components/PageLink'

class SiteIndex extends React.Component {
  render() {
    const sortedPages = sortBy(this.props.route.pages, (page) => 
      access(page, 'data.date')).reverse()

    function isMarkdownPost(page) {
      return(
        access(page, 'file.ext') === 'md' 
        && access(page, 'data.layout') === 'post'
      )
    }

    return (
      <DocumentTitle title={ config.siteTitle }>
        <div>
          <SiteSidebar {...this.props}/>
          <div className='content'>
            <div className='main'>
              <div className='main-inner'>
                { sortedPages.filter(isMarkdownPost).map((page) =>
                  <PageLink key={page.data.path} page={page} />) }
              </div>
            </div>
          </div>
        </div>
      </DocumentTitle>
    )
  }
}

SiteIndex.propTypes = {
    route: React.PropTypes.object,
}

export default SiteIndex
